export function toRadians(latOrLng: number) {
  return (latOrLng * Math.PI) / 180;
}

export function toMillimeterPrecision(meters: number) {
  const pow = Math.pow(10, 3);
  return Math.round(meters * pow) / pow;
}

export function toMeterPrecision(meters: number) {
  return Math.round(meters);
}
