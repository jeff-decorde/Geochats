# Run the project

* Git clone the project
* Run "npm i"
* Run "npm start"
* The project should open in a new tab
* To run the tests: "npm run test --watchAll"
* To run Flow: "npm run flow"

# Libraries used

## Redux / Redux-Thunk

As the requirements for JavaScript single-page applications have become increasingly complicated, code must manage more state than ever before. Redux allows to dispatch data through actions, store it into reducers grouped in a single global structure called store. It wasn't mandatory to use Redux as the project is pretty small but it gets very handy when the Web app grows bigger.

Redux Thunk middleware allows us to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. I decided to use Redux-Thunk because I'm used to it and I find it very easy to use and understand even for a beginner (contrary to Redux-Saga in my opinion)

## Redux-Responsive

It creates a viewport reducer in the global store. Thanks to this, it's possible to arrange components according to the current dimensions of the screen / window.

## Flow

Flow is an alternative to TypeScript. It allows to type check your variables in your code and thus, avoid runtime errors. It's commonly used with React.

## Jest / Enzyme

Jest is used to run unit tests on JavaScript. Associated with Enzyme, it allows to test React Components very easily.

## React-Google-Maps

As you may have guessed, it it an implementation of Google Maps API in React. Each Google Maps element becomes a React Component, making them very easy to manipulate in a React environment. However, some elements are missing so the features have to be studied before using this library.

## Bulma

A CSS framework providing various built-in elements. I chose this one over Bootstrap or Semantic UI because I think it handles responsiveness in a better way and also because I find it cool :D

## Classnames

It's a small utility managing class names. It makes class names management much more readable.

# Possible improvements

## Create an API reducer

As the application is pretty small, I had to create only one reducer. But when an application grows bigger, it may have to fetch the same data in several pages. Creating one reducer per page will force you to repeat the code of your thunks and actions at some point. The solution to this problem is to create an API reducer "reflecting" your Back-End (one entry dynamically created in the reducer per endpoint called). Then, it becomes very easy to manage the loading / error states and it saves a lot of time since less code is written (and less tests). I've already created something very similar and it works fine :)

## Storybook

Communication between designers and Front-End developers is very important when it comes to React development. Indeed, to build the UI / UX, designers have to know what's possible to do with the core components in order to build a consistent app. Storybook provides a GUI allowing the user to "play" with a component by easily modifying its properties. It can also be used as a repo to share components between different projects.

## Set up a Router (React-Router-Redux) / Build a menu

Again, it's not mandatory here since there is only one page. Setting up a router can be easily done by using React-Router-Redux. It creates a router reducer in the store giving information about the current route. Setting up a router managing several pages implies to create a menu allowing to access those pages (pretty easily done with Bulma).

## Pre-commit hook

Writing a hook running a Flow and a Jest check before committing will avoid breaking changes or runtime errors.

## SCSS / CSS Modules

As you may know, SCSS is processed CSS. It becomes possible to create variables in your CSS code allowing to build a consistent UI Kit. CSS Modules will import your styles as objects. It organises your styles and prevents the developer from overriding an existing class name from a different CSS file by creating a unique identifier for a given class in a given module.
