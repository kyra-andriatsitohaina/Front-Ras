import { useContext } from "react"
import { AuthUser, DetailContext, ModalContext } from "../../context/Context"
import { useCookies } from "react-cookie"
import { url_api } from "../../../api/urlApi"
import { toast } from 'react-toastify'


const FavoriteLogin = () => {
    const [Modal,setModal] =  useContext(ModalContext)
    const [detailContext,setDetailContext] =  useContext(DetailContext)
    const [cookies, setCookie, removeCookie] = useCookies(['_auth']);
    const [Auth,setAuth]= useContext(AuthUser)
    const Logout = ()=>{
        removeCookie(["_auth"],{path:"/"})
        toast.success("deconnexion en cours 😩")
        setTimeout(()=>{
            window.location.reload(false)
        },2000)
    }
        
    return (
        <div className="favorites-login">
            <button>
                <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"/></svg>
                <span>favorites</span>
            </button>
            {
                Auth.status ? (
                    <button title="se deconnecté" onClick={Logout}>
                        <img src={`${url_api.images}${Auth.data.photo}`} alt={Auth.data.pseudo} style={{width:"3vw",height:"3vw",boxShadow:"0 0 .3vw white",borderRadius:"50%"}}/>
                    </button>
                ) 
                : (
                <button onClick={()=>{setModal({show:true,login:true});setDetailContext({hidden:false})}}>
                    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M4 15H6V20H18V4H6V9H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V15ZM10 11V8L15 12L10 16V13H2V11H10Z"/></svg>
                    <span>login/register</span>
                </button>
                )
            }
        </div>
    )
}

export default FavoriteLogin