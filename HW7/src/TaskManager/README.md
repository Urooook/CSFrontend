# Домашнее задание #7 - Автоматы и генераторы

### 3. Доработка функции forEach - Новый класс TaskManager, который включает обработки задач по заданному приоритету

Реализация представлена классом TaskManager. При создании экземпляра класса можно передать в конструктор необязательный аргументы max и delay, задающие значения времени, выделяемого на обработку пула задач и задержку (по умолчанию 100мс):
```ts
new TaskProcessor(50, 60);
```

Для обхода iterable-объектов класс предоставляет метод forEach, принимающий iterable-объект, callback-функцию и опциональный объект настроек, задающий приоритет задачи (по умолчанию задача имеет приоритет average). Метод возвращает промис:

```ts
  forEach<T>(
    iterable: Iterable<T>,
    cb: (el: T, i: number, data: I) => void,
    options: ForEachOptions = { priority: 'average' },
  ): Promise<void>
```
При передаче в функцию forEach неперебираемого объекта или при отсутствии callback-функции возбуждаются исключения типа TypeError.

Обработка задач осуществляется согласно их значениям приоритета, доступные варианты:

- low
- average (по умолчанию)
- high
- critical

Исходя из приоритета определяется и порядок выполнения задач, и время, выделяемое на каждую задачу в рамках одного цикла.
Для определения очередности выполнения используется упрощённая реализация очереди с приоритетом на базе массива (класс PriorityQueue). Кратность выделяемого времени для каждого типа задачи выбрана следующая:

- low = 0.5
- average = 1
- high = 2
- critical = 4

Примеры использования:

```js
const taskManager = new TaskManager();

const nums = [...Array(5e5).keys()];
const nums1 = [...Array(5e5).keys()];
const nums2 = [...Array(5e5).keys()];
const nums3 = [...Array(5e5).keys()];
const nums4 = [...Array(5e5).keys()];
let total = 0;

taskManager
  .forEach(nums, () => {
    total++;
  })
  .then(() => {
    console.log(total); // 5e5
  });

taskManager
  .forEach(nums1, () => {
    total++;
  })
  .then(() => {
    console.log(total++;);
  })

taskManager
  .forEach(
    nums2,
    () => {
     total++;
    },
    { priority: 'low' },
  )
  .then(() => {
    console.log(total);
  });

taskManager
  .forEach(
    nums3,
     () => {
     total++;
    },
    { priority: 'high' },
  )
  .then(() => {
    console.log(total);
    console.log('Finished!');
  });

taskManager
  .forEach(
    nums4,
     () => {
     total++;
    },
    { priority: 'critical' },
  )
  .then(() => {
     console.log(total);
    console.log('Finished!');
  });
```
