import { useDispatch } from "react-redux";

const Body = ({ children }) => {
    const dispatch = useDispatch();

    return (
        <div className="relative overflow-x-hidden">
            {children}
        </div>
    );
};

export default Body;
