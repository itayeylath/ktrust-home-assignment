import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login-page";
import HomePageAdmin from "../pages/ home-page-admin";
import HomePage from "../pages/ home-page";
import { Signup } from "../pages/signup-page";

export const MainRoutes = () => {
    return (
        <Routes>
            <Route index element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="home/admin" element={<HomePageAdmin />} />
            <Route path="home/" element={<HomePage />} />
        </Routes>
    );
};
