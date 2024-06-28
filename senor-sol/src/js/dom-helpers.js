// importing functions to use in form submission handling
// getLocationData & getSunriseSunset
// will use getSunriseSunsetMoreInfo in eventListener for button after dom/render
import { getLocationData, getSunriseSunset, getSunriseSunsetMoreInfo } from './fetch-functions';
import { convertToTimezone } from './helper-functions';

export const resultsContainerDiv = async (formObj) => {
  const ul = document.getElementById("results-list");
  ul.innerHTML = ``;
  
  const zipcode = document.createElement("li");
  zipcode.classList.add("results-zipcode")
  zipcode.textContent = `Zipcode: ${formObj.zipcode}`;

  const date = document.createElement("li");
  date.classList.add("results-date")
  date.textContent = `Date: ${formObj.date}`;

  const timezone = document.createElement("li");
  date.classList.add("results-timezone")
  timezone.textContent = `Timezone: ${formObj.timezone}`;

  const location = document.createElement("li");
  location.classList.add("results-location")

  const coords = document.createElement("li");
  coords.classList.add("results-coords")

  const sunrise = document.createElement("li");
  sunrise.classList.add("results-sunrise");

  const sunset = document.createElement("li");
  sunset.classList.add("results-sunset");

  ul.append(zipcode, date, timezone, location, coords, sunrise, sunset);

  try {
    // fetch location data using provided zip code 
    const { latitude, longitude, city, state } = await getLocationData(formObj.zipcode);

    location.textContent = `Location: ${city}, ${state} ${formObj.zipcode}`;
    coords.textContent = `Latitude, Longitude: ${latitude}, ${longitude}`;
    
    // fetch sunrise/sunset time using lat, long, and date 
    const { sunrise: sunriseTime, sunset: sunsetTime } = await getSunriseSunset(latitude, longitude, formObj.date);
    
    sunrise.textContent = "Sunrise: " + convertToTimezone(sunriseTime, formObj.timezone);
    sunset.textContent = "Sunset: " + convertToTimezone(sunsetTime, formObj.timezone);
  } catch (error) {
    console.warn(error);
  }
};