import { getElem } from "./utils.js";

class Focus {
    constructor(focusEl) {
        this.focusEl = focusEl;
    }

    init() {
        getElem('focus', this.focusEl);
        this.focusEl.addEventListener('keypress', this.setFocus.bind(this));
        this.focusEl.addEventListener('blur', this.setFocus.bind(this));
    }

    setFocus(e) {
        if (e.type === 'keypress') {
    
            if (e.which == 13 || e.keyCode == 13) {
                if (e.target.innerText === '') {
                    e.target.innerText = localStorage.getItem('focus');
                    this.focusEl.innerText = localStorage.getItem('focus');
                }
                else {
                    localStorage.setItem('focus', e.target.innerText);
                }
    
                this.focusEl.blur();
            }
        }
    }
}

export default Focus;