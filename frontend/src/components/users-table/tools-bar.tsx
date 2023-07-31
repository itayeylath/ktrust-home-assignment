import AddBtn from "../../assets/svgs/add-btn";
import LogOutBtn from "../../assets/svgs/logout-btn";

interface ToolsBarProps {
    handelButtonAdd: any;
    handelButtonLogOut: any;
}

const ToolsBar = (props: ToolsBarProps) => {
    return (
        <div>
            <button
                className="add-btn-container"
                onClick={props.handelButtonAdd}
            >
                <AddBtn></AddBtn>
            </button>

            <button className="logOut-btn-container" onClick={props.handelButtonLogOut}>
                
                <LogOutBtn></LogOutBtn>
            </button>
        </div>
    );
};
export default ToolsBar;
