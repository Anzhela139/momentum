class Quote {
    constructor( quoteEl, quoteCaption ) {
        this.quoteEl = quoteEl;
        this.quoteCaption = quoteCaption;
    }

    init() {
        this.getQuote();
        this.quoteCaption.addEventListener('click', this.getQuote.bind(this));
    }

    async getQuote() {
        const url = `https://api.quotable.io/random?tags=technology,famous-quotes`;
        fetch(url, {
            method: "GET",
        })
            .then(async (res) => {
                if (res) {
                    const quote = await res.json();

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