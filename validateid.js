// these checks can also be handled in the frontend

function checkIfValid(std_id) {
	return new Promise((resolve,reject) => {
		std_id.toLowerCase()
		if (std_id.length != 8) reject('Your ID is too big or too small, try again')
		var valid_ids = ["h18","h19","h17","h16"]
		if (valid_ids.indexOf(std_id.substring(0, 3)) == -1) reject('ID does not exist')
		resolve(true)
	})
}

checkIfValid('h160490v').then((message) => {
	console.log(message)
})
.catch((message) => {
	console.log(message)
})

