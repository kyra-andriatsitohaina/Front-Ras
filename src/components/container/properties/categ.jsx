import { useContext, useEffect, useState } from "react"
import { ArticleContext, AuthUser, CategoryContext, DetailContext, ModalContext, SearchContext, SortContext } from "../../context/Context"
import Slider from "react-slick";
import { SettingSlick } from "../../utils/slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { url_api } from "../../../api/urlApi";
import axios from "axios"
import { toast } from 'react-toastify'

const Categories = ({category}) => {
    const [data,setData] = useContext(ArticleContext)
    const [dataCategory,setDataCategory] = useContext(CategoryContext)
    const [modalContext,setModalContext] = useContext(ModalContext)
    const [detailContext,setDetailContext] = useContext(DetailContext)
    const [search,setSearch] = useContext(SearchContext)
    const [Auth,setAuth] = useContext(AuthUser)
    const [sort,setSort] = useContext(SortContext)
    const filtre = []
    const tabSetting = []
    for(let i= 0 ; i< category.length;i++){
        if(sort){filtre.push(data.reverse().filter((d)=>d.province === category[i]));tabSetting.push({...SettingSlick})}else{filtre.push(data.sort().filter((d)=>d.province === category[i]));tabSetting.push({...SettingSlick})}}
    const showDetail = (data)=>{setModalContext({show:true,login:false});setDetailContext({hidden:true,data})}
    const handleFavorite = ({...data})=>{
        const UserId = Auth.data.id
        axios.post(`${url_api.favorite}${UserId}`,data).then(res=>{res.data.status ? toast.success("article ajouté a vos favoris") : toast.info("cet article a ete supp de vos favoris")}).catch(()=>alert("connexion echoué"))
    }

    const showAll = ()=>{
        setSearch({active:false,result:0,query:""})
        axios.get(url_api.articles)
        .then(res=>setData(res.data))
        .catch(()=>alert("erreur de connexion à la base de donnée"))
    }
    return (

        <>  
            {search.active && 
                <div style={{padding:"2vw",width:"100%",marginBottom:"1vw",display:"flex",justifyContent:"space-between",alignItems:"center",background:"whitesmoke",borderRadius:".5vw"}}>
                    <h4 id="result">{search.result} resultat{parseInt(search.result)> 2 && "s"} sur <span> " {search.query} " </span></h4> 
                    <button onClick={showAll} id="all">All</button>
                </div>
            }
            {   
                filtre.map((d,index)=>(
                <div className="categ" key={index}>
                    <div style={{width:"100%",borderRadius:".5vw"}}>
                        {
                            d[0] &&
                            <div className="title-desc">
                                <h2>{dataCategory[index].province}</h2>
                                <p>{dataCategory[index].description}</p>
                            </div>
                        }
                            <Slider  {...tabSetting[index]} >
                                {
                                    d.map((data,i)=>
                                        <div key={i} >
                                            <div className="property" >
                                                {
                                                    data && <img src={`${url_api.images}${data.image}`} alt={data.image} onClick={()=>showDetail(data)} title="details"/>
                                                }
                                                <h3>{data.title}</h3>
                                                <p>{data.description}</p>
                                                <div className="btns">
                                                    <button onClick={()=>handleFavorite({id:data.id,title:data.title})} title="add favorite">
                                                        <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"/></svg>
                                                        <span>favorite</span>
                                                    </button>
                                                    <button disabled>{data.price} ar</button>
                                                </div>
                                            </div>
                                    </div>
                                    )
                                }
                            </Slider>
                    </div>
                </div>))
            }
        </>
    )
}

export default Categories