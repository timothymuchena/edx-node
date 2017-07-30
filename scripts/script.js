/* JS file for DEV279x project */

// defining global variables

var numField = document.querySelector("#numeric-field");

var numericButton = document.querySelector("#numeric-button");

var displayResults = document.querySelector("#display-results");

var entertainerBtn = document.querySelector("#entertainer-button");

var entDiv = document.querySelector("#entertainer-div");

var menuPane = document.querySelector("#menu-pane");

var flagField = false;

var displayAreaFlag = false;

var entFlag = false;

var validArgument = 0;

var innerCirclesReference;

numField.addEventListener("change", checkValidity); // attaching the handler to the numeric input field; field validation #1

numericButton.addEventListener("click", calculateValues); // attaching the event handler to the numeric buttton

entertainerBtn.addEventListener("click", entertainMe);// attaching the event handler to the 'entertainer' buttton

window.addEventListener("resize", stopAnimationOnWindowResize); // handling window resize events when object animation in the entDiv has already started

// defining the event handler for the numeric input field, (handler #1)

function checkValidity(evt){
	var tmp = evt.target.value;
	
	// for any change of the input field, whether the input value is valid or not, the previous displaying in the right pane (the result pane) will be hidden
	
	hideDisplayArea();
	
	// for any change of the input field, whether the input value is valid or not, the previous warning in the left pane (the menu pane) will be hidden
	if(flagField){
		menuPane.removeChild(document.getElementById("validity-warning"));
		flagField = false;
	}
	
	if(isNaN(tmp)){
		
		flagField = true;
		
		var tempParagraph = document.createElement("P");
		var warningString = "Value '" + tmp + "' cannot be converted to number!<br />Pick a numeric value and then left-click outside the input field.";
		tempParagraph.innerHTML = warningString; 
		tempParagraph.style.color = "red";
		tempParagraph.setAttribute("id", "validity-warning"); // attribute modification #1
		
		menuPane.insertBefore(tempParagraph, numField); // content modification #1
		
		numericButton.setAttribute("disabled", "true");	// attribute modification #2
	}else{
		
		numericButton.removeAttribute("disabled");
		
		tmp = Math.abs(parseInt(tmp));
		
		// console.log(tmp);
		validArgument = tmp;
	}
}

// defining the event handler for the left pane button/numeric button (handler #2)

function calculateValues(){
	
	hideEntertainmentDiv();
	
	var chkBoxSum = document.querySelector("#sumUpTo");
	var chkBoxFibo = document.querySelector("#fibo");
	var chkBoxFact = document.querySelector("#factorial");
	
	var result = "";
	// if there's at least one box checked...
	if(!(false === chkBoxSum.checked && false === chkBoxFibo.checked && false === chkBoxFact.checked)){
		if(chkBoxSum.checked){
			result += "Sum up to " + validArgument + ": " + sumUpTo(validArgument) + "<br />";
		}
		
		if(chkBoxFibo.checked){
			result += "Fibonacci # " + validArgument + ": " + iterativeFibonacci(validArgument) + "<br />";
		}
		
		if(chkBoxFact.checked){
			result += "Factorial of " + validArgument + ": " + nonRecursiveFactorial(validArgument) + "<br />";
		}
		
		isJohnDoe();
		
		displayResults.innerHTML = result; // content modification #2
		
		displayResults.style.display = "block"; // style modification #1
		displayAreaFlag = true;
	}
}

// numeric functions

function sumUpTo(arg){
	var sum = 0;
	for(var i = 1; i <= arg; i++){
		sum += i;
	}
	
	return sum;
}

function nonRecursiveFactorial(arg){
	if(0 === arg || 1 === arg){
		return 1;
	}
	
	var fact = 1;
	
	for(var i = 2; i <= arg; i++){
		fact *= i;
	}
	
	return fact;
}

function iterativeFibonacci(arg){
	var first = 0;
	var second = 1;
	var fibo;
	
	if(0 === arg){
		return false; // no such thing as the 0-th Fibonacci value
	}
	else if(1 === arg){
		return first;
	}
	else if(2 === arg){
		return second;
	}
	else{
		for(var i = 3; i <= arg; i++){
			fibo = first + second;
			first = second;
			second = fibo;
		}		
		return fibo;
	}
}

// defining the event handler for the left pane 'entertainer' button (handler #3)

function entertainMe(){
	
	if(entFlag){
		clearInterval(innerCirclesReference); // stopping a previous animation if the button is clicked repeatedly
	}
	
	hideDisplayArea();
	
	isJohnDoe();
	
	entDiv.style.display = "block";
	entFlag = true;
	
	// initial state of the red div
	var redCircle = {
		circle: document.querySelector("#inner-red"),
		deltaX:0,
		deltaY:0,
		flagX:false,
		flagY:false
	}
	
	//initial state of the green div
	var greenCircle ={
		circle: document.querySelector("#inner-green"),
		deltaX:entDiv.clientWidth - 100,
		deltaY:0,
		flagX:false,
		flagY:false
	}
		
	//initial state of the blue div

	var blueCircle = {
		circle: document.querySelector("#inner-blue"),
		deltaX:entDiv.clientWidth - 100,
		deltaY:entDiv.clientHeight - 100,
		flagX:false,
		flagY:false
	}
		
	//an array of div objects will be passed in to moveCircles function when a click on the entertainerBtn occurs
	var myArr = [];
	myArr[0] = redCircle;
	myArr[1] = greenCircle;
	myArr[2] = blueCircle;
	
	innerCirclesReference = setInterval(moveCircles, 10, myArr, entDiv);	
}

// auxiliary function for displaying / hidding elements

function hideDisplayArea(){
	if(displayAreaFlag){
		displayResults.style.display = "none";
		displayAreaFlag = false;
	}
}

function hideEntertainmentDiv(){
	if(entFlag){
		entDiv.style.display = "none";
		entFlag = false;
		clearInterval(innerCirclesReference);
	}
}

// animation function; it moves the circles within the entDiv elementFromPoint

function moveCircles(args, courtYard){
		
	var height = courtYard.clientHeight;
	var width = courtYard.clientWidth;
	
	for(var i = 0; i < args.length; i++){
		
		// limit conditions
		if(width - 100 == args[i].deltaX){
			args[i].flagX = true; // left side
		}
		
		if(0 === args[i].deltaX){
			args[i].flagX = false; // right side
		}
		
		if(height - 100 === args[i].deltaY){
			args[i].flagY = true; // bottom side
		}
		
		if(0 === args[i].deltaY){
			args[i].flagY = false; // top side
		}
		
		if(args[i].flagX){
			args[i].deltaX--;
		}else{
			args[i].deltaX++;
		}
		
		if(args[i].flagY){
			args[i].deltaY--;
		}else{
			args[i].deltaY++;
		}
		
		args[i].circle.style.left = args[i].deltaX + "px";
		args[i].circle.style.top = args[i].deltaY + "px";
	}
}
// stopping the animation when the navigator window is resized (in order to prevent unwanted bevahior of the animated objects); (handler #4)
function stopAnimationOnWindowResize(){
	if(entFlag){
		clearInterval(innerCirclesReference);
	}	
}

// updading the heading in the result pane with the user name value (field validation #2)
function isJohnDoe(){
	var tmp = document.querySelector("#user-name");
	var headingToUpd = document.querySelector("#result-pane > h2");
	if("" === tmp.value){
		headingToUpd.innerHTML = "Displaying results for user John Doe";
	}else{
		headingToUpd.innerHTML = "Displaying results for user " + tmp.value;
	}
}