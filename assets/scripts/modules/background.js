import { randomArr } from "./utils.js";

class Background {
    baseArr = ['morning', 'afternoon', 'evening', 'night'];
    images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];

    constructor(greetingEl, btnImage) {
        this.greetingEl = greetingEl;
        this.btnImage = btnImage;
        this.indexTime = 0;
        this.today = new Date();

        this.init();
    }

    init() {
        this.setBgGreet();
        this.setBgImage();
    }
    
    getBGRandomArray = ( num1, num2, num3, num4) => { 
        const getPeriodImgArray = (index, arr) => randomArr(arr).splice(13).map(item => `${index}/${item}`);

        return [].concat(
            getPeriodImgArray(this.baseArr[num1], this.images), 
            getPeriodImgArray(this.baseArr[num2], this.images), 
            getPeriodImgArray(this.baseArr[num3], this.images), 
            getPeriodImgArray(this.baseArr[num4], this.images)
        );
    };

    setBgGreet() {
        let hour = this.today.getHours(),
            base = '';

        if (hour >= 6 && hour < 12) {
            this.greetingEl.textContent = 'Good Morning, ';
            base = this.baseArr[0];
            this.indexTime = 0;
        } else if (hour >= 12 && hour < 18) {
            this.greetingEl.textContent = 'Good Afternoon, ';
            base = this.baseArr[1];
            this.indexTime = 1;
        } else if (hour >= 18 && hour <= 23) {
            this.greetingEl.textContent = 'Good Evening, ';
            base = this.baseArr[2];
            this.indexTime = 2;
        } else {
            this.greetingEl.textContent = 'Good Night, ';
            base = this.baseArr[3];
            this.indexTime = 3;
        }

        return base;
    }

    viewBgImage(src) {
        const body = document.querySelector('body');
        body.style.backgroundImage = `url(assets/images/${src}), url(assets/images/overlay.png)`;
    }

    checkHour(func) {
        let min = this.today.getMinutes();

        if (min !== 0) {
            let timeout = (60 - min) * 60000;
            setTimeout(() => func(), timeout);
        } else {
            func();
        }
    }

    setBgImage() {
        let basedImages = [];
        let i = 0;

        if (this.indexTime === 0) {
            basedImages = this.getBGRandomArray(0, 1, 2, 3);
        } else if (this.indexTime === 1) {
            basedImages = this.getBGRandomArray(1, 2, 3, 0);
        } else if (this.indexTime === 2) {
            basedImages = this.getBGRandomArray(2, 3, 0, 1);
        } else if (this.indexTime === 3) {
            basedImages = this.getBGRandomArray(3, 0, 1, 2);
        }

        const index = i % basedImages.length;
        const imageSrc = `${basedImages[index]}`;
        this.viewBgImage(imageSrc);
        i++;

        this.btnImage.disabled = true;
        setTimeout(() => { this.btnImage.disabled = false }, 1000);
    }
}

export default Background;