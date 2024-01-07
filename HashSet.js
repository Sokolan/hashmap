function HashSet() {
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

  const set = (key) => {
    const hashedKey = hash(key);
    const checkLoad = hashMap[hashedKey].length === 0;

    const collision = hashMap[hashedKey].findIndex(
      (element) => element === key
    );

    if (collision === -1) hashMap[hashedKey].push(key);

    if (checkLoad) loadFactorHandler();
  };

  const has = (key) => {
    const hashedKey = hash(key);
    return hashMap[hashedKey].findIndex((element) => element === key) !== -1;
  };

  const remove = (key) => {
    if (!has(key)) {
      return;
    }

    const hashedKey = hash(key);
    const index = hashMap[hashedKey].findIndex((element) => element === key);
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
              accumulatedKeys.concat(currentCell),
            []
          )
        ),
      []
    );

  function loadFactorHandler() {
    if (calculateLoadFactor() < 0.8) {
      return;
    }

    const oldEntries = keys();

    hashMapSize *= 2;
    const newHashMap = Array(hashMapSize)
      .fill(null)
      .map(() => []);

    hashMap = newHashMap;
    oldEntries.forEach((elemenet) => set(elemenet));
  }

  return {
    set,
    has,
    remove,
    length,
    clear,
    keys,
    getHashMap,
  };
}
