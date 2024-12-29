import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import localStorageWorker from "../utils/LocalStorageWorker";

function SignOut() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorageWorker.removeUser();
        localStorageWorker.removeToken();
        localStorageWorker.removeUserId();

        window.dispatchEvent(new Event('storage'));
        navigate('/');
    }, [navigate]);

    return null;
}

export default SignOut;
