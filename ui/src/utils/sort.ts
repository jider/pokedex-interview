export const toSortedAlphabeticallyArrayObject = <T, K extends keyof T>(data: T[], property: K) => {
  return data.toSorted(function (a, b) {
    if (a[property] < b[property]) {
      return -1;
    }
    if (a[property] > b[property]) {
      return 1;
    }
    return 0;
  });
}
