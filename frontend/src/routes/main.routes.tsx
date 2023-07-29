import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import HomePage from "../pages/ home-page";

export const MainRoutes = () => {
    return (
        <Routes>
            <Route index element={<Login />} />
            <Route path="home" element={<HomePage />} />
        </Routes>
    );
};
