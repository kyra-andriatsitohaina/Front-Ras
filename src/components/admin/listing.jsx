import { useContext, useEffect, useState } from "react";
import { url_api } from "../../api/urlApi";
import axios  from "axios";
import { toast } from 'react-toastify'
import { ArtDetailAdmin, ShowDetailArt } from "../context/Context";


const Listing = () => {
    const [dataArticle,setDataArticle] = useState([])
    const [validate,setValidate]= useState(false)
    const [filterShow,setFilterShow] = useState("all")
    const [showDetailArt,setShowDetail] = useContext(ShowDetailArt)
    const [artDetail,setArtDetail] = useContext(ArtDetailAdmin)
    const handleValidation = (id)=>{const art = dataArticle.find(art=>art.id===id)
        if(art.status=="oui"){
            toast.info(`cet article est deja publié`)
        }else{art.status="oui"
            axios.patch(`${url_api.articles}${id}`,art)
            .then(()=>{setValidate(!validate);toast.success(`article : ${art.title} validé`)})
        }
    }
    const handleDelete = (id)=>{const art = dataArticle.find(art=>art.id===id)
            axios.delete(`${url_api.articles}${id}`,art)
            .then(()=>{setValidate(!validate);toast.success(`article : ${art.title} supprimé`)})
    }
    const handleFilter = (e)=>{if(e.target.value == "all"){setValidate(!validate);setFilterShow("all")
        } else{const val = dataArticle.filter((art)=>art.status=="non");setDataArticle(val);setFilterShow("unvalid")}}

    const showDetail = (art)=>{
        setArtDetail(art)
        setShowDetail(true)
    }

    useEffect(()=>{
        const error  = "erreur de connexion à la base de donnee"
        if(filterShow == "unvalid"){
            axios.get(`${url_api.articles}`)
            .then(res=>{const val = res.data.filter((art)=>art.status=="non");setDataArticle(val)})
            .catch(()=>alert(error));
        }else{
            axios.get(`${url_api.articles}`)
            .then(res=>setDataArticle(res.data))
            .catch(()=>alert(error));
        }
    },[validate,showDetailArt])
    return (    
        <div className="box-listing">
            <div className="filter">
                <select id="filter" onChange={handleFilter}>
                    <option value="all">all</option>
                    <option value="unvalid">en attente</option>
                </select>
            </div>
            <div className="listing">
                {
                dataArticle.length !== 0 ?               
                dataArticle.map(art=>(
                <div key={art.id} className={`${art.status == "oui" ? "box" : "boxi"} `} >
                    <div className={`${art.status == "oui" ? "status" :"en_cours"} `}><h3>{art.status == "oui" ? "publié" : "en attente"}</h3></div>
                    <img src={`${url_api.images}${art.image}`} alt={art.image} onClick={()=>showDetail(art)} />
                    <h2>{art.title}</h2>
                    <p>{art.description}</p>
                    <div className="btns">
                        <button title="validé" onClick={()=>handleValidation(art.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </button>
                        <button title="delete" onClick={()=>handleDelete(art.id)}>
                        <svg   viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 6V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7ZM13.4142 13.9997L15.182 12.232L13.7678 10.8178L12 12.5855L10.2322 10.8178L8.81802 12.232L10.5858 13.9997L8.81802 15.7675L10.2322 17.1817L12 15.4139L13.7678 17.1817L15.182 15.7675L13.4142 13.9997ZM9 4V6H15V4H9Z"/></svg>
                        </button>
                    </div>
                </div>
                ))
                :
                <h2>aucun article à validé</h2>
            }
            </div>
        </div>

    )
}

export default Listing