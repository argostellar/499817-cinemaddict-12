// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

export const getUniqueArray = (itemsCount, itemConsts) => {
  const items = new Array(itemsCount).fill().map(() => {
    return getRandomArrayElement(itemConsts);
  });
  let isRepeating = null;
  for (let i = 0; i < items.length; i++) {
    if (items.length <= 1) {
      return isRepeating = false;
    }
    isRepeating = items.includes(items[i], i++);
    if (isRepeating) {
      //items.splice(i++, 1).fill(getRandomArrayElement(itemConsts), i++, i++);
      console.log(`${items[i]} is repeating`);
    }
  }
  console.log(`${itemsCount}`);
  console.log(items);
  return items;
};

export const randomBooleanValue = () => {
  const value = Boolean(getRandomInteger(0, 1));
  return value;
};
