# the-forum

![The Forum Logo](public/logo192.png)

[Live](https://the-forum-a2ccd.web.app/)

The Forum is a forum site that is so revolutionary that it will transform your expectation of forum site in future. How? You have to experience yourself.

## Getting Started

### Prerequisites

1. Download and install [Node.js](https://nodejs.org/en/)
1. Download and install [Yarn (v1)](https://classic.yarnpkg.com/lang/en/)

### Installing

1. Clone this repo.

   ```bash
   git clone https://github.com/malcolm-kee/the-forum.git
   ```

1. Install all the dependencies

   ```bash
   yarn
   ```

1. Add a `.env.local` file in project root (next to `.env` file) with all the similar parameters specified in `.env` file. Those parameters are obtained from [your Firebase project config](https://support.google.com/firebase/answer/7015592).

### Runing Local Development Server

```bash
yarn start
```

## Running Tests

To run the tests in watch mode, use

```bash
yarn test
```

Else, run the tests and generating code coverage report with:

```bash
yarn test:ci
```

## Deployment

Build frontend bundle with

```bash
yarn build
```

which will generates a `build` folder with all the static files for the application. You can deploy those files in anywhere that can host static files.

Else, if you wish to deploy everything (including Firebase Functions), you need to install [Firebase CLI](https://firebase.google.com/docs/cli) globally and then run the following command in project root:

```bash
firebase deploy
```

## Built With

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase](https://firebase.google.com/) for authentication, database, and hosting.
- [Tailwind](https://tailwindcss.com/) as CSS frameworks
- [Create React App](https://create-react-app.dev/) for build pipeline, test framework setup, and ESLint configuration
