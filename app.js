"use strict";

// app is the function called to start the entire application
function app(people) {
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch (searchType) {
    case 'yes':
      var foundPerson = searchByName(people);
      mainMenu(checkSingleResult(foundPerson), data);
      break;
    case 'no':
      // TODO: search by traits
      var foundPerson = searchByTrait(people);
      mainMenu(checkSingleResult(foundPerson), data);
      break;
    default:
      app(people); // restart app
      break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {
  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }
  if (Array.isArray(person)) {
    displayPeople(person);
  }
  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  switch (displayOption) {
    case "info":
      displayInfo(person, data);
      break;
    case "family":
      displayFamily(person, data);
      break;
    case "descendants":
      displayPeople(getDescendants(person, data));
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

// Search by first and last name
function searchByName(people) {
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  var foundPerson = people.filter(function(person) {
    if (person.firstName.toLowerCase() === firstName.toLowerCase() && person.lastName.toLowerCase() === lastName.toLowerCase()) {
      return true;
    } else {
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

// Search by one or more traits
function searchByTrait(people) { // need only 2 but can search up to 5
  let filteredPeople = people;

  var heightYesNo = promptFor("Do you know the person's height? Yes or No.", yesNo);
  var weightYesNo = promptFor("Do you know the person's weight? Yes or No.", yesNo);
  var eyeColorsYesNo = promptFor("Do you know the person's eye color? Yes or No.", yesNo);
  var occupationYesNo = promptFor("Do you know the person's occupation? Yes or No.", yesNo)
  var ageYesNo = promptFor("Do you know the person's age? Yes or No.", yesNo);


  if (eyeColorsYesNo == 'yes') {
    var eyeColor = promptFor("What is the person's eye color?", nonInteger);
    filteredPeople = filteredPeople.filter(function(person) {
      if (person.eyeColor == eyeColor) {
        return true;
      } else {
        return false;
      }
    });
  }

  if (heightYesNo == 'yes') {
    var height = promptFor("What is the person's height in inches?", integer);

    filteredPeople = filteredPeople.filter(function(person) {
      if (person.height == height) {
        return true;
      } else {
        return false;
      }
    });
  }

  if (weightYesNo == 'yes') {
    var weight = promptFor("What is the person's weight in pounds?", integer);

    filteredPeople = filteredPeople.filter(function(person) {
      if (person.weight == weight) {
        return true;
      } else {
        return false;
      }
    });
  }

  if (occupationYesNo == 'yes') {
    var occupation = promptFor("What is the person's occupation?", nonInteger);

    filteredPeople = filteredPeople.filter(function(person) {
      if (person.occupation == occupation) {
        return true;
      } else {
        return false;
      }
    });
  }

  if (ageYesNo == 'yes') {
    var age = promptFor("What is the person's age?", integer);

    filteredPeople = filteredPeople.filter(function(person) {
      if (person.age == age) {
        return true;
      } else {
        return false;
      }
    });
  }


  return filteredPeople;

}

// alerts a list of people
function displayPeople(people) {
  if (people.length > 1) {
    alert(people.length + " results found:\n\n" + people.map(function(person) {
      return person.firstName + " " + person.lastName + ":\n ID Number: " + person.id;
    }).join("\n\n"));
  } else if (people.length === 0) {
    alert("No results found.");
  } else {
    alert("One result found:\n\n" + people.map(function(person) {
      return person.firstName + " " + person.lastName + ":\n ID Number: " + person.id;
    }).join("\n\n"));
  }
}

// function that prompts and validates user input
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input) {
  return true;
}

// helper function, ensures input is a number
function integer(input) {
  return !Number.isNaN(parseInt(input))
}

// helper function, ensures input is not a number
function nonInteger(input) {
  return Number.isNaN(parseInt(input))
}

// returns single object in array if array length is one, otherwise returns whole array or returns undefined if the array is empty
function checkSingleResult(personArr) {
  if (personArr.length === 1) {
    return personArr[0];
  } else if (personArr.length > 1) {
    return personArr;
  } else {
    return undefined;
  }
}

// displays all traits for selected object
function displayInfo(person, people) {
  let parentsString = getParents(person, people);
 
  parentsString += "\n";

  let spouseString = "Current Spouse: ";
  let foundSpouse;
  if (person.currentSpouse === null) {
    spouseString += person.firstName + " " + person.lastName + " has no current spouse in the application data.";
  } else {
    foundSpouse = people.filter(function(personSpouse) {
      if (personSpouse.id === person.currentSpouse) {
        return true;
      } else {
        return false;
      }
    });
    let spouseSingle = checkSingleResult(foundSpouse)
    spouseString += spouseSingle.firstName + " " + spouseSingle.lastName;
  }
  spouseString += "\n";

  alert("ID: " + person.id + "\n" +
    "Name: " + person.firstName + " " + person.lastName + "\n" +
    "Gender: " + person.gender + "\n" +
    "Date of Birth: " + person.dob + "\n" +
    "Height: " + Math.floor(person.height / 12) + " feet and " + (person.height % 12) + " inches\n" +
    "Weight: " + person.weight + " pounds\n" +
    "Eye Color: " + person.eyeColor + "\n" +
    "Occupation: " + person.occupation + "\n" +
    parentsString +
    spouseString +
    "Age: " + person.age)

}

// displays parents, spouse, and children of selected person
function displayFamily(person, people) {

  let parentsString = getParents(person,people);

  let spouseString = "Current Spouse: ";
  let foundSpouse;
  if (person.currentSpouse === null) {
    spouseString += person.firstName + " " + person.lastName + " has no current spouse in the application data.";
  } else {
    foundSpouse = people.filter(function(personSpouse) {
      if (personSpouse.id === person.currentSpouse) {
        return true;
      } else {
        return false;
      }
    });
    let spouseSingle = checkSingleResult(foundSpouse)
    spouseString += spouseSingle.firstName + " " + spouseSingle.lastName;

  }

  let childString = "Children: "
  let children;
  let foundChildren = [];

  children = people.filter(function(childrens) {
    for (let i = 0; i < childrens.parents.length; i++) {
      if (person.id === childrens.parents[i]) {
        return true;
      }
    }
    return false;
  })

  for (let i = 0; i < children.length; i++) {
    childString += children[i].firstName;
    childString += " ";
    childString += children[i].lastName;
    if (i < children.length - 1) {
      childString += " and ";
    }
  }
  if (children.length == 0) {
    childString += " No children found";
  }



  alert("ID: " + person.id + "\n" +
    "Name: " + person.firstName + " " + person.lastName + "\n" +
    parentsString + "\n" +
    spouseString + "\n" +
    childString
  )
}

// assigns age to object array based on current date
function getAge(people) {
  let dayToday = new Date().getDate();
  let monthToday = new Date().getMonth();
  let yearToday = new Date().getFullYear();
  for (let i = 0; i < people.length; i++) {
    let birthDate = people[i].dob;
    let birthDateSplit = people[i].dob.split("/");
    birthDateSplit[0] -= 1;
    let splitDiff = [];
    splitDiff[0] = monthToday - birthDateSplit[0];
    splitDiff[1] = dayToday - birthDateSplit[1];
    splitDiff[2] = yearToday - birthDateSplit[2];
    if (splitDiff[0] < 0 || (splitDiff[0] == 0 && splitDiff[1] < 0)) {
      splitDiff[2]--;
    }
    people[i].age = splitDiff[2];
  }
}

// returns array of all descendants of selected person
function getDescendants(person, people, foundDesc = []) {
  let descendants = [];

  descendants = people.filter(function(descendantsEl) {
    for (let i = 0; i < descendantsEl.parents.length; i++) {
      if (person.id === descendantsEl.parents[i]) {
        return true;
      }
    }
    return false;
  });

  for (let i = 0; i < descendants.length; i++) {
    if (!foundDesc.includes(descendants[i])) {
      foundDesc.push(descendants[i]);
    }
    getDescendants(descendants[i], people, descendants);
  }

  return foundDesc;
}

getAge(data);

function getParents(person,people){
  let parentsString = "Parent(s):";
  if (person.parents.length === 0) {
    parentsString += " No parents found";
  } else {
    let foundParents;
    let parents = [];
    for (let i = 0; i < person.parents.length; i++) {
      foundParent = people.filter(function(personParent) {
        if (personParent.id === person.parents[i]) {
          return true;
        } else {
          return false;
        }
      })
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
  return parentsString;
}