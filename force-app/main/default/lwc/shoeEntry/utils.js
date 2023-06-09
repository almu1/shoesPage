  export const calcMedian = arr => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (+nums[mid - 1] + +nums[mid]) / 2;
};
export const calcAvg = arr => {
    return (arr.reduce( ( a, b ) => a + b, 0 ) / arr.length).toFixed(2);
}
