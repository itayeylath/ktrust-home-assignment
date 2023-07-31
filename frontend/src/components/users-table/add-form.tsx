import { useLoginForm } from "../../hooks/useLoginForm";
import { create2DArray } from "../../utilities/add-form-func";
import { Email } from "../inputs/email";
import { Password } from "../inputs/password";
import { Username } from "../inputs/username";

interface AddFormProps {
    inputsNames: string[];
    placeholdersNames: string[];
    handelSubmitAdd: any;
}

const AddForm = (props: AddFormProps) => {
    const svgArr: any = [];

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

    const arr = create2DArray(
        props.inputsNames,
        props.placeholdersNames,
        svgArr
    );

    return (
        <div className="">
            <form onSubmit={handleSubmit}>
                <div className="add-row">
                    <Username
                        errors={errors}
                        setUsername={setUsername}
                        validateInput={validateInput}
                        username={username}
                    />
                </div>
                <div className="add-row">
                    <Password
                        errors={errors}
                        setPassword={setPassword}
                        validateInput={validateInput}
                        password={password}
                    />
                </div>
                <div className="add-row">
                    <Email
                        errors={errors}
                        setEmail={setEmail}
                        validateInput={validateInput}
                        email={email}
                    />
                </div>

                <button className="form-button confirm-btn" type="submit">
                    CONFIRM
                </button>
            </form>
        </div>
    );
};
export default AddForm;
