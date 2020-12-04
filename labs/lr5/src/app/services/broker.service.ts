import { Broker } from "../classes/Broker";

export class BrokerService {
  private data: Broker[] = [];

  getData(): Broker[] {
    return this.data;
  }

  addData(title: string, money: number): void {
    this.data.push(new Broker(title, money));
  }

  deleteData(value: string): void {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].name === value) {
        this.data.splice(i, 1);
        break;
      }
    }
  }

  change(oldName: string, newName: string, money: number) {
    for (const elem of this.data) {
      if (elem.name === oldName) {
        elem.name = newName;
        elem.money = money;
        break;
      }
    }
  }

  length(): number {
    return this.data.length;
  }

  find(value: string): boolean {
    for (const elem of this.data) {
      if (elem.name === value) {
        return true;
      }
    }

    return false;
  }
}
