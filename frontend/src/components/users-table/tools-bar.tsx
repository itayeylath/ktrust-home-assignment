interface ToolsBarProps {
    handelButtonAdd: any;
}

const ToolsBar = (props: ToolsBarProps) => {
    return (
        <button className="add-btn-container" onClick={props.handelButtonAdd}>
            Add
        </button>
    );
};
export default ToolsBar;
