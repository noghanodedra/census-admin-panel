# census-admin-panel

#react #genric-crud #material-ui #jwt #secure-cookies #session-timeout

# Census Admin Panel (Population registration app)

- Admin panel for managing census activity by back office.

- This is a basic client app built while learning react and material-ui. 

- This app does not cover all the use cases related to population registration but the intention is to cover react, react-router fundamentals add basic features like login, security(JWT, secure cookie, authorization using tokens), validations, navigation, theming etc.

- Generic CRUD is implemented to avoid redundant code for same activity.

- Login, Authenticaton, Authorization, CRUD , Session-management, Localisation is implemented(English, Gujarati)

### Live App - Deployed on heroku

[Live](https://census-admin-panel.herokuapp.com)

### Prerequisites

Please install latest [NodeJS](https://nodejs.org/en/) & NPM which is required to run this app.

This app is integrated with [GraphQL-Apollo-Express-Server](https://github.com/noghanodedra/census-graphql-server).
So you will need to clone this repository locally and follow set up intructions available on that repository.

You will need to have Xcode and iOS simulator set up for IOS and for Android will need respective SDK & emulator set up before hand.

### Installing

Clone the repository by below command.

```
git clone https://github.com/noghanodedra/census-admin-panel.git
```

Then CD to cloned repo folder by

```
cd census-admin-panel
npm install
```

### Locally running the app

Use below commands to start the app locally from the project root folder for respective platforms.

```
npm run dev
```

### Test users

Following test users are readily availabe to test the look and feel of the app.

```
admin@admin.com/admin
```

```
dev@dev.com/dev
```

```
test@test.com/test
```

## Built With

-   [React](https://reactjs.org/) - A JavaScript library for building user interfaces
-   [Material-ui](https://material-ui.com/) - React components for faster and easier web development. Build your own design system, or start with Material Design.
-   [i18next](https://www.i18next.com/) - I18next is an internationalization-framework written in and for JavaScript. But it's much more than that.
-   [Webpack](https://webpack.js.org/) - Bundling code

## Authors

-   **Noghan Odedra** - (https://www.linkedin.com/in/noghanodedra)
