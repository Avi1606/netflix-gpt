import {onAuthStateChanged, signOut} from "firebase/auth";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import {useEffect} from "react";
import {addUser, removeUser} from "../App/UserSlice.jsx";
import {Logo_URL} from "../Utils/Constanats.jsx";

const Header = () => {

    const navigate = useNavigate();

    const user = useSelector((store) => store.user);

    const dispatch = useDispatch();

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
            })
            .catch((error) => {
                navigate("/error");
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
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

    return (
        <div className="absolute w-screen px-8 py-2 z-10 flex justify-between">
            <img
                className="w-44"
                src={Logo_URL}
                alt="logo"
            />
            {user && (
                <div className="flex justify-end items-center mt-2">
                    <h1 className="text-black font-bold mr-4">
                        Welcome, {user?.displayName}
                    </h1>
                    <button
                        onClick={handleSignOut}
                        className="cursor-pointer text-white p-2 m-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};
export default Header;
