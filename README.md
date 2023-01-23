# React Redux Assessment

This project was created with CRA and Typescript.

Initially it was created with Vite but I couldnt get Redux Saga to work with Vite.

# Starting the app

Install dependencies with

```
npm install 
or 
yarn
```

Run the app with

```
npm start 
or 
yarn start
```

# Deployment

This project was deployed at [react-redux-assessment](https://react-redux-assessment.vercel.app/)

This deployment will be removed and the repository will be archived once the assessment review is complete

# Personal Feedback

Things I would change:
- use NextJS instead of classic React
- use Vite instead of CRA (Vite had some issues with Redux Saga but im sure its just a setup issue
- use Tailwind and Headless UI instead of Material UI (Material UI can be used with Tailwind but installing a big package just for a few components will bloat the repository unnecessarily in my opinion)
- Drop Redux Saga and use TanStack Query for data fetching and Context API for state management (This is due to since this project is a single pager, setting up Redux Saga seems abit unnecessary, TanStack Query also helps with stale data validation)

Things I would keep:
- Typescript (Vital for creating a performant, good, secure and maintainable applications)
- Eslint (Making sure that the code base adhere to certain code style and standard)
