# Домашнее задание #9 - Асинхронное программирование. Функции обратного вызова. Монадические контейнеры для асинхронного программирования.
## Функцию sleep
Функция, которая принимает заданное количество миллисекунд в качестве задержки и возвращает Promise.

Пример использования:
   ```js
   sleep(100).then(() => {
     console.log(`I'am awake!`);
   });
   ```
   
## Функция timeout
Функция принимает Promise и заданное количество миллисекунд как время максимальной работы. Возвращает Promise. 
```ts
timeout(func: Promise<void> | Promise<Response>, delay: number)
```

Пример использования:

   ```js
   // Через 200 мс Promise будет зареджекчен
   timeout(fetch('//my-data'), 200).then(console.log).catch(console.error);
   ```

3. Необходимо написать функцию setImmediate/clearImmediate по аналогии с node.js.

4. Необходимо написать функцию promisify, которая бы принимала функцию, где последний аргумент thunk-callback и возвращала бы
   новую функцию. Новая функция вместо thunk-callback будет возвращать Promise.

   ```js
   function readFile(file, cb) {
     cb(null, 'fileContent');
   }
   
   const readFilePromise = promisify(readFile);
   readFilePromise('my-file.txt').then(console.log).catch(console.error);
   ```

5. Необходимо написать класс SyncPromise, аналогичный нативному, но работающий синхронно, если это возможно.

   ```js
   SyncPromise.resolve(1).then(console.log); // 1
   console.log(2);                           // 2
   ```

6. Реализовать все статические методы Promise в SyncPromise *

7. Необходимо написать функцию allLimit, которая бы принимала Iterable функций, возвращающих Promise (или обычные значения) и лимит одновременных Promise.
   Одновременно не должно быть более заданного числа Promise в Pending.

   ```js
   allLimit([f1, f2, f3, f4, f5, f6], 2).then(console.log).catch(console.error);
