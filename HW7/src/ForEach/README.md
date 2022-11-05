# Домашнее задание #7 - Автоматы и генераторы

### 1. Реализация функции forEach для обхода iterable-объекта любого размера без фризов

Реализованная функция принимает iterable-объект и callback-функцию, возвращает промис:

```ts
forEach<T, I extends Iterable<T>>(iterable: I, cb: (el: T, i: number, data: I) => void): Promise<void>
```
Работа функции основана не переборе элементов с временными задержками каждые 50мс.

Пример использования:

```js
const numbers = [...Array(5e5).keys()];
let total = 0;

forEach(array, (num) => {
  total++;
}).then(() => {
  console.log(total); // 5e5
});
```

