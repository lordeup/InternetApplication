import { Deserializable } from "./deserializable.model";
import { Id } from "./id";

export class UserModel implements Deserializable {
  idUser: Id;
  idUserType: Id;
  login: string;
  password: string;
  name: string;
  surname: string;
  pictureUrl: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
