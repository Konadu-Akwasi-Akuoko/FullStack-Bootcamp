class BellBoys {
  constructor(name, age, gender, workPermit, role, greetingMessage) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.workPermit = workPermit;
    this.role = role;
    this.greetingMessage = greetingMessage;
  }

  sayYourName() {
    return `My name is ${this.name}`;
  }

  howOldAreYOu() {
    return `I am ${this.age} years old`;
  }

  whatGenderAreYou() {
    return `I am a ${this.gender}`;
  }

  doYouHaveWorkPermit() {
    return `${this.workPermit}`;
  }

  greetPeople(specialSLogan) {
    return `${this.greetingMessage}. And this is my slogan: ${specialSLogan}`;
  }
}

let bellBoyKwame = new BellBoys(
  "Kwame Poku",
  27,
  "M",
  "Yes",
  "Chevron",
  "Hello I love serving people"
);

console.log(bellBoyKwame.sayYourName());
console.log(bellBoyKwame.howOldAreYOu());
console.log(bellBoyKwame.greetPeople("Hola Hola Hola"));
