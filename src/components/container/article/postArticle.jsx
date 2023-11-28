import { useContext, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { url_api } from "../../../api/urlApi"
import { toast } from 'react-toastify'
import { AuthUser } from "../../context/Context"
import {useNavigate} from "react-router-dom"


const PostArticle = () => {
    const [categ,setCateg] = useState("maison")
    const [paiement,setPaiment] = useState(false)
    const [photo,setPhoto ] = useState()
    const  [dataArticle,setDataArticle] = useState({})
    const [Auth,setAuth]= useContext(AuthUser)
    const [tarif,setTarif] = useState()

    
    const navigate = useNavigate()
    const img = useRef(null)
    const formData = new FormData()
    console.log(categ);
    const getPhoto = (e)=>{setPhoto(e.target.files[0]);img.current.src = window.URL.createObjectURL(e.target.files[0])}; 
    const handleCategory = (e)=>{setCateg(e.target.value);}
    const onSubmit = (data,e)=>{
        e.preventDefault
        setPaiment(true)
        setDataArticle({...data})
    }
    
    const validArticle = (data,e)=>{
        e.preventDefault
       
        const values = {...dataArticle}
        formData.append("title",values.title)
        formData.append("description",values.description)
        formData.append("price",values.price)
        formData.append("image",photo)
        formData.append("type",values.type)
        formData.append("province",values.province)
        formData.append("category",categ)
        formData.append("chambre",values.chambre);
        formData.append("tel",values.tel);
        formData.append("access",values.accessibilite);

        (values.elec == false) ? (formData.append("elec","non")):formData.append("elec","oui");
        (values.eau == false) ? (formData.append("eau","non")):formData.append("eau","oui");
        (values.garage == false) ? (formData.append("garage","non")):formData.append("garage","oui");
        formData.append("status","non");
        (values.superficie == undefined) ? (formData.append("superficie",0)):formData.append("superficie",values.superficie);

        formData.append("reference",data.reference);
        formData.append("tel_transfert",data.tel_transfert);
        formData.append("name",data.nom);
        formData.append("contact",data.contact);
        formData.append("validation",data.tarif);
        axios.post(`${url_api.articles}${Auth.data.id}`,formData);
        toast.success("article ajouté 👍")
        setTimeout(()=>{
            toast.info("en attente de validation avant la publication 🆗 ")
            navigate("/article/list")
        },1000)

    }
    const registerForm = ()=>{
        const {handleSubmit,register,formState:{errors}}=useForm()
        return {handleSubmit,register,formState:{errors}}
    }
    const forms = {
        add:registerForm(),
        reference:registerForm()
    }
    useEffect(()=>{
        axios.get(`${url_api.tarif}`)
        .then(res=>setTarif(res.data))
        .catch(()=>alert("erreur de connexion à la bdd"))
    },[dataArticle])
    return (
        <div className="new">
            <h2 id="title">post new  article</h2>
            {
                paiement ?
                <>
                    <form className="paiement" onSubmit={forms.reference.handleSubmit(validArticle)}>
                        <div className="ref">
                            <input type="text" placeholder="reference du virement" {...forms.reference.register("reference")} required/>
                            <input type="tel" maxLength={10} minLength={10} placeholder="tel du transfert" {...forms.reference.register("tel_transfert")} required/>
                        </div>
                        <div className="identity">
                            <input type="text" placeholder="nom du vendeur ..." {...forms.reference.register("nom")} required/>
                            <input type="tel" id="tel" {...forms.reference.register("contact")} placeholder="contact du vendeur ..." required maxLength={10} minLength={10}/>
                        </div>
                        <div className="validity">
                            {
                                tarif.map((tar)=>(
                                    <label htmlFor={`val${tar.id}`}>
                                        <div className="tarif">
                                            <input type="radio" name="validity" id={`val${tar.id}`} value={tar.validity} {...forms.reference.register("tarif")}/>
                                            <h3>{tar.validity} month</h3>
                                        </div>
                                        <h4>{tar.tarif} ariary</h4>
                                    </label>
                                ))
                            }
                        </div>
                        <div className="btns">
                            <a onClick={()=>setPaiment(false)}>retour</a>
                            <button>valider</button>
                        </div>
                    </form>
                </>
                : 
                <form onSubmit={forms.add.handleSubmit(onSubmit)}>
                    <div className="title-price">
                    <input type="text" placeholder="titre" {...forms.add.register("title")} required/>
                    <select {...forms.add.register("type")}>
                        <option value="rent">rent</option>
                        <option value="sale">sale</option>
                        <option value="offer">offer</option>
                    </select>
                    <select {...forms.add.register("province")}>
                        <option value="antananarivo">antananarivo</option>
                        <option value="antsiranana">antsiranana</option>
                        <option value="fianarantsoa">fianarantsoa</option>
                        <option value="mahajanga">mahajanga</option>
                        <option value="toliara">toliara</option>
                        <option value="toamasina">toamasina</option>
                    </select>
                    <div className="form-group">
                        <label htmlFor="price">prix :</label>
                        <input type="number" id="price" min={0} defaultValue={0} {...forms.add.register("price")}/><span>Ariary</span>
                    </div>
                    </div>
                    <textarea cols="30" rows="5" placeholder="description" required {...forms.add.register("description")}></textarea>
                    <div className="input-category">
                      <div className="select-category">
                        <select id="category" onChange={handleCategory} >
                            <option value="maison">maison</option>
                            <option value="terrain">terrain</option>
                        </select>
                        <label htmlFor="image">
                            <img src="../img/image-add-fill.svg" style={{width:"3.5vw",height:"3.5vw"}} ref={img} />
                        </label>
                        <input type="file" onChange={getPhoto} id="image" hidden/>
                      </div>
                      <div className="categValue">
                        {
                            categ=="terrain" ?
                            <div className="terrain">
                                <div className="form-group">
                                    <label htmlFor="superficie">superficie :</label>
                                    <input type="number"  min={0} defaultValue={0} {...forms.add.register("superficie")}/><span>m2</span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="accessibilite">accessibilite :</label>
                                    <select {...forms.add.register("accessibilite")} id="accessibilite">
                                        <option value="moto">moto</option>
                                        <option value="vehicule">vehicule</option>
                                    </select>
                                </div>
                            </div>
                            :
                            <div className="maison">
                                <div className="form-group">
                                    <label htmlFor="chambre">nombre de chambre :</label>
                                    <input type="number" min={0} defaultValue={0} {...forms.add.register("chambre")} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="accessibilite">accessibilite :</label>
                                    <select {...forms.add.register("accessibilite")} id="accessibilite">
                                        <option value="moto">moto</option>
                                        <option value="vehicule">vehicule</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <div className="inp">
                                        <input type="checkbox"  id="elec" {...forms.add.register("elec")} />
                                        <label htmlFor="elec">electricité</label>
                                    </div>
                                    <div className="inp">
                                        <input type="checkbox"  id="eau" {...forms.add.register("eau")} />
                                        <label htmlFor="eau">eau</label>
                                    </div>
                                    <div className="inp">
                                        <input type="checkbox" id="garage" {...forms.add.register("garage")} />
                                        <label htmlFor="garage">garage</label>
                                    </div>
                                </div>
                            </div>
                        }
                      </div>
                    </div>
                    <button>next</button>
                </form>
            }
        </div>

    )   
}

export default PostArticle