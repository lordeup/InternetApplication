import { Deserializable } from "./deserializable.model";
import { Id } from "./id";
import { UserModel } from "./user.model";

export class ReviewModel implements Deserializable {
  idReview: Id;
  idUser: Id;
  idMovie: Id;
  text: string;
  date: string;
  user: UserModel;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
