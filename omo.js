/* 
Function to Check if the Student provided is valid

Can be used both on login and signup

To implement it call the function (checkIfIdValid()) before allowing access or input to database

An example of the function is below , the function takes two parametres , student id and the year 
*/

 

checkIfIdValid('h160490v',3); //test the code by running 'node omo.js' in your terminal , remove this line after testing

function checkIfIdValid(std_id, year){
	console.log("working");
	try{

		if (std_id.length == 8) {
			var first3char = std_id.substring(0,3);
			console.log(first3char);

			switch(year){
				case 1:
					console.log(ifPart1(first3char));
					break;
				case 2:
					console.log(ifPart2(first3char));
					break;
				case 3:
					console.log(ifPart3(first3char));
					break;
				case 4:
					console.log(ifPart4(first3char));
					break;
				default:
					console.log("unexpected err");
			}

		} else {
			console.log("Your ID is too big or too small , try again");

		}
	} catch (error) {
      res.status(500).json({
        message: 'Yo, lets try that again, pane zvikuitika!'
      })
  }
	
}

function ifPart1(first3char) {

	if(first3char == 'h18')
		return 1
	else
		return 0

}

function ifPart2(first3char) {

		if(first3char == 'h17')
		return 1
	else
		return 0
	
}

function ifPart3(first3char) {

		if(first3char == 'h16')
		return 1
	else
		return 0
	
}

function ifPart4(first3char){

		if(first3char == 'h15')
		return 1
	else
		return 0
	
}

//created by Student X ....