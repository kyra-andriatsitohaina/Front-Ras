import { useContext, useState } from "react"
import { AuthAdmin, EditAdmin } from "../context/Context"
import { useCookies } from "react-cookie"
import { toast } from 'react-toastify'
import {useNavigate} from "react-router-dom"
import EditProfileAdmin from "./edit"

const AsideNav = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['_admin']);
    const [Admin,setAdmin] = useContext(AuthAdmin)
    const [Edit,setEdit] = useState(false)
    const navigate = useNavigate()
    const logout = ()=>{
        removeCookie(["_admin"],{path:"/"})
        toast.success("deconnexion en cours 😩")
        setTimeout(()=>{
            navigate("/admin/login");
            window.location.reload(false)
        },1000)
    }
    return (
        <>  
            <EditAdmin.Provider value={[Edit,setEdit]}>
                <div className={Edit ? "showEditProfile" : "editProfile"}>
                    <EditProfileAdmin/>
                </div>
            </EditAdmin.Provider>
                
            <div className="asideNav">
                <div className="logo">
                    <img src="../../img/shape.png" alt="" />
                    <h1>Rasamy Gab</h1>
                </div>
                <div className="adminAuth">
                    <h2>{Admin.data.email}</h2>
                    <div className="btns">
                        <button onClick={()=>setEdit(true)}>edit</button>
                        <button onClick={logout}>logout</button>
                    </div>
                </div>
                <div className="menu">
                </div>
            </div>
        </>
    )
}

export default AsideNav
