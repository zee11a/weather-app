const apiKey = "6b24a48df669433787295736250207";

document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (city) getWeather(city);
});

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        getWeather(`${lat},${lon}`);
      },
      () => {
        console.warn("Geolocation denied");
      }
    );
  }
});

async function getWeather(city) {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const forecastContainer = document.getElementById("forecast-container");
    forecastContainer.innerHTML = "";

    const forecastDays = data.forecast.forecastday;

  forecastDays.forEach((day, index) => {
  const date = new Date(day.date);
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });

  const isToday = index === 0;
  const title = isToday ? "Today" : weekday;

  const locationName = `${data.location.name}, ${data.location.country}`;

  document.getElementById("forecast-container").innerHTML += `
    <div class="col-md-4">
      <div class="card p-4 text-center ">
        <h5>${title}</h5>
        <p class="">${locationName}</p>
        <img src="https:${day.day.condition.icon}" width="60" alt="${day.day.condition.text}">
        <h3>${day.day.avgtemp_c}°C</h3>
        <p>${day.day.condition.text}</p>
        <p> ${day.day.avghumidity}% |  ${day.day.maxwind_kph} km/h</p>
      </div>
    </div>
  `;
});

  } catch (err) {
    console.error(err);
    alert("Couldn't load weather. Try again.");
  }
}
