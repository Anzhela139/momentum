import { getElem } from "./utils.js";


class SetterUserPreference {
    constructor(userPreferenceEl, userPreferenceKey) {
        this.userPreferenceEl = userPreferenceEl;
        this.userPreferenceKey = userPreferenceKey;
    }

    init() {
        console.log(this.userPreferenceKey)
        getElem(this.userPreferenceKey, this.userPreferenceEl);
        this.userPreferenceEl.addEventListener('click', this.handleClick.bind(this));
        this.userPreferenceEl.addEventListener('keypress', this.setUserPreference.bind(this));
        this.userPreferenceEl.addEventListener('blur', this.setUserPreference.bind(this));
    }

    handleClick() {
        this.userPreferenceEl.innerText = '    ';
        this.userPreferenceEl.focus();
    }

    setUserPreference(e) {
        if (e && e.type === 'keypress') {
            if (e.which == 13 || e.keyCode == 13) {
                
                if (e.target.innerText === '') {
                    e.target.innerText = localStorage.getItem(this.userPreferenceKey);
                    this.userPreferenceEl.innerText = localStorage.getItem(this.userPreferenceKey);
                } else {
                    localStorage.setItem(this.userPreferenceKey, e.target.innerText || `Enter ${this.userPreferenceKey}`);
                }
    
                this.userPreferenceEl.blur();
            }
        }
    }
}

export default SetterUserPreference;