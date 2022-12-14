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

## Функция setImmediate/clearImmediate по аналогии с node.js.
Функция setImmediateCustom принимает в качестве параметров функцию и аргументы функции
```js
const immediate = setImmediateCustom(func);
const immediate2 = setImmediateCustom(func, ...args);
```

## Функция promisify, 
 Функция, которая бы принимала функцию, где последний аргумент thunk-callback и возвращала бы  новую функцию. Новая функция вместо thunk-callback будет возвращать   Promise.
 thunk-callback - функция, которая первым бы параметром принимала ошибку(если есть), а вторам - параметры(если есть).

   ```js
   function readFile(file, cb) {
     cb(null, 'fileContent');
   }
   
   const readFilePromise = promisify(readFile);
   readFilePromise('file.txt').then(console.log).catch(console.error);
   ```

## Класс SyncPromise аналогичный нативному Promise, но работающий синхронно, если это возможно.
Конструктор принимает в себя функцию конструктор вида:
Есть такие методы как then, catch, finally
```ts
constructor(constr: (resolve: (value: T) => void, reject: (reason?: any) => void) => void)
```
В SyncPromise реализованы все статические методы, как и в нативном Promise, а именно:

- resolve/reject
```ts
   SyncPromise.resolve(123);
   SyncPromise.resolve(SyncPromise.resolve(SyncPromise.reject(123))).then((data) => {
               console.log(data); // 123
            })
    SyncPromise.reject(SyncPromise.resolve(SyncPromise.reject(testValue))).catch((err) => {
                console.log(data); // 123
            })
```
- All - возвращает промис вида SyncPromise, который выполнится тогда, когда будут выполнены все промисы, переданные в виде перечисляемого аргумента, или отклонен любой из переданных промисов.
- Race. Метод очень похож на SyncPromise.all, но ждёт только первый выполненный промис, из которого берёт результат (или ошибку).
- Any. Метод очень похож на Promise.race, но ждёт только первый успешно выполненный промис, из которого берёт результат.
- AllSettled. Метод SyncPromise.allSettled всегда ждёт завершения всех промисов. В массиве результатов будет
```js
{status:"fulfilled", value:результат} // для успешных завершений,
{status:"rejected", reason:ошибка} // для ошибок.
```

Пример использования:
   ```js
   SyncPromise.resolve(1).then(console.log); // 1
   console.log(2);                           // 2
   ```


## Функция allLimit.
Функция принимает Iterable функций, возвращающих Promise (или обычные значения) и лимит одновременных Promise.
Одновременно не может быть более заданного числа Promise в Pending.

   ```js
   allLimit([f1, f2, f3, f4, f5, f6], 2).then(console.log).catch(console.error);
   ```
