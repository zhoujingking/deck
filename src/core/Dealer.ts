import IPerson from './IPerson';

export default class Dealer implements IPerson {
  name: string

  constructor(name: string) {
    this.name = name;
  }
}