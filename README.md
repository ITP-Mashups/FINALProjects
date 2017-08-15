# chat.nice
Chat with embeddable audio players via Spotify. Just talk with your friends and tag whatever music you're thinking of right in your messages.

### updates from Tuesday
Player has been removed and the new version of chat.nice utilizes tags within the chat to allow users to embed music from Spotify in messages.

This is accomplished using '~' before and after a search term (Ex, \~mad disrespect\~). The tagged word or phrase is passed to the Spotify API to acquire a content ID for a small embedded player to be placed in the user's message. The search term will be bolded in the posted message. 

Error checking is now implemented that either finds the most relevant track to the search term when no exact match exists, or an error can be caught in the case of  no results and no player will be embedded. The user can attempt another search without disrupting the program.

Sound effects have been added via howler.js to signal user log on, log out, and messages sent/received. Original sound effects were designed in Ableton Live.

### wish list
I'm happy with the results of my project, but I looked into a ton of things that didn't make the cut in time.

1. Better list formatting. I was interested in better formatting the chat from a list to something more aesthetically pleasing. I tried using svgs, but had difficulty dynamically sizing an svg to contain text and the embedded player. Also a simple add would be a condition that blank messages aren't sent.

2. Autoscrolling in the chat. This is a real downer on the user experience of chat.nice, but I just could not figure out how to do this. I imagine there's a simple solution out there I haven't stumbled across yet.

3. Saving songs/indicating listening or liking a song. I'd like to eventually create some sort of user interaction to indicate how whether they listened to or enjoyed particular songs in the chat. Sub-comments attached to the original message would be cool, but that's way beyond the scope of this project. Also some way to save a list of favorites from the chat session would be cool.

4. Muting the sound cues. They're cool, but there should really be a way to turn them off.

### lessons learned
Coming into this class I was fairly proficient in Javascript, but I had next to no experience with CSS and HTML. This is really just my second experience with programming any sort of visual interface for a program, most applications I've previously developed were command line operated (in C/C++ or node.js).

I think my final project demonstrates at least a basic level of command with page layout and formatting a simple, pleasant experience. Hopefully the class feels this way in the demo as well. 
