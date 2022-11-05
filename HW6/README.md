# Домашнее задание #5 - Итераторы и паттерны их применения

### 1. Реализация итератора для генерации случайных чисел

Функция random, аргументы функции задают диапазон случайного числа:

```ts
random(min: number, max: number): IterableIterator<number>
```

### 2. Функция take - первым аргументом принимает любой iterable и возвращает итератор по заданному количеству его элементов(2 аргумент)

```ts
take<T>(iterable: Iterable<T>, count: number): IterableIterator<T>
```

Пример использования:

```js
const numbers = [3,3,2,1];
console.log([...take(numbers, 3)]); // [3,3,2]
```

### 3. Функция filter - принимает любой iterable и функцию-callback, возвращает итератор по элементам, удовлетворяющим callback функции

```ts
filter<T>(iterable: Iterable<T>, cb: (value: T) => boolean): IterableIterator<T>
```

Пример использования:

```js
const numbers = [1, 2, 3, 4, 5, 6, 7];
console.log([...filter(numbers, (num) => num < 4)]); // [1, 2, 3]
```

### 4. Функция enumerate - принимает любой iterable и возвращает итератор по парам "номер итерации - элемент"

```ts
enumerate<T>(iterable: Iterable<T> | IterableIterator<T>): IterableIterator<[number, T]>
```

Пример использования:

```js
const string = 'Foo';
console.log([...enumerate(string)]); // [[0, 'F'], [1, 'o'], [2, 'o']]
```

### 6. Функция seq - принимает множество iterable, возвращает итератор по их элементам

```ts
seq(
    ...iterables: (Iterable<unknown> | IterableIterator<unknown>)[]
): IterableIterator<unknown> 
```

Пример использования:

```js
const numbers = [1, 2, 3];
const string = 'Foo';
console.log([...seq(numbers, string)]); // [1, 2, 3, 'F', 'o', 'o']
```

### 7. Функция zip - принимает множество iterable, возвращает итератор по кортежам их элементов

```ts
zip(
    ...iterables: (Iterable<unknown> | IterableIterator<unknown>)[]
): IterableIterator<unknown[]>
```
Пример использования:
```js
const numbers = [1, 2, 3];
const string = 'Foo';
console.log([...zip(numbers, string)]); // [[1, 'F'], [2, 'o'], [3, 'o']]
```

### 8. Функция mapSeq - принимает iterable с данными и iterable с функциями, возвращает итератор по результатам последовательного применения функций к элементам данных

```ts
mapSeq<T>(
    iterable: Iterable<T> | IterableIterator<T>,
    cbIterable: Iterable<Function> | IterableIterator<Function>,
): IterableIterator<T> 
```

Пример использования:

```js
const numbers = [1, 2, 3];
const numberMappers = [(num: number) => num * 2, (num: number) => num + 1];
console.log([...mapSeq(numbers, numberMappers)]); // [3, 5, 7]
```
