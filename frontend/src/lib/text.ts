export function withPeriod(text: string) {
  return /[.!?…]$/.test(text) ? text : `${text}.`;
}
