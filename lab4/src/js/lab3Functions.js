const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const lookup = require('country-code-lookup');
const Users = require('./mock_for_L3');
const testModules = require('./test-module');
require('../css/app.css');

/** ******** Your code here! *********** */
function checkString(errorMessages, paramName, paramValue) {
  if (typeof (paramValue) !== 'string') {
    errorMessages.push(`Datatype of ${paramName} '${paramValue}' must be string.`);
  } else if (paramValue.length === 0) {
    errorMessages.push(`${paramName} must be longer then 0.`);
  } else if (paramValue[0].toUpperCase() !== paramValue[0]) {
    errorMessages.push(`First letter of ${paramName} '${paramValue}' must be upper case.`);
  }
}

function validateObject(user) {
  const errorMessages = [];
  checkString(errorMessages, 'full_name', user.full_name);
  checkString(errorMessages, 'note', user.note);
  checkString(errorMessages, 'state', user.state);
  checkString(errorMessages, 'city', user.city);
  checkString(errorMessages, 'country', user.country);

  if (typeof (user.gender) !== 'string') {
    errorMessages.push(`Datatype of gender '${user.gender}' must be string.`);
  } else if (user.gender.length === 0) {
    errorMessages.push('Gender must be longer then 0.');
  }

  if (typeof (user.age) !== 'number') {
    errorMessages.push(`Datatype of age '${user.age}' must be number.`);
  } else if (user.age < 12) {
    errorMessages.push(`Age '${user.age}' is incorrect, teacher must be older then 12 years old.`);
  }

  if (typeof (user.phone) === 'string') {
    const region = lookup.byCountry(user.country).iso2;
    const number = phoneUtil.parseAndKeepRawInput(user.phone, region);
    const validPhone = phoneUtil.isValidNumberForRegion(number, region);
    if (!validPhone) {
      errorMessages.push(`Phone '${user.phone}' is incorrect for ${user.country}.`);
    }
  }

  if (typeof (user.email) !== 'string') {
    errorMessages.push(`Datatype of email '${user.email}' must be string.`);
  } else if (!user.email.includes('@')) {
    errorMessages.push(`Email '${user.email}' must include symbol '@'.`);
  } else if (user.email.length < 3) {
    errorMessages.push(`Email '${user.email}' must contain at least 3 symbols.`);
  } else if (user.email[0] === '@') {
    errorMessages.push(`Email '${user.email}' can't start from symbol '@'.`);
  } else if (user.email[user.email.length - 1] === '@') {
    errorMessages.push(`Email '${user.email}' can't end on symbol '@'.`);
  }

  return errorMessages;
}

export function createFormattedArray() {
  const courses = [null, 'Mathimatics', 'Chemistry', 'Music', 'Physics'];
  const usersArray = [];
  Users.randomUserMock.forEach((userItem) => {
    const item = userItem;
    item.title = item.name.title;
    item.full_name = item.name.first.concat(' <br> ',item.name.last);
    delete item.name;
    item.city = item.location.city;
    item.state = item.location.state;
    item.country = item.location.country;
    item.postcode = item.location.postcode;
    item.coordinates = item.location.coordinates;
    item.timezone = item.location.timezone;
    delete item.location;
    delete item.login;
    item.b_day = item.dob.date;
    item.age = item.dob.age;
    delete item.dob;
    delete item.registered;
    delete item.cell;
    item.picture_large = item.picture.large;
    item.picture_thumbnail = item.picture.thumbnail;
    delete item.picture;
    delete item.nat;
    item.id = Math.random().toString(36).substr(2, 15);
    const favoriteNumber = Math.floor(Math.random() * Math.floor(2));
    if (favoriteNumber === 1) {
      item.favorite = true;
    } else {
      item.favorite = false;
    }
    const courseIndex = Math.floor(Math.random() * Math.floor(courses.length));
    item.course = courses[courseIndex];
    item.bg_color = '#'.concat(Math.floor(Math.random() * 16777215).toString(16));
    item.note = 'Some additional info...';
    let added = true;
    usersArray.forEach((addedItem) => {
      if (addedItem.full_name === item.full_name
        && addedItem.city === item.city && addedItem.b_day === item.b_day) {
        added = false;
      }
    });
    if (added) {
      const errorMessages = validateObject(item);
      if (!errorMessages.length) {
        usersArray.push(item);
      } else {
        console.log(errorMessages);
      }
    }
  });
  Users.additionalUsers.forEach((userItem) => {
    let added = true;
    usersArray.forEach((addedItem) => {
      if (addedItem.full_name === userItem.full_name
        && addedItem.city === userItem.city && addedItem.b_day === userItem.b_day) {
        added = false;
      }
    });
    if (added) {
      const errorMessages = validateObject(userItem);
      if (!errorMessages.length) {
        usersArray.push(userItem);
      } else {
        console.log(errorMessages);
      }
    }
  });
  return usersArray;
}

