function getQuote() {
  let quote = document.querySelector('#info wrapper.grid widget[widgetid="quote"] .items .widget-text[type="normal"]:nth-of-type(1)')
  let name = document.querySelector('#info wrapper.grid widget[widgetid="quote"] .items .widget-text[type="small"]:nth-of-type(2)')

  var quotelist = [{
    "quotes": 'You only live once, but if you do it right, once is enough.' ,
    "name": "--Mae West"
  },{
    "quotes": 'Be the change that you wish to see in the world.' ,
    "name": "--Mahatma Gandhi"
  },{
    "quotes": 'In three words I can sum up everything I\'ve learned about life: it goes on.' ,
    "name": "--Robert Frost"
  },{
    "quotes": 'Always forgive your enemies; nothing annoys them so much.' ,
    "name": "--Oscar Wilde"
  },{
    "quotes": 'Live as if you were to die tomorrow. Learn as if you were to live forever.' ,
    "name": "--Mahatma Gandhi"
  },{
    "quotes": 'Without music, life would be a mistake.' ,
    "name": "--Friedrich Nietzsche"
  },{
    "quotes": 'Twenty years from now you will be more disappointed by the things that you didn\'t do than the things that you did' ,
    "name": "--H. Jackson Brown Jr"
  },{
    "quotes": 'I have not failed. I\'ve just found 10,000 ways that won\'t work.' ,
    "name": "--Thomas A. Edison"
  },{
    "quotes": 'It is not a lack of love, but a lack of friendship that makes unhappy marriages.' ,
    "name": "--Friedrich Nietzsche"
  },{
    "quotes": 'A day without sunshine is like, you know, night.' ,
    "name": "--Steve Martin"
  },{
    "quotes": 'The good you do today will be forgotten tomorrow. Do good anyway.',
    "name": "--Kent M. Keith"
  },{
    "quotes": 'There is no greater agony than bearing an untold story inside you.',
    "name": "--Maya Angelou"
  },{
    "quotes": 'If you only read the books that everyone else is reading, you can only think what everyone else is thinking.',
    "name": "--Haruki Murakami"
  },{
    "quotes": 'A room without books is like a body without a soul.',
    "name": '--Marcus Tulius Cicero',
  }]
  var quoteObject = quotelist.map(function(item) {
    return {
      quotes: item.quotes,
      name: item.name
    };
  });
  randomquote = quoteObject[Math.floor(Math.random() * quoteObject.length)]

  quote.innerHTML = randomquote.quotes;
  name.innerHTML = randomquote.name;
}

getQuote();