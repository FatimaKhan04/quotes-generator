const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newquoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');

let apiQuotes=[];
// show loading
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
// hide loading
function complete(){
    loader.hidden=true;
    quoteContainer.hidden=false;
}
// show new quote
function newQuote(){
    loading();
    // pick a random quote from apiquotes array
    const quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    // cehck if quotes lentgh is too long to apply diff css class
    if(quote.text.length>50){
        quoteText.classList.add['long-quote']
    }
    else{
        quoteText.classList.remove['long-quote']
    }
    
    if(!quote.author){
        authorText.textContent='Unknown';
    }
    else{
        authorText.textContent=quote.author; 
    }
    quoteText.textContent=quote.text;
    complete();
}
// Get quotes from API
async function getQuotes(){
    loading();
    const apiURL='https://type.fit/api/quotes';
    try{
        const response=await fetch(apiURL);
        apiQuotes=await response.json();
        //console.log(apiQuotes[12]);
        newQuote();
    }catch(error){
        // handle error here
    }

}
// Post quote to twitter
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterURL,'_blank');
}

//Event listeners
twitterBtn.addEventListener('click',tweetQuote);
newquoteBtn.addEventListener('click',newQuote);

// on load
getQuotes();