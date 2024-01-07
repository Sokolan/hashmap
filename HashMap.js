function HashMap() {
  let hashMapSize = 16;

  let hashMap = Array(hashMapSize)
    .fill(null)
    .map(() => []);
  const getHashMap = () => hashMap;
  const hash = (str) => {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < str.length; i += 1) {
      // modulu on the end result is the same as taking modulu each step
      hashCode = (primeNumber * hashCode + str.charCodeAt(i)) % hashMapSize;
    }
    return hashCode;
  };

  const calculateLoadFactor = () => {
    const occupied = hashMap.reduce(
      (accumulated, current) =>
        current.length !== 0 ? accumulated + 1 : accumulated,
      0
    );

    return occupied / hashMap.length;
  };

  const set = (key, value) => {
    const hashedKey = hash(key);
    const checkLoad = hashMap[hashedKey].length === 0;

    const collision = hashMap[hashedKey].findIndex(
      (element) => element.key === key
    );

    if (collision === -1) hashMap[hashedKey].push({ key, value });
    else {
      hashMap[hashedKey][collision].value = value;
    }
    if (checkLoad) loadFactorHandler();
  };

  const get = (key) => {
    const hashedKey = hash(key);
    return hashMap[hashedKey].find((element) => element.key === key).value;
  };

  const has = (key) => {
    const hashedKey = hash(key);
    return (
      hashMap[hashedKey].findIndex((element) => element.key === key) !== -1
    );
  };

  const remove = (key) => {
    if (!has(key)) {
      return;
    }

    const hashedKey = hash(key);
    const index = hashMap[hashedKey].findIndex(
      (element) => element.key === key
    );
    hashMap[hashedKey].splice(index, 1);
  };

  const length = () =>
    hashMap.reduce((accumulated, current) => accumulated + current.length, 0);

  const clear = () => {
    hashMap.forEach((element) => element.splice(0));
  };

  const keys = () =>
    hashMap.reduce(
      (accumulated, current) =>
        accumulated.concat(
          current.reduce(
            (accumulatedKeys, currentCell) =>
              accumulatedKeys.concat(currentCell.key),
            []
          )
        ),
      []
    );

  // withDuplicates = false, will remove duplicate values
  const values = (withDuplicates = true) => {
    const returnValues = hashMap.reduce(
      (accumulated, current) =>
        accumulated.concat(
          current.reduce(
            (accumulatedValue, currentCell) =>
              accumulatedValue.concat(currentCell.value),
            []
          )
        ),
      []
    );
    if (withDuplicates) return values;
    return returnValues.reduce(
      (accumulated, current) =>
        accumulated.findIndex((element) => element === current) === -1
          ? accumulated.concat(current)
          : accumulated,
      []
    );
  };
  const entries = () =>
    hashMap.reduce(
      (accumulated, current) =>
        accumulated.concat(
          current.reduce(
            (accumulatedEntries, currentCell) =>
              accumulatedEntries.concat(currentCell),
            []
          )
        ),
      []
    );

  function loadFactorHandler() {
    if (calculateLoadFactor() < 0.8) {
      return;
    }

    const oldEntries = entries();

    hashMapSize *= 2;
    const newHashMap = Array(hashMapSize)
      .fill(null)
      .map(() => []);

    hashMap = newHashMap;
    oldEntries.forEach((elemenet) => set(elemenet.key, elemenet.value));
  }

  return {
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
    getHashMap,
  };
}
