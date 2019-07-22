class Fighter {
    constructor(fighter) {
        let wins = 0;
        let losses = 0;
        let name = fighter.name;
        let damage = fighter.damage;
        let hp = fighter.hp;
        let agility = fighter.agility;
        this.getName=() => {
            return name;
        }
        this.getDamage=() => {
            return damage; 
        }
        this.getAgility=() => {
            return agility;
        }
        this.getHealth=() => {
            return hp;
        }
        this.attact = (defender) => {
            const maxAgility = 100;
            let attact = Math.ceil(Math.random() * maxAgility);
            if (attact > defender.getDamage()) {
                defender.dealDamage(damage);
                console.log(`${name} make ${damage} to ${defender.getName()}`);
            } else {
                console.log(`${name} attack missed `);
            }
        }
        this.logCombatHistory = () => {
            console.log(`Name: ${name}, Wins: ${wins}, Losses: ${losses}`);
        }
        this.heal = (addHeal) => {
            let maxHeal = 100;
            let generalHeal = hp + addHeal;
            if (generalHeal > maxHeal) {
                hp = maxHeal;
            } else {
                hp = generalHeal;
            }
        }
        this.dealDamage = (reducedHeal) => {
            let generalHeal = hp - reducedHeal;
            if (generalHeal < 0) {
                hp = 0;
            } else {
                hp = generalHeal;
            }
        }
        this.addWin = () => {
            wins++;
        }
        this.addLoss = () => {
            losses++;
        }
    }
}

const battle = (fighter1, fighter2) => {
    if (fighter1.getHealth() === 0) {
        console.log(`${fighter1.getName()} is dead and can't fight`);
    } else if (fighter2.getHealth() === 0) {
        console.log(`${fighter2.getName()} is dead and can't fight`);
    } else {
        while (fighter1.getHealth() > 0 && fighter2.getHealth() > 0) {
            fighter1.attact(fighter2);
            if (fighter2.getHealth() === 0) {
                console.log(`${fighter1.getName()} won`);
                fighter1.addWin();
                fighter2.addLoss();
                break;
            }
            fighter2.attact(fighter1);
            if (fighter1.getHealth() === 0) {
                console.log(`${fighter2.getName()} won`);
                fighter2.addWin();
                fighter1.addLoss();
                break;
            }
        }
    }
}

const fighter1 = new Fighter({name: 'John', damage: 20, hp: 100, agility: 25});
const fighter2= new Fighter({name: 'Jack', damage: 20, hp: 100, agility: 20});

battle(fighter1, fighter2);


