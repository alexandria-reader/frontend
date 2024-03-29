Alexandria is an open source language learning app that allows users learn languages using text.

Read about how we made it [here](https://alexandria-reader.github.io/).

Alexandria is accessible [here](https://tryalexandria.com/).

# Running Alexandria locally for development

First clone both this repo and the [backend](https://github.com/alexandria-reader/backend).
Run `npm install` to install the dependencies, then add a .`env` file to the root directory with the values from `.env.sample`.
Then run `npm start`.

Now that the frontend is started, follow the getting started instructions in the backend `README.md`.

# Troubleshooting

If, when getting the backend and frontend working together, you get a 500 error from the languages endpoint, make sure that the database is running locally and that the seed data is present. You can start the database by running `npm run start-docker-postgres`.

## Features Highlight

### Add translation for selected words

![](src/assets/set-translation.gif)

### Phrase selection

![](src/assets/phrase-selection.gif)

### Light and dark modes

![](src/assets/light-dark.gif)
