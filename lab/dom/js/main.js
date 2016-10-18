"use strict";

var boxOne = document.getElementById('one'),
	boxTwo = document.getElementById('two'),
	boxThree = document.getElementById('three'),
	boxFour = document.getElementById('four'),
	boxFive = document.getElementById('five'),
	boxSix = document.getElementById('six');

	boxOne.addEventListener("click", function() {
		boxOne.classList.add("black");
	});

	boxTwo.addEventListener("click", function() {
		boxTwo.classList.add("fall");
	});
	
	boxThree.addEventListener("mouseover", function() {
		boxThree.classList.add("white");
	});

	boxThree.addEventListener("mouseout", function() {
		boxThree.classList.add("grey");
		boxThree.classList.remove("white");
	});

	// boxFour.addEventListener("click", function() {
	// 	boxFour.classList.add("fall");
	// });
	
	boxFour.addEventListener("click", function () {
		if (boxFour.classList.contains("fall")) {
			boxFour.classList.remove("fall");
			boxFour.classList.add("float");
		} else if (boxFour.classList.contains("fall")) {
			boxFour.classList.remove("float");
			boxFour.classList.add("fall");
		} else {
			boxFour.classList.add("fall");
		}
	});

	// boxFive.addEventListener("click", function() {
	// 	 setInterval("explode", 1);

	// });
