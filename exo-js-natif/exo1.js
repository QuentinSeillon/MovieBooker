// source btoa => https://www.w3schools.com/JSREF/met_win_btoa.asp
// source atob => https://www.w3schools.com/JSREF/met_win_atob.asp

function generateToken(user){
    const userInString = JSON.stringify(user);
    const userCrypt = window.btoa(userInString);
    return userCrypt;
};

function verifyToken(token){
    try {
        const tokenDecrypt = window.atob(token);
        const user = JSON.parse(tokenDecrypt);
        return user;
    } catch (error) {
        console.error(`Token invalide : ${error.message}`);
        return null;
        
    }
}

const user = {
    id: 1,
    email: 'test@gmail.com',
    password: 'password'
}

const token = generateToken(user);
// console.log('Token => ', token);

const tokenVerify = verifyToken(token);
// console.log('Token Verified => ', tokenVerify);