export function toVw(num) => {
    const viewportWidth = 375
    const unitPrecision = 6
    return ((window.Number(num).toFixed(unitPrecision) / viewportWidth) * 100).toFixed(unitPrecision) + 'vw'
  }