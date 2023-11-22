import { useEffect, useState } from "react"
import AboutContact from "./components/container/About-contact"
import Properties from "./components/container/Properties"
import Start from "./components/container/Start"
import { ArticleContext} from "./components/context/Context"
import axios from "axios"
import { url_api } from "./api/urlApi"
import Header from "./components/share/Header"
import Footer from "./components/share/footer"
import Modal from "./components/modal/modal"
import Popular from "./components/container/Popular"

const Acceuil = () => {
    const [data,setData] = useState([])
    useEffect(()=>{
        axios.get(url_api.articles)
        .then(res=>setData(res.data))
        .catch(()=>alert("erreur de connexion à la base de donnée"))
    },[])
    return (
        <>          
            <Modal/>
            <Header/>
            <ArticleContext.Provider value={[data,setData]}>
                <Start/>
                <Properties/>
                <Popular/>
            </ArticleContext.Provider>
            <AboutContact/>
            <Footer/>
        </>
    )
}

export default Acceuil
