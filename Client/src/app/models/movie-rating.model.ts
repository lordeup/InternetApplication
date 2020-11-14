import { Deserializable } from "./deserializable.model";
import { Id } from "./id";

export class MovieRatingModel implements Deserializable {
  idMovieRating: Id;
  idUser: Id;
  idMovie: Id;
  rating: number;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
