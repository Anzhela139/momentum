/**
 * @description - добавляет 0 к строке, используется в отображении времени
 */
const addZeros = (n) => { return (parseInt(n, 10) < 10 ? '0' : '') + n }

/**
 * @description - рандомно перемешивает предоставленный массив
 */
const randomArr = (arr) => arr.slice(0).sort((a, b) => 0.5 - Math.random());

/**
 * @description - возвращает данные либо из localStorage, либо из предоставленного DOM элемента
 */
function getElem(elem, dom) {
    if (localStorage.getItem(`${elem}`) === null) {
        dom.textContent = `[Enter ${elem}]`;
    } else {
        dom.textContent = localStorage.getItem(`${elem}`);
    }
}

/**
 * @description - очищает текст введенный пользователем от тегов и прочего
 */
function sanitazeInput(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').trim();
}

async function wrapFetchCall( url, spareUrl = '' ) {
    try {
        let controller = new AbortController()
        setTimeout(() => controller.abort(), 3000); 
        let resp = await fetch(url, {signal: controller.signal});

        if (!resp && spareUrl || resp.status != 200 && spareUrl) {
            resp = await fetch(spareUrl);
        } else if (!resp && !spareUrl || resp.status != 200 && !spareUrl) {
            throw new Error(`HTTP error! status: ${resp.status}`);
        }

        return await resp.json();
    } catch (e) {
        console.log(e);

        if(spareUrl) {
            let resp = await fetch(spareUrl);  
            return await resp.json();
        }
    }
}

export { addZeros, randomArr, getElem, sanitazeInput, wrapFetchCall };