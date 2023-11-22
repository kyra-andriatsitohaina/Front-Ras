import {Route, Routes } from "react-router-dom"
import NotFound from "./components/container/not-found/notfound"
import Acceuil from "./Acceuil"
import {  useEffect, useState } from "react"
import { AuthUser, DetailContext, ModalContext } from "./components/context/Context"
import { useCookies } from "react-cookie"
import { jwtDecode } from "jwt-decode"
import Article from "./components/container/article/article"
import List from "./components/container/article/list"

const App = () => {
    const [UserData,setUserData] =  useState({status:false,data:{}})
    const [modalContext,setModalContext] = useState({show:false,login:false})
    const [detailContext,setDetailContext] = useState({hidden:false})

    const [cookies, setCookie, removeCookie] = useCookies(['_auth']);
    
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
                                {cookies._auth &&
                                    <Route element={<Article/>}>
                                        <Route path="/article/list" element={<List/>}/>
                                        <Route path="/article/edit" element={<h2>edit</h2>}/>
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