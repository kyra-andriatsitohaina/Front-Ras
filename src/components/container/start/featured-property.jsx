import { useContext, useEffect, useState } from "react"
import { ArticleContext, DetailContext, ModalContext } from "../../context/Context"
import { url_api } from "../../../api/urlApi"

const FeaturedProperty = () => {
    const [data,setData] = useContext(ArticleContext)
    const [modalContext,setModalContext] = useContext(ModalContext)
    const [detailContext,setDetailContext] = useContext(DetailContext)
    const [dataMin,setDataMin] = useState({})
    const price = []
    data.map((art)=>price.push(art.price))
    const min = data.filter((x)=>x.price === Math.min(...price))
    const showDetail = (data)=>{setModalContext({show:true,login:false});setDetailContext({hidden:true,data})}
    useEffect(()=> setDataMin({...min[0]}),[data])

    return (
         <div className="featured-property" style={{position:"relative"}}>
            <div className="featured_details" >
                <h2>{dataMin.title}</h2>
                <p>{dataMin.description}</p>
                <a onClick={()=>showDetail(dataMin)} style={{cursor:"pointer"}}>view details</a>
            </div>
            <div className="featured_img">
            <div className="box-img">
                {
                    dataMin && <img src={`${url_api.images}${dataMin.image}`} alt={dataMin.image} />
                }
                <div className="title">
                    <h3>{dataMin.title}</h3>
                </div>
                </div>
                <div className="price">
                    <h3>{dataMin.price} ar</h3>
                    <h4>for {dataMin.type}</h4>
                </div>
            </div>
        </div>
    )
}

export default FeaturedProperty