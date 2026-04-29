import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({children, authentication=true}) {
    const authStatus = useSelector(state => state.auth.status);
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        if (authentication && !authStatus) {
            navigate("/login")
        } else if(!authentication && authStatus) {
            navigate("/")
        }
        else {
            setLoader(false)
        }
    }, [navigate, authStatus, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}
export default Protected;