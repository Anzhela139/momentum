class Quote {
    constructor( quoteEl, quoteCaption ) {
        this.quoteEl = quoteEl;
        this.quoteCaption = quoteCaption;
    }

    async getQuote() {
        const url = `https://api.quotable.io/random?tags=technology,famous-quotes`;
        fetch(url, {
            method: "GET",
        })
            .then(async (res) => {
                if (res) {
                    const quote = await res.json();
                    console.log(quote)
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