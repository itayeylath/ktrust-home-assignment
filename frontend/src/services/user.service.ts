import axios from "axios";

export const userService = {
    login,
    signup,
    getUsers,
    deleteUser,
    editUser,
    isAdmin,
};
// Get if the User is admin by Token.
async function isAdmin(token: any) {
    try {
        const users = await axios.get("http://localhost:3000/auth/admin", {
            headers: { Authorization: `${token}` },
        });
        return users;
    } catch (error) {
        return error.response;
    }
}
// get all Users data.
async function getUsers(token: any) {
    try {
        const users = await axios.get("http://localhost:3000/users/all", {
            headers: { Authorization: `${token}` },
        });
        return users;
    } catch (error) {
        return error.response;
    }
}
// Post exsit User.
async function login(userCred: any) {
    try {
        const user = await axios.post(
            "http://localhost:3000/auth/login",
            userCred
        );
        return user;
    } catch (error) {
        return error.response;
    }
}
// Post new User.
async function signup(userCred: any) {
    try {
        const user = await axios.post(
            "http://localhost:3000/auth/register",
            userCred
        );
        return user;
    } catch (error) {
        console.log("ERROR: axios.post");
        return error.response;
    }
}
// Delete User by id.
async function deleteUser(id: any) {
    try {
        const user = await axios.delete(
            "http://localhost:3000/users/delete/" + id
        );
        return user;
    } catch (error) {
        return error.response;
    }
}
// Patch User by id.
async function editUser(id: any, userCred: any) {
    try {
        const user = await axios.patch(
            "http://localhost:3000/users/update/" + id,
            { username: userCred }
        );
        return user;
    } catch (error) {
        console.log("ERROR: axios.patch");
        return error.response;
    }
}
