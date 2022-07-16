import { useState } from "react";
import {
    SignInUserWithEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/for-input.component";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password } = formFields;

    const signInWithGoogle = async () => {
        try {
            await signInWithGooglePopup();
        } catch (e) {
            alert("Something went wrong");
            console.error("sign in with google error", e);
        }
    };

    const handleChange = (e) => {
        setFormFields({
            ...formFields,
            [e.target.name]: e.target.value,
        });
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await SignInUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (err) {
            switch (err.code) {
                case "auth/wrong-password":
                    alert("Wrong password");
                    break;
                case "auth/user-not-found":
                    alert(
                        "This email doesn't exist, might want to register instead."
                    );
                    break;
                case "auth/too-many-requests":
                    alert("Too many retries, please try again later.");
                    break;
                default:
                    alert("Something went wrong");
                    console.log("sign in with email", err);
                    break;
            }
        }
    };

    return (
        <div className={"sign-up-container"}>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label={"Display Name"}
                    required
                    onChange={handleChange}
                    name={"displayName"}
                    type={"text"}
                    value={displayName}
                />
                <FormInput
                    label={"Email"}
                    type={"email"}
                    required
                    onChange={handleChange}
                    name={"email"}
                    value={email}
                />
                <FormInput
                    label={"Password"}
                    type={"password"}
                    required
                    onChange={handleChange}
                    name={"password"}
                    value={password}
                />
                <div className={"buttons-container"}>
                    <Button type={"submit"}>Sign in</Button>
                    <Button
                        type={"button"}
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        onClick={signInWithGoogle}
                    >
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
