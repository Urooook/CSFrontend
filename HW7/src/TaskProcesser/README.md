# Домашнее задание #7 - Автоматы и генераторы

### 2. Доработка функции forEach - Переписываем функцию на класс и добавляем возможность обработки нескольких задач с распределением времени работы цикла между ними

Реализация представлена классом TaskProcessor. При создании экземпляра класса можно передать в конструктор необязательный аргументы max и delay, задающие значения времени, выделяемого на обработку пула задач и задержку (по умолчанию 100мс):

```ts
new TaskProcessor(50, 60);
```

Для обхода iterable-объектов класс предоставляет метод forEach, принимающий iterable-объект и callback-функцию. Метод возвращает промис:

```ts
  forEach<T, I extends Iterable<T>>(iterable: I,  cb: (el: T, i: number, data: I) => void): Promise<void> 
```
При передаче в функцию forEach неперебираемого объекта или при отсутствии callback-функции возбуждаются исключения типа TypeError.

Примеры использования:

```js
const taskProcessor = new TaskProcessor();

const nums = [...Array(3e5).keys()];
let total = 0;

taskProcessor
  .forEach(nums, () => {
    total++;
  })
  .then(() => {
    console.log(total); // 3e5
  });

const array = [...Array(4e5).keys()];

taskProcessor
  .forEach(array, () => {
      total++;
  })
  .then(() => {
    console.log('Finished!');
  });
```
