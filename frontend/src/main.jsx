import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

const App = lazy(() => import("./App.jsx"));
const AuthLayout = lazy(() => import("./components/layouts/AuthLayout.jsx"));
const SignIn = lazy(() => import("./components/pages/SignIn.jsx"));
const SignUp = lazy(() => import("./components/pages/SignUp.jsx"));
const NotFound = lazy(() => import("./components/pages/NotFound.jsx"));
const Home = lazy(() => import("./components/pages/Home.jsx"));

import "./styles/css/classes/index.css";

const router = createBrowserRouter([
  {
    index: true,
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <App />
      </Suspense>
    ),
    loader: async () => {
      const module = await import("./App.jsx");
      return module.isAuthLoader();
    },
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <AuthLayout />
      </Suspense>
    ),
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <SignUp />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/home",
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <Home />
      </Suspense>
    ),
    loader: async () => {
      const module = await import("./components/pages/Home.jsx");
      return module.isAuthLoader();
    },
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <NotFound />
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
