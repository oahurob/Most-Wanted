/*
Build all of your functions for displaying and gathering information below (GUI).
*/
// app is the function called to start the entire application
function app(people){

  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let filterPeople;
  var firstName;
  var lastName;
  var person;
  switch(searchType){
    case 'yes':
      // TODO: search by name
      filterPeople = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      searchByTrait(people);
      break;
    default:
      alert("Invalid input. Please try again!");
      app(people); // restart app
    break;
  }
  if(searchType === "yes"){
    firstName = filterPeople.firstName;
    lastName = filterPeople.lastName;
    displayPerson(filterPeople);
    person = filterPeople;
  }
  if(searchType === "no"){
  filterPeople = selectPersonFromSearch();
  firstName = filterPeople[0];
  lastName = filterPeople[1];
  }
  let filteredName = people.filter(function(el) {
      if(el.firstName === firstName && el.lastName === lastName) {
        return true;
      }
    });
    if(searchType === "no"){
    person = filteredName[0];
    }
  mainMenu(person, people);
}

function selectPersonFromSearch(){
  let personFirstName = prompt("Enter the  FIRST name of the person you are looking for: ");
  let personLastName = prompt("Enter the  LAST name of the person you are looking for: ");
  let person = [];
  person.unshift(personLastName);
  person.unshift(personFirstName);
  return person;
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  // TODO: What to do with filteredPeople?

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      // TODO: get person's info
      displayPerson(person);
      break;
    case "family":
      // TODO: get person's family
      displayFamily(person, people);
      break;
    case "descendants":
      // TODO: get person's descendants
      displayDescendants(person, people);
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

  let filteredPeople = people.filter(function(el) {
    if(el.firstName === firstName && el.lastName === lastName) {
      return true;
    }
  });
  // TODO: What to do with filteredPeople?
  var person = filteredPeople[0];
  return person; 
}

//SearchByTraits 
function searchByTrait(people){
  let filterQuery; 
  let tryQuery = true;
  // while(tryQuery){
    let searchQuery = prompt("Search by: gender, eye-color, height, weight, occupation").toLowerCase();
    switch(searchQuery){
      case "gender":
        searchByGender(people);
        break; 
      case "eye-color":
        searchByEyeColor(people);
        break;
      case "height":
        searchByHeight(people);
        break;
      case "weight":
        searchByWeight(people);
        break;      
      case "occupation":
        searchByOccupation(people);
        break; 
    }
  //} 
}

function searchByGender(people){
  let searchQuery = prompt("Specify Gender: ").toLowerCase();
  let filterQuery = people.filter(function (el) {
    if(el.gender == searchQuery){
      return el;
    }
  });
 
  var listByGender = [];
  for(let i = 0; i < filterQuery.length; i++){
    listByGender.unshift(filterQuery[i]);
  }
  return displayPeople(listByGender);
}

function searchByEyeColor(people){
  let searchQuery = prompt("Specify Eye Color: ").toLowerCase();
  let filterQuery = people.filter(function (el) {
    if(el.eyeColor == searchQuery){
      return el;
    }
  });

  var listByEyeColor = [];
  for(let i = 0; i < filterQuery.length; i++){
    listByEyeColor.unshift(filterQuery[i]);
  }
  return displayPeople(listByEyeColor);
}

function searchByHeight(people){
  let searchQuery = prompt("Specify Height: ").toLowerCase();
  let filterQuery = people.filter(function (el) {
    if(el.height == searchQuery){
      return el;
    }
  });

  var listByHeight = [];
  for(let i = 0; i < filterQuery.length; i++){
    listByHeight.unshift(filterQuery[i]);
  }
  return displayPeople(listByHeight);
}

function searchByWeight(people){
  let searchQuery = prompt("Specify Weight: ").toLowerCase();
  let filterQuery = people.filter(function (el) {
    if(el.weight == searchQuery){
      return el;
    }
  });

  var listByWeight = [];
  for(let i = 0; i < filterQuery.length; i++){
    listByWeight.unshift(filterQuery[i]);
  }
  return displayPeople(listByWeight);
}

function searchByOccupation(people){
  let searchQuery = prompt("Specify Occupation: ").toLowerCase();
  let filterQuery = people.filter(function (el) {
    if(el.occupation == searchQuery){
      return el;
    }
  });

  var listByOccupation = [];
  for(let i = 0; i < filterQuery.length; i++){
    listByOccupation.unshift(filterQuery[i]);
  }
  console.log(filterQuery);
  console.log(listByOccupation);
  return displayPeople(listByOccupation);
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
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Age: " + person.dob + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  alert(personInfo);
}

function displayFamily(person, people){
    let family = [];
    for(let i = 0; i < people.length; i++){
      if(person.id == people[i].currentSpouse){
        family.unshift(people[i]);
      }
      if(person.id == people[i].parents){
        family.unshift(people[i]);
      }
    }
    for(let i = 0; i < family.length; i++){
      console.log(family[i]);
    }
    if(family.length === 0){
      return alert("This person has no parent information");
    }
    return displayPeople(family);
}

function displayDescendants(person, people){
  let descendants = [];
  for(let i = 0; i < people.length; i++){
    if(person.id == people[i].parents){
      descendants.unshift(people[i]);
    }
  }
  for(let i = 0; i < descendants.length; i++){
    console.log(descendants);
  }
  return displayPeople(descendants);
}

// function that prompts and validates user input
function promptFor(question, callback){
  do{
    var response = prompt(question).trim();
  } while(!response || !callback(response));
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