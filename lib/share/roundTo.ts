export function roundDownToNearestMultiple(num: number, multiple: number) {
  if (multiple <= 0) {
    throw new Error("The 'multiple' must be a positive number.");
  }
  return Math.floor(num / multiple) * multiple;
}