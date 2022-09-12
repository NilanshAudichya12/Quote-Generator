const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');




let apiQuotes = [];
// To show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// To show loading completed
function completed(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}
// Show new quotes
function newQuote() {
    loading();
    // Random quote selection
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // To check if author field is blank.
    if (!quote.author) {
        quote.author.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // To check if quote text length is long or not.
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    completed();
}
// Get quotes from api
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // error ui
    }
}

// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}    

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();