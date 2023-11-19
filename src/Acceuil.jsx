import { useEffect, useState } from "react"
import AboutContact from "./components/container/About-contact"
import Popular from "./components/container/Popular"
import Properties from "./components/container/Properties"
import Start from "./components/container/Start"
import { ArticleContext, DetailContext, LoginContext, ModalContext } from "./components/context/Context"
import axios from "axios"
import { UrlApi } from "./api/urlApi"
import Header from "./components/share/Header"
import Footer from "./components/share/footer"
import Modal from "./components/modal/modal"

const Acceuil = () => {
    const [data,setData] = useState([])
    useEffect(()=>{
        axios.get(`${UrlApi.baseUrl}articles`)
        .then(res=>setData(res.data))
        .catch(()=>alert("erreur de connexion à la base de donnée"))
    },[])
    const [modalContext,setModalContext] = useState(false)
    const [loginContext,setLoginContext] = useState(false)
    const [detailContext,setDetailContext] = useState({hidden:false})
    return (
        <>  
            <LoginContext.Provider value={[loginContext,setLoginContext]}>
                <ModalContext.Provider value={[modalContext,setModalContext]}>
                    <DetailContext.Provider value={[detailContext,setDetailContext]}>
                        <Modal/>
                        <Header/>
                        <ArticleContext.Provider value={[data,setData]}>
                                <Start/>
                                <Properties/>
                        </ArticleContext.Provider>
                    </DetailContext.Provider>
                </ModalContext.Provider>
            </LoginContext.Provider>
            <Popular/>
            <AboutContact/>
            <Footer/>
        </>
    )
}

export default Acceuil
