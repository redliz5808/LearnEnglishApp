## Thank you for checking out this fun project!

I was inspired to complete this based on a post in a JavaScript forum. As of 12/23/21 it's a quick implementation and the code has not been refactored yet.

#### Project Requirements:
* It must have an index.html page that contains a number input and a button.
* The user can select a number between 1 and 26.
* Once the form is submited, a button for each randomly selected letter must appear.
* When a letter's button is clicked, an image containing an object that begins with that letter is displayed.
* Interactions of the user should be stored in local storage.
    * Window load and window unload
    * All clicks on the "generate" (Let's Learn!) button
    * All clicks on the individual letter buttons
* Properties that need stored for each interaction are:
    * Event type
    * Event target
    * Event time
* Interactions should be stored in an object created using a function template.
    * I couldn't find what a "function template" is so I assume they meant a class and that's what I used.

**Bonus Stuff**
* I added the feature of selecting a random image (currently out of 3) for each letter. This was not in the requirements, but I thought it would be a fun feature to have.
* I also added the div that displays the letter (in uppercase and lowercase) and the name of the image because how are you going to learn English if you aren't sure what's in the picture?

**Notes**

Feel free to give me feedback, but keep a few things in mind:
* This was a side project I did in my spare time FOR FUN.
* I'm not a designer so the GUI is super simple and lame.
* This is not a project I am submitting for review.
* I spent very little time making this.

**Image Credit**

The xenomorph image was retrieved from [Google Image Search](https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.polygon.com%2F2017%2F12%2F14%2F16776452%2Fdisney-princesses-alien-queen&psig=AOvVaw06yVN3ENA6NOJbBW1qhS_q&ust=1640357694565000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJipod-W-vQCFQAAAAAdAAAAABAD). All other images were retrieved from [Pixabay.com](https://pixabay.com/).