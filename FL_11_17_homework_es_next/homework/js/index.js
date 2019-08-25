//Task 1
const array = [1,2,3,4,56,7,8,76,5,241,5,356,567,2];
maxElement = (array) => Math.max(...array);
//example task 1
console.log(maxElement(array));

//Task 2
const copyArray = (array) => {
    let newArray = [...array];
    return newArray;
}
//example task 2
const array1 = [1,2,3];
const copiedArray = copyArray(array1);
console.log(array1, copiedArray);
console.log(array1 === copiedArray);

//Task 3
const obj = {name: 123};
const addUniqueId = (obj) => {
    const id = Symbol("id");
    const numberId = Math.ceil((Math.random() * (1000 - 1) + 1));
    const newObj = Object.assign({[id]: numberId}, obj);
    return newObj;
}
//example task 3
console.log(addUniqueId(obj));

//Task 4
const oldObj = {name: 'Someone', details: {id: 1, age: 11, university: 'UNI'}};
const regroupObject = ({name: firstName, details: {id, age, university}}) => {
    return {university, user: {age,firstName,id,}}
};
//example task 4
console.log(regroupObject(oldObj));

//Task 5
const array2 = [1,1,23,3,4,5,6,5,4,23,2,1,1,1,1];
const findUniqueElements = (array) => {
    let uniqieElements = new Set();
    array.forEach(element => {
        uniqieElements.add(element);
    });
    return Array.from(uniqieElements);
};
//example task 5
console.log(findUniqueElements(array2));

// Task 6 
const phoneNumber = '0123456789';
const hideNumber = (phoneNumber) => {
    let substring = phoneNumber.substring(phoneNumber.length - 4);
    return substring.padStart(phoneNumber.length, '*');
};
//example task 6
console.log(hideNumber(phoneNumber));

// Task 7
const isRequired = () => { throw new Error('Missing param'); };
const add = (a = isRequired(), b = isRequired()) => {
    return a + b;
};
//example task 6
console.log(add(1,3));
// add(1);

// Task 7
const sortUserByAlphabetic = (apiKey) => {
fetch(apiKey)
    .then(response => response.json())
    .then(users => {
        let nameUsers = [];
        users.forEach(user => {
            nameUsers.push(user.name);
        });
        return nameUsers.sort();
    })
    .then(sortUsers => {
        console.log(sortUsers);
    })
    .catch(error => console.error(error))
}
//example task 7
sortUserByAlphabetic('https://jsonplaceholder.typicode.com/users');

//Task 8
let sortUserByAlphabetic2 = (users) => {
    let nameUsers = [];
    users.forEach(user => {
        nameUsers.push(user.name);
    });
    return nameUsers.sort();
};
async function fetchAndSortUsers (apiKey) {
    try {
        const response = await fetch(apiKey);
        const users = await response.json();
        const sortUsers = await sortUserByAlphabetic2(users);
        return sortUsers;
    } catch (err) {
        console.log(`ERROR: ${err.stack}`);
    }
}
fetchAndSortUsers('https://jsonplaceholder.typicode.com/users').then(users => console.log(users));

