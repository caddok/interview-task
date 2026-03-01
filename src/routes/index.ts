import type { RouteObject } from "react-router-dom";
import { createElement } from "react";
import Index from "@/pages/Index";
import MovieDetails from "@/pages/MovieDetails";
import NotFound from "@/pages/NotFound";

export const routes: RouteObject[] = [
  { path: "/", element: createElement(Index) },
  { path: "/movie/:id", element: createElement(MovieDetails) },
  { path: "*", element: createElement(NotFound) },
];
