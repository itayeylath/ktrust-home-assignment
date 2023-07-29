import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import HomePageAdmin from "../pages/ home-page-admin";
import HomePage from "../pages/ home-page";

export const MainRoutes = () => {
    return (
        <Routes>
            <Route index element={<Login />} />
            <Route path="home/admin" element={<HomePageAdmin />} />
            <Route path="home/" element={<HomePage />} />
        </Routes>
    );
};
