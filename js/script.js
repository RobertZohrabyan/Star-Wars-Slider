document.addEventListener("DOMContentLoaded", function() {

//All data for individual products
const data = [
	[
		"product1",
		"product2",
		"product3",
	],
	[
		"Stormtrooper Helmet",
		"Imperial Tie FIghter",
		"The Death Star",
	],
	[
		"1.299",
		"9.999",
		"99.999"
	],
	[
		"Helmet Size",
		"Engine Unit",
		"Armament",
	],
	[
	["S", "M", "L", "XL"],
	["P-S4 Twin", "P-W401"],
	["Superlaser", "Turbolaser"],
	],
	[80, 25, 100],
	[
		"background1",
		"background2",
		"background3",
	],
];

/*==== Progress Bar ====*/
// Get elements from the DOM
const progText = document.querySelector(".progText");
const progress = document.querySelector(".progress");

//Functions for animating the progress bar
function progressBar(percentage){
	/* Set all to zero initially */
	progText.innerText = 0;
	let count = 0;

	/* Set traansition duration according to the percentage */
	progress.style.transition = 50 * data[5][percentage] + "ms";
	/* Move the progress according to the number in the circle */
	progress.style.bottom = data[5][percentage] - 110 + "%";

	//Function for counting up
	function updateCount(){
		/*Target progress value
		(Where the progress counting should stop)*/
		const target = data[5][percentage];

		/* As long as the target number isn't reached */
		if(count < target){
			//Keep counting
			count++;
			//Display the count value on the page
			progText.innerText = count + "%";
			//Count Speed
			setTimeout(updateCount, 30);
			//And when it is reached
		}else{
			//Display the final value on the page
			progText.innerText = target + "%";
		}
	}
	//Call the updateCount function initially
	updateCount();
};

//Run the progress bar initially
progressBar(0);

/*=== Options ===*/
//Get elements from the DOM
const optionsList = document.querySelector('.options-list');
const options = document.querySelectorAll('.options-list > li');

//Blind click handler to element that is added later/dynamically
optionsList.addEventListener('click', function(e){
	//If the clicked element contains the 'option' class
	if(e.target && e.target.classList.contains('option')){
		//Remove the active class from all options
		for(let i = 0; i < optionsList.children.length; i++){
			optionsList.children[i].classList.remove('option-active');
		}
		//And add the active class to the licked element
		e.target.classList.add('option-active');
		const selectedSize = e.target.textContent;
		updateSize(selectedSize);
	}
});


/*=== Slider ===*/
//Get elements from the DOM
const arrLeft = document.querySelector('.arrow-left');
const arrRight = document.querySelector('.arrow-right');
const img = document.querySelector('.product-image img');
const name = document.querySelector('.product-name');
const price = document.querySelector('.product-price');
const optionTitle = document.querySelector('.product-option-title');
const bg = document.querySelector('.panel-1');

//Slider ID
/*let id = 0;*/
//Dynamically inserted li element
let li;

//The slider function
function slider(id){
	//Change the product image
	//img.src = "media/" + data[9][id] + ".png";
	img.src = "media/" + data[0][id] + ".png";
	//Add product image fade animation
	img.classList.add('fade-in');
	/* Remove animation after it's done, so it can be used again */
	setTimeout(() => {
		img.classList.remove('fade-in');
	},850);
	//Change product name
	name.innerText = data[1][id];
	//Change price
	price.innerText = data[2][id];
	//Change product name
	optionTitle.innerText = data[3][id];
	//Create new li (option) elements
	for(let i = 0; i < data[4][id].length; i++){
		//Create the element
		li = document.createElement('li');
		//Insert the text content
		li.innerHTML = data[4][id][i];
		//Add the option class
		li.classList.add('option');

		//Before the first element is inserted
		if(i == 0){
			//Clear all previous li elements
			optionsList.innerHTML = "";
			/* Add li element to be inserted */
			li.classList.add('option-active');
		}

		//Insert the element
		optionsList.appendChild(li);
	}
	//Change the background image
	bg.style.backgroundImage = "url(media/" + data[6][id] + ".jpg)";
	/*Run the progress bar functions and insert the new percentage*/
	progressBar(id);
}

	//add click event to left arrow
arrLeft.addEventListener('click', () => {
	//Decrement image id
	id--;
	/* Check if id is smaller than the number of available slides */
	if(id < 0){
		id = data[0].length - 1;
	}
	//Run the slider function
	slider(id);
});

	//add click event to right arrow
arrRight.addEventListener('click', () => {
	//Increment image id
	id++;
	/* Check if id is greater than the number of available slides */
	if(id > data[0].length - 1){
		id = 0;
	}
	//Run the slider function
	slider(id);
});

let id = 0;
slider(id);
}); //DOM