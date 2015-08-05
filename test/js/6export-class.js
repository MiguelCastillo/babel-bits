class Person {
  constructor(first, last) {
    this.first = first;
    this.last = last;
  }

  toString() {
    return `${this.first} ${this.last}`;
  }
}

let person = new Person('Monark', 'Total');

export default person;
