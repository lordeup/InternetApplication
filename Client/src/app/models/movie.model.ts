import { Deserializable } from "./deserializable.model";
import { Id } from "./id";
import { MovieTagModel } from "./movie-tag.model";

export class MovieModel implements Deserializable {
  idMovie: Id;
  name: string;
  description: string;
  pictureUrl: string;
  movieTags: MovieTagModel[];

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
