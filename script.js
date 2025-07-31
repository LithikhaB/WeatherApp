const apiKey = 'a0ae1c11f9c71472cc4facc1f82e159d';


async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherCard = document.getElementById("weatherCard");
  const errorMsg = document.getElementById("errorMsg");

  if (!city) {
    errorMsg.textContent = "Please enter a city name.";
    weatherCard.classList.add("hidden");
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temperature").textContent = `🌡️ ${data.main.temp}°C`;
    document.getElementById("description").textContent =
      data.weather[0].description;
    document.getElementById("weatherIcon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    errorMsg.textContent = "";
    weatherCard.classList.remove("hidden");
  } catch (error) {
    errorMsg.textContent = error.message;
    weatherCard.classList.add("hidden");
  }
}

