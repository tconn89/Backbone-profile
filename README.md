# Making an animated tile display for skills and knowledge
## Using Backbone js

### Model Attribute: Index
Adding indexes to each tile model to keep track of their order.  This is needed because the animation reorders the tiles to fit neatly on the screen.  Putting the tiles back in the correct order adds to a better user experience.

### Structure of view template

is not thorough enough to easily solve a bug with finding all the tiles in a row.  Changing the structure will propogate throughout the system and cause .grid a to break.  Will now have to be .grid div a

On the other hand I could add a row attribute and get everything in the row.  that might be easier, but the animation effect needed down the line might require a parent div anyway.

### Views for models and collections vs data-id attributes
Two different ways of managing events on your models

https://lostechies.com/derickbailey/2011/10/11/backbone-js-getting-the-model-for-a-clicked-element/

### Click event management

Hard to decide where to have backbone manage click events or jQuery in animate.js

### Impatient users could break ordering

Due to slow animation time and swift clicking on different tiles.

### Miscellaneous

At first, I thought replacing the collection with a new one was possible, but it seems just calling reset on the view then adding new data to the collection is the way to go.