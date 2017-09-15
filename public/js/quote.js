	$(document).ready(function(){
		var quoteSource=[
		{
			quote: "Smokey, my friend, you are entering a world of pain.",
			name:"Uncle Walter"
	    },
	    {
	    	quote:"Three thousand years of beautiful tradition, from Moses to Sandy Koufax...",
	    	name:"Uncle Walter"
	    },
	    {
	    	quote:"The chinaman is not the issue here, Dude. Also, Dude, chinaman is not the preferred nomenclature. Asian-American, please.",
	    	name:"Uncle Walter"
	    },
	    {
	    	quote:"Hey, careful, man, there's a beverage here!",
	    	name:"Uncle Jeffrey"
	    },
	    {
	    	quote:"Nobody fucks with the Jesus.",
	    	name:"Uncle Jesus"
	    },
	    {
	    	quote:"Walter, I love you, but sooner or later, you're going to have to face the fact you're a goddamn moron.",
	    	name:"Uncle Jeffrey"
	    },
	    {
	    	quote:"Fuck it, Dude, let's go bowling.",
	    	name:"Uncle Walter"
	    },
	    {
	    	quote:"I bowl. Drive around. The occasional acid flashback.",
	    	name:"Uncle Jeffrey"
	    },
	    {
	    	quote:"So you have no frame of reference here, Donny. You're like a child who wanders into the middle of a movie and wants to know...",
	    	name:"Uncle Walter"
	    },
	    {
	    	quote:"In your wisdom, Lord, you took him, as you took so many bright flowering young men at Khe Sanh, at Langdok, at Hill 364.",
	    	name:"Uncle Walter"
	    },
	    {
	    	quote:"You want a toe? I can get you a toe, believe me. There are ways, Dude. You don't wanna know about it, believe me. Hell, I can get you a toe by 3 o'clock this afternoon... with nail polish. These fucking amateurs...",
	    	name:"Uncle Walter"
	    },
	    {
	    	quote:"Lady, I got buddies who died face down in the muck so that you and I could enjoy this family restaurant!",
	    	name:"Uncle Walter"
	    },
	    {
	    	quote:"Calmer than you are.",
	    	name:"Uncle Walter"
	    },
	    {
	    	quote:"Smokey, this is not 'Nam. This is bowling. There are rules.",
	    	name:"Uncle Walter"
	    },
	    {
	    	quote:"I hate the fuckin' Eagles man.",
	    	name:"Uncle Jeffrey"
	    },
	    {
	    	quote:"My... my wi-, my wife, Bunny? Do you see a wedding ring on my finger? Does this place look like I'm fucking married? The toilet seat's up, man!",
	    	name:"Uncle Jeffrey"
	    },
	    {
	    	quote:"Look at our current situation with that camel fucker over in Iraq. Pacifism is not something to hide behind.",
	    	name:"Uncle Walter"
	    },
	    {
	    	quote:"Phone's ringin', dude.",
	    	name:"Uncle Donnie"
	    },
	    {
	    	quote:"I am the walrus.",
	    	name:"Uncle Donnie"
	    },
	    {
	    	quote:"Whereas what we have here? A bunch of fig-eaters wearing towels on their heads, trying to find reverse in a Soviet tank. This is not a worthy adversary.",
	    	name:"Uncle Walter"
	    },
	    {
	    	quote:"No, he's a sex offender. With a record. He served 6 months in Chino for exposing himself to an eight year old.",
	    	name:"Uncle Walter"
	    }

	];
		

		$('#quoteButton').click(function(evt){
			//define the containers of the info we target
			var quote = $('#quoteContainer p').text();
			var quoteGenius = $('#quoteGenius').text();
			//prevent browser's default action
			evt.preventDefault();
			//getting a new random number to attach to a quote and setting a limit
			var sourceLength = quoteSource.length;
			var randomNumber= Math.floor(Math.random()*sourceLength);
			//set a new quote
			for(i=0;i<=sourceLength;i+=1){
			var newQuoteText = quoteSource[randomNumber].quote;
			var newQuoteGenius = quoteSource[randomNumber].name;
			//console.log(newQuoteText,newQuoteGenius);
      var timeAnimation = 500;
      var quoteContainer = $('#quoteContainer');
      //fade out animation with callback
      quoteContainer.fadeOut(timeAnimation, function(){
        quoteContainer.html('');
				quoteContainer.append('<p>'+newQuoteText+'</p>'+'<p id="quoteGenius">'+'-								'+newQuoteGenius+'</p>');
        
        //fadein animation.
        quoteContainer.fadeIn(timeAnimation);
      });  
			
			break;
		};//end for loop
	
	});//end quoteButton function
		
		
});//end document ready


