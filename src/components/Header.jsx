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

    const handleLanguageChange = (e) =>{
        dispatch(setLanguage(e.target.value));
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
                // Check for demo mode
                if (import.meta.env.VITE_DEMO_MODE === 'true') {
                    // Set demo user for testing
                    dispatch(
                        addUser({
                            uid: 'demo-user',
                            email: 'demo@test.com',
                            displayName: 'Demo User'
                        })
                    );
                    navigate("/browse");
                } else {
                    navigate("/");
                }
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
                    className="w-24 md:w-44"
                    src={Logo_URL}
                    alt="logo"
                />
                {user && (
                    <div className="flex flex-wrap justify-end items-center gap-1 md:gap-3">
                        {gptPage && (
                            <div>
                                <select onChange={handleLanguageChange}
                                        className="bg-red-600 text-white text-xs md:text-base m-1 md:m-2 p-1 md:p-2 rounded-md md:rounded-2xl cursor-pointer hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none">
                                    {languages.map((languages) =>
                                        <option key={languages.identifier} value={languages.identifier}
                                                className="bg-gray-800 hover:bg-gray-700">
                                            {languages.name}
                                        </option>
                                    )}
                                </select>
                            </div>
                        )}
                        <button onClick={handleGptSearch}
                                className="
                            text-white text-xs md:text-base px-1 md:px-2 py-1 md:py-1.5 mx-1 md:mx-3 bg-red-600 rounded-md md:rounded-2xl cursor-pointer
                            hover:bg-red-700 transition-colors"
                        >
                            {gptPage ? "Home" : "GPTSearch"}
                        </button>
                        <button onClick={() => navigate("/interview")}
                                className="
                            text-white text-xs md:text-base px-1 md:px-2 py-1 md:py-1.5 mx-1 md:mx-3 bg-blue-600 rounded-md md:rounded-2xl cursor-pointer
                            hover:bg-blue-700 transition-colors"
                        >
                            Interview
                        </button>
                        <div className="relative group">
                            <div className="flex items-center gap-1 md:gap-2 cursor-pointer text-white">
                                <span className="text-xs md:text-base font-bold truncate max-w-16 md:max-w-none">
                                    {currentDisplayName || "User"}
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className="h-3 w-3 md:h-4 md:w-4 transition-transform duration-200 group-hover:rotate-180"
                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M19 9l-7 7-7-7"/>
                                </svg>
                            </div>
                            <div
                                className="absolute right-0 mt-2 w-16 md:w-20 bg-black/90 rounded-md md:rounded-2xl shadow-lg overflow-hidden scale-0 origin-top-right group-hover:scale-100 transition-all duration-200">
                                <div className="py-0">
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full text-left px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm text-white hover:bg-red-600 transition-colors rounded-md md:rounded-3xl"
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