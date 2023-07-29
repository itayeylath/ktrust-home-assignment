import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";


export const MainRoutes = () => {
    return (
        <Routes>
            <Route index element={<Login />} />
        </Routes>
    );
};
