import { Deserializable } from "./deserializable.model";
import { Id } from "./id";

export class MovieTagModel implements Deserializable {
  idMovieTag: Id;
  name: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
