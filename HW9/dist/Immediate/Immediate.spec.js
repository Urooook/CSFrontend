"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immediate_1 = require("./immediate");
describe('immediate', () => {
    test('should set immediate and execute callback', (done) => {
        expect.assertions(1);
        (0, immediate_1.setImmediate)(() => {
            expect(true).toBeTruthy();
            done();
        });
    });
    test('should set immediate and clear immediate', (done) => {
        const immediate = (0, immediate_1.setImmediate)(() => {
            done(new Error('Should not execute'));
        });
        (0, immediate_1.clearImmediate)(immediate);
        done();
    });
    test('should set multiple immediate and execute them', (done) => {
        expect.assertions(2);
        (0, immediate_1.setImmediate)(() => {
            expect(true).toBeTruthy();
        });
        (0, immediate_1.setImmediate)(() => {
            expect(true).toBeTruthy();
            done();
        });
    });
    test('should set multiple immediate and clear only one', (done) => {
        expect.assertions(1);
        const immediate = (0, immediate_1.setImmediate)(() => {
            done(new Error('Should not execute'));
        });
        (0, immediate_1.setImmediate)(() => {
            expect(true).toBeTruthy();
            done();
        });
        (0, immediate_1.clearImmediate)(immediate);
    });
});
