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
        <div className="relative min-h-screen">
            <Header showFullHeader={false} />
            <div className="absolute flex justify-center items-center w-full z-10 inset-0">
                <form className="bg-black/80 flex flex-col p-4 sm:p-6 md:p-8 rounded-lg max-w-md w-[90%] sm:w-[80%] md:w-[70%] mx-auto"
                      onSubmit={(e) => e.preventDefault()}>
                    <h2 className="text-white text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{isSignInForm ? "Sign In" : "Sign Up"}</h2>
                    {!isSignInForm && (
                        <input
                            ref={name}
                            className="bg-gray-950 p-2 sm:p-3 my-3 sm:my-4 placeholder-white text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            type="text"
                            placeholder="Name"
                        />
                    )}
                    <input
                        ref={email}
                        className="bg-gray-950 p-2 sm:p-3 my-3 placeholder-white text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        type="text"
                        placeholder="Email or mobile number"
                        defaultValue="testing@gmail.com"
                    />
                    <input
                        ref={password}
                        className="bg-gray-950 p-2 sm:p-3 my-3 placeholder-white text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        type="password"
                        placeholder="Password"
                        defaultValue="@Test123"
                    />
                    {errorMessage && <p className="text-red-600 text-sm sm:text-base">{errorMessage}</p>}
                    <button
                        type="button"
                        disabled={isLoading}
                        className="cursor-pointer text-bold bg-red-600 text-white rounded-md py-2 sm:py-3 mt-4 sm:mt-6 text-sm sm:text-base font-medium hover:bg-red-700 transition-colors disabled:bg-red-400"
                        onClick={handleButtonClick}>
                        {isLoading ? "Please wait..." : (isSignInForm ? "Sign In" : "Sign Up")}
                    </button>

                    <p className="text-gray-400 mx-1 my-6 sm:my-8 text-sm sm:text-base">{!isSignInForm ? "Already registered. " : "New to Netflix ? "}<span
                        className="text-white cursor-pointer hover:brightness-30"
                        onClick={toggleSignInForm}>{!isSignInForm ? "Sign In" : "Sign Up"}.</span></p>
                </form>
            </div>
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/10 to-transparent"></div>
                <img
                    className="w-full h-full object-cover"
                    src={background_URL}
                    alt="background"/>
            </div>
        </div>
    );
};
export default Login;