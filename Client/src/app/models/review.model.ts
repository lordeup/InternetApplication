import { Deserializable } from "./deserializable.model";
import { Id } from "./id";

export class ReviewModel implements Deserializable {
  idReview: Id;
  idUser: Id;
  idMovie: Id;
  text: string;
  date: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
