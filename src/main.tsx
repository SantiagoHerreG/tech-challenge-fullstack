import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./SharedModule/ErrorPage/ErrorPage";
import Home from "./pages/HomePage/HomePage";
import UsersPage from "./pages/UsersPage/UsersPage";
import AccountsPage from "./pages/AccountsPage/AccountsPage";
import MovementsPage from "./pages/MovementsPage/MovementsPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: "", element: <Home /> },
            { path: "users", element: <UsersPage /> },
            { path: "accounts", element: <AccountsPage /> },
            { path: "movements", element: <MovementsPage /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
