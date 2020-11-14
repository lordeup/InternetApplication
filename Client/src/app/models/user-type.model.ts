import { Deserializable } from "./deserializable.model";
import { Id } from "./id";

export class UserTypeModel implements Deserializable {
  idUserType: Id;
  name: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
