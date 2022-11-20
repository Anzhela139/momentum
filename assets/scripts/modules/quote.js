import { wrapFetchCall } from "./utils.js";

/** инициализирует проставление цитаты */
class Quote {
    /**
     * @param {HTMLBlockquoteElement} quoteEl - элемент DOM для цитаты
     * @param {HTMLFigcaptionElement} quoteCaption - элемент DOM для имени автора цитаты
     * @param {HTMLButtonElement} btnQuote - кнопка для обновления цитаты
     */
    constructor( quoteEl, quoteCaption, btnQuote ) {
        this.quoteEl = quoteEl;
        this.quoteCaption = quoteCaption;
        this.btnQuote = btnQuote;
    }

    /**
     * @description - инициализирует проставление цитаты
     */
    init() {
        this.getQuote();
        this.btnQuote.addEventListener('click', this.getQuote.bind(this));
    }

    /**
     * @description - получает и проставляет цитату из апи
     */
    async getQuote() {
        const url = `https://api.quotable.io/random?tags=technology,famous-quotes`;
        wrapFetchCall(url, './assets/scripts/spareApis/quotesApi.json')
            .then(async (res) => {
                if (res) {
                    const quote = await res;

                    this.quoteEl.textContent = quote?.content;
                    this.quoteCaption.textContent = quote?.author;
                }
            })
            .catch((err) => {
                console.log(err);
            })

    }
}

export default Quote;