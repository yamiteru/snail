import type { Component } from 'solid-js';
import {useRoutes} from "solid-app-router";
import {routes} from "./routes";

const App: Component = () => {
  const Route = useRoutes(routes);
  return <Route />;
};

export default App;