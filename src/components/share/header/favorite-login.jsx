import { useContext } from "react"
import { LoginContext, ModalContext } from "../../context/Context"

const FavoriteLogin = () => {
    const [Modal,setModal] =  useContext(ModalContext)
    const [loginContext,setLoginContext] =  useContext(LoginContext)
    const setContext = ()=>{setModal(true);setLoginContext(true)}
    return (
        <div className="favorites-login">
            <button>
                <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"/></svg>
                <span>favorites</span>
            </button>
            <button onClick={setContext}>
                <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M4 15H6V20H18V4H6V9H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V15ZM10 11V8L15 12L10 16V13H2V11H10Z"/></svg>
                <span>login/register</span>
            </button>
        </div>
    )
}

export default FavoriteLogin