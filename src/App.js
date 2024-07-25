import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { Provider } from "react-redux";
import appStore from "./utils/appStore";

import Home from "./components/Home";
import Login from "./components/Login";

import UserContext from "./utils/context/userContext";

import { getUserAPI } from "./utils/client/loginClient";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(()=> {
    getUserInfo();
  },[])

  const getUserInfo = () => {
    getUserAPI("jithin")
    .then(res => {
      setLoggedInUser(res)
    })
    .catch(err => {
      console.log('err', err)
    })
  }

  return   <>
  <UserContext.Provider
    value={{ userInfo: loggedInUser, setLoggedInUser }}
  >
    <Outlet />
  </UserContext.Provider>
</>
}
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
    //   errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
