import {Route, Routes } from "react-router-dom"
import NotFound from "./components/container/not-found/notfound"
import Acceuil from "./Acceuil"
import {  useEffect, useState } from "react"
import { AuthUser, DetailContext, ModalContext } from "./components/context/Context"
import { useCookies } from "react-cookie"
import { jwtDecode } from "jwt-decode"
import Article from "./components/container/article/article"
import List from "./components/container/article/list"
import Admin from "./components/admin/admin"
import LoginAdmin from "./components/admin/loginAdmin"
import Dasboard from "./components/admin/dashboard"
import Listing from "./components/admin/listing"
import PostArticle from "./components/container/article/postArticle"

const App = () => {
    const [UserData,setUserData] =  useState({status:false,data:{}})
    const [modalContext,setModalContext] = useState({show:false,login:false})
    const [detailContext,setDetailContext] = useState({hidden:false})

    const [cookies, setCookie, removeCookie] = useCookies(['_auth',"_admin"]);
    
    useEffect(()=>{
        cookies._auth && setUserData({status:true,data:{...jwtDecode(cookies._auth)}})
    },[])
    return (
        <>  
            <AuthUser.Provider value={[UserData,setUserData]}>
                    <ModalContext.Provider value={[modalContext,setModalContext]}>
                        <DetailContext.Provider value={[detailContext,setDetailContext]}>
                            <Routes>
                                <Route path="/" element={<Acceuil/>}/> 
                                <Route element={<Admin/>}>
                                    <Route path="/admin/login" element={<LoginAdmin/>}/>
                                    {cookies._admin &&
                                        <Route element={<Dasboard/>}>
                                            <Route path="/admin/dashboard/list" element={<Listing/>}/>
                                        </Route>
                                    }
                                </Route>
                                {cookies._auth &&
                                    <Route element={<Article/>}>
                                        <Route path="/article/list" element={<List/>}/>
                                        <Route path="/article/new" element={<PostArticle/>}/>
                                        <Route path="/article/add" element={<h2>add</h2>}/>
                                    </Route>
                                } 
                                <Route path="*" element={<NotFound/>}/>
                            </Routes>
                        </DetailContext.Provider>
                    </ModalContext.Provider>
            </AuthUser.Provider>
        </>
    )
}

export default App