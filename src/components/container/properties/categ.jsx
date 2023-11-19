import { useContext } from "react"
import { ArticleContext, CategoryContext, DetailContext, ModalContext } from "../../context/Context"
import Slider from "react-slick";
import { SettingSlick } from "../../utils/slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { UrlApi } from "../../../api/urlApi";

const Categories = ({category}) => {
    const [data,setData] = useContext(ArticleContext)
    const [dataCategory,setDataCategory] = useContext(CategoryContext)
    const [modalContext,setModalContext] = useContext(ModalContext)
    const [detailContext,setDetailContext] = useContext(DetailContext)
    const filtre = []
    const tabSetting = []
    for(let i= 0 ; i< category.length;i++){filtre.push(data.filter((d)=>d.category === category[i]));tabSetting.push({...SettingSlick})}

    const showDetail = (data)=>{setModalContext(true);setDetailContext({hidden:true,data})}
    const handleFavorite = ()=>{

    }
    return (
        <>
            {
                filtre.map((d,index)=>(
                <div className="categ" key={index}>
                    <div style={{width:"100%",borderRadius:".5vw"}}>
                        <div className="title-desc">
                            <h2>{dataCategory[index].category}</h2>
                            <p>{dataCategory[index].description}</p>
                        </div>
                        <Slider {...tabSetting[index]} >
                            {
                                d.map((data,index)=>
                                    <div key={index}>
                                        <div className="property" >
                                            {
                                                data && <img src={`${UrlApi.baseUrl}client/images/${data.image}`} alt={data.image} onClick={()=>showDetail(data)} title="details"/>
                                            }
                                            <h3>{data.title}</h3>
                                            <p>{data.description}</p>
                                            <div className="btns">
                                                <button onClick={(e)=>handleFavorite(e)} title="add favorite">
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