const a1 = +prompt('Please enter a1', '0');
const a2 = +prompt('Please enter a2', '0');
const b1 = +prompt('Please enter b1', '0');
const b2 = +prompt('Please enter b2', '0');
const c1 = +prompt('Please enter c1', '0');
const c2 = +prompt('Please enter c2', '0');

const divider = 2;
const middlePoint1 = (a1 + b1)/divider;
const middlePoint2 = (a2 + b2)/divider;

if( middlePoint1 === c1 && middlePoint2 === c2){
    console.log(true);
}else{
    console.log(false);
}
