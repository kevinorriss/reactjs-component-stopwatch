# Stopwatch

A React widget stopwatch

## Prerequisites

This component makes use of Bootstrap 4 class names, install bootstrap to your project or apply your own styles to the class names.

* [React ^16.9.0](https://reactjs.org/) - Javascript library for user interfaces

## Installing

```
npm install @kevinorriss/stopwatch
```

## Usage

Import the component

```
import Stopwatch from '@kevinorriss/stopwatch'

...

<!-- JSX -->
<div className="your-container">
    <Stopwatch />
</div>
```

## Development

This repo comes with a react app for development purposes. To get started, open a terminal in the root of the project and then:

### Link the component to the app
```
cd ./component
yarn link

cd ..
yarn link @kevinorriss/stopwatch
```

### Start the app
```
yarn start
```

### Start the rollup watcher
```
cd ./component
npm run dev
```

Whenever you make a change to the component code, the react app will update.

## Tests
```
yarn test --watchAll
```

This project uses Jest and Enzyme for its unit tests, simply run the above code to run the test suites.

If you want the tests to run during development, you will need to have rollup watching too!

## Author

* **Kevin Orriss** - [orriss.io](http://orriss.io)

## License

This project is licensed under the ISC License