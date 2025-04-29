import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../Utils/firebase.jsx";
import {useEffect, useRef, useState} from "react";
import { addUser, removeUser } from "../App/userSlice.js";
import {languages, Logo_URL} from "../Utils/Constants.jsx";
import { setShowGptPage } from "../App/useGptSlice.js";
import {setLanguage} from "../App/useLanguageSlice.js";

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const gptPage = useSelector((store) => store.gpt.showGptPage);


    const handleLanguageChange = (e) =>{dispatch(setLanguage(e.target.value));
    }


    const handleSignOut = () => {
        signOut(auth)
            .then(() => {})
            .catch((error) => {
                navigate("/error");
            });
    };

    const handleGptSearch = () => {
        dispatch(setShowGptPage());
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsUserLoaded(true);
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(
                    addUser({
                        uid: uid,
                        email: email,
                        displayName: displayName
                    })
                );
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });
        return () => unsubscribe();
    }, []);

    // Get current user directly from auth
    const currentDisplayName = auth.currentUser?.displayName || user?.displayName;

    return (
        <div className="absolute w-full px-8 py-2 z-10 bg-gradient-to-b from-black to-transparent">
            <div className="flex justify-between">
                <img
                    className="w-44"
                    src={Logo_URL}
                    alt="logo"
                />
                {user && (
                    <div className="flex justify-end items-center mt-2 gap-3">
                        {gptPage && (<div>
                            <select onChange={handleLanguageChange}
                                className="bg-red-600 text-white m-2 p-2 rounded-2xl cursor-pointer hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none">
                                {languages.map((languages) =>
                                    <option key={languages.identifier} value={languages.identifier}
                                            className="bg-gray-800 hover:bg-gray-700">
                                        {languages.name}
                                    </option>
                                )}
                            </select>
                        </div>)}
                        <button onClick={handleGptSearch}
                                className="
                            text-white px-2 py-1.5 mx-3 bg-red-600 rounded-2xl cursor-pointer
                            hover:bg-red-700 transition-colors"
                        >
                            {gptPage ? "Homepage" : "GPTSearch"}
                        </button>
                        <div className="relative group">
                            <div className="flex items-center gap-2 cursor-pointer text-white">
                                <span className="font-bold">
                                    {currentDisplayName || "User"}
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M19 9l-7 7-7-7"/>
                                </svg>
                            </div>
                            <div
                                className="absolute right-0 mt-2 w-20 bg-black/90 rounded-2xl shadow-lg overflow-hidden scale-0 origin-top-right group-hover:scale-100 transition-all duration-200">
                                <div className="py-0">
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full text-left px-4 py-2 text-sm text-white hover:bg-red-600 transition-colors rounded-3xl"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Header;