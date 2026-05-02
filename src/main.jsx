import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import { RouterProvider } from "react-router-dom";
import { Login, AuthLayout, Signup } from "./components/index.js";

import Home from "./components/pages/Home.jsx";
import AllPosts from "./components/pages/AllPosts.jsx";
import Post from "./components/pages/Post.jsx";
import EditPost from "./components/pages/EditPost.jsx";
import AddPost from "./components/pages/AddPost.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path="/login"
        element={
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        }
      />
      <Route 
        path="/signup"
        element={
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        }
      />
      <Route 
        path="/"
        element={<Home />}
      />
      <Route 
      path="/all-posts"
       element={<AuthLayout authentication>
            {" "}
            <AllPosts />
          </AuthLayout>}
      />
      <Route 
      path="/add-post"
      element={<AuthLayout authentication>
            {" "}
            <AddPost />
          </AuthLayout>}
      />
      <Route 
      path="/edit-post/:slug"
      element={<AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>}
      />
      <Route 
      path="/post/:slug"
      element={<Post />}
      />
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
