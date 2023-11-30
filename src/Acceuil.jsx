import { useEffect, useState } from "react"
import AboutContact from "./components/container/About-contact"
import Properties from "./components/container/Properties"
import Start from "./components/container/Start"
import { ArticleContext, SearchContext, SortContext} from "./components/context/Context"
import axios from "axios"
import { url_api } from "./api/urlApi"
import Header from "./components/share/Header"
import Footer from "./components/share/footer"
import Modal from "./components/modal/modal"
import Popular from "./components/container/Popular";

const Acceuil = () => {
    const [data,setData] = useState([])
    const [search,setSearch] = useState({active:false,result:0,query:""})
    const [popular,setPopular] = useState([])
    const [sort,setSort] = useState(true)
    const valid = []
    const setStatus = async (data)=>{
        const d = data.filter((x)=>x.status==="oui")
        setPopular(d)
        const date1 = new Date().toLocaleDateString()
        const arrDate1= date1.split("/").reverse()
        const val = [...d]
        for (let i = 0; i < val.length; i++) {
            let date2 = (val[i].fin_validation).split("/").reverse()
            if(new Date(arrDate1.join(" , ")) < new Date(date2.join(" , "))){
                valid.push(val[i])
            }else{
                axios.patch(`${url_api.delValidation}${val[i].id}`,{status:"non"})
            }
        }
        setData(valid)
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
            <SortContext.Provider value={[sort,setSort]}>
                <ArticleContext.Provider value={[data,setData]}>
                    <SearchContext.Provider value={[search,setSearch]}>
                            <Start/>
                            <Properties/>
                            <Popular popular={popular}/>
                    </SearchContext.Provider>
                </ArticleContext.Provider>
            </SortContext.Provider>
            <AboutContact/>
            <Footer/>
        </>
    )
}

export default Acceuil
