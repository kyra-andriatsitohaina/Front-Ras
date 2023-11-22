import {GoogleLogout} from "react-google-login"
import { IdClient } from "../utils/google";
const LogoutGoogle = () => {
    const onLogoutSuccess = ()=>{console.log("deconnected");}
    return (
        <button className="google">
            <GoogleLogout
                clientId={IdClient}
                buttonText="Logout"
                onLogoutSuccess={onLogoutSuccess}
            />
        </button>
    )
}

export default LogoutGoogle