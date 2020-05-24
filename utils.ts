export function toReadableDate(year: number, month: number, day: number) {
  const date = new Date(Date.UTC(year, month, day));
  return date.toLocaleDateString('nl-NL');
}
