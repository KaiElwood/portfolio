// Ported from the approved seasonal running-garden prototype.
// The wind/rotation model and date-seeded flower geometry are preserved.
export function mountRunningGarden(root, source, routeSource) {

  const yearPicker=root.querySelector('#sg-year');
  const plot=root.querySelector('#sg-plot'),detail=root.querySelector('#sg-detail'),routeKey=root.querySelector('#sg-route-key');
  const routeShapes=routeSource.routes;
  const legend=root.querySelector('#sg-legend'),paletteKey=root.querySelector('#sg-palette-key');
  const NS='http://www.w3.org/2000/svg',TAU=2*Math.PI,KM_PER_MILE=1.609344;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const dates=new Map();
  for(const run of source.runs){if(!dates.has(run.date))dates.set(run.date,[]);dates.get(run.date).push(run);}
  function flowerForm(key){
    let seed=2166136261;
    for(const character of key){seed^=character.charCodeAt(0);seed=Math.imul(seed,16777619)>>>0;}
    const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
    const count=1+Math.floor(random()*7),rotation=random()*TAU;
    const dots=Array.from({length:count},(_,i)=>({angle:rotation+(i===0?.72:i/count*TAU)+(random()-.5)*.75,radius:.65+random()*.7,orbit:.72+random()*.65}));
    const meanRadius=dots.reduce((sum,dot)=>sum+dot.radius,0)/count,meanOrbit=dots.reduce((sum,dot)=>sum+dot.orbit,0)/count;
    for(const dot of dots){dot.radius/=meanRadius;dot.orbit/=meanOrbit;}
    return {dots,stemPhase:random()*TAU,stemFrequency:1.1+random()*.9};
  }
  const allRuns=[...dates].map(([dateKey,records])=>{
    const year=Number(dateKey.slice(0,4)),stamp=Date.parse(dateKey+'T00:00:00Z');
    const distance=records.reduce((sum,run)=>sum+run.distanceKm,0);
    const seconds=records.reduce((sum,run)=>sum+run.movingSeconds,0);
    const withHr=records.filter(run=>run.averageHeartRate!==null);
    const hrSeconds=withHr.reduce((sum,run)=>sum+run.movingSeconds,0);
    const day=(stamp-Date.UTC(year,0,1))/86400000;
    const form=flowerForm(dateKey);
    return {dateKey,year,day,distance,pace:seconds/60/distance,count:records.length,hrCount:withHr.length,
      hr:hrSeconds?withHr.reduce((sum,run)=>sum+run.averageHeartRate*run.movingSeconds,0)/hrSeconds:null,
      form,petals:form.dots.length,q:0,v:0,mouseWind:0};
  });
  const years=[...new Set(allRuns.map(run=>run.year))].sort((a,b)=>b-a);
  const maxDistance=Math.max(...allRuns.map(run=>run.distance));
  const paceMin=Math.min(...allRuns.map(run=>run.pace)),paceMax=Math.max(...allRuns.map(run=>run.pace));
  const hrMin=Math.min(...allRuns.filter(run=>run.hr!==null).map(run=>run.hr)),hrMax=Math.max(...allRuns.filter(run=>run.hr!==null).map(run=>run.hr));
  function flowerColor(run){
    const month=Number(run.dateKey.slice(5,7));
    return `var(--sg-${month===12||month<3?'winter':month<6?'spring':month<9?'summer':'autumn'})`;
  }
  function paletteUI(){
    legend.textContent='Stem reach = miles · Petal size = pace · Petal color = season · Petal spread = heart rate · Hollow = no heart rate';
    paletteKey.replaceChildren();
    for(const season of ['winter','spring','summer','autumn']){
      const label=document.createElement('span');label.className='sg-season';
      const swatch=document.createElement('span');swatch.className='sg-swatch';swatch.style.background=`var(--sg-${season})`;swatch.setAttribute('aria-hidden','true');
      label.append(swatch,document.createTextNode(season[0].toUpperCase()+season.slice(1)));paletteKey.append(label);
    }
  }
  let year=years[0],runs=[],daysInYear=365;
  for(const value of years){const option=document.createElement('option');option.value=String(value);option.textContent=String(value);yearPicker.append(option);}
  function el(tag,attrs={},text){const n=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))n.setAttribute(k,v);if(text!==undefined)n.textContent=text;return n;}
  function date(run){return new Date(run.dateKey+'T12:00:00Z').toLocaleDateString('en-US',{month:'short',day:'numeric',timeZone:'UTC'});}
  function pace(run){const seconds=Math.round(run.pace*KM_PER_MILE*60);return `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;}
  function brief(run){return `${date(run)}, ${run.year} · ${(run.distance/KM_PER_MILE).toFixed(2)} miles`;}
  function info(run){const hr=run.hr===null?'HR not recorded':`${Math.round(run.hr)} bpm${run.hrCount<run.count?' (partial HR)':''}`;return `${date(run)}${run.count>1?' · '+run.count+' runs combined':''} · ${(run.distance/KM_PER_MILE).toFixed(2)} mi · ${pace(run)} min/mile · ${hr}`;}
  function configureYear(value){
    year=value;yearPicker.value=String(year);runs=allRuns.filter(run=>run.year===year);
    daysInYear=(Date.UTC(year+1,0,1)-Date.UTC(year,0,1))/86400000;
  }
  configureYear(year);
  let selected=null,theta=0,omega=0,target=0,frame=0,last=0;
  let lastPointer=null;
  let ring=null,labels=[],flowerNodes=[],dimensions=null,centerLine=null,centerTitle=null,routeLayer=null,hovered=null;
  const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
  function shortestTarget(day,from){const desired=-day/daysInYear*TAU;return from+Math.atan2(Math.sin(desired-from),Math.cos(desired-from));}
  function applyState(state){
    const saved=state?.modelContent??state;
    if(years.includes(saved?.year))configureYear(saved.year);
    selected=Number.isInteger(saved?.selectedDay)&&runs.some(r=>r.day===saved.selectedDay)?saved.selectedDay:null;
    target=theta=selected===null?0:-selected/daysInYear*TAU;omega=0;
    for(const r of runs){r.q=0;r.v=0;r.mouseWind=0;}
  }
  const mostRecentRoute = runs.filter(run => routeShapes[run.dateKey]?.status === 'available').sort((a,b) => b.day-a.day)[0];
  applyState({year:years[0],selectedDay:mostRecentRoute?.day ?? null});
  function highlight(){
    for(const node of flowerNodes){
      const chosen=node.run.day===selected,over=node.run.day===hovered||document.activeElement===node.group;
      node.group.setAttribute('data-selected',String(chosen));
      node.group.setAttribute('aria-pressed',String(chosen));
      node.group.setAttribute('opacity',chosen||over||selected===null?1:.8);
      node.path.setAttribute('stroke-width',chosen?2:over?1.3:.85);
      node.path.setAttribute('opacity',chosen?1:.65);
      node.halo.setAttribute('opacity',chosen?1:over?.5:0);
      node.halo.setAttribute('stroke-width',chosen?1.7:1);
      node.baseMark.setAttribute('opacity',chosen?1:0);
    }
    const chosen=flowerNodes.find(node=>node.run.day===selected);
    if(chosen&&chosen.group!==ring.lastElementChild){
      const focused=document.activeElement===chosen.group;
      chosen.group.parentNode?.appendChild(chosen.group);
      if(focused)chosen.group.focus({preventScroll:true});
    }
  }
  function drawRoute(run){
    routeLayer.replaceChildren();
    routeKey.hidden=true;
    routeKey.textContent='';
    if(!run)return;
    const route=routeShapes[run.dateKey];
    const {cx,cy,r}=dimensions;
    if(route?.status!=='available'){
      const message=route?.status==='unavailable'?'Route unavailable':'No GPS recorded';
      routeLayer.setAttribute('aria-label',`${date(run)}, ${year}: ${message}`);
      routeLayer.append(el('text',{x:cx,y:cy,'text-anchor':'middle',fill:'var(--muted-foreground)',class:'text-small'},message));
      return;
    }
    const size=r*1.05,left=cx-size/2,top=cy-size/2;
    const color=flowerColor(run);
    for(const segment of route.segments){
      const points=segment.map(([x,y])=>[left+x*size,top+y*size]);
      const path=points.map(([x,y],index)=>`${index?'L':'M'}${x},${y}`).join(' ');
      routeLayer.append(el('path',{d:path,fill:'none',stroke:color,'stroke-width':2.2,'stroke-linecap':'round','stroke-linejoin':'round'}));
      const start=points[0],finish=points[points.length-1];
      routeLayer.append(el('circle',{cx:start[0],cy:start[1],r:2.5,fill:'var(--foreground)'}));
      routeLayer.append(el('circle',{cx:finish[0],cy:finish[1],r:3.5,fill:'var(--background)',stroke:'var(--foreground)','stroke-width':1.2}));
    }
    routeLayer.setAttribute('aria-label',`${date(run)}, ${year}: route outline, north up`);
    routeKey.hidden=false;
    routeKey.textContent='● Start · ○ Finish · North up'+(route.recordedRuns<route.totalRuns?` · GPS for ${route.recordedRuns} of ${route.totalRuns} runs`:'');
  }
  function updateDetail(){
    const run=runs.find(r=>r.day===selected),count=runs.reduce((sum,r)=>sum+r.count,0);
    detail.textContent=run?info(run):`${year} · ${count} runs · ${runs.length} running days · ${(runs.reduce((sum,r)=>sum+r.distance,0)/KM_PER_MILE).toLocaleString('en-US',{maximumFractionDigits:1})} mi`;
    if(centerTitle){centerTitle.textContent=run?'':String(year);centerTitle.setAttribute('y',dimensions.cy-7);}
    if(centerLine){centerLine.textContent=run?'':`${count} runs`;centerLine.setAttribute('y',dimensions.cy+15);}
    drawRoute(run);highlight();
  }
  function changeYear(value){
    if(frame)cancelAnimationFrame(frame);frame=0;theta=0;target=0;omega=0;selected=null;hovered=null;lastPointer=null;
    configureYear(value);for(const run of runs){run.q=0;run.v=0;run.mouseWind=0;}draw();
  }
  function selectRun(day){
    selected=day;hovered=null;target=day===null?theta:shortestTarget(day,theta);
    updateDetail();
    if(reduced.matches){
      if(frame)cancelAnimationFrame(frame);frame=0;
      theta=target;omega=0;for(const r of runs){r.q=0;r.v=0;r.mouseWind=0;}paint();
    }else wake();

  }
  function nearestFlower(event){
    if(!Number.isFinite(event.clientX)||!Number.isFinite(event.clientY))return null;
    const svg=ring.ownerSVGElement,bounds=svg.getBoundingClientRect();
    const x=(event.clientX-bounds.left)*dimensions.cx*2/bounds.width;
    const y=(event.clientY-bounds.top)*dimensions.cy*2/bounds.height;
    let closest=null,distance=18*18;
    for(const node of flowerNodes){
      if(!node.tip)continue;
      const dx=x-node.tip[0],dy=y-node.tip[1];
      const phase=node.run.day/daysInYear*TAU+theta+clamp(node.run.q,-1.65,1.65);
      const localX=dx*Math.cos(phase)+dy*Math.sin(phase),localY=-dx*Math.sin(phase)+dy*Math.cos(phase);
      const edge=Math.min(...node.petalGeometry.map(dot=>Math.max(0,Math.hypot(localX-dot.x,localY-dot.y)-dot.r)));
      const squared=edge*edge+(dx*dx+dy*dy)*.00001;
      if(squared<distance){closest=node;distance=squared;}
    }
    return closest;
  }
  function stirWind(event){
    if(reduced.matches||document.hidden||event.pointerType==='touch')return;
    if(!Number.isFinite(event.clientX)||!Number.isFinite(event.clientY))return;
    const bounds=ring.ownerSVGElement.getBoundingClientRect();
    const current={x:(event.clientX-bounds.left)*dimensions.cx*2/bounds.width,y:(event.clientY-bounds.top)*dimensions.cy*2/bounds.height,time:performance.now()};
    const previous=lastPointer;lastPointer=current;
    if(!previous||current.time-previous.time>140)return;
    const dx=current.x-previous.x,dy=current.y-previous.y,lengthSquared=dx*dx+dy*dy;
    if(lengthSquared<.16)return;
    const dt=Math.max(.008,(current.time-previous.time)/1000);
    const speedGain=Math.min(Math.sqrt(lengthSquared)/dt/650,2.2);
    const radius=Math.max(45,Math.min(105,dimensions.r*.6));
    let pushed=false;
    for(const node of flowerNodes){
      if(!node.tip)continue;
      // Distance to the swept cursor segment keeps quick passes local too.
      const t=clamp(((node.tip[0]-previous.x)*dx+(node.tip[1]-previous.y)*dy)/lengthSquared,0,1);
      const distanceSquared=(node.tip[0]-previous.x-t*dx)**2+(node.tip[1]-previous.y-t*dy)**2;
      if(distanceSquared>=radius*radius)continue;
      const influence=(1-distanceSquared/(radius*radius))**2;
      const phase=node.run.day/daysInYear*TAU+theta;
      // Project cursor motion onto the stem's sideways bending direction.
      const sideways=dx*Math.cos(phase)+dy*Math.sin(phase);
      const impulse=sideways*speedGain*.0095*influence;
      if(Math.abs(impulse)<.0001)continue;
      node.run.mouseWind=clamp(node.run.mouseWind+impulse,-.95,.95);
      pushed=true;
    }
    if(pushed)wake();
  }
  function stemDynamics(run,length,groundRadius,maxStem){
    const flex=.85+length/maxStem,stiffness=(10+run.petals*.5)/flex;
    const reference=maxStem*.3;
    // Integrate drag torque about the root with v(s)=omega*(R+s).
    // Linear drag: integral((R+s)*s ds); quadratic: integral((R+s)^2*s ds).
    const moment1=groundRadius*length**2/2+length**3/3;
    const moment2=groundRadius**2*length**2/2+2*groundRadius*length**3/3+length**4/4;
    const reference1=groundRadius*reference**2/2+reference**3/3;
    const reference2=groundRadius**2*reference**2/2+2*groundRadius*reference**3/3+reference**4/4;
    const a=groundRadius**2,b=2*groundRadius*length,c=length**2;
    const normalization=a/6+b/8+c/10;
    // One clamped cantilever mode for the radius-dependent distributed load.
    // Zero rotation at the root; curvature falls to zero at the free tip.
    const tangent=t=>(a*(t/2-t*t/2+t**3/6)+b*(t/3-t*t/4+t**4/24)+c*(t/4-t*t/6+t**5/60))/normalization;
    const midAngles=Array.from({length:8},(_,i)=>tangent((i+.5)/8));
    const endAngles=Array.from({length:9},(_,i)=>tangent(i/8));
    const amplitude=Math.min(6,length*.15);
    const waviness=Array.from({length:9},(_,i)=>{
      if(i===0||i===8)return 0;
      const t=i/8;
      return Math.sin(Math.PI*t)*amplitude*(.75*Math.sin(t*TAU*run.form.stemFrequency+run.form.stemPhase)+.25*Math.sin(t*TAU*2.7-run.form.stemPhase));
    });
    return {flex,stiffness,naturalFrequency:Math.sqrt(stiffness),dragLinear:.12*moment1/reference1,dragQuadratic:.012*moment2/reference2,accelerationLag:.003*moment1/reference1,midAngles,endAngles,waviness,segmentLength:length/8,renderPoints:Array.from({length:9},()=>[0,0])};
  }
  function paint(){
    if(!ring)return;
    const {cx,cy,r}=dimensions;
    ring.setAttribute('transform',`translate(${cx},${cy}) rotate(${theta*180/Math.PI})`);
    for(const label of labels){const a=label.angle+theta,labelRadius=r-(r<110?10:19);label.node.setAttribute('x',cx+Math.cos(a)*labelRadius);label.node.setAttribute('y',cy+Math.sin(a)*labelRadius);}
    for(const node of flowerNodes){
      const {run,path,head}=node;
      // Integrate the cached bending mode, keeping the root fixed and arc
      // segments the same length as the tip swings. Reuse point buffers.
      const q=clamp(run.q,-1.65,1.65);
      const points=node.renderPoints;let x=0,y=0;
      for(let i=1;i<=8;i++){
        const midAngle=q*node.midAngles[i-1];
        x+=Math.sin(midAngle)*node.segmentLength;
        y-=Math.cos(midAngle)*node.segmentLength;
        const wave=node.waviness[i];
        if(wave){const angle=q*node.endAngles[i];points[i][0]=x+Math.cos(angle)*wave;points[i][1]=y+Math.sin(angle)*wave;}
        else{points[i][0]=x;points[i][1]=y;}
      }
      let stem=`M${points[0][0]},${points[0][1]}`;
      for(let i=0;i<points.length-1;i++){
        const p0=points[Math.max(0,i-1)],p1=points[i],p2=points[i+1],p3=points[Math.min(points.length-1,i+2)];
        stem+=` C${p1[0]+(p2[0]-p0[0])/6},${p1[1]+(p2[1]-p0[1])/6} ${p2[0]-(p3[0]-p1[0])/6},${p2[1]-(p3[1]-p1[1])/6} ${p2[0]},${p2[1]}`;
      }
      path.setAttribute('d',stem);
      head.setAttribute('transform',`translate(${x},${y}) rotate(${q*180/Math.PI})`);
      const phase=run.day/daysInYear*TAU+theta;
      node.tip=[cx+Math.sin(phase)*r+Math.cos(phase)*x-Math.sin(phase)*y,cy-Math.cos(phase)*r+Math.sin(phase)*x+Math.cos(phase)*y];
    }
  }
  function step(dt){
    let acceleration=20*(target-theta)-9*omega;
    omega+=acceleration*dt;theta+=omega*dt;
    if(Math.abs(target-theta)<.001&&Math.abs(omega)<.006){theta=target;omega=0;acceleration=0;}
    let energy=Math.max(Math.abs(target-theta)*dimensions.r,Math.abs(omega)*dimensions.r*.25);
    const quadraticSpeed=omega*Math.abs(omega),windDecay=Math.exp(-3*dt);
    for(const node of flowerNodes){
      const {run,flex,stiffness,naturalFrequency}=node;
      // A softer spring and lingering, gentler gust produce a slow sway.
      run.mouseWind*=windDecay;
      const rotationDrag=-omega*node.dragLinear-quadraticSpeed*node.dragQuadratic-acceleration*node.accelerationLag;
      const wind=clamp((rotationDrag+run.mouseWind)*flex,-1.05,1.05);
      // Large gusts ring out longer; small movements fade more quickly.
      const swing=Math.hypot(run.q,run.v/naturalFrequency);
      const damping=.65+run.petals*.025+.65/(1+swing*14);
      run.v+=(stiffness*(wind-run.q)-damping*run.v)*dt;run.q+=run.v*dt;
      energy=Math.max(energy,Math.hypot(run.q,run.v/naturalFrequency)*node.length,Math.abs(run.mouseWind)*flex*node.length);
    }
    return energy;
  }
  function tick(time){
    frame=0;const elapsed=Math.min((time-last)/1000,.05);last=time;
    const count=Math.max(1,Math.ceil(elapsed/(1/120)));let energy=1;
    for(let i=0;i<count;i++)energy=step(elapsed/count);
    if(energy<.12){theta=target;omega=0;for(const r of runs){r.q=0;r.v=0;r.mouseWind=0;}paint();return;}
    paint();frame=requestAnimationFrame(tick);
  }
  function wake(){if(!frame){last=performance.now();frame=requestAnimationFrame(tick);}}
  function draw(){
    lastPointer=null;
    const w=Math.max(240,Math.round(plot.getBoundingClientRect().width)),h=Math.min(w,560);
    const cx=w/2,cy=h/2,r=h*.26,maxStem=h*.18;
    dimensions={cx,cy,r,maxStem};flowerNodes=[];labels=[];
    const svg=el('svg',{class:'sg-chart',width:w,height:h,role:'group','aria-label':`${year} running garden. Each flower represents one running day. Stem reach shows total distance in miles; petal size shows combined moving pace in minutes per mile; petal colors follow the palette legend. Petal spacing shows moving-time-weighted heart rate. Petal count and irregular shapes are decorative and stable for each date. Outlined petals mean no heart rate. Move your mouse to blow local gusts through the flowers; faster movements create stronger wind. Hover for date and miles. Click a flower or activate it with Enter or Space to highlight it, rotate that day to the top, and show its route outline in the center.`});
    ring=el('g');svg.append(ring);
    ring.append(el('circle',{cx:0,cy:0,r,fill:'none',stroke:'var(--border)','stroke-width':1}));
    for(let day=0;day<daysInYear;day++){const a=day/daysInYear*TAU-Math.PI/2;ring.append(el('circle',{cx:Math.cos(a)*r,cy:Math.sin(a)*r,r:.85,fill:'var(--muted-foreground)',opacity:.45}));}
    const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    months.forEach((month,i)=>{const day=(Date.UTC(year,i,15)-Date.UTC(year,0,1))/86400000;const node=el('text',{'text-anchor':'middle','dominant-baseline':'middle',fill:'var(--muted-foreground)',class:'text-small'},month);labels.push({node,angle:day/daysInYear*TAU-Math.PI/2});svg.append(node);});
    svg.append(el('line',{x1:cx,y1:cy-r+4,x2:cx,y2:cy-r+12,stroke:'var(--foreground)','stroke-width':1.5,'pointer-events':'none'}));
    routeLayer=el('g',{'pointer-events':'none',role:'img','aria-label':'Selected run route'});svg.append(routeLayer);
    centerTitle=el('text',{x:cx,y:cy-7,'text-anchor':'middle',fill:'var(--foreground)'});svg.append(centerTitle);
    centerLine=el('text',{x:cx,y:cy+15,'text-anchor':'middle',fill:'var(--muted-foreground)',class:'text-small'});svg.append(centerLine);
    for(const run of runs){
      const a=run.day/daysInYear*TAU-Math.PI/2,length=maxStem*(run.distance/maxDistance);
      const speed=(paceMax-run.pace)/(paceMax-paceMin||1),effort=run.hr===null?null:(run.hr-hrMin)/(hrMax-hrMin||1);
      const bloom=2.2+speed*2.4;
      const centerGap=effort===null?2.5:1+effort*3.5;
      const petalGeometry=run.form.dots.map(dot=>{const orbit=(centerGap+bloom*.46)*dot.orbit;return {x:Math.cos(dot.angle)*orbit,y:Math.sin(dot.angle)*orbit,r:bloom*.58*dot.radius};});
      const bloomExtent=Math.max(...petalGeometry.map(dot=>Math.hypot(dot.x,dot.y)+dot.r));
      const color=flowerColor(run);
      const group=el('a',{href:'#sg-detail',role:'button','aria-label':brief(run),'data-label':brief(run),class:'cursor-interaction','data-day':run.day,transform:`translate(${Math.cos(a)*r},${Math.sin(a)*r}) rotate(${a*180/Math.PI+90})`});
      group.append(el('title',{},brief(run)));
      const path=el('path',{fill:'none',stroke:'var(--foreground)','stroke-width':selected===run.day?2:.85,opacity:.65,'data-label':brief(run)});group.append(path);
      const head=el('g');group.append(head);
      head.append(el('circle',{cx:0,cy:0,r:Math.max(10,bloomExtent+3),fill:'transparent','data-label':brief(run)}));
      const petals=[];
      for(const dot of petalGeometry){const petal=el('circle',{cx:dot.x,cy:dot.y,r:dot.r,fill:effort===null?'none':color,stroke:effort===null?color:'none','stroke-width':.7,'data-label':brief(run)});head.append(petal);petals.push(petal);}
      const halo=el('circle',{cx:0,cy:0,r:bloomExtent+2.5,fill:'none',stroke:'var(--foreground)','stroke-width':1.7,opacity:0,'pointer-events':'none'});head.append(halo);
      const baseMark=el('circle',{cx:0,cy:0,r:2.8,fill:'var(--foreground)',opacity:0,'pointer-events':'none'});group.append(baseMark);
      group.addEventListener('click',event=>{event.preventDefault();const nearest=event.detail===0?null:nearestFlower(event);selectRun(nearest?nearest.run.day:run.day);});
      group.addEventListener('keydown',event=>{if(event.key===' '||event.key==='Enter'){event.preventDefault();selectRun(run.day);}});
      group.addEventListener('focus',()=>{hovered=run.day;highlight();});
      group.addEventListener('blur',()=>{hovered=null;highlight();});
      ring.append(group);flowerNodes.push({run,length,path,head,halo,baseMark,group,petals,petalGeometry,...stemDynamics(run,length,r,maxStem)});
    }
    const hoverAt=event=>{
      const nearest=nearestFlower(event);hovered=nearest?nearest.run.day:null;
      const trigger=event.target.closest?.('[data-label]');
      if(nearest&&trigger)trigger.setAttribute('data-label',brief(nearest.run));
      highlight();
    };
    svg.addEventListener('pointerover',hoverAt,true);
    svg.addEventListener('pointermove',event=>{hoverAt(event);stirWind(event);},true);
    svg.addEventListener('pointerleave',()=>{hovered=null;lastPointer=null;highlight();});
    plot.replaceChildren(svg);
    paletteUI();updateDetail();paint();
  }
  const onYearChange = () => changeYear(Number(yearPicker.value));
  const onMotionChange = () => {
    lastPointer=null;
    if(reduced.matches){
      if(frame)cancelAnimationFrame(frame);
      frame=0;theta=target;omega=0;
      for(const r of runs){r.q=0;r.v=0;r.mouseWind=0;}
      paint();
    }
  };
  const onBlur = () => { lastPointer=null; };
  const onVisibilityChange = () => {
    lastPointer=null;
    if(document.hidden){
      if(frame)cancelAnimationFrame(frame);
      frame=0;for(const r of runs)r.mouseWind=0;
    }else if(Math.abs(target-theta)>.0001||runs.some(r=>Math.abs(r.q)+Math.abs(r.v)+Math.abs(r.mouseWind)>.0001))wake();
  };
  yearPicker.addEventListener('change',onYearChange);
  reduced.addEventListener('change',onMotionChange);
  window.addEventListener('blur',onBlur);
  document.addEventListener('visibilitychange',onVisibilityChange);
  const observer=new ResizeObserver(draw);
  observer.observe(plot);
  draw();
  return () => {
    if(frame)cancelAnimationFrame(frame);
    observer.disconnect();
    yearPicker.removeEventListener('change',onYearChange);
    reduced.removeEventListener('change',onMotionChange);
    window.removeEventListener('blur',onBlur);
    document.removeEventListener('visibilitychange',onVisibilityChange);
    plot.replaceChildren();
    yearPicker.replaceChildren();
  };
}
