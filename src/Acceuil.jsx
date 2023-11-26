import { useEffect, useState } from "react"
import AboutContact from "./components/container/About-contact"
import Properties from "./components/container/Properties"
import Start from "./components/container/Start"
import { ArticleContext, SearchContext} from "./components/context/Context"
import axios from "axios"
import { url_api } from "./api/urlApi"
import Header from "./components/share/Header"
import Footer from "./components/share/footer"
import Modal from "./components/modal/modal"
import Popular from "./components/container/Popular"

const Acceuil = () => {
    const [data,setData] = useState([])
    const [search,setSearch] = useState({active:false,result:0,query:""})

    const setStatus = (data)=>{
        const d= data.filter((x)=>x.status===true)
        setData(d)
    }
    useEffect(()=>{
        axios.get(url_api.articles)
        .then(res=>setStatus(res.data))
        .catch(()=>alert("erreur de connexion à la base de donnée"))
    },[])
    return (
        <>          
            <Modal/>
            <Header/>
            <SearchContext.Provider value={[search,setSearch]}>
                <ArticleContext.Provider value={[data,setData]}>
                    <Start/>
                    <Properties/>
                    <Popular/>
                </ArticleContext.Provider>
            </SearchContext.Provider>
            <AboutContact/>
            <Footer/>
        </>
    )
}

export default Acceuil
