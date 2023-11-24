import { Link, Outlet } from "react-router-dom"
import { url_api } from "../../../api/urlApi"
import { useContext } from "react"
import { AuthUser } from "../../context/Context"
import { useCookies } from "react-cookie"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Article = () => {
    const [Auth,setAuth]= useContext(AuthUser)
    const [cookies, setCookie, removeCookie] = useCookies(['_auth']);
    const navigate = useNavigate()

    const Logout = ()=>{
        toast.success("deconnexion en cours 😩")
        setTimeout(()=>{
            navigate("/",{state:"vous etes deconncté"})
            window.location.reload(false)
            removeCookie(["_auth"],{path:"/"})
        },1000)
    }
    return (
        <section className="article">
            <div className="nav">
                <div className="user">
                    <img src={`${url_api.images}${Auth.data.photo}`} alt={Auth.data.pseudo} />
                    <div className="action">
                        <button>edit profile</button>
                        <button onClick={Logout}>deconnexion</button>
                    </div>
                </div>
                <nav className="menu">
                    <ul>
                        <li><Link to={"/"}>Home</Link></li>
                        <li><Link to={"/article/list"}>list</Link></li>
                        <li><Link to={"/article/new"}>add</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="container">
                <Outlet/> 
            </div>

        </section>
    )
}

export default Article
