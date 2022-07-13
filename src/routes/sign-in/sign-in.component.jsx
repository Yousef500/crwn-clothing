import {createUserDocumentFromAuth, signInWithGooglePopup} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        console.log({user});
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    return (
        <>
            <div>Sign In Page</div>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <SignUpForm/>
        </>
    );
};

export default SignIn;
