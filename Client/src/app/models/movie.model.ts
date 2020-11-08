import { Deserializable } from "./deserializable.model";
import { Id } from "./id";

export class Movie implements Deserializable {
  idMovie: Id;
  name: string;
  description: string;
  pictureUrl: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
