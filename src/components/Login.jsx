
import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../Utils/validation.jsx";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import { auth } from "../Utils/firebase.jsx";
import handleFirebaseAuthError from "../Utils/handleFirebaseAuthError.jsx";
import { background_URL } from "../Utils/Constants.jsx";
import { useDispatch } from "react-redux";
import { addUser } from "../App/userSlice.js";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = async () => {
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);
        if (message) return;

        setIsLoading(true);

        try {
            if (!isSignInForm) {
                // Sign Up Logic
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email.current.value,
                    password.current.value
                );

                const user = userCredential.user;

                // Update profile
                await updateProfile(user, {
                    displayName: name.current.value,
                });

                // Force a refresh to ensure we have the latest user data
                await user.reload();

                // Get fresh user data
                const freshUser = auth.currentUser;

                // Update Redux store with fresh user data
                dispatch(
                    addUser({
                        uid: freshUser.uid,
                        email: freshUser.email,
                        displayName: freshUser.displayName
                    })
                );

            } else {
                // Sign In Logic
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email.current.value,
                    password.current.value
                );
            }
        } catch (error) {
            setErrorMessage(handleFirebaseAuthError(error));
        } finally {
            setIsLoading(false);
        }
    };

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

    return (
        <div className="relative">
            <Header showFullHeader={false} />
            <div className="absolute flex justify-center items-center w-full z-10 inset-0">
                <form className="bg-black opacity-86 flex flex-col p-15 rounded max-w-md w-full mx-7"
                      onSubmit={(e) => e.preventDefault()}>
                    <h2 className="text-white text-2xl font-bold mb-6">{isSignInForm ? "Sign In" : "Sign Up"}</h2>
                    {!isSignInForm && (
                        <input
                            ref={name}
                            className="bg-gray-950 p-3 my-6 placeholder-white text-white border-1 rounded-2l"
                            type="text"
                            placeholder="Name"
                        />
                    )}
                    <input
                        ref={email}
                        className="bg-gray-950 p-3 my-3 placeholder-white text-white border-1 rounded-2l"
                        type="text"
                        placeholder="Email or mobile number"
                    />
                    <input
                        ref={password}
                        className="bg-gray-950 p-3 my-3 placeholder-white text-white border-1 rounded-2l"
                        type="password"
                        placeholder="Password"
                    />
                    {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                    <button
                        type="button"
                        disabled={isLoading}
                        className="cursor-pointer text-bold bg-red-600 text-white rounded py-3 mt-6 text-sm font-medium rounded-2l disabled:bg-red-400"
                        onClick={handleButtonClick}>
                        {isLoading ? "Please wait..." : (isSignInForm ? "Sign In" : "Sign Up")}
                    </button>

                    <p className="text-gray-400 mx-1 my-9">{!isSignInForm ? "Already registered. " : "New to Netflix ? "}<span
                        className="text-white cursor-pointer hover:brightness-30"
                        onClick={toggleSignInForm}>{!isSignInForm ? "Sign In" : "Sign Up"}.</span></p>
                </form>
            </div>
            <div className="">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/10 to-transparent"></div>
                <img
                    className="w-full"
                    src={background_URL}
                    alt="background"/>
            </div>
        </div>
    );
};
export default Login;