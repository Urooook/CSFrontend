import { numberParser } from "./NumberParser";

describe('Streaming number parser based on generator', () => {
    it('should be parsed', () => {
        const parser = numberParser()

        parser.next('-');
        parser.next('14');
        parser.next('.');
        parser.next('53');
        parser.next('e-');

        expect(parser.next('4')).toEqual({value: '-14.53e-4', done: false})

        expect(parser.return()).toEqual({value: -14.53e-4, done: true})
    })

    it('should throw error and set done true', () => {
        const parser = numberParser()

        parser.next('-');

        expect(() => parser.next('-4')).toThrow('Invalid data!');

        expect(parser.next('1')).toEqual({done: true, value: undefined})
    })

    it('should be parsed but should not be converted to number', () => {
        const parser = numberParser()

        parser.next('');

        expect(parser.return()).toEqual({done: true, value: NaN})
    })
})