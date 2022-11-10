import SyncPromise  from './SyncPromise';

describe('SyncPromise realisation', () => {
    it("Constructor", function () {
        const testValue = 123;

        const syncPromiseResolved = new SyncPromise((resolve => resolve(testValue)));
        syncPromiseResolved
            .then((data) => {
                expect(data === testValue)
            });

        const syncPromiseRejected = new SyncPromise(((resolve, reject) => reject(testValue)));
        syncPromiseRejected.catch((err) => {
               expect(err === testValue);
            })
    });
    it("Static resolve/reject", function () {
        const testValue = 123;

        const syncPromiseResolved = SyncPromise.resolve(testValue);
        syncPromiseResolved
            .then((data) => {
                expect(data === testValue);
            });

        const syncPromiseRejected = SyncPromise.reject(testValue);
        syncPromiseRejected
            .catch((err) => {
                expect(err === testValue);
            })

        const syncPromiseResolvedOfResolved = SyncPromise.resolve(SyncPromise.resolve(SyncPromise.resolve(testValue)));
        syncPromiseResolvedOfResolved
            .then((data) => {
                expect(data === testValue);
            });

        const syncPromiseResolvedOfRejected = SyncPromise.resolve(SyncPromise.resolve(SyncPromise.reject(testValue)));
        syncPromiseResolvedOfRejected
            .then((data) => {
                expect(data === testValue);
            })

        const syncPromiseRejectedOfResolved = SyncPromise.reject(SyncPromise.resolve(SyncPromise.resolve(testValue)));
        syncPromiseRejectedOfResolved
            .catch((err) => {
                expect(err === testValue);
            })

        const syncPromiseRejectedOfRejected = SyncPromise.reject(SyncPromise.resolve(SyncPromise.reject(testValue)));
        syncPromiseRejectedOfRejected
            .catch((err) => {
                expect(err === testValue);
            })
    });

    it("finally", function () {
        const testValue = 123;

        const syncPromiseResolved = SyncPromise.resolve(testValue);
        syncPromiseResolved
            .then((data) => {
                expect(data === testValue);
            })
            .finally(() => 'test')
            .then((data) => {
                expect(data === 'test');
            });
    });

    it('All',  () => {

        const values = [1223, 45116];

        SyncPromise.all([SyncPromise.resolve(values[0]), SyncPromise.resolve(values[1]), values])
            .then((data) => {
                expect(data === values[0]);
            })
    });

    it('Race',  () => {
        const values = [1223, 45116];

        SyncPromise.race([SyncPromise.resolve(values[0]), SyncPromise.resolve(values[1]), values])
            .then((data) => {
                expect(data === values[0]);
            });
    });

    it('Any',  function() {

        const values = [123, 456];

        SyncPromise.any([SyncPromise.resolve(values[0]), SyncPromise.resolve(values[1]), values])
            .then((data) => {
                expect(data === values[0]);
            })

        SyncPromise.any([SyncPromise.reject(values[0])])
            .catch((err) => {
                expect(err === values[0]);
            })
    })
})