import { useLoginForm } from "../../hooks/useLoginForm";
import { create2DArray } from "../../utilities/add-form-func";
import { Email } from "../inputs/email";
import { Password } from "../inputs/password";
import { Username } from "../inputs/username";

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
        <div className="add-form">
      <form onSubmit={props.handelSubmitAdd}>
        {arr.map((element: string, index: number) => {
          return (
            <div className="add-row" key={index}>
              <div className="add-icon" key={index+1}>
              {element[1]}
              </div>
              <input
                className="add-input"
                key={index+2}
                name={element[0]}
                defaultValue={props.updateData}
              />
            </div>
          );
        })}
        <input className="btn-confirm" type="submit" value="Confirm" ></input>
      </form>
    </div>
    );
};
export default EditForm;
