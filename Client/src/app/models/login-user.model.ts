import {Deserializable} from "./deserializable.model";

export class LoginUser implements Deserializable {
  login: string;
  password: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
