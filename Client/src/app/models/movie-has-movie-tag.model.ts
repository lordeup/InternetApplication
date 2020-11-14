import { Deserializable } from "./deserializable.model";
import { Id } from "./id";

export class MovieHasMovieTagModel implements Deserializable {
  idMovieXMovieTag: Id;
  idMovie: Id;
  idMovieTag: Id;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
