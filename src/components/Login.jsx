import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../Utils/Validation.jsx";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,

} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import handleFirebaseAuthError from "../Utils/handleFirebaseAuthError.jsx";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);
        if (message) return;

        if (!isSignInForm) {
            // Sign Up Logic
            createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value,
                    })
                        .then(() => {
                        })
                        .catch((error) => {
                            setErrorMessage(handleFirebaseAuthError(error));
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        } else {
            // Sign In Logic
            signInWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/browse");
                })
                .catch((error) => {
                    setErrorMessage(handleFirebaseAuthError(error));
                });
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
                        className="cursor-pointer text-bold bg-red-600 text-white rounded py-3 mt-6 text-sm font-medium rounded-2l"
                        onClick={handleButtonClick}>
                        {isSignInForm ? "Sign In" : "Sign Up"}</button>

                    <p className="text-gray-400 mx-1 my-9">{!isSignInForm ? "Already registered. " : "New to Netflix ? "}<span
                        className="text-white cursor-pointer hover:brightness-30"
                        onClick={toggleSignInForm}>{!isSignInForm ? "Sign In" : "Sign Up"}.</span></p>
                </form>
            </div>
            <div className="">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/10 to-transparent"></div>
                <img
                    className="w-full bg-gradient-to-b from-black "
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/69bec183-9cc8-49d4-8fc2-08228d3c91b4/web/IN-en-20250414-TRIFECTA-perspective_c8273fb1-8860-4ff5-bd1c-c2c4b44d5f2a_large.jpg"
                    alt="background"/>
            </div>
        </div>
    );
};
export default Login;