export function filterArray(usersArray, country, minAge, maxAge, gender, favorite) {
  const filteredArray = [];
  usersArray.forEach((userItem) => {
    let added = true;
    if (typeof (country) === 'string' || Array.isArray(country)) {
      if (typeof (country) === 'string' && userItem.country !== country) {
        added = false;
      } else if (Array.isArray(country)) {
        let neededCountry = false;
        country.forEach((item) => {
          if (userItem.country === item) {
            neededCountry = true;
          }
        });
        if (!neededCountry) {
          added = false;
        }
      }
    }
    if (typeof (minAge) === 'number' || typeof (maxAge) === 'number') {
      if (typeof (minAge) === 'number') {
        if (userItem.age < minAge) {
          added = false;
        }
      }
      if (typeof (maxAge) === 'number') {
        if (userItem.age > maxAge) {
          added = false;
        }
      }
    }
    if (typeof (gender) === 'string') {
      if (gender === 'male' || gender === 'female') {
        if (userItem.gender !== gender) {
          added = false;
        }
      }
    }
    if (typeof (favorite) === 'boolean' && userItem.favorite !== favorite) {
      added = false;
    }

    if (added) {
      filteredArray.push(userItem);
    }
  });
  return filteredArray;
}

export function sortArray(usersArray, param, increasing) {
  const sortedArray = usersArray.slice();
  if (param === 'country' || param === 'full_name'
  || param === 'b_day' || param === 'age') {
    if (increasing) {
      sortedArray.sort((a, b) => {
        if (a[param] < b[param]) {
          return -1;
        }
        if (a[param] > b[param]) {
          return 1;
        }
        return 0;
      });
    } else {
      sortedArray.sort((a, b) => {
        if (a[param] > b[param]) {
          return -1;
        }
        if (a[param] < b[param]) {
          return 1;
        }
        return 0;
      });
    }
  } else {
    console.log(`Incorrect parameter for sorting ${param}`);
  }
  return sortedArray;
}


export function searchByParameter(usersArray, param, less) {
  const findedUsers = [];
  const paramStr = param.toString();
  usersArray.forEach((userItem) => {
    if (less == true){
      if (userItem.full_name.includes(paramStr) || userItem.age.toString() <= paramStr) {
        findedUsers.push(userItem);
      }
    }
    else if (less == false){
      if (userItem.full_name.includes(paramStr) || userItem.age.toString() > paramStr) {
        findedUsers.push(userItem);
      }
    } 
  });
  return findedUsers;
}

function getPercent(usersArray, param) {
  const findedUsers = searchByParameter(usersArray, param);
  const percent = (findedUsers.length * 100) / usersArray.length;
  return Math.round(percent);
}

//console.log(testModules.hello);

//  Task1-2
// console.log('----------Task1 and Task2----------');
//const array = createFormattedArray();
// console.log(array);

// //  Task2
// console.log('----------Task2----------');
// const user1 = {
//   full_name: 'john',
//   gender: '',
//   note: 'a',
//   state: 3,
//   city: 'berlin',
//   country: null,
//   email: '@aaa',
// };
// const errorMessages1 = validateObject(user1);
// console.log(errorMessages1);

//  filterArray
// console.log('----------Task3----------');
// console.log('Filter by favorites, countries: France, Germany');
// const filteredArray1 = filterArray(array, ['France', 'Germany'], null, null, null, true);
// console.log(filteredArray1);

// console.log('Filter by age less then 49, country: France');
// const filteredArray2 = filterArray(array, ['France', 'Germany'], null, 48, null, null);
// console.log(filteredArray2);

// console.log('Filter by favorites, gender: female, age from 35 to 53');
// const filteredArray3 = filterArray(array, null, 35, 53, 'female', true);
// console.log(filteredArray3);

//  Task4
// console.log('----------Task4----------');
// console.log('Sort by full_name increasing');
// const sortedArray1 = sortArray(array, 'full_name', true);
// console.log(sortedArray1);

// console.log('Sort by age decreasing');
// const sortedArray2 = sortArray(array, 'age', false);
// console.log(sortedArray2);

// console.log('Sort by b_day increasing');
// const sortedArray3 = sortArray(array, 'b_day', true);
// console.log(sortedArray3);

// console.log('Sort by country decreasing');
// const sortedArray4 = sortArray(array, 'country', false);
// console.log(sortedArray4);

//  Task5-6
// console.log('----------Task5 and Task6----------');
// console.log('Percent of users with age 47');
// const percent1 = getPercent(array, 47);
// console.log(percent1);

// console.log('Percent of users whom full_name or note include \'a\'');
// const percent2 = getPercent(array, 'a');
// console.log(percent2);