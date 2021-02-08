const Utils = {
  isLongerArray(obj, threshold) {
    return Array.isArray(obj) && Number.isInteger(threshold) && obj.length > threshold;
  }
}

export default Utils;
