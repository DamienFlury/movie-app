import { Lightning } from "@lightningjs/sdk";
import { fetchMovieById } from "../lib/api";

export default class Movie extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        color: 0xff000000,
      },
      BackgroundImage: {
        rect: true,
        shader: {
          type: Lightning.shaders.Vignette,
          magnitude: 3,
          intensity: 0.3,
        },
        w: 1920,
        h: 1080,
      },
      Title: {
        x: 960,
        y: 120,
        mount: 0.5,
      },
      Description: {
        x: 960,
        y: 420,
        w: 820,
        mount: 0.5,
        text: {
          fontSize: 20,
          lineHeight: 20,
        },
      },
      ReleaseDate: {
        x: 960,
        y: 240,
        mount: 0.5,
        text: {
          fontSize: 25,
        },
      },
    };
  }

  /**
   * @param {{ id: { id: string }; }} args
   */
  set params(args) {
    fetchMovieById(args.id).then((res) => {
      this.tag("BackgroundImage").patch({
        src: `https://image.tmdb.org/t/p/original${res.backdrop_path}`,
      });
      this.tag("Title").patch({
        text: {
          text: res.title,
        },
      });
      this.tag("Description").patch({
        text: {
          text: res.overview,
        },
      });
      this.tag("ReleaseDate").patch({
        text: {
          text: new Intl.DateTimeFormat("en-GB", { dateStyle: "full" }).format(
            new Date(res.release_date)
          ),
        },
      });
    });
  }
}
