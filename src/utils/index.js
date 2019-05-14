export function random (lower, upper) {
  // 产生随机整数，包含下限值，包括上限值
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}
