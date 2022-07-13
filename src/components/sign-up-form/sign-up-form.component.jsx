import {useState} from 'react';
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";

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
            } catch (e) {
                if (e.code === 'auth/email-already-in-use') {
                    alert('Email already exists')
                }
                console.error('error while creating user', e);
            }
        } else {
            alert("passwords do not match")
        }
    }

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input type={"text"} required onChange={handleChange} name={'displayName'} value={displayName}/>
                <label>Email</label>
                <input type={'email'} required onChange={handleChange} name={'email'} value={email}/>
                <label>Password</label>
                <input type={'password'} required onChange={handleChange} name={'password'} value={password}/>
                <label>Confirm Password</label>
                <input type={'password'} required onChange={handleChange} name={'confirmPassword'}
                       value={confirmPassword}/>
                <button type={'submit'}>SIGN UP</button>
            </form>
        </div>
    );
}

export default SignUpForm