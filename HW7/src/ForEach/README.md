# Домашнее задание #7 - Автоматы и генераторы

### 1. Реализация функции forEach для обхода iterable-объекта любого размера без фризов

Реализованная функция принимает iterable-объект и callback-функцию, возвращает промис:

```ts
forEach<T, I extends Iterable<T>>(iterable: I, cb: (el: T, i: number, data: I) => void): Promise<void>
```
Работа функции основана не переборе элементов с временными задержками каждые 50мс.

При передаче функции forEach неперебираемого объекта или при отсутствии callback-функции возбуждаются исключения типа TypeError.

Пример использования:

```js
const numbers = [...Array(5e5).keys()];
let total = 0;

forEach(array, (num) => {
  total++;
}).then(() => {
  console.log(sumOfNums); // 5e5
  console.log('Finished!');
});
```

