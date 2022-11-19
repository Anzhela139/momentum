const addZeros = (n) => { return (parseInt(n, 10) < 10 ? '0' : '') + n }

const randomArr = (arr) => arr.slice(0).sort((a, b) => 0.5 - Math.random());

function getElem(elem, dom) {
    if (localStorage.getItem(`${elem}`) === null) {
        dom.textContent = `[Enter ${elem}]`;
    } else {
        dom.textContent = localStorage.getItem(`${elem}`);
    }
}

export { addZeros, randomArr, getElem };