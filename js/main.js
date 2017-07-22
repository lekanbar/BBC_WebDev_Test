//Initialisation of divisor array based on the currency denominations
var divisors = [200, 100, 50, 20, 10, 5, 2, 1];

/**
 * Method for getting user input and starting the calculation process
 * 
 * @returns
 */
function getAmountAndCount() {
	//Get user input
	var amount = $('#amount').val();
	
	var outputString = countSterlingAndPennies(amount);
	
	if(!outputString.startsWith('Error')) {
		//attach string to body of the modal
		$('#modalBody').html(outputString);
		
		//display modal
		$('#resultContainer').modal('show');
		
		//clear old values and errors
		$('#error_message').html('');
		$('#amount').val('');
	}
	else
		$('#error_message').html(outputString);
}

/**
 * Main method for calculating number of pennies.
 * 
 * @returns
 */
function countSterlingAndPennies(amount) {
	//Validate inputs
	//Check for empty string
	if(amount.length <= 0)
		return 'Error: Invalid input: Input cannot be empty, please try again.';
	
	//Check for misplaced pound sign (Unicode character for pound sign - \xA3)
	if(amount.indexOf('\xA3') > 0)
		return 'Error: Invalid input - valid character in wrong position';
	
	//Check for misplaced penny sign
	if(amount.indexOf('p') > 0 && amount.indexOf('p') !== amount.length - 1)
		return 'Error: Invalid input - valid character in wrong position';
	
	//Check for multiple decimal places
	if((amount.split('.')).length > 2)
		return 'Error: Invalid input: Please check deciaml points and try again.';
	else {
		//Check for empty value
		if(amount.replace('\xA3', '').replace('p', '') == '')
			return 'Error: Invalid input: Amount entered has missing value.';
		
		//Check if value is a valid number		
		if(isNaN(amount.replace('\xA3', '').replace('p', '').replace('.', '')))
			return 'Error: Invalid input: Amount entered contains invalid characters.';
		else {
			//Split input into tokens for processing and join into a single value
			var splittedValues = amount.split('.');
			var joinedValue = 0;
			
			if(splittedValues.length == 1 && splittedValues[0].startsWith('\xA3'))
				joinedValue = parseInt(splittedValues[0].replace('\xA3', '')) * 100; //multiply by 100 if it's a single pound sign
			else if(splittedValues.length == 1 && splittedValues[0].endsWith('p'))
				joinedValue = parseInt(splittedValues[0].replace('p', '')); //get value if it's only penny sign
			else {
				//parse to float and reduce to 2 decimal places
				var newAmount = parseFloat(amount.replace('\xA3', '').replace('p', '')).toFixed(2).toString();
				splittedValues = newAmount.split('.');
				
				//join splitted values together without decimal
				joinedValue = parseInt(splittedValues[0] + splittedValues[1]);
			}					
			
			//process output string
			var outputPrefix = amount + ' = ';
			var outputString = processValueCounts(joinedValue, outputPrefix, 0);//process entered values recursively
			
			//remove extra 
			outputString = outputString.slice(0, -2);
			
			return outputString;
		}
	}			
}

/**
 * Method for processing value counts recursively
 * 
 * @param mainValue
 * @param outputString
 * @param index
 * @returns
 */
function processValueCounts(mainValue, outputString, index) {
	//get current divisor from the denomination array
	var divisor = divisors[index];
	
	//Check using modulo and deduct divisor if it's still valid, increment count each time
	var count = 0;
	while(mainValue % divisor != mainValue) {
		count++;
		mainValue -= divisor;
	}
	
	//Get appropriate currency value and sign
	var mainCurrencyCount = '';
	if(divisor == 200)
		mainCurrencyCount = '&pound;2';
	else if(divisor == 100)
		mainCurrencyCount = '&pound;1';
	else if(divisor == 50)
		mainCurrencyCount = '50p';
	else if(divisor == 20)
		mainCurrencyCount = '20p';
	else if(divisor == 10)
		mainCurrencyCount = '10p';
	else if(divisor == 5)
		mainCurrencyCount = '5p';
	else if(divisor == 2)
		mainCurrencyCount = '2p';
	else if(divisor == 1)
		mainCurrencyCount = '1p';
		
	//Concatenate string if count is greater than zero 
	if(count > 0)
		outputString += count + ' x ' + mainCurrencyCount + ', ';
	
	//Continue processing input until the last divisor is reached
	if(divisor != 1) 
		return processValueCounts(mainValue, outputString, index + 1);
	else
		return outputString;//return output
}

/**
 * Method for checking for the enter key from user inputs
 * 
 * @param event
 * @returns
 */
function checkForEnterKeyValue(event) {
    var keyValue;

    //Get user key value input from keyboard
    if(event && event.which)
        keyValue = event.which;
    else
        keyValue = event.keyCode;

  	//if keyValue is the enter key, execute calculation
    if(keyValue === 13) {
    	getAmountAndCount();
        return false;
    }
    else
        return true;
}