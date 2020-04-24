var quoteArray = [
    {
    	quote: "Smokey, my friend, you are entering a world of pain.",
    	name:"Uncle Walter",
    	image:"../img/walter.jpg"
    },
    {
    	quote:"Three thousand years of beautiful tradition, from Moses to Sandy Koufax...",
    	name:"Uncle Walter",
    	image:"../img/walter.jpg"
    },
    // {
    // 	quote:"The chinaman is not the issue here, Dude. Also, Dude, chinaman is not the preferred nomenclature. Asian-American, please.",
    // 	name:"Uncle Walter",
    // 	image:"../img/walter.jpg"
    // },
    {
    	quote:"Hey, careful, man, there's a beverage here!",
    	name:"Uncle Jeffrey",
    	image:"../img/dude.jpg"
    },
    {
    	quote:"Yeah, well, you know, that’s just, like, your opinion, man.",
    	name:"Uncle Jeffrey",
    	image:"../img/dude.jpg"
    },
    {
    	quote:"Nobody f#&*s with the Jesus.",
    	name:"Uncle Jesus",
    	image:"../img/jesus.jpg"
    },
    {
    	quote:"Walter, I love you, but sooner or later, you're going to have to face the fact you're a goddamn moron.",
    	name:"Uncle Jeffrey",
    	image:"../img/dude.jpg"
    },
    {
    	quote:"That rug really tied the room together.",
    	name:"Uncle Walter",
    	image:"../img/walter.jpg"
    },
    {
    	quote:"F&%$ it, Dude, let's go bowling.",
    	name:"Uncle Walter",
    	image:"../img/walter.jpg"
    },
    {
    	quote:"I bowl. Drive around. The occasional acid flashback.",
    	name:"Uncle Jeffrey",
    	image:"../img/dude.jpg"
    },
    {
    	quote:"So you have no frame of reference here, Donny. You're like a child who wanders into the middle of a movie and wants to know...",
    	name:"Uncle Walter",
    	image:"../img/walter.jpg"
    },
    {
    	quote:"In your wisdom, Lord, you took him, as you took so many bright flowering young men at Khe Sanh, at Langdok, at Hill 364.",
    	name:"Uncle Walter",
    	image:"../img/walter.jpg"
    },
    {
    	quote:"You want a toe? I can get you a toe, believe me. There are ways, Dude. You don't wanna know about it, believe me. Hell, I can get you a toe by 3 o'clock this afternoon... with nail polish. These f#&(*#&) amateurs...",
    	name:"Uncle Walter",
    	image:"../img/walter.jpg"
    },
    {
    	quote:"Lady, I got buddies who died face down in the muck so that you and I could enjoy this family restaurant!",
    	name:"Uncle Walter",
    	image:"../img/walter.jpg"
    },
    {
    	quote:"Calmer than you are.",
    	name:"Uncle Walter",
    	image:"../img/walter.jpg"
    },
    {
    	quote:"Smokey, this is not 'Nam. This is bowling. There are rules.",
    	name:"Uncle Walter",
    	image:"../img/walter.jpg"
    },
    {
    	quote:"I hate the f#$%&*' Eagles man.",
    	name:"Uncle Jeffrey",
    	image:"../img/dude.jpg"
    },
    {
    	quote:"Mmy wife, Bunny? Do you see a wedding ring on my finger? Does this place look like I'm f&(#)@ married? The toilet seat's up, man!",
    	name:"Uncle Jeffrey",
    	image:"../img/dude.jpg"
    },
    {
    	quote:"Look at our current situation with that camel fucker over in Iraq. Pacifism is not something to hide behind.",
    	name:"Uncle Walter",
    	image:"../img/walter.jpg"
    },
    {
    	quote:"Phone's ringin', dude.",
    	name:"Uncle Donnie",
    	image:"../img/donny.jpg"
    },
    {
    	quote:"I am the walrus.",
    	name:"Uncle Donnie",
    	image:"../img/donny.jpg"
    },
    {
    	quote:"Whereas what we have here? A bunch of fig-eaters wearing towels on their heads, trying to find reverse in a Soviet tank. This is not a worthy adversary.",
    	name:"Uncle Walter",
    	image:"../img/walter.jpg"
    },
    {
    	quote:"You said it, man. Nobody fucks with the Jesus.",
    	name:"Uncle Jesus",
    	image:"../img/jesus.jpg"
    },
    {
    	quote:"Hey, nice marmot.",
    	name:"Uncle Jeffrey",
    	image:"../img/dude.jpg"
    },
];

//grab html elements
var quote = document.getElementById('quote'),
    author = document.getElementById('quote-author'),
    img = document.getElementById('quoteI'),
    random;

//Generate a Random Quote
window.onload = randomQuote;


//random quote function
function randomQuote (){
    //get a random number to pick a random quote object
    random = Math.floor(Math.random() * quoteArray.length);
    //get that random quote's content
    quote.innerHTML = quoteArray[random].quote;
    //get that random quote's author
    author.innerHTML = quoteArray[random].name + ' says:';
    img.src = quoteArray[random].image;
}
