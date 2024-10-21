export async function getData() {

	const user = process.env.ADAFRUIT_IO_USERNAME;
	const key = process.env.ADAFRUIT_IO_KEY;
	const URL = process.env.ADAFRUIT_IO_BASE_URL;
	if (!key) {
		throw new Error('ADAFRUIT_IO_KEY is not defined');
	}
	const headers = { 'X-AIO-Key': key };
	const response1 = await fetch(`${URL}/${user}/feeds/temperature/data`, { headers });
	const response2 = await fetch(`${URL}/${user}/feeds/humidity/data`, { headers });
	const response3 = await fetch(`${URL}/${user}/feeds/pressure/data`, { headers });
	if (!response1.ok || !response2.ok || !response3.ok) {
		return ({ humidity: 12, temp: 16, pressure: 1020 });
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
