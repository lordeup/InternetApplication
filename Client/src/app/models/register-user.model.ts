import { Deserializable } from "./deserializable.model";

export class RegisterUserModel implements Deserializable {
  login: string;
  password: string;
  name: string;
  surname: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
