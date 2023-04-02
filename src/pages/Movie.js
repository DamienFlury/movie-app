import { Lightning } from "@lightningjs/sdk";

export default class Movie extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      w: 1920,
      h: 1080,
      color: 0xffff0099,
    };
  }
}
