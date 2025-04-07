// source => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith

const data = [
    {
        id: 1,
        email: 'toto@gmail.com',
        password: 'toto12'
    },
    {
        id: 2,
        email: 'JohnDoe@outlook.com',
        password: 'password'
    },
    {
        id: 3,
        email: 'test@gmail.com',
        password: 'test1234'
    },
    {
        id: 4,
        email: 'titi@sfr.fr',
        password: 'titidu12'
    }
];


function filterData(data, emailEnd) {
    const userFiltered = data.filter(user => user.email.endsWith(emailEnd));    
    return userFiltered; 
}

const test = filterData(data, '@sfr.fr');
console.log(test);
