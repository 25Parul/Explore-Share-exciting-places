const axios = require("axios");
const REACT_APP_COORDINATES_KEY = "AIzaSyAxg4T0EhFKnRysR1PWKqiLQO_TkTho_YU";

async function getCoordsForAdrress(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${REACT_APP_COORDINATES_KEY}`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    throw new Error("Could not find location for the specified address");
  }

  const coordinates = data.results[0].geometry.location;
  return coordinates;
}

module.exports = getCoordsForAdrress;
