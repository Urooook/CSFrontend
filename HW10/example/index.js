import on from '../dist/on'
import {take, filter, seq, onlyEvent, every, any, repeat} from '../dist/helpers'
import once from '../dist/once'

const box = document.getElementById('box');
const container = document.getElementById('container');
const shiftX = box.offsetWidth / 2;
const shiftY = box.offsetHeight / 2;

box.ondragstart = function() {
    return false;
};

const getCoords = (entry) => {
    console.log(entry)
}

(async () => {
    const dnd = repeat(() => filter(
        seq(
            once(box, 'pointerdown'),
            every(
                any(
                    on(document.body, 'pointermove'),
                    on(box, 'pointerup')
                ),
                onlyEvent('pointermove'),
            )
        ),
        onlyEvent('pointermove'),
    ));

    for await (const ev of dnd) {
        const top =10;
        const left =10;

        if (ev.pageX - shiftX > left && ev.pageX + shiftX < left + container.offsetWidth) {
            box.style.left = ev.pageX - left - shiftX + 'px';
        }
        if (ev.pageY - shiftY > top && ev.pageY + shiftY < top + container.offsetHeight) {
            box.style.top = ev.pageY - top - shiftY + 'px';
        }
    }
})();