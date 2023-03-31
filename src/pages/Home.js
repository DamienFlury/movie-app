import { Lightning, Router } from "@lightningjs/sdk";
import { fetchMovies } from "../lib/api";
import { List } from "@lightningjs/ui";

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
      Border: {
        rect: true,
        w: 270,
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
    };
  }
  pageTransition() {
    return "up";
  }
  async _init() {
    this.borderIndex = 0;
    const data = await fetchMovies();
    this.tag("Movies").add(
      data.results.map((m) => ({
        src: `https://image.tmdb.org/t/p/original${m.poster_path}`,
        h: 400,
        w: 250,
        mountY: 0.5,
        margin: 10,
      }))
    );
    this.tag("Movies").setIndex(0);
  }
  _handleRight() {
    this.tag("Movies").setIndex(this.tag("Movies").index + 1);
    const idx = this.tag("Movies").index;
    if (this.borderIndex >= 6) {
      return;
    }
    this.borderIndex += 1;
    console.log(this.borderIndex);
    this.tag("Border").patch({
      smooth: {
        x: this.borderIndex * 270,
      },
    });
  }

  _handleLeft() {
    this.tag("Movies").setIndex(this.tag("Movies").index - 1);
    const idx = this.tag("Movies").index;
    if (this.borderIndex === 0) {
      returnk;
    }
    this.borderIndex -= 1;
    this.tag("Border").patch({
      smooth: {
        x: this.borderIndex * 270,
      },
    });
  }

  _handleEnter() {
    console.log("INDEX", this.tag("Movies").index);
  }

  // _getFocused() {
  //   return this.tag("Movies");
  // }

  // _handleUp() {
  //   Router.focusWidget("Menu");
  // }
}
