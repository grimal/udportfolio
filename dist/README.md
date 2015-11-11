## Website Performance Optimization portfolio project

This optimization project was part of the Udacity Front End Nanodegree course.  The objectives for this project are the following:

	1) Optimize the index.html file to achieve a PageSpeed score of 90 for Mobile and Desktop.
	2) Time to resize pizzas is less than 5 ms in pizza.html (show in the browser console).
	3) Achieve a consistent 60fps when scrolling in pizza.html.
	3) Clear comments in views/js/main.js, index.html, and views/pizza.html explaining the optimzations performed.

## Optimization reports:

dist/ contains the production code.

1. Arriving at approximately > 1ms for each resize pizza cycle.
2. Floating pizzas rendering at 60fps throughout scrolling. Average time to generate last ten frames: .1 - .15.

  Specifics:
	index.html:

		1. In-lined CSS.  This reduced the CRP.
		2. Added async to script.
		3. Implemented Font Loader script to optimize font loading time.

	pizza.html:

		1. Moved the following function definitions out of the resizePizzas() function: changeSlideLabel(), changePizzaSizes().
		2. Removed excessive calculations from within two of the for-loops within the following functions: changeSliderLabel(), changePizzaSizes().
		3. Removed the functions determineDx(), sizeSwitcher() as they were unnecessary and the calculations from the former were drastically slowing down the scripting.
		4. Added floatingpizza array for quicker creation of the floatingpizzas.
		5. Created startAnimation function.  Associated this with the scroll event.  This utilizes the requestAnimationFrame, thus allowing the browser to update the floating pizzas based on the browser's availabilty versus being forced through the scroll event.
		6. Modified changePizzas() to change the image source based on the slider value.
		7. Optimized pizza.png and pizzeria.jpg via Grunt and Imagemin.  They are called pizza-medium, pizza-large, and pizzeria.jpg.
		8. Added style.backfaceVisibility = 'hidden' to all pizza images (floating and static).  Should offload image processing to GPU.
		9. Changed the updatePositions() function to adjust the X position with translate3d vs. using the offset as before.  This should provide a performance boost through this CSS hack.
		10. Replaced the over-complicated mathematical calculations in updatePositions() for the Math.sin calls.
		11. Minimized HTML, CSS and JS.


## Installation:

Check out the repository : https://github.com/grimal/udportfolio and clone to your computer.

To analyze the code and host on your PC for testing purposes:

1. To inspect the site on your phone, you can run a local server (use port 8080 or 8000 for Windows PCs to get around ISP blocking of port 80).

  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080

2. Open a browser and visit localhost:8080
3. Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

  $> cd /path/to/your-project-folder
  $> ngrok 8080

4. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

## License:

Forked from source code belonging to Cameron Pittman and Udacity.

Modifications:
Copyright (c) [2015] [Phillip Stafford]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
