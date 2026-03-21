export const units = {
  length: ['m', 'km', 'cm', 'mm', 'inch', 'ft', 'mile'],
  weight: ['kg', 'g', 'mg', 'lb', 'ton'],
  temp: ['C', 'F', 'K'],
};

// base conversions
const lengthToMeter: any = {
  m: 1,
  km: 1000,
  cm: 0.01,
  mm: 0.001,
  inch: 0.0254,
  ft: 0.3048,
  mile: 1609.34,
};

const weightToKg: any = {
  kg: 1,
  g: 0.001,
  mg: 0.000001,
  lb: 0.453592,
  ton: 1000,
};

export const convert = (value: number, type: string, from: string, to: string) => {
  if (!value && value !== 0) return 0;

  // LENGTH
  if (type === 'length') {
    const meters = value * lengthToMeter[from];
    return meters / lengthToMeter[to];
  }

  // WEIGHT
  if (type === 'weight') {
    const kg = value * weightToKg[from];
    return kg / weightToKg[to];
  }

  // TEMPERATURE
  if (type === 'temp') {
    if (from === to) return value;

    let tempInC = value;

    if (from === 'F') tempInC = (value - 32) * 5/9;
    if (from === 'K') tempInC = value - 273.15;

    if (to === 'F') return (tempInC * 9/5) + 32;
    if (to === 'K') return tempInC + 273.15;

    return tempInC;
  }

  return value;
};