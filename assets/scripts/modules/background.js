import { randomArr } from "./utils.js";

/** инициализирует подходящую фоновую картинку */
class Background {
    /**
       * @typedef {Object} BaseArr
       * @property {String} period - название времени суток
       * @property {String} greeting - приветствие пользователя согласно времени суток
       * @property {Number} indexTime - период времени суток
       * @property {Array<Number>} order - порядок подбора массива картинок согласно времени суток
       */
    /**
     * @description - статические данные для выбора и отображения подходящей фоновой картинки
     */
    baseArr = [
        {
            period: 'morning',
            greeting: 'Good Morning, ',
            indexTime: 0,
            order: [0, 1, 2, 3]
        }, {
            period: 'afternoon',
            greeting: 'Good Afternoon, ',
            indexTime: 1,
            order: [1, 2, 3, 0]
        }, {
            period: 'evening',
            greeting: 'Good Evening, ',
            indexTime: 2,
            order: [2, 3, 0, 1]
        }, {
            period: 'night',
            greeting: 'Good Night, ',
            indexTime: 3,
            order: [3, 0, 1, 2]
        }];

    /**
     * @description - массив с названиями фоновых картинок
     */
    images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
    
    /**
     * @param {HTMLDivElement} greetingEl - элемент DOM для проставления приветствия
     * @param {HTMLButtonElement} btnImage - элемент DOM кнопка для смены фоновой картинки
     */
    constructor(greetingEl, btnImage) {
        this.greetingEl = greetingEl;
        this.btnImage = btnImage;
        this.indexTime = 0;
        this.today = new Date();
        this.base = {};
        this.imageIndex = 0

        this.init();
    }
    
    /**
     * @description - инициализирует подходящую фоновую картинку
     */
    init() {
        this.setBgGreet();
        this.setBgImage();
        this.btnImage.addEventListener('click', this.setBgImage.bind(this));
    }
    /**
     * @description - возвращает массив urls рандомных фоновых картинок,  рассортированный по времени суток
     * @param {Array<Number>} nums - пордок сортировки
     * @return {Array<String>} - массив urls рандомных фоновых картинок,  рассортированный по времени суток
     */
    getBGRandomArray = (nums) => {
        const getPeriodImgArray = (index, arr) => randomArr(arr).splice(13).map(item => `${index}/${item}`);

        return [].concat(
            getPeriodImgArray(this.baseArr[nums[0]].period, this.images),
            getPeriodImgArray(this.baseArr[nums[1]].period, this.images),
            getPeriodImgArray(this.baseArr[nums[2]].period, this.images),
            getPeriodImgArray(this.baseArr[nums[3]].period, this.images)
        );
    }

    /**
     * @description - определяет время суток и проставляет приветствие пользователю 
     */
    setBgGreet() {
        let hour = this.today.getHours();

        if (hour >= 6 && hour < 12) {
            this.base = this.baseArr[0];
        } else if (hour >= 12 && hour < 18) {
            this.base = this.baseArr[1];
        } else if (hour >= 18 && hour <= 23) {
            this.base = this.baseArr[2];
        } else {
            this.base = this.baseArr[3];
        }

        this.greetingEl.textContent = this.base.greeting;
        this.indexTime = this.base.indexTime;
    }

    /**
     * @description - проставляет подходящую фоновую картинку
     * @param {String} src - url подходящей фоновой картинки
     */
    viewBgImage(src) {
        const body = document.querySelector('body');
        body.style.backgroundImage = `url(assets/images/${src}), url(assets/images/overlay.png)`;
    }

    /**
     * @description - проставляет часы и минуты
     * @param {Function} func - этот же метод
     */
    checkHour(func) {
        let min = this.today.getMinutes();

        if (min !== 0) {
            let timeout = (60 - min) * 60000;
            setTimeout(() => func(), timeout);
        } else {
            func();
        }
    }

    /**
     * @description - определяет подходящую фоновую картинку
     */
    setBgImage() {
        let basedImages = this.getBGRandomArray(this.base.order);
        const index = this.imageIndex % basedImages.length;
        const imageSrc = `${basedImages[index]}`;

        this.viewBgImage(imageSrc);
        this.imageIndex++;

        this.btnImage.disabled = true;
        setTimeout(() => { this.btnImage.disabled = false }, 1000);
    }
}

export default Background;