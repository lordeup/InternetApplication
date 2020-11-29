import { Deserializable } from "./deserializable.model";
import { Id } from "./id";
import { CollectionMovieTagModel } from "./collection-movie-tag-.model";

export class MovieModel extends CollectionMovieTagModel implements Deserializable {
  idMovie: Id;
  name: string;
  description: string;
  pictureUrl: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
