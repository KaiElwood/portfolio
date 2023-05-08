export async function getData() {

	const ADAFRUIT_IO_USERNAME = 'kai_pie_sky';
	const ADAFRUIT_IO_KEY = 'aio_dVgI83M0GdNxy08ftifui9vw5D8t';
	const ADAFRUIT_IO_BASE_URL = 'https://io.adafruit.com/api/v2';
	const headers =  { 'X-AIO-Key': ADAFRUIT_IO_KEY };
	const response1 = await fetch(`${ADAFRUIT_IO_BASE_URL}/${ADAFRUIT_IO_USERNAME}/feeds/temperature/data`, { headers });
	const response2 = await fetch(`${ADAFRUIT_IO_BASE_URL}/${ADAFRUIT_IO_USERNAME}/feeds/humidity/data`, { headers });
	const response3 = await fetch(`${ADAFRUIT_IO_BASE_URL}/${ADAFRUIT_IO_USERNAME}/feeds/pressure/data`, { headers });
	if (!response1.ok || !response2.ok || !response3.ok) {
		throw new Error('Unable to fetch data');
	}
	const temperatureData = await response1.json();
	const humidityData = await response2.json();
	const pressureData = await response3.json();

	const temperature = temperatureData[0];
	const humidity = humidityData[0];
	const pressure = pressureData[0];

	return ({ humidity: humidity.value, temp: temperature.value, pressure: pressure.value });
}
