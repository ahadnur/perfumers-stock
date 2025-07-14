export function lightenColor(hex, percent) {
  // Convert hex to RGB
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  // Lighten each channel
  r = Math.min(255, r + Math.round(255 * (percent/100)));
  g = Math.min(255, g + Math.round(255 * (percent/100)));
  b = Math.min(255, b + Math.round(255 * (percent/100)));

  // Convert back to hex
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}