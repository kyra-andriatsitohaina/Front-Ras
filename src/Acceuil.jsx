import { useEffect, useState } from "react"
import AboutContact from "./components/container/About-contact"
import Popular from "./components/container/Popular"
import Properties from "./components/container/Properties"
import Start from "./components/container/Start"
import { ArticleContext } from "./components/context/Context"
import axios from "axios"
import { UrlApi } from "./api/urlApi"
import Header from "./components/share/Header"
import Footer from "./components/share/footer"

const Acceuil = () => {
    const [data,setData] = useState([])
    useEffect(()=>{
        axios.get(`${UrlApi.baseUrl}articles`)
        .then(res=>setData(res.data))
        .catch(error=>console.log(error))
    },[])
    return (
        <>  
            <Header/>
            <ArticleContext.Provider value={[data,setData]}>
                    <Start/>
                    <Properties/>
            </ArticleContext.Provider>
            <Popular/>
            <AboutContact/>
            <Footer/>

        </>
    )
}

export default Acceuil
