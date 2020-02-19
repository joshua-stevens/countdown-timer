/* JS */

var intervalHandler;
var newMinutes = 0;
var newSeconds = 0;
var newHours = 0;

var hours = document.getElementById('hours');
var minutes = document.getElementById('minutes');
var seconds = document.getElementById('seconds');

var timer = document.getElementById('timer');
var minutesBox = document.getElementById('minutesEnter');
var secondsBox = document.getElementById('secondsEnter');

function countDown(){
	
	//if newseconds == 0 if newhours == 0  if newminutes == 0 
	//then alert()....
	//  cearInterval(intervalHandler);

	if(newSeconds == 0 && newMinutes == 0 && newHours ==0)
	{
		alert("Time is up!");
		clearInterval(intervalHandler);
		return 0;
	}
	
	
    else if(newSeconds == 0 && newMinutes == 0 && newHours > 0)
	{
		newHours --;
		newMinutes = 59;
		newSeconds = 59;
	}
	else if(newSeconds == 0 && newMinutes > 0)
	{
		newMinutes --;
		newSeconds = 59;
	}
	else
	{
		newSeconds --;
	}
	
	updateTimer();
}


function updateTimer() {
	//set innerhtml of hours, minutes, seconds
	//to strings built out of newHours, newMinutes, newSeconds
	
		//seconds.innerHTML = newSeconds;
		//minutes.innerHTML = newMinutes;
		//hours.innerHTML = newHours;
		

		if(newSeconds == 0)
		{
			seconds.innerHTML = "00";
		}
		else if(newSeconds < 10)
		{
			seconds.innerHTML = "0" + newSeconds;
		
		}
		else
		{
			seconds.innerHTML = newSeconds;
		}
		if(newMinutes == 0)
		{
			minutes.innerHTML = "00";
		}
		else if(newMinutes < 10)
		{
			minutes.innerHTML = "0" + newMinutes;
		}
		else
		{
			minutes.innerHTML = newMinutes;
		}
		if(newHours == 0 || "")
		{
			hours.innerHTML = "";
		}
		else if(newHours < 10)
		{
			hours.innerHTML = "0" + newHours + ":";
		}
		else
		{
			hours.innerHTML = newHours + ":";
		}
	}



function prepareEventHandlers() {
	document.getElementById('form').onsubmit = function() {
		//alert("test");
		//1. error checking
		// - empty boxes
		// -neg values
		
		if(secondsBox.value < 0 || minutesBox.value < 0)
		{
			alert("Please enter only positive numbers");
			return false;
		}
		if(secondsBox.value == "" && minutesBox.value == "")
		{
			alert("Please enter a value");
			return false;
		}
		if(secondsBox.value == 0 && minutesBox.value == 0)
		{
			alert("Please enter a value");
			return false;
		}
		
		
		
		//2. build string for timer
		// -more than 59 minutes
		// - more than 59 seconds
		//Set initial newMinutes, newHour, newSecond
		newSeconds = secondsBox.value.replace(/^[0]+/g,"");
		newMinutes = minutesBox.value.replace(/^[0]+/g,"");
		
		
		
		if(newMinutes > 59 && newSeconds > 59)
		{
			
			var tempM = 0;
			
			newHours = newMinutes / 60;
			newHours = Math.trunc(newHours);
			newMinutes = newMinutes % 60;
			
			tempM = newSeconds / 60;
			tempM = Math.trunc(tempM);
			newSeconds = newSeconds % 60;
			
			newMinutes += tempM;
		}
	
	    if(newSeconds > 59)
		{
			newMinutes = newSeconds / 60;
			newMinutes = Math.trunc(newMinutes);
			newSeconds = newSeconds % 60;
		}
		if(newMinutes > 59)
		{
			newHours = newMinutes / 60;
			newHours = Math.trunc(newHours);
			newMinutes = newMinutes % 60;
		
		}
	
		
		seconds.innerHTML = newSeconds;
		minutes.innerHTML = newMinutes;
		hours.innerHTML = newHours;
		
		//3. Handle interval....
		if(intervalHandler)
		{
			clearInterval(intervalHandler);
		}
		intervalHandler = setInterval(countDown, 1000);
		
		//4. Update timer...
		updateTimer();
		return false;
	}
}

window.onload = function() {
	prepareEventHandlers();
}