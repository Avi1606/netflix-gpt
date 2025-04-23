import { signOut } from "firebase/auth";
import React from 'react';
import { auth } from "../Utils/Firebase.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "./Logo.jsx";

const Header = ({ showFullHeader = true }) => {
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Successfully logged out");
            navigate('/');
        }).catch((error) => {
            // An error happened.
            console.error("Logout error:", error);
        });
    }

    return (
        <div className="">
            <Logo />
            
            {showFullHeader && (
                <div className="flex justify-end items-center mt-2">
                    <h1 className="text-black font-bold mr-4">
                        Welcome, {user?.displayName}
                    </h1>
                    <button
                        onClick={handleSignOut}
                        className="text-white p-2 m-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
