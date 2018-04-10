//set up the objects that contain the validation data for regex. These values must use the same name as the id of the form input.
	var myreg = new Object();// set up the object containing the regex expressions to be used.
	myreg.telephone = /^\(?(?:(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?\(?(?:0\)?[\s-]?\(?)?|0)(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}|\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4}|\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3})|\d{5}\)?[\s-]?\d{4,5}|8(?:00[\s-]?11[\s-]?11|45[\s-]?46[\s-]?4\d))(?:(?:[\s-]?(?:x|ext\.?\s?|\#)\d+)?)$/g;//https://www.aa-asterisk.org.uk/Regular_Expressions_for_Validating_and_Formatting_GB_Telephone_Numbers#Validating_GB_telephone_numbers
	myreg.telmobile = /^\(?(?:(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?\(?(?:0\)?[\s-]?\(?)?|0)(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}|\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4}|\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3})|\d{5}\)?[\s-]?\d{4,5}|8(?:00[\s-]?11[\s-]?11|45[\s-]?46[\s-]?4\d))(?:(?:[\s-]?(?:x|ext\.?\s?|\#)\d+)?)$/g;
	myreg.postcode = /^(GIR ?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})$/g; // see the section on Regex Reference for further details
	myreg.email = /^.+?\@.*?$/
	myreg.lastname = /^[^~\|]+?$/
	
	var truefeedback = new Object(); // set up the object containing the success messages to be used.
	truefeedback.telephone = 'Valid: ';
	truefeedback.telmobile = 'Valid: ';
	truefeedback.postcode = 'That should be a valid post code';
	truefeedback.email = '✓ ';
	truefeedback.lastname = '✓ ';
	
	var falsefeedback = new Object();// set up the object containing the failed validation messages to be used.
	falsefeedback.telephone = "Not a valid UK landline : ";
	falsefeedback.telmobile = 'Not a valid UK mobile : ';
	falsefeedback.postcode = 'That is not a valid post code : ';
	falsefeedback.email = 'X ';
	falsefeedback.lastname = 'X ';
	
	//set up an object to contain a record of ids of form inputs for checking before form submission
	var formcheck = new Object();
	//formcheck.agreement = 'e'; // all unchecked initially given the value "e" for error. When a valid entry confirmed changed to "", or if invalid changed back to "e" 
	formcheck.firstname = 'e'; 
	//formcheck.surname = 'e'; 
	formcheck.lastname = 'e'; 
	//formcheck.dateofbirth = 'e'; 
	//formcheck.house = "e"; 
	//formcheck.add2 = "e"; // these are not going to be required fields - they don't have to be filled in so we won't include them in our list for checking before submission
	//formcheck.add3 = "e"; 
	//formcheck.town = "e"; 
	//formcheck.postcode = "e"; 
	//formcheck.telephone = "e"; 
	//formcheck.telmobile = "e";
	formcheck.email = "e";  
	
	var validationtype = new Object();
	validationtype.firstname= "as";
	validationtype.lastname= "as";
	validationtype.email= "reg";
	
	var formresult = '';

function myFunction(x,str,vt){ //the input passes its id and the value it contains to the function
	//alert( vt );
	str=str.trim(); // trim any leading and trailing whitespace
	result ="";  //create an empty variable to hold the result of the test
	fb = "fb"+ x;  //global create the id of the feedback element - adding "fb" to the front of the input id
	
	
	
if (vt == "as" ){ anystring(x,str);}
else if (vt== "reg") { myregexcheck(x,str);}
else if (vt== "dt") { mydatestring(x,str);}
checkform();
};

function myregexcheck(x,str){
	var myregex= myreg[x];  // the value from the myreg object identified by the id from the form
	if ( result = myregex.test( str )){  // this is how we test the string against the regex. We want a true or false answer.
	document.getElementById(fb).style.backgroundColor="lightgreen"; // change the feedback span to green
	document.getElementById(x).style.backgroundColor="lightgreen"; // change the input to green
	document.getElementById(fb).innerHTML= (truefeedback[x]) + str; // add a message to the feedback span
	formcheck[x] = "";
	return true;
}else{ // there has not been a match
	document.getElementById(fb).style.backgroundColor="red";
	document.getElementById(x).style.backgroundColor="#F2F6D7";
	document.getElementById(fb).innerHTML= (falsefeedback[x]) + str;
	formcheck[x] = "e";
	return false;
}
};

function anystring(x,str){
	if ( str ){  // this is how we test the string has some sort of value and is not null, empty, undefined. We want a true or false answer.
	document.getElementById(fb).style.backgroundColor="lightgreen"; // change the feedback span to green
	document.getElementById(x).style.backgroundColor="lightgreen"; // change the input to green
	document.getElementById(fb).innerHTML= " ✓ " + str; // add a message to the feedback span
	formcheck[x] = "";
	return true;
}else{ // there has not been a match
	document.getElementById(fb).style.backgroundColor="red";
	document.getElementById(x).style.backgroundColor="#F2F6D7"
	document.getElementById(fb).innerHTML= " X";
	formcheck[x] = "e";
	return false;
}
};

function mydatestring(x,str){
		var myDate = new Date(str);
	var jsonDate = myDate.toJSON();
	if ( !isNaN( jsonDate ) ){// value won't convert to date so is not a valid date
		document.getElementById(fb).style.backgroundColor="red";
		document.getElementById(x).style.backgroundColor="#F2F6D7"
		document.getElementById(fb).innerHTML= " This is not a valid date or time";
		formcheck[x] = "e";
		return false;
		 }
	var mytesttime = jsonDate.substr(0, 16);//get the first 16 characters of this date time string
	var mytestdate = jsonDate.substr(0, 10);// get the first 10 characters of this date
	tstr= str.substr(0, 16);//get the first 16 characters of this date time string
	dstr= str.substr(0, 10);// get the first 10 characters of this date
	
	
	
	if(tstr == mytesttime ){// we have a valid date and time
	document.getElementById(fb).style.backgroundColor="lightgreen"; // change the feedback span to green
	document.getElementById(x).style.backgroundColor="lightgreen"; // change the input to green
	document.getElementById(fb).innerHTML= "This is a valid date and time:  " + str; // add a message to the feedback span
	formcheck[x] = "";
	return true;
	} else if ( dstr == mytestdate ) {// we have a valid date
		document.getElementById(fb).style.backgroundColor="lightgreen"; // change the feedback span to green
		document.getElementById(x).style.backgroundColor="lightgreen"; // change the input to green
		document.getElementById(fb).innerHTML= "This is a valid date:  " + str; // add a message to the feedback span
		formcheck[x] = "";
		return true;
	}else {//not a valid date time
		document.getElementById(fb).style.backgroundColor="red";
		document.getElementById(x).style.backgroundColor="#F2F6D7"
		document.getElementById(fb).innerHTML= " This is not a valid date or time:  ";
		formcheck[x] = "e";
		return false;
	}
	
};

function validate(){
	return checkform();
}

function checkform(){
	//because we have kept a record of the state of all inputs in our formcheck[x] object, we can quickly see if they have all been filled in.
	
	for (var key in formcheck ){
		 
		
		 if (formcheck.hasOwnProperty(key)) {
      formresult = formresult +  formcheck[key] ; 
     //alert(key + " validate called" + formresult );
    }
	}
	
	if( formresult ){
	document.getElementById("submit").style.backgroundColor="#F2F6D7"; // change the feedback p to red
	document.getElementById("submit").value= "Not ready to submit. Please check the form"; // add a message to the feedback span
	formresult = '';
	return false;
	}else{
		document.getElementById("submit").style.backgroundColor="green"; // change the feedback p to green
		document.getElementById("submit").value= "Ready to Submit. "; // add a message to the feedback span
		formresult = '';
	}
	return true;
};

function validateall() {
	for (var key in validationtype ){
		//alert (key);
		var str = document.getElementById(key).value;
		myFunction(key,str,validationtype[key]);
	}
	
};
