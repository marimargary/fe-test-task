# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

# Test Task Frontend

## Description
This project is a React TypeScript application aimed at managing user data. It provides functionality for creating new users, editing existing user information (such as email, phone, and allergies), and displaying a list of users.

## Installation
To run this application locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the necessary dependencies.
4. After installation, run `npm run dev` to start the development server.

## Usage
Once the application is running locally, you can access it via your web browser. The application consists of the following pages:

- **Create User**: Allows you to create a new user by filling out a form.
- **Update User**: Enables editing of specific user information, such as email, phone number, and allergies.
- **User List**: Displays a list of all users currently stored in the system.

## Technologies Used
- React: JavaScript library for building user interfaces.
- TypeScript: Superset of JavaScript that adds static typing.
- Vite: Fast frontend build tool that provides a modern development experience.
- Redux Toolkit: State management library for React applications.
- React Router: Declarative routing for React applications.
- Material-UI: React component library for building UIs.
- Tailwind CSS: Utility-first CSS framework for quickly building custom designs.
- Emotion: CSS-in-JS library for styling React components.
- ESLint & Prettier: Tools for ensuring code quality and consistency.
- PostCSS & Autoprefixer: Tools for transforming CSS with JavaScript plugins.

## Contributing
Contributions to this project are welcome. Feel free to open issues or pull requests with any improvements or bug fixes.