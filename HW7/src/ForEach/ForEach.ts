export const forEach = <T, I extends Iterable<T>>(iterable: I, cb: (el: T, i: number, data: I) => void): Promise<void> => {

    return new Promise((resolve, reject) => {
        let time = Date.now();

        const MAX = 50;
        const DELAY = 50;


        function* iter() {
           let i = 0;

           for(const el of iterable){
              try {
                  cb(el, i++, iterable);
              } catch(err) {
                  reject(err);
                  return;
              }

              if(Date.now() - time > MAX) {
                  setTimeout(() => {
                      time = Date.now();
                      worker.next();
                  }, DELAY);

                  yield;
              }
           }
           resolve();
       }

       const worker = iter();
       worker.next();
    });
}
