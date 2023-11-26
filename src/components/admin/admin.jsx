import { useEffect, useState } from "react"
import {Outlet} from "react-router-dom"
import { ArtDetailAdmin, AuthAdmin, ShowDetailArt } from "../context/Context"
import DetailAdmin from "./detail"
import { useCookies } from "react-cookie"
import { jwtDecode } from "jwt-decode"

const Admin = () => {
    const [showDetail,setShowDetail] = useState(false)
    const [artDetail,setArtDetail] = useState([])
    const [AdminData,setAdminData] =  useState({status:false,data:{}})
    const [cookies, setCookie, removeCookie] = useCookies(['_admin']);
    
    useEffect(()=>{
        cookies._admin && setAdminData({status:true,data:{...jwtDecode(cookies._admin)}})
    },[])
    return (
        <section className="admin">
            <AuthAdmin.Provider value={[AdminData,setAdminData]}>
                <ShowDetailArt.Provider value={[showDetail,setShowDetail]}>
                    <ArtDetailAdmin.Provider value={[artDetail,setArtDetail]}>
                            <div className={showDetail ? "trans": "detailArt "  } >
                                <DetailAdmin/>
                            </div>
                            <Outlet/>
                    </ArtDetailAdmin.Provider>
                </ShowDetailArt.Provider>
            </AuthAdmin.Provider>
        </section>
    )
}

export default Admin
