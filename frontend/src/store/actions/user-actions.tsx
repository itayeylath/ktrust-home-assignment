import { userService } from "../../services/user.service";

interface UserToLogIn {
    username: string;
    password: string;
}

interface UserToRegister extends UserToLogIn {
    email: string;
}

interface LogginInUser extends UserToRegister, UserToLogIn {}
// Login User and dispatch data.
export const login = (userToLogIn: UserToLogIn) => {
    return async function (dispatch: any): Promise<any> {
        try {
            const { data, status } = await userService.login(userToLogIn);
            dispatch({ type: "LOGIN", loggedInUser: data });
            if (status !== 200) {
                dispatch({ type: "LOGIN", loggedInUser: null });
                throw Error(
                    `User was not found, following error: ${data.error}`
                );
            }

            return () => status;
        } catch (error) {
            dispatch({ type: "LOGIN", loggedInUser: null });
            throw error;
        }
    };
};
// Signup new User and dispatch data.
export const signup = (userToRegister: UserToRegister) => {
    return async (dispatch: any): Promise<any> => {
        try {
            const { data, status } = await userService.signup(userToRegister);
            dispatch({ type: "LOGIN", loggedInUser: data });

            if (status !== 200) {
                dispatch({ type: "LOGIN", loggedInUser: null });
                throw new Error(
                    `User was not able to register, following error: ${data.error}`
                );
            }
        } catch (error) {
            dispatch({ type: "LOGIN", loggedInUser: null });
            console.error(error);
        }
    };
};
// Logout User and dispatch data.
export const logout = (loggedInUser: LogginInUser) => {
    return async (dispatch: any): Promise<any> => {
        try {
            dispatch({ type: "LOGOUT", loggedInUser: null });
        } catch (error) {
            dispatch({ type: "LOGOUT", loggedInUser });
            console.error(error);
        }
    };
};
