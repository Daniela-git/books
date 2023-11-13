export function convertToNumber(value) {
  // $ 209.948
  const regx = /\D/g;
  return Number(value.replace(regx, ""));
}
