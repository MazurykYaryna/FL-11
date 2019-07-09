let totalSum = 0;
let totalAttempt = 3;
let firstAttempt = 100;
let secondAttempt = 50;
let thirdAttempt = 25;
let zero = 0;
let currentPrize = 0;
let interval = 8;

while (confirm('Do you want to play a game')) {
    play();
    if (totalSum === 0) {
        alert('You did not win the billion');
    } else {
        alert(`Your total prise is:  ${totalSum}$`)
    } totalSum = 0;
}
function play() {
    let tries = 3;
    const one = 1,
        two = 2,
        tree = 3;
    let randomedNumber = getRandomNumber(0, interval);
    for (let i = 0; i < totalAttempt; i++) {
        let UserEnteredNumber = prompt(`Choose a roulette pocket number from 0 to ${interval}
        Attempts left ${tries}
        Total prise ${totalSum}$`,'');
        let isCorrectAnswer = parseInt(UserEnteredNumber) === randomedNumber;
        console.log(randomedNumber);
        console.log(UserEnteredNumber);
        console.log(isCorrectAnswer);
        if (isCorrectAnswer) {
            if (tries === tree) {
                currentPrize = firstAttempt;
                alert('You won' + currentPrize);
                totalSum += firstAttempt;
                interval += 4;
                firstAttempt *= 2;
            } else if (tries === two) {
                currentPrize = secondAttempt;
                alert('You won' + currentPrize);
                totalSum += secondAttempt;
                interval += 4;
                secondAttempt *= 2;
            } else if (tries === one) {
                currentPrize = thirdAttempt;
                alert('You won' + currentPrize);
                totalSum += thirdAttempt;
                interval += 4;
                thirdAttempt *= 2;
            }
        }
        tries--;
    } if (tries === 0) {
        totalSum += zero;
        alert('You lost all tries');
    }
}
function getRandomNumber(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}