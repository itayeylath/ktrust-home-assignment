import { useEffect, useState } from "react";
import { userService } from "../services/user.service";
import AdminTable from "../components/users-table/admin-table";
import AddForm from "../components/users-table/add-form";
import ToolsBar from "../components/users-table/tools-bar";
import { useLoginForm } from "../hooks/useLoginForm";
import EditForm from "../components/users-table/edit-form ";
import { useNavigate } from "react-router-dom";

const HomePageAdmin = () => {
    const [data, setData] = useState<any[] | []>([]);
    const [addButton, setAddButton] = useState<boolean>(false);
    const [updatebutton, setUpdatebutton] = useState<boolean>(false);
    const [updateData, setUpdateData] = useState<any | undefined>();
    //const [isConfirmAdd, setIsConfirmAdd] = useState<boolean>(false);

    const tableHeadlist: string[] = ["Username", "Email"];
    const formInputList: string[] = ["username", "email"];
    const editHeadlist: string[] = ["Username"];
    const editformInputList: string[] = ["username"];
    const addHeadlist: string[] = ["Username", "Email", "Password"];
    const addformInputList: string[] = ["username", "email", "password"];
    const navigate = useNavigate();

    // Get all data from server at thee refresh/start
    useEffect(() => {
        userService.getUsers().then((result: any) => {
            setData(result.data);
        });
    }, [updatebutton, addButton]);

    const {
        username,
        setUsername,
        password,
        setPassword,
        email,
        setEmail,
        errors,
        handleSubmit,
        validateInput,
        confirmPassword,
        setConfirmPassword,
    } = useLoginForm({ isLogin: false });


    //TODO
    // Click on add button.
    const handelButtonAdd = () => {
        setAddButton(!addButton);
        setUpdatebutton(false);
    };
    //TODO
    // Submit form data to server for add.
    const handelSubmitAdd = () => {
        //event.preventDefault();
        //const data = new FormData(event.target);
        // Server request.
        console.log("isConfirmAdd");
        // setIsConfirmAdd(!isConfirmAdd)
        // setData((value: any) => [...value, Object.fromEntries(data)]);
    };
    //TODO
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
    //TODO
    // Click on update button.
    const handelButtonUpdate = async (element: any, id: string, index: any) => {
        setUpdateData({name: element.username, id: id, index: index}
            
            );
            setUpdatebutton(!updatebutton);
            setAddButton(false);
        };
        //TODO
        // Submit form data to server for update.
        const handelSubmitUpdate = async (event: any,id: number) => {
            event.preventDefault();
            console.log("id: ", updateData.id)
        const element = Object.fromEntries(new FormData(event.target));
        console.log("element: ", element.username)
        userService.editUser(updateData.id,element.username).then((result: any) => {})
        // Server request.
        
    };

    return (
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
            <button className="" onClick={() => navigate(-1)}>
                Logout
            </button>
        </div>
    );
};

export default HomePageAdmin;
