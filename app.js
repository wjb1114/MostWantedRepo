/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    var foundPerson = searchByName(people);
		mainMenu(checkSingleResult(foundPerson), data);
    break;
    case 'no':
    // TODO: search by traits
    var foundPerson = searchByTrait(data);
    break;
    default:
    app(people); // restart app
    break;
  }

}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
	    displayInfo(person, data);
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  var foundPerson = people.filter(function(person){
    if(person.firstName.toLowerCase() === firstName.toLowerCase() && person.lastName.toLowerCase() === lastName.toLowerCase()){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

function searchByTrait(people){ // need only 2 but can search up to 5
  let filteredPeople = people;

  var heightYesNo = promptFor("Do you know the person's height?", yesNo);
  var weightYesNo = promptFor("Do you know the person's weight?", yesNo);
  var eyeColorsYesNo = promptFor("Do you know the person's eye color?", yesNo);
  var occupationYesNo = promptFor("Do you know the person's occupation?", yesNo)
  var ageYesNo = promptFor("Do you know the person's age?", yesNo);


  if(eyeColorsYesNo == 'yes'){
    var eyeColor = promptFor("What is the person's eye color?", chars);
    filteredPeople = filteredPeople.filter(function(person){
      if (person.eyeColor == eyeColor){
       return true ;    
      }
      else {
        return false;
      }
    });
}

  if(heightYesNo == 'yes'){
    var height = promptFor("What is the person's height?", chars);
      
    filteredPeople = filteredPeople.filter(function(person){
      if (person.height == height){
      return true ;    
      }
      else {
        return false;
      }
    });
  }

  if(weightYesNo == 'yes'){
    var weight = promptFor("What is the person's weight?", chars);
      
    filteredPeople = filteredPeople.filter(function(person){
      if (person.weight == weight){
      return true ;    
      }
      else {
        return false;
      }
    });
  }

  if(occupationYesNo == 'yes'){
    var occupation = promptFor("What is the person's occupation?", chars);
      
    filteredPeople = filteredPeople.filter(function(person){
      if (person.occupation == occupation){
      return true ;    
      }
      else {
        return false;
      }
    });
  }

  if(ageYesNo == 'yes'){
    var age = promptFor("What is the person's age?", chars);
      
    filteredPeople = filteredPeople.filter(function(person){
      if (person.age == age){
      return true ;    
      }
      else {
        return false;
      }
    });
  }


console.log(filteredPeople);

}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

function checkSingleResult(personArr) {
	if (personArr.length === 1) {
		return personArr[0];
	}
	else {
		return undefined;
	}
}

function displayInfo(person, people) {
	let parentsString = "Parent(s): ";
	if (person.parents.length === 0) {
		parentsString += person.firstName + " " + person.lastName + " has no parents in the application data.";
	}
	else {
		let foundParent;
		let parents = [];
		for (let i = 0; i < person.parents.length; i++) {
			foundParent = people.filter(function(personParent){
		    if(personParent.id === person.parents[i]){
		      return true;
		    }
		    else{
		      return false;
		    }
		  });
			parents.push(checkSingleResult(foundParent));
		}
		for (let i = 0; i < parents.length; i++) {
			parentsString += parents[i].firstName;
			parentsString += " ";
			parentsString += parents[i].lastName;
			if (i < parents.length - 1) {
				parentsString += " and ";
			}
		}
	}
	parentsString += "\n";
	let spouseString = "Current Spouse: ";
	let foundSpouse;
	if (person.currentSpouse === null) {
		spouseString += person.firstName + " " + person.lastName + " has no current spouse in the application data.";
	}
	else {
		foundSpouse = people.filter(function(personSpouse){
			if(personSpouse.id === person.currentSpouse){
				return true;
			}
			else{
				return false;
			}
		});
		spouseSingle = checkSingleResult(foundSpouse)
		spouseString += spouseSingle.firstName + " " + spouseSingle.lastName;
	}
	alert (	"ID: " + person.id + "\n" +
					"Name: " + person.firstName + " " + person.lastName + "\n" +
					"Gender: " + person.gender + "\n" +
					"Date of Birth: " + person.dob + "\n" +
					"Height: " + Math.floor(person.height / 12) + " feet and " + (person.height % 12) + " inches\n" +
					"Weight: " + person.weight + " pounds\n" +
					"Eye Color: " + person.eyeColor + "\n" +
					"Occupation: " + person.occupation + "\n" +
					parentsString +
					spouseString)
}
