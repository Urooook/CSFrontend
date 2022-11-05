import {State} from "./state";

export const numberParser = () => {
    const i = gen();
    let expr = '';
    let state = State.INITIAL;
    i.next();
    function* gen() {
        let input = '';
        while(true) {
            for(const symbol of input) {
                switch (symbol) {
                    case '-': {
                        if(state !== State.INITIAL && state !== State.EXP){
                            throw new SyntaxError('Invalid data!');
                        }

                        if(state === State.INITIAL){
                            state = State.INITIAL_MINUS;
                        } else {
                            state = State.EXP_MINUS;
                        }

                        break;
                    }
                    case 'e': {
                        if(state !== State.INT_CHUNK && state !== State.DEC_CHUNK) {
                            throw new SyntaxError('Invalid data!');
                        }

                        state = State.EXP;
                        break;
                    }
                    case '.': {
                        if(state !== State.INT_CHUNK && state !== State.DEC_CHUNK) {
                            throw new SyntaxError('Invalid data!');
                        }

                        state = State.DOT;
                        break;
                    }
                    default: {
                        if(!/\d/.test(symbol)){
                            throw new SyntaxError('Invalid data!');
                        }

                        if(state === State.DOT){
                            state = State.DEC_CHUNK
                        } else if( state === State.EXP){
                            state = State.EXP_NUMBER;
                        } else {
                            state = State.INT_CHUNK;
                        }
                    }
                }
                expr += symbol;
            }
            input = yield expr;
        }
    }




    Object.defineProperty(i, 'return', {
        value() {
            return {value: parseFloat(expr), done: true};
        }
    })

    return i;
}

const parser = numberParser();
console.log(parser.next('-'));   // {value: '-', done: false}
console.log(parser.next('14'));  // {value: 14, done: false}
console.log(parser.next('14'));  // {value: 14, done: false}
console.log(parser.next('.'));   // {value: '.', done: false}
console.log(parser.next('53'));  // {value: 53, done: false}
console.log(parser.next('e-'));  // {value: 'e-', done: false}
console.log(parser.next('4')); // {value: 454, done: false}

console.log(parser.return());    // {value: -14.53e-454, done: true}