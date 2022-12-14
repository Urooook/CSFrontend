import StringIterator from './iter';

describe('String iterator implementation', () => {
    const iter = new StringIterator();

    it('Iterator must iterate strings of regular chars', () => {
        const string = 'Foobar';

        // @ts-ignore
        expect([...iter.iterate(string)]).toEqual(['F', 'o', 'o', 'b', 'a', 'r']);
    });

    it('Iterator must iterate strings of surrogate pairs', () => {
        const string = 'ππ§‘π';

        // @ts-ignore
        expect([...iter.iterate(string)]).toEqual(['π', 'π§‘', 'π']);
    });

    it('Iterator must iterate mixed strings', () => {
        const string = 'F: π R: π';

        // @ts-ignore
        expect([...iter.iterate(string)]).toEqual(['F', ':', ' ', 'π', ' ', 'R', ':', ' ', 'π']);
    });

    it('Iterator must ignore surrogates without the pair', () => {
        const stringOne = `F: ${'π'[1]} R: π`;
        const stringTwo = `F: π R: ${'π'[0]}`;

        // @ts-ignore
        expect([...iter.iterate(stringOne)]).toEqual(['F', ':', ' ', ' ', 'R', ':', ' ', 'π']);
        // @ts-ignore
        expect([...iter.iterate(stringTwo)]).toEqual(['F', ':', ' ', 'π', ' ', 'R', ':', ' ']);
    });

    it('Iterator must iterate strings with combining characters', () => {
        // Character 'ΠΉ' is a character 'ΠΈ' with breve added
        const string = 'ΠΈΜΠΎΠ³';

        expect(string.length).toBe(4);
        // @ts-ignore
        expect([...iter.iterate(string)]).toEqual(['ΠΉ', 'ΠΎ', 'Π³']);
    });
});