import type { Component } from 'solid-js';
import {useRoutes} from "solid-app-router";
import {routes} from "./routes";

const App: Component = () => {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  const Route = useRoutes(routes);
  return <Route />;
};

export default App;