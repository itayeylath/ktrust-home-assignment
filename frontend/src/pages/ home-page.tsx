import { useEffect, useState, useContext } from "react";
import { userService } from "../services/user.service";
import UserTable from "../components/users-table/user-table";
import { useNavigate } from "react-router-dom";
import ToolsBar from "../components/users-table/tools-bar";
import AdminTable from "../components/users-table/admin-table";
import AddForm from "../components/users-table/add-form";
import EditForm from "../components/users-table/edit-form ";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { logout } from "../store/actions/user-actions";

const HomePage = () => {
    const [data, setData] = useState<any[] | []>([]);
    const [addButton, setAddButton] = useState<boolean>(false);
    const [updatebutton, setUpdatebutton] = useState<boolean>(false);
    const [updateData, setUpdateData] = useState<any | undefined>();
    const [errorData, setErrorData] = useState<any | undefined>("");
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    //const [userContext, setUserContext]= useContext<any>(LoginUserContextApi)
    const { loggedInUser } = useSelector((state: any): any => state.userModule);
    // Get all data from server at thee refresh/start
    useEffect(() => {

        let token = localStorage.getItem("myToken")
        if (!token) {
            token = loggedInUser.authentication.sessionToken
        }
        if (token) {
            localStorage.setItem("myToken", token);
            userService.isAdmin(token).then((result: any) => {
                if (result.status === 200) {
                    setIsAdmin(true);
                }
            });
            userService.getUsers(token).then((result: any) => {
                try {
                    setData(result.data);
                } catch (error) {
                    setErrorData(error);
                }
            });

        } 
    }, [updatebutton, addButton]);

    const tableHeadlist: string[] = ["Username", "Email"];
    const formInputList: string[] = ["username", "email"];
    const editHeadlist: string[] = ["Username"];
    const editformInputList: string[] = ["username"];
    const addHeadlist: string[] = ["Username", "Email", "Password"];
    const addformInputList: string[] = ["username", "email", "password"];
    const navigate = useNavigate();

     const logoutOnClick = () => {
        localStorage.removeItem("myToken")
        navigate("/")
     }
    // Click on add button.
    const handelButtonAdd = () => {
        setAddButton(!addButton);
        setUpdatebutton(false);
    };
    //TODO
    // Submit form data to server for add.
    const handelSubmitAdd = async (event: any) => {
        // event.preventDefault();
        // const data = new FormData(event.target);
        // // Server request.
        // setData((value: any) => [...value, Object.fromEntries(data)]);
    };

    // Click on delete button.
    const handelButtonDelete = async (index: number, id: string) => {
        // TODO: add Server request.
        userService.deleteUser(id).then((result: any) => {
            let newData = [];

            for (let i = 0; i < data.length; i++) {
                if (i !== index) {
                    newData.push(data[i]);
                }
            }

            setData(newData);
        });
    };
    // Click on update button.
    const handelButtonUpdate = async (element: any, id: string, index: any) => {
        setUpdateData({ name: element.username, id: id, index: index });
        setUpdatebutton(!updatebutton);
        setAddButton(false);
    };
    // Submit form data to server for update.
    const handelSubmitUpdate = async (event: any, id: number) => {
        event.preventDefault();
        console.log("id: ", updateData.id);
        const element = Object.fromEntries(new FormData(event.target));
        console.log("element: ", element.username);
        userService
            .editUser(updateData.id, element.username)
            .then((result: any) => {});
    };

    return (
        <div>
            {!errorData &&
                (!isAdmin ? (
                    <div>
                        {" "}
                        <UserTable
                            head={tableHeadlist}
                            body={data}
                            elementTypes={formInputList}
                            handelButtonDelete={handelButtonDelete}
                            handelButtonUpdate={handelButtonUpdate}
                        />
                        <button className="" onClick={logoutOnClick}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div>
                        <ToolsBar handelButtonAdd={handelButtonAdd} />

                        <AdminTable
                            head={tableHeadlist}
                            body={data}
                            elementTypes={formInputList}
                            handelButtonDelete={handelButtonDelete}
                            handelButtonUpdate={handelButtonUpdate}
                        />
                        <div className="hidden-divs">
                            {addButton && (
                                <AddForm
                                    inputsNames={addformInputList}
                                    placeholdersNames={addHeadlist}
                                    handelSubmitAdd={handelSubmitAdd}
                                />
                            )}
                            {updatebutton && (
                                <EditForm
                                    inputsNames={editformInputList}
                                    placeholdersNames={editHeadlist}
                                    handelSubmitAdd={handelSubmitUpdate}
                                    updateData={updateData.name}
                                />
                            )}
                        </div>
                        <button className="" onClick={logoutOnClick}>
                            Logout
                        </button>
                    </div>
                ))}
        </div>
    );
};

export default HomePage;
