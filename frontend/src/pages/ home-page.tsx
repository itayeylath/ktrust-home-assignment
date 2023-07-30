import { useEffect, useState } from "react";
import { userService } from "../services/user.service";
import UserTable from "../components/users-table/user-table";
import { useNavigate } from "react-router-dom";
import { store } from "../store";

const HomePage = () => {
    const [data, setData] = useState<any[] | []>([]);
    const [addButton, setAddButton] = useState<boolean>(false);
    const [updatebutton, setUpdatebutton] = useState<boolean>(false);
    const [updateData, setUpdateData] = useState<any | undefined>();
    const [errorData, setErrorData] = useState<any | undefined>("");
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    // Get all data from server at thee refresh/start
    useEffect(() => {
        userService.getUsers().then((result: any) => {
            try {
                setData(result.data);
            } catch (error) {
                setErrorData(error);
            }
        });
    }, []);

    const tableHeadlist: string[] = ["Username", "Email"];
    const formInputList: string[] = ["username", "email"];
    const editHeadlist: string[] = ["Username"];
    const editformInputList: string[] = ["username"];
    const addHeadlist: string[] = ["Username", "Email", "Password"];
    const addformInputList: string[] = ["username", "email", "password"];
    const navigate = useNavigate();
    //TODO
    // Click on add button.
    const handelButtonAdd = () => {
        setAddButton(!addButton);
        setUpdatebutton(false);
    };
    //TODO
    // Submit form data to server for add.
    const handelSubmitAdd = async (event: any) => {
        event.preventDefault();
        const data = new FormData(event.target);
        // Server request.
        setData((value: any) => [...value, Object.fromEntries(data)]);
    };
    //TODO
    // Click on delete button.
    const handelButtonDelete = async (index: number) => {
        // TODO: add Server request.

        // TODO: expport to utilis (?)
        let newData = [];

        for (let i = 0; i < data.length; i++) {
            if (i !== index) {
                newData.push(data[i]);
            }
        }

        setData(newData);
    };
    //TODO
    // Click on update button.
    const handelButtonUpdate = async (element: any, index: number) => {
        setUpdateData({
            element: element,
            index: index,
        });
        setUpdatebutton(!updatebutton);
        setAddButton(false);
    };
    //TODO
    // Submit form data to server for update.
    const handelSubmitUpdate = async (event: any) => {
        event.preventDefault();
        const element = Object.fromEntries(new FormData(event.target));
        // Server request.
        // TODO: expport to utilis (?)
        let newData = [];

        for (let i = 0; i < data.length; i++) {
            if (i !== updateData.index) {
                newData.push(data[i]);
            } else {
                newData.push(element);
            }
        }
        setData(newData);
        console.log(newData);
    };

    return (
        <div>
            {!errorData && (
                ((!isAdmin && <UserTable
                    head={tableHeadlist}
                    body={data}
                    elementTypes={formInputList}
                    handelButtonDelete={handelButtonDelete}
                    handelButtonUpdate={handelButtonUpdate}
                />) )
            )}
            <button className="" onClick={() => navigate(-1)}>
                Logout
            </button>
        </div>
    );
};

export default HomePage;
