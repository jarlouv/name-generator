import { CreditCard } from './creditcard';
import { Birthday } from './birthday';

export class ProfileExt {
  name: String;
  surname: String;
  gender: String;
  region: String;
  age: Number;
  title: String;
  phone: String;
  birthday: Birthday;
  email: String;
  password: String;
  credit_card: CreditCard;
  photo: String;
}