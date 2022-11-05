import StringIterator from './iter';

describe('String iterator implementation', () => {
    const iter = new StringIterator();

    it('Iterator must iterate strings of regular chars', () => {
        const string = 'Foobar';

        // @ts-ignore
        expect([...iter.iterate(string)]).toEqual(['F', 'o', 'o', 'b', 'a', 'r']);
    });

    it('Iterator must iterate strings of surrogate pairs', () => {
        const string = '😁🧡🚀';

        // @ts-ignore
        expect([...iter.iterate(string)]).toEqual(['😁', '🧡', '🚀']);
    });

    it('Iterator must iterate mixed strings', () => {
        const string = 'F: 😁 R: 🚀';

        // @ts-ignore
        expect([...iter.iterate(string)]).toEqual(['F', ':', ' ', '😁', ' ', 'R', ':', ' ', '🚀']);
    });

    it('Iterator must ignore surrogates without the pair', () => {
        const stringOne = `F: ${'😁'[1]} R: 🚀`;
        const stringTwo = `F: 😁 R: ${'🚀'[0]}`;

        // @ts-ignore
        expect([...iter.iterate(stringOne)]).toEqual(['F', ':', ' ', ' ', 'R', ':', ' ', '🚀']);
        // @ts-ignore
        expect([...iter.iterate(stringTwo)]).toEqual(['F', ':', ' ', '😁', ' ', 'R', ':', ' ']);
    });

    it('Iterator must iterate strings with combining characters', () => {
        // Character 'й' is a character 'и' with breve added
        const string = 'йог';

        expect(string.length).toBe(4);
        // @ts-ignore
        expect([...iter.iterate(string)]).toEqual(['й', 'о', 'г']);
    });
});