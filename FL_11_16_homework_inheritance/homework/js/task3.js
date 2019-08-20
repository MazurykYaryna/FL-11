function Pokemon () {
    this.name = '';
    this.type = '';
    this.specie = '';
    this.flying = false;
}
Pokemon.prototype.getType = function() {
    return this.type;
}
Pokemon.prototype.getSpecie = function() {
    return this.specie;
}
Pokemon.prototype.canFly = function() {
    return this.flying;
}
Pokemon.prototype.getPokemonType = function() {
    return this.name;
}

function Charmander() {
    Pokemon.call(this);
    this.name = 'Charmander';
    this.specie = 'Lizard Pokémon';
    this.type = 'Fire';
}
Charmander.prototype = Object.create(Pokemon.prototype);
Charmander.prototype.constructor = Charmander;
Charmander.prototype.evolve = function () {
   return new Charmeleon();
};

function Charmeleon() {
    Charmander.call(this);
    this.name = 'Charmeleon';
    this.specie = 'Flame Pokémon';
}
Charmeleon.prototype = Object.create(Charmander.prototype);
Charmeleon.prototype.constructor = Charmeleon;
Charmeleon.prototype.evolve = function () {
    return new Charizard();
}

function Charizard () {
    Charmeleon.call(this);
    this.name = 'Charizard';
    this.flying = true;
}
Charizard.prototype = Object.create(Charmeleon.prototype);
Charizard.prototype.constructor = Charizard;
Charizard.prototype.evolve = function() {
    return this;
}

//example code
const charmander = new Charmander();
const charmeleon = new Charmeleon();
const charizard = new Charizard();

console.log(charmander.getType());
console.log(charmander.getType() === charmeleon.getType()); 
console.log(charmeleon.getType() === charizard.getType()); 

console.log(charmander.evolve().constructor === Charmeleon); 
console.log(charmeleon.evolve().constructor === Charizard);
console.log(charmander.getSpecie()); 

console.log(charmeleon.getSpecie());
console.log(charizard.getSpecie() === charmeleon.getSpecie()); 
console.log(charmander.canFly()); 

console.log(charmander.canFly() === charmeleon.canFly()); 
console.log(charizard.canFly()); 
console.log(charizard.evolve());

function Pichu () {
    Pokemon.call(this);
    this.name = 'Pichu'
    this.type = 'Electric';
    this.specie = 'Mouse Pokémon';
}
Pichu.prototype = Object.create(Pokemon.prototype);
Pichu.prototype.constructor = Pichu;
Pichu.prototype.evolve = function () {
   return new Pikachu();
};

function Pikachu () {
    Pichu.call(this);
    this.name = 'Pikachu'
}
Pikachu.prototype = Object.create(Pichu.prototype);
Pikachu.prototype.constructor = Pikachu;
Pikachu.prototype.evolve = function () {
   return new Raichu();
};

function Raichu () {
    Pichu.call(this);
    this.name = 'Raichu'
}
Raichu.prototype = Object.create(Pikachu.prototype);
Raichu.prototype.constructor = Raichu;
Raichu.prototype.evolve = function () {
   return this;
};

const pichu = new Pichu();
console.log(pichu.getPokemonType());  

const pikachu = pichu.evolve();
console.log(pikachu.getPokemonType()); 
console.log(pikachu.constructor === Pikachu);

const raichu = pikachu.evolve();
console.log(raichu.getPokemonType());
console.log(raichu.constructor === Raichu); 

const raichu2 = raichu.evolve(); 
console.log(raichu2 === raichu); 








