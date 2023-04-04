import { Lightning, Router } from "@lightningjs/sdk";
import { fetchMovies, searchMovies } from "../lib/api";
import { InputField, Keyboard, List } from "@lightningjs/ui";

export default class Home extends Lightning.Component {
  _handleEnter() {
    Router.root();
  }

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
      SearchBox: {
        rect: true,
        x: 960,
        y: 20,
        w: 200,
        mountX: 0.5,
        text: {
          text: "Search",
        },
      },
      Border: {
        rect: true,
        w: 276,
        h: 420,
        y: 540,
        mountY: 0.5,
        color: 0xffffffff,
      },
      Movies: {
        y: 540,
        mountY: 0.5,
        type: List,
        direction: "row",
      },
      Title: {
        y: 800,
        x: 960,
        mount: 0.5,
        text: {
          text: "",
        },
      },
      Plot: {
        y: 860,
        x: 960,
        w: 540,
        mountX: 0.5,
        text: {
          text: "",
          fontSize: 20,
        },
      },
    };
  }
  pageTransition() {
    return "up";
  }
  _handleBack() {
    this.searchText = this.searchText.slice(0, -1);

    this.tag("SearchBox").patch({
      text: {
        text: this.searchText,
      },
    });

    this.timeout = setTimeout(() => {
      if (this.searchText === "") {
        fetchMovies().then((data) => {
          this.tag("Movies").clear();
          this.tag("Movies").add(
            data.results.map((m) => ({
              src: `https://image.tmdb.org/t/p/original${m.poster_path}`,
              h: 400,
              w: 256,
              mountY: 0.5,
              margin: 10,
            }))
          );
          this.movies = data.results;
        });
        this.tag("SearchBox").patch({
          text: {
            text: "Search...",
          },
        });
        return;
      }
      searchMovies(this.searchText).then((data) => {
        this.tag("Movies").clear();
        this.tag("Movies").add(
          data.results.map((m) => ({
            src: `https://image.tmdb.org/t/p/original${m.poster_path}`,
            h: 400,
            w: 256,
            mountY: 0.5,
            margin: 10,
          }))
        );
        this.movies = data.results;
      });
    }, 400);
  }

  _handleKey(key) {
    const input = key.key.toLowerCase();
    if (input.length !== 1) {
      return;
    }

    const isLetter = input >= "a" && input <= "z";
    const isNumber = input >= "0" && input <= "9";

    if (!isLetter && !isNumber) {
      return;
    }

    this.searchText += key.key;
    this.tag("SearchBox").patch({
      text: {
        text: this.searchText,
      },
    });

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      searchMovies(this.searchText).then((data) => {
        this.tag("Movies").clear();
        this.tag("Movies").add(
          data.results.map((m) => ({
            src: `https://image.tmdb.org/t/p/original${m.poster_path}`,
            h: 400,
            w: 256,
            mountY: 0.5,
            margin: 10,
          }))
        );
        this.movies = data.results;
      });
    }, 400);
  }

  setDescription() {
    this.tag("Plot").patch({
      text: {
        text: this.movies[this.tag("Movies").index].overview,
      },
    });
  }
  async _init() {
    this.searchText = "";
    this.borderIndex = 0;
    const data = await fetchMovies();
    this.movies = data.results;
    this.setDescription();
    this.tag("Movies").add(
      data.results.map((m) => ({
        src: `https://image.tmdb.org/t/p/original${m.poster_path}`,
        h: 400,
        w: 256,
        mountY: 0.5,
        margin: 10,
      }))
    );
    this.tag("Movies").setIndex(0);
    this.tag("Title").patch({
      text: {
        text: this.movies[0].title,
      },
    });

    this.setBackgroundImage(this.movies[0].backdrop_path);
  }

  setBackgroundImage(src) {
    this.tag("BackgroundImage").patch({
      src: `https://image.tmdb.org/t/p/original${src}`,
    });
  }

  _handleRight() {
    this.tag("Movies").setIndex(this.tag("Movies").index + 1);
    const idx = this.tag("Movies").index;

    this.setDescription();
    this.tag("Title").patch({
      text: {
        text: this.movies[idx].title,
      },
    });

    this.setBackgroundImage(this.movies[idx].backdrop_path);

    if (this.borderIndex > 5) {
      return;
    }
    this.borderIndex += 1;

    this.tag("Border").patch({
      smooth: {
        x: this.borderIndex * 276,
      },
    });
  }

  _handleLeft() {
    this.tag("Movies").setIndex(this.tag("Movies").index - 1);
    const idx = this.tag("Movies").index;
    this.setDescription();
    this.tag("Title").patch({
      text: {
        text: this.movies[idx].title,
      },
    });

    this.setBackgroundImage(this.movies[idx].backdrop_path);

    if (this.borderIndex === 0) {
      return;
    }
    this.borderIndex -= 1;
    this.tag("Border").patch({
      smooth: {
        x: this.borderIndex * 276,
      },
    });
  }

  _handleEnter() {
    const id = this.movies[this.tag("Movies").index].id;
    Router.navigate(`/movies/${id}`);
  }
}
