import { useContext, useEffect, useState } from "react"
import { ArtDetailAdmin, ShowDetailArt } from "../context/Context"
import { url_api } from "../../api/urlApi";
import axios  from "axios";
import { toast } from 'react-toastify'
const DetailAdmin = () => {
    const [showDetail,setShowDetail] = useContext(ShowDetailArt)
    const [ArtDetail,setArtDetail] = useContext(ArtDetailAdmin)
    const [dataArticle,setDataArticle] = useState([])

    const handleValidation = (id)=>{const art = dataArticle.find(art=>art.id===id)
        if(art.status == "oui"){
            toast.info(`cet article est deja publié`)
        }else{art.status="oui"
            axios.patch(`${url_api.validation}${id}`,art)
            .then(()=>{toast.success(`article : ${art.title} validé`);setShowDetail(false)})
        }
    }
    const handleDelete = (id)=>{const art = dataArticle.find(art=>art.id===id)
        axios.delete(`${url_api.articles}${id}`,art)
        .then(()=>{;setShowDetail(false);toast.success(`article : ${art.title} supprimé`)})
    }
    useEffect(()=>{
        axios.get(`${url_api.articles}`)
        .then(res=>setDataArticle(res.data))
        .catch(()=>alert("erreur de connexion à la bdd"));
    },[])
    return (
        <div className="box-detail">
            <div className="box-content">
                <h2>{ArtDetail.title}</h2>
                <h2>status : <span className={ArtDetail.status == "oui" ? "valid" : "unvalid"}>{ArtDetail.status =="oui" ? "publié" : "non validé"}</span></h2>
            </div>
            <div className="box-content">
                <p>{ArtDetail.description}</p>
            </div>
            <div className="box-content">
                <h3>category : <span>{ArtDetail.category}</span></h3>
                <h3>prix : <span>{ArtDetail.price} Ariary</span> </h3>
            </div>
            <div className="box-content">
                {
                    ArtDetail.category == "maison" && 
                    <>
                        <h3>chambre : <span>{ArtDetail.chambre}</span></h3>
                        <h3>eau : <span>{ArtDetail.eau ? "oui" : "non"}</span></h3>
                        <h3>electricite : <span>{ArtDetail.elec ? "oui" : "non"}</span></h3>
                        <h3>garage : <span>{ArtDetail.garage ? "oui" : "non"}</span></h3>
                    </>
                }
                {
                    ArtDetail.category == "terrain" && 
                    <h3>superficie : <span>{ArtDetail.superficie} m<sup>2</sup></span></h3>
                }
            </div>
            <div className="box-content">
                <h3>accessibilite : <span>{ArtDetail.access}</span></h3>
                <h3>type : <span>{ArtDetail.type}</span></h3>
                <h3>province : <span>{ArtDetail.province}</span></h3>
            </div>
            <div className="box-content">
                <h3>identite : {ArtDetail.name}</h3>
                <h3>contact : <span>{ArtDetail.contact}</span></h3>
            </div>
            <div className="box-content">
                <h3>virement : <span>{ArtDetail.tel_transfert}</span></h3>
                <h3>ref : <span>{ArtDetail.reference}</span></h3>
            </div>
            <div className="box-content">
                {ArtDetail.status =="non" && <h3 style={{textAlign:"center"}}>en attente de votre validation ... </h3>}
                {ArtDetail.status =="oui" && <h3>date de pub : <span>{ArtDetail.date_publication}</span></h3>}
                <h3>validation : <span>{ArtDetail.validation} mois</span></h3>
                {ArtDetail.status =="oui" && <h3>date de fin : <span>{ArtDetail.fin_validation}</span></h3>}
            </div>
            <div className="btns">
                <button onClick={()=>handleValidation(ArtDetail.id)}>validé</button>
                <button onClick={()=>handleDelete(ArtDetail.id)}>supprimer</button>
                <button onClick={()=>setShowDetail(false)}>close</button>
            </div>
        </div>
    )
}

export default DetailAdmin