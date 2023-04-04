# movie-app


### Getting started

> Before you follow the steps below, make sure you have the
[Lightning-CLI](https://rdkcentral.github.io/Lightning-CLI/#/) installed _globally_ only your system

```
npm install -g @lightningjs/cli
```

#### API Key for TMDB

To get the app running correctly and being able to fetch all the data, copy the settings_example.json into settings.json and set the `tmdb_api_key`.

```bash
cp settings_example.json settings.json
```

```json
{
  "appSettings": {
    "stage": {
      "clearColor": "0x00000000",
      "useImageWorker": true
    },
    "debug": false,
    "tmdb_api_key": "<your api key>"
  },
  "platformSettings": {
    "path": "./static",
    "log": true,
    "showVersion": true
  }
}
```

#### Running the App

1. Install the NPM dependencies by running `npm install`

2. Build the App using the _Lightning-CLI_ by running `lng build` inside the root of your project

3. Fire up a local webserver and open the App in a browser by running `lng serve` inside the root of your project

#### Developing the App

During development you can use the **watcher** functionality of the _Lightning-CLI_.

- use `lng watch` to automatically _rebuild_ your App whenever you make a change in the `src` or  `static` folder
- use `lng dev` to start the watcher and run a local webserver / open the App in a browser _at the same time_

#### Documentation

Use `lng docs` to open up the Lightning-SDK documentation.
