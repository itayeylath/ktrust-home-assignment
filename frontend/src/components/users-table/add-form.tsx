
import { create2DArray } from "../../utilities/add-form-func";


interface AddFormProps {
  inputsNames: string[];
  placeholdersNames: string[];
  handelSubmitAdd: any;
}

const AddForm = (props: AddFormProps) => {
  const svgArr: any = [

  ];
  const arr = create2DArray(props.inputsNames, props.placeholdersNames, svgArr);

  return (
    <div className="add-form">
      <form onSubmit={props.handelSubmitAdd}>
        {arr.map((element: any, index: number) => {
          return (
            <div className="add-row" key={index}>
              <div className="add-icon">{element[2]}</div>
              <input
                className="add-input"
                key={index}
                name={element[0]}
                placeholder={element[1]}
              />
            </div>
          );
        })}
        <input className="btn-confirm" type="submit" value="Confirm"></input>
      </form>
    </div>
  );
};
export default AddForm;
