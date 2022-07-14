import {useState} from 'react';
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/for-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const handleChange = (event) => {
        setFormFields({
            ...formFields,
            [event.target.name]: event.target.value
        })
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password === confirmPassword) {
            try {
                const {user} = await createAuthUserWithEmailAndPassword(email, password);
                console.log(user)
                const userDocRef = await createUserDocumentFromAuth({...user, displayName: displayName});
                console.log(userDocRef);
                resetFormFields();
            } catch (err) {
                if (err.code === 'auth/email-already-in-use') {
                    alert('Email already exists')
                }
                console.error('error while creating user', err);
            }
        } else {
            alert("passwords do not match")
        }
    }

    return (
        <div className={'sign-up-container'}>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label={"Display Name"}
                    required
                    onChange={handleChange}
                    name={'displayName'}
                    type={"text"}
                    value={displayName}
                />
                <FormInput
                    label={"Email"}
                    type={'email'}
                    required
                    onChange={handleChange}
                    name={'email'}
                    value={email}
                />
                <FormInput
                    label={"Password"}
                    type={'password'}
                    required
                    onChange={handleChange}
                    name={'password'}
                    value={password}
                />
                <FormInput
                    label={"Confirm Password"}
                    type={'password'}
                    required
                    onChange={handleChange}
                    name={'confirmPassword'}
                    value={confirmPassword}
                />
                <Button type={'submit'}>Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm