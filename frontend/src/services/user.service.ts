import axios from 'axios';

export const userService = {
    login,
    signup,
    getUsers,
};

const STORAGE_KEY_LOGGEDIN_USER: string = "loggedinUser";

async function getUsers() {
    try {
        const users = await axios.get("http://localhost:3000/users/all");
        return users;
    } catch (error) {
        return error.response;
    }
}

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
async function signup(userCred: any) {
    try {
        const user = await axios.post(
            "http://localhost:3000/auth/register",
            userCred
        );
        return user
        //return saveLocalUser(user);
    } catch (error) {
        console.log("ERROR: axios.post");
        return error.response;
    }
}


