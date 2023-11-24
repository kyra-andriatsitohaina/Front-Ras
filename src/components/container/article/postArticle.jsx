import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { url_api } from "../../../api/urlApi"
import { toast } from 'react-toastify'


const PostArticle = () => {
    const [categ,setCateg] = useState(false)
    const [paiement,setPaiment] = useState(false)
    const [photo,setPhoto ] = useState()
    const  [dataArticle,setDataArticle] = useState({})
    const formData = new FormData()

    const getPhoto = (e)=>{setPhoto(e.target.files[0])}; const handleCategory = ()=>{setCateg(!categ)}
    const onSubmit = (data,e)=>{
        e.preventDefault
        setPaiment(true)
        setDataArticle({...data})
    }
    
    const validArticle = (data,e)=>{
        e.preventDefault
        const values = {...dataArticle}
        categ ? (values.category="terrain") : (values.category="maison")
        formData.append("title",values.title)
        formData.append("description",values.description)
        formData.append("price",values.price)
        formData.append("image",photo)
        formData.append("type",values.type)
        formData.append("province",values.province)
        formData.append("category",values.category)
        formData.append("chambre",values.chambre)
        formData.append("elec",values.elec)
        formData.append("eau",values.eau)
        formData.append("garage",values.garage)
        formData.append("status",false);
        (values.superficie == undefined) ? (formData.append("superficie",0)):formData.append("superficie",values.superficie);
        formData.append("contact",data.contact);
        formData.append("reference",data.reference);
        axios.post(`${url_api.articles}`,formData)
        
        toast.success("article ajouté 👍")
        
        setTimeout(()=>{
            toast.info("en attente de validation avant la publication 🆗 ")
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
        setCateg(false)
    },[dataArticle])
    return (
        <div className="new">
            <h2 id="title">post new  article</h2>
            {
                paiement ?
                <>
                    <form className="paiement" onSubmit={forms.reference.handleSubmit(validArticle)}>
                        <a onClick={()=>setPaiment(false)}>retour</a>
                        <input type="tel" maxLength={10} minLength={10} placeholder="numero de telephone" {...forms.reference.register("contact")} />
                        <input type="text" placeholder="reference du virement" {...forms.reference.register("reference")}/>
                        <button>valider</button>
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
                        <select id="category" onChange={handleCategory}>
                            <option value="maison">maison</option>
                            <option value="terrain">terrain</option>
                        </select>
                        <label htmlFor="image">
                            <img src="../img/image-add-fill.svg" style={{width:"3.5vw",height:"3.5vw"}}/>
                        </label>
                        <input type="file" onChange={getPhoto} id="image" hidden/>
                      </div>
                      <div className="categValue">
                        {
                            categ ?
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