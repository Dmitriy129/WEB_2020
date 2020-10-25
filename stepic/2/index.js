let man = {
  name: "111",
  surname: "222",
  fullName: function() {
    return this.surname + " " + this.name;
  }
};

class Room {
  constructor(owner) {
    this.windows = 10;
    this.owner = owner || "qwertyu";
  }
}
console.log(man.fullName());
var room = new Room("dfghj");
console.log(room);
