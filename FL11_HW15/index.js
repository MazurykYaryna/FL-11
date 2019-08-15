class Hamburger {
    static cheeseCounter = 0;
    static tomatoCounter = 0;
    static secretIngredientCounter = 0;
    static biteCounter = 0;

    constructor(type, calories, addSecretIngredient) {
        let _calories = calories;
        this.type = type;
        this.getCalories = () => _calories;
        this.setCalories = (calories) => { _calories = calories }; 
        addSecretIngredient && this.addSecretIngredient();
    }
    addCheese () {
        if (Hamburger.biteCounter == 0) {
            if (Hamburger.cheeseCounter === 0) {
                const addCalories = this.getCalories() + 120;
                this.setCalories(addCalories);
                Hamburger.cheeseCounter++;
            } else {
                console.log("Sorry you can add cheese only once");
            }
        } else {
            console.log("Sorry you cannot add cheese");
        }
    }
    addTomato () {
        if (Hamburger.biteCounter == 0) { 
            if (Hamburger.tomatoCounter >=0 && Hamburger.tomatoCounter <=1 ) {
                const addCalories = this.getCalories() + 20;
                this.setCalories(addCalories);
                Hamburger.tomatoCounter++;
            } else {
                console.log("Sorry you can add cheese only twice");
            }
        } else {
            console.log("Sorry you cannot add tomato");
        }
    }
    addSecretIngredient() {
        const {biteCounter, tomatoCounter, cheeseCounter} = Hamburger;
        
        if (biteCounter == 0) { 
            if (tomatoCounter === 0 && cheeseCounter === 0) {
                console.log(tomatoCounter, cheeseCounter);
                if (Hamburger.secretIngredientCounter === 0) {
                    const addCalories = this.getCalories() + 100;
                    this.setCalories(addCalories);
                    Hamburger.secretIngredientCounter++;
                } else {
                    console.log("Sorry you can add secret ingredient only once");
                }
               
            } else {
                console.log("Sorry you can add secret ingredient only before ingredient");
            }
        } else {
            console.log("Sorry you cannot add secret ingredient");
        }
    }
    bite() {
        Hamburger.biteCounter++;                                                                       
    }
    info() {
        const {secretIngredientCounter, cheeseCounter, tomatoCounter, biteCounter} = Hamburger;

        let type = this.type.charAt(0).toUpperCase() + this.type.substring(1);
        let secretIngredient = secretIngredientCounter > 0 ? "with secret ingredient," : "";
        let cheese = cheeseCounter > 0 ? "with cheese," : "";
        let tomato = tomatoCounter ? `with ${tomatoCounter} ${tomatoCounter > 1 ? "tomatoes" : "tomato"},`: "";
        let bite =  `is bit ${biteCounter} ${biteCounter > 1 ? "times" : "time"}`;
        let totalCalories = `Total calories: ${this.getCalories()}`;
        
        let info = `${type} hamburger, ${secretIngredient} ${cheese} ${tomato} ${bite}. ${totalCalories}`;

        return info;
    }
}

const hamburger = new Hamburger ('classic', 600);
hamburger.addSecretIngredient();
hamburger.addCheese();
hamburger.addTomato();
hamburger.addTomato();
hamburger.bite();
hamburger.bite();
hamburger.bite();
console.log(hamburger.info());