export function Card({ weather }) {
  function getWeatherIcon(wmoCode) {
    const icons = new Map([
      [[0], "☀️"],
      [[1], "🌤"],
      [[2], "⛅️"],
      [[3], "☁️"],
      [[45, 48], "🌫"],
      [[51, 56, 61, 66, 80], "🌦"],
      [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
      [[71, 73, 75, 77, 85, 86], "🌨"],
      [[95], "🌩"],
      [[96, 99], "⛈"],
    ]);
    const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
    if (!arr) return "NOT FOUND";
    return icons.get(arr);
  }

  function getDay(time, index) {
    if (index === 0) return "Today";
    if (index === 1) return "Tomorrow";
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(new Date(time));
  }

  return (
    <div className="cards">
      {weather.timezone &&
        weather.daily.time.map((time, i) => (
          <div key={i} className="card">
            <div className="weather-icon">
              {getWeatherIcon(weather.daily.weathercode[i])}
            </div>
            {getDay(time, i)}
            <div>
              {weather.daily.temperature_2m_min[i]} &deg; -
              {weather.daily.temperature_2m_max[i]} &deg;
              <hr />
              <div className="sun">
                <div>
                  ☀️ Sunrise -
                  {new Date(weather.daily.sunrise[i]).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div>
                  🌙 Sunset -{" "}
                  {new Date(weather.daily.sunset[i]).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
