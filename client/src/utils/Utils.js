const Utils = {
  isLongerArray(arr, threshold) {
    return Array.isArray(arr) && Number.isInteger(threshold) && arr.length > threshold;
  }
}

export default Utils;
