import {  useEffect, useRef, useState } from "react"
import { url_api } from "../../../api/urlApi"
import axios from "axios"
import { toast } from 'react-toastify'

const List = () => {
    const [data,setData] = useState([])
    const [detail,setDetail] = useState([])
    const [showvalue,setShowValue] = useState({hidden:false})
    const [categ,setCateg] = useState()
    const [photo,setPhoto ] = useState()
    const img = useRef()
    const getPhoto = (e)=>{setPhoto(e.target.files[0]);
        img.current.src = window.URL.createObjectURL(e.target.files[0])}
    const showDetail = (id)=>{
        setShowValue({hidden:true})
        const art = data.filter((x)=>x.id === id)
        setDetail([...art])
        setCateg(art[0].category)
    }
    const handleCategory = (e)=>{ setCateg(e.target.value)}

    const formData = new FormData()
    const onSubmit = (e)=>{
        e.preventDefault()
        const form = e.target.elements
        formData.append("title",form.title.value)
        console.log(form.price.value);
        formData.append("price",form.price.value)
        form.image.files[0] !== undefined && formData.append("image",form.image.files[0]);
        formData.append("description",form.desc.value);
        formData.append("category",form.category.value);
        if(form.category.value =="maison"){
            formData.append("superficie",0);
            formData.append("access",0);
            formData.append("chambre",form.chambre.value);
            console.log(form.elec.value);
            (form.eau.checked)?formData.append("eau","oui"):formData.append("eau","non");
            (form.elec.checked)?formData.append("elec","oui"):formData.append("elec","non");
            (form.garage.checked)?formData.append("garage","oui"):formData.append("garage","non");
        }else{
            formData.append("chambre",0);
            formData.append("eau","non");
            formData.append("elec","non");
            formData.append("garage","non");
            formData.append("superficie",form.superficie.value);
            formData.append("access",form.accessibilite.value);
        }
        axios.patch(`${url_api.articles}${detail[0].id}`,formData).then(()=>{toast.success("article modifié ✋");window.location.reload(false)})
    }
    useEffect(()=>{axios.get(url_api.articles).then(res=>setData(res.data)).catch(()=>alert("erreur de connexion à la base de donnée"));},[])
    return (
        <>  
            {
            showvalue.hidden ?
                detail.map((art)=>(
                    <div className="detail" key={art.id}>
                        <form onSubmit={onSubmit}>
                            <div className="content-detail">
                                <div className="form-group">
                                    <label htmlFor="title">title : </label>
                                    <input type="text"defaultValue={art.title}  id="title" required/> 
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">price : </label>
                                    <input type="number" defaultValue={art.price} min={0} id="price"/><span>Ariary</span>
                                </div>  
                                <h3>status : {art.status =="oui"? "publié" : "en cours"}  </h3>
                            </div>
                            <div className="content-detail">
                                <textarea cols="20" rows="5" defaultValue={art.description} required id="desc"></textarea>
                            </div>
                            <div className="content-detail">
                                <label htmlFor="image">
                                    <img src={`${url_api.images}${art.image}`} title="edit photo" ref={img} />
                                </label>
                                <input type="file" id="image" hidden onChange={getPhoto}/>
                                <div className="categ">
                                    <div className="form-group">
                                        <label htmlFor="category">category : &nbsp;</label>
                                        <select id="category" defaultValue={art.category} onChange={handleCategory}>
                                            <option value="maison">maison</option>
                                            <option value="terrain">terrain</option>
                                        </select>
                                    </div>
                                    {
                                    categ == art.category ? 
                                        (<div className="infos">
                                            {
                                                art.category == "terrain" ?
                                                (   
                                                    <>
                                                        <div className="inp">
                                                            <label htmlFor="superficie">superficie : &nbsp;</label>
                                                            <input type="text"  id="superficie" defaultValue={art.superficie}/><span> &nbsp;m<sup>2</sup></span>
                                                        </div>
                                                        <div className="inp">
                                                            <label htmlFor="accessibilite">accessibilite : </label>
                                                                <select  id="accessibilite"  defaultValue={art.access}>
                                                                <option value="moto">moto</option>
                                                                <option value="voiture">voiture</option>
                                                            </select>
                                                        </div> 
                                                    </>
                                                )
                                                :
                                                (   
                                                    <>
                                                        <div className="inp">
                                                            <input type="number" id="chambre" defaultValue={art.chambre} style={{width:"8vw"}}/>
                                                            <label htmlFor="chambre">chambre</label>
                                                        </div>
                                                        <div className="inp">
                                                            {art.elec =="oui" ? <input type="checkbox" id="elec" defaultChecked={true}/>
                                                            :<input type="checkbox" id="elec" />}
                                                            <label htmlFor="elec">electricite</label>
                                                        </div>
                                                        <div className="inp">
                                                            {art.eau =="oui" ? <input type="checkbox"  id="eau"  defaultChecked={true}/> : <input type="checkbox"  id="eau" />}  
                                                            <label htmlFor="eau">eau</label>
                                                        </div>
                                                        <div className="inp">
                                                            {art.garage =="oui" ? <input type="checkbox"  id="garage"  defaultChecked={true} /> : <input type="checkbox"  id="garage" />}
                                                            <label htmlFor="garage">garage</label>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </div>)
                                    : 
                                        (
                                            (<div className="infos">
                                            {
                                                categ == "terrain" ?
                                                (   
                                                    <>
                                                        <div className="inp">
                                                            <label htmlFor="superficie">superficie : &nbsp;</label>
                                                            <input type="text"  id="superficie" defaultValue={detail.superficie}/><span> &nbsp;m<sup>2</sup></span>
                                                        </div>
                                                        <div className="inp">
                                                            <label htmlFor="accessibilite">accessibilite : </label>
                                                                <select  id="accessibilite" >
                                                                <option value="moto">moto</option>
                                                                <option value="voiture">voiture</option>
                                                            </select>
                                                        </div> 
                                                    </>
                                                )
                                                :
                                                (   
                                                    <>
                                                        <div className="inp">
                                                            <input type="number" id="chambre" defaultValue={art.chambre} style={{width:"8vw"}}/>
                                                            <label htmlFor="chambre">chambre</label>
                                                        </div>
                                                        <div className="inp">
                                                            {art.elec =="oui" ? <input type="checkbox" id="elec" defaultChecked={true}/>
                                                            :<input type="checkbox" id="elec" />}
                                                            <label htmlFor="elec">electricite</label>
                                                        </div>
                                                        <div className="inp">
                                                            {art.eau =="oui" ? <input type="checkbox"  id="eau"  defaultChecked={true}/> : <input type="checkbox"  id="eau" />}  
                                                            <label htmlFor="eau">eau</label>
                                                        </div>
                                                        <div className="inp">
                                                            {art.garage =="oui" ? <input type="checkbox"  id="garage"  defaultChecked={true} /> : <input type="checkbox"  id="garage" />}
                                                            <label htmlFor="garage">garage</label>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </div>)
                                        )
                                    }
                                </div>
                            </div>
                            <div className="delai">
                                <h3>date de publication : 23/07/22</h3>
                                <h3>fin de valididé : 23/07/22</h3>
                            </div>
                            <div className="btns">
                                <a onClick={()=>setShowValue({hidden:false})}>annuler</a>
                                <button>update</button>
                            </div>
                        </form>
                    </div>
                ))
             :                           
            <div className="list" style={{flexWrap:"wrap"}}>
                {
                    data.map((art)=>(
                        <div className={art.status == "oui"? "box status" : "box en_cours"} key={art.id} >
                            <h3 className={art.status =="oui"? "valid" :"unvalid"}>{art.status =="oui" ? "publié" : "en cours"}</h3>                      
                            <img src={`${url_api.images}${art.image}`} />
                            <h2>{art.title} </h2>
                            <p>{art.description}</p>
                            <div className="btns">
                                <button title="edit" onClick={()=>showDetail(art.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                </button>
                                <div>
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.0008 17L6.12295 20.5902L7.72105 13.8906L2.49023 9.40983L9.35577 8.85942L12.0008 2.5L14.6458 8.85942L21.5114 9.40983L16.2806 13.8906L17.8787 20.5902L12.0008 17Z"/></svg>
                                <span></span>
                                </div>
                                <button title="delete">
                                <svg   viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 6V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7ZM13.4142 13.9997L15.182 12.232L13.7678 10.8178L12 12.5855L10.2322 10.8178L8.81802 12.232L10.5858 13.9997L8.81802 15.7675L10.2322 17.1817L12 15.4139L13.7678 17.1817L15.182 15.7675L13.4142 13.9997ZM9 4V6H15V4H9Z"/></svg>
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
            }
        </>
    )
}

export default List