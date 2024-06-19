export function Location({ location }) {
  return (
    <>
      <span className="city">{location.city}</span>
      <span className="country">{location.country}</span>
      <span className="flag">
        <img src={`https://flagsapi.com/${location.countryCode}/flat/32.png`} />
      </span>
    </>
  );
}
