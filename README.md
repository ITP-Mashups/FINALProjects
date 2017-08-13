# FINALProjects
<h2>Project Requirements</h2>:
Create a single page (client-side only) web experience that ideally leverages data from at least one public web API and incorporates the use of at least one Javascript “interaction” library, such as p5, D3, Three, etc.

Checklist:

<ul><li>Client-side web development</li>

<li>At least one public web API as a data source</li>

<li>At least one javascript “interaction” library<li></ul>




![Beer & Dessert Pairings](https://github.com/lanimc/FinalAPIProject/blob/master/screenshot.png)
For my final project I continued to refine the BreweryDB - Yummly API call. <br>
<h2>User Experience</h2><br>
Users enter a search word (top right of the page) that searches all BreweryDB data for beers containing the entered word.
Users can then click on the results, represented by their labels or default image of beer (center of the page) for more information about the beer.

Users can double click on the results  to look for related desserts that have similar ingredients. The ingredients are pulled from the beer and beer style description of the double-clicked on beer. This works by sending the beer and style descriptions to the textrazor api and searching for words related to food. the resulting entities are filtered by confidence and relevance score for the top 25% ranking scores. These ingredients are then sent through to the Yummly API.

Users can click on the dessert search results, represented by circles in the dessert information section at the bottom right hand of the page for more information on the dessert.

<h2>Challenges</h2>
The challenges I faced were in designing a visual representation of the data and making the user interaction experience interesting but still useful. Adding text made the page very wordy and busy very quickly so I had to strike a balance on how to display the text based on user interaction and some css styling.

I settled on using the D3 library for user interaction, as I as already familiar with it. I wanted to incorporate the circle pack layout, which I hadn't used before but had a lot of challenges getting the data into the shape I needed. Initially, I settled on the force directed layout which had a nice simulation effect for the user to maneuver through the beer search results. This ended up being better than my original circle pack idea, so I stuck with it for the final design. 
I did finally figure out the data hierarchy needed for the pack layout and used it for the dessert results. 

<h3>Coding challenges</h3>:
As to be expected a lot of time was spent on data manipulation. The underscore library was a great tool in understanding the various data structures and helped in getting the data into the formats needed for visualization. 
d3 was also a powerful tool for interactivity. I would have liked to incorporate more transitions into the display of results and user interactions. However, just mastering the pack layout and force simulations was heartening. Overall, the coding challenges I faced were:

<ul><li>data preparation - working with object hierarchies</li>

<li>managing missing data - lesson learned: data is always missing</li>

<li>images - adding images to svg and then styling them ended up being a major challenge. for the default images, i ended up styling the default in its raw format and adding the styled default picture. </li>

<li>textrazor call - the text analysis could use a lot more tinkering. namely filtering resulting entities against the Yummly ingredient list for better dessert search results. As the Yummly call didn't support or searches, many searches were coming up null. I also ran up against the text razor limits on some days, which hampered design efforts.</li>

<li>interaction - refining the interaction required quality time with the d3 wiki and some useful examples on bl.ocks.org.
I have to site: https://bl.ocks.org/mbostock/4063530 and http://bl.ocks.org/eesur/be2abfb3155a38be4de4 for their contribution to the final work.</li></ul>

<h2>Future Work</h2>  

There is a lot of opportunity for improvement on the project, given additional time. 

<ul><li>Media queries to make the site more responsive</li>

<li>A call for the actual recipe or video on youtube on how to make the recipe</li> 

<li>Grouping the beers and desserts by flavor</li>

<li>Incorporating the dessert images</li>

<li>Incorporating a bar graph or other visual or filter for the dessert flavors</li>

<li>A transition on the selected beer to blow up the label and make it more prominent</li>

<li>Another brewery call for the beer ingredients and flavors</li></ul>



