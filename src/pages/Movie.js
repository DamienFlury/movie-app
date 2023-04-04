import { Lightning } from "@lightningjs/sdk";
import { fetchMovieById, getRecommendations } from "../lib/api";
import { List } from "@lightningjs/ui";

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
      Image: {
        x: 700,
        y: 120,
        w: 240,
        h: 400,
      },
      Title: {
        x: 1000,
        y: 120,
      },
      Description: {
        x: 1000,
        y: 420,
        w: 640,
        text: {
          fontSize: 20,
          lineHeight: 20,
        },
      },
      ReleaseDate: {
        x: 1000,
        y: 240,
        text: {
          fontSize: 25,
        },
      },
      RecommendationsText: {
        y: 640,
        x: 960,
        mountX: 0.5,
        text: {
          fontSize: 30,
          text: "Recommendations",
        },
      },
      Recommendations: {
        y: 740,
        type: List,
        direction: "row",
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
      this.tag("Image").patch({
        src: `https://image.tmdb.org/t/p/original${res.poster_path}`,
      });
    });

    getRecommendations(args.id).then((data) => {
      this.tag("Recommendations").clear();
      this.tag("Recommendations").add(
        data.results.map((m) => ({
          src: `https://image.tmdb.org/t/p/original${m.poster_path}`,
          h: 280,
          w: 160,
          margin: 10,
        }))
      );
    });
  }
}
