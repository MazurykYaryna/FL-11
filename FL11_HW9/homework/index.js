const data = [
    {
        "_id": "5b5e3168c6bf40f2c1235cd6",
        "index": 0,
        "birthday": '2016-03-18T00:00:00',
        "eyeColor": "green",
        "name": "Stein",
        "favoriteFruit": "apple"
    },
    {
        "_id": "5b5e3168e328c0d72e4f27d8",
        "index": 1,
        "birthday": '1991-02-11T00:00:00',
        "eyeColor": "blue",
        "name": "Cortez",
        "favoriteFruit": "strawberry"
    },
    {
        "_id": "5b5e3168cc79132b631c666a",
        "index": 2,
        "birthday": '1984-04-17T00:00:00',
        "eyeColor": "blue",
        "name": "Suzette",
        "favoriteFruit": "apple"
    },
    {
        "_id": "5b5e31682093adcc6cd0dde5",
        "index": 3,
        "birthday": '1994-04-17T00:00:00',
        "eyeColor": "green",
        "name": "George",
        "favoriteFruit": "banana"
    }
];


const getNumbers = (str) => {
    let arrayCharacters = str.split('');
    let arrayNumbers = [];
    arrayCharacters.forEach(character => {
        let revertToNumber = parseInt(character);
        if(!isNaN(revertToNumber)) {
            arrayNumbers.push(+character);
        }
    });
    return arrayNumbers;
};
getNumbers('n1um3ber95');

const executeforEach = (array, callback) => {
    for (let i=0; i<array.length; i++) {
        callback(array[i]);
    }
};
executeforEach([1,2,3],
    function(el) {
    console.log(el)
    });
const mapArray = (array, callback) => {
    let transformArray = [];
    executeforEach(array, el => {
        transformArray.push(callback(el))
    });
    return transformArray;
};
mapArray([1, 2, 3],
    function (el) {
    return el + 3 } );

const filterArray = (array, callback) => {
    let filterArray = [];
    executeforEach(array, el => {
        callback(el) && filterArray.push(el)
    });
    return filterArray;
};


const showFormattedDate = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    switch(month.toString()) {
        case '0':
            month='Jan';
            break;
        case '1':
            month='Feb';
            break;
        case '2':
            month='Mar';
            break;
        case '3':
            month='Apr';
            break;
        case '4':
            month='May';
            break;
        case '5':
            month='Jun';
            break;
        case '6':
            month='Jul';
            break;
        case '7':
            month='Aug';
            break;
        case '8':
            month='Sep';
            break;
        case '9':
            month='Oct';
            break;
        case '10':
            month='Nov';
            break;
        case '11':
            month='Dec';
            break;
        default:
            console.log('Unknown month value');
            break;
    }
    return `Date: ${month} ${day} ${year}`;
};
showFormattedDate(new Date('2019-01-27T01:10:00'));

const canConvertToDate = (dateStr) => {
    let date = new Date(dateStr);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    if (year >=0 && month <= 11 && month >=0 && day <= 31 && day>=0) {
        return true;
    } else {
        return false;
    }
};
canConvertToDate('2016-03-18T00:00:00');

const daysBetween = (date1, date2) => {
    let time1 = date1.getTime();
    let time2 = date2.getTime();
    let timeDiff = Math.abs(time1 - time2);
    let dayDiff = Math.ceil(timeDiff/(1000 * 3600 * 24));
    return dayDiff;
};
daysBetween(new Date('2016-03-18T00:00:00'), new Date('2016-04-19T00:00:00'));

const getAmountOfAdultPeople = (users) => {
    let currentDate = new Date();
    let ageOfUsers = [];
    for (let i=0; i<users.length; i++) {
        const dayDiff = daysBetween(currentDate, new Date(users[i].birthday));
        const yearDiff = Math.round(dayDiff/365);
        ageOfUsers.push(yearDiff);
    }
    let adults = filterArray(ageOfUsers, function (el) {
        return el > 18 } );
    return adults.length;
};
getAmountOfAdultPeople(data);

const keys = (obj) => {
    let keys = [];
    for (let key in obj) {
       keys.push(key);
    }
    return keys;
};
keys({keyOne: 1, keyTwo: 2, keyThree: 3});

const values = (obj) => {
    let values = [];
    for (let key in obj) {
        values.push(obj[key]);
    }
    return values;
};
values({keyOne: 1, keyTwo: 2, keyThree: 3});

