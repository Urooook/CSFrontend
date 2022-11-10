"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SyncPromise_1 = require("./SyncPromise");
describe('SyncPromise realisation', () => {
    it("Constructor", function () {
        const testValue = 123;
        const syncPromiseResolved = new SyncPromise_1.default((resolve => resolve(testValue)));
        syncPromiseResolved
            .then((data) => {
            expect(data === testValue);
        });
        const syncPromiseRejected = new SyncPromise_1.default(((resolve, reject) => reject(testValue)));
        syncPromiseRejected.catch((err) => {
            expect(err === testValue);
        });
    });
    it("Static resolve/reject", function () {
        const testValue = 123;
        const syncPromiseResolved = SyncPromise_1.default.resolve(testValue);
        syncPromiseResolved
            .then((data) => {
            expect(data === testValue);
        });
        const syncPromiseRejected = SyncPromise_1.default.reject(testValue);
        syncPromiseRejected
            .catch((err) => {
            expect(err === testValue);
        });
        const syncPromiseResolvedOfResolved = SyncPromise_1.default.resolve(SyncPromise_1.default.resolve(SyncPromise_1.default.resolve(testValue)));
        syncPromiseResolvedOfResolved
            .then((data) => {
            expect(data === testValue);
        });
        const syncPromiseResolvedOfRejected = SyncPromise_1.default.resolve(SyncPromise_1.default.resolve(SyncPromise_1.default.reject(testValue)));
        syncPromiseResolvedOfRejected
            .then((data) => {
            expect(data === testValue);
        });
        const syncPromiseRejectedOfResolved = SyncPromise_1.default.reject(SyncPromise_1.default.resolve(SyncPromise_1.default.resolve(testValue)));
        syncPromiseRejectedOfResolved
            .catch((err) => {
            expect(err === testValue);
        });
        const syncPromiseRejectedOfRejected = SyncPromise_1.default.reject(SyncPromise_1.default.resolve(SyncPromise_1.default.reject(testValue)));
        syncPromiseRejectedOfRejected
            .catch((err) => {
            expect(err === testValue);
        });
    });
    it("finally", function () {
        const testValue = 123;
        const syncPromiseResolved = SyncPromise_1.default.resolve(testValue);
        syncPromiseResolved
            .then((data) => {
            expect(data === testValue);
        })
            .finally(() => 'test')
            .then((data) => {
            expect(data === 'test');
        });
    });
    it('All', () => {
        const values = [1223, 45116];
        SyncPromise_1.default.all([SyncPromise_1.default.resolve(values[0]), SyncPromise_1.default.resolve(values[1]), values])
            .then((data) => {
            expect(data === values[0]);
        });
    });
    it('Race', () => {
        const values = [1223, 45116];
        SyncPromise_1.default.race([SyncPromise_1.default.resolve(values[0]), SyncPromise_1.default.resolve(values[1]), values])
            .then((data) => {
            expect(data === values[0]);
        });
    });
    it('Any', function () {
        const values = [123, 456];
        SyncPromise_1.default.any([SyncPromise_1.default.resolve(values[0]), SyncPromise_1.default.resolve(values[1]), values])
            .then((data) => {
            expect(data === values[0]);
        });
        SyncPromise_1.default.any([SyncPromise_1.default.reject(values[0])])
            .catch((err) => {
            expect(err === values[0]);
        });
    });
});
