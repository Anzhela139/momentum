import { getElem } from "./utils.js";

class Name {
    constructor( nameEl ) {
        this.nameEl = nameEl;
    }

    init() {
        getElem('name', this.nameEl);
        this.nameEl.addEventListener('click', this.handleClick.bind(this));
        this.nameEl.addEventListener('keypress', this.setName.bind(this));
        this.nameEl.addEventListener('blur', this.setName.bind(this));
    }

    handleClick() {
        this.nameEl.innerText = '    ';
        this.nameEl.focus();
    }

    setName(e) {
        if (e && e.type === 'keypress') {
            if (e.which == 13 || e.keyCode == 13) {
                
                if (e.target.innerText === '') {
                    e.target.innerText = localStorage.getItem('name');
                    this.nameEl.innerText = localStorage.getItem('name');
                } else {
                    localStorage.setItem('name', e.target.innerText);
                }
    
                this.nameEl.blur();
            }
        }
    }
}

export default Name;