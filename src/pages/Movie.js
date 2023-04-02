import { Lightning, Router } from "@lightningjs/sdk";
import { fetchMovieById } from "../lib/api";

export default class Movie extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      w: 1920,
      h: 1080,
      color: 0xff000000,
    };
  }

  set params(args) {
    fetchMovieById(args.id).then(console.log);
  }
}
