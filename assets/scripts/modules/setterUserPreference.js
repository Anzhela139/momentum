import { getElem, sanitazeInput } from "./utils.js";

/** инициализирует проставление предпочтений пользователя */
class SetterUserPreference {
    /**
     * @param {HTMLDivElement} userPreferenceEl - элемент предпочтения в DOM
     * @param {String} userPreferenceKey - название вида предпочтений
     */
    constructor(userPreferenceEl, userPreferenceKey) {
        this.userPreferenceEl = userPreferenceEl;
        this.userPreferenceKey = userPreferenceKey;
    }
    
    /**
     * @description - инициализирует проставление предпочтений пользователя
     */
    init() {
        getElem(this.userPreferenceKey, this.userPreferenceEl);
        this.userPreferenceEl.addEventListener('click', this.handleClick.bind(this));
        this.userPreferenceEl.addEventListener('keypress', this.setUserPreference.bind(this));
        this.userPreferenceEl.addEventListener('blur', this.setUserPreference.bind(this));
    }

    /**
     * @description - хандлер клика по элементу в DOM
     */
    handleClick() {
        this.userPreferenceEl.innerText = '    ';
        this.userPreferenceEl.focus();
    }

    /**
     * @description - хандлер проставление предпочтений пользователя
     */
    setUserPreference(e) {
        if (e && e.type === 'keypress') {
            if (e.which == 13 || e.keyCode == 13) {
                const userText = sanitazeInput(e.target.innerText);
                
                if (userText === '') {
                    e.target.innerText = localStorage.getItem(this.userPreferenceKey);
                    this.userPreferenceEl.innerText = localStorage.getItem(this.userPreferenceKey);
                } else {
                    localStorage.setItem(this.userPreferenceKey, userText || `Enter ${this.userPreferenceKey}`);
                }
    
                this.userPreferenceEl.blur();
            }
        }
    }
}

export default SetterUserPreference;