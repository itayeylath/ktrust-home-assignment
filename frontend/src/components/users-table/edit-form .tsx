import { create2DArray } from "../../utilities/add-form-func";
interface AddFormProps {
    inputsNames: string[];
    placeholdersNames: string[];
    handelSubmitAdd: any;
    updateData: any;
}

const EditForm = (props: AddFormProps) => {
    const svgArr: any = [];

    const arr = create2DArray(
        props.inputsNames,
        props.placeholdersNames,
        svgArr
    );

    return (
        <div className="add-row">
            <form onSubmit={props.handelSubmitAdd}>
                {arr.map((element: string, index: number) => {
                    return (
                        <div>
                              <h3 className="header3-container"> USERNAME</h3>  
                        <div className="email-container" key={index}>
                           <label className="email-lable" htmlFor="username">
                            <div key={index + 1}>
                                {element[1]}
                            </div>
                            <input
                                className={"password-input"}
                                key={index + 2}
                                name={element[0]}
                                defaultValue={props.updateData}
                            />
                            </label>
                        </div>
                        </div>
                    );
                })}
                <input
                    className="form-button confirm-btn"
                    type="submit"
                    value="Confirm"
                ></input>
            </form>
        </div>
    );
};
export default EditForm;
