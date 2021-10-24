function binarySearch(arr, target, left, right) {
  if (left > right) {
    return -1;
  }
  let middle = Math.floor((left + right) / 2);
  if (arr[middle] < target) {
    return binarySearch(arr, target, middle + 1, right);
  } else if (arr[middle] > target) {
    return binarySearch(arr, target, left, middle - 1);
  } else {
    return middle;
  }
}
let arr = [1, 2, 3, 4, 5];
console.log(binarySearch(arr, 5, 0, arr.length - 1));
