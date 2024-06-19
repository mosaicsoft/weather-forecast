import AsyncSelect from "react-select/async";

export default function Select({ setSearch, setLocation }) {
  const loadOptions = async (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
      return;
    }
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${inputValue}&count=10&language=en&format=json`
      );
      const location_data = await response.json();
      const results = location_data.results;

      if (results === "No result found.") {
        callback([]);
        return;
      }

      const options = results.map((item) => ({
        value: item.id,
        label: item.name,
      }));

      callback(options);
    } catch (error) {
      console.error("Error fetching options:", error);
      callback([]);
    }
  };

  return (
    <AsyncSelect
      className="select"
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions
      onChange={(selectedOption) => {
        setSearch(selectedOption.label);
        setLocation({});
      }}
    />
  );
}
