import { useContext } from "react"
import { ArticleContext } from "../context/Context"
import { url_api } from "../../api/urlApi"

const Popular = () => {
    const [data,setData] = useContext(ArticleContext)
    const favorite = []
    for(let i = 0 ; i< data.length;i++){favorite.push(data[i].favorite)}
    favorite.sort()
    favorite.reverse()
    favorite.splice(5,favorite.length)
    const values = []
    for(let i = 0 ;i<=4;i++){values.push(...data.filter(x=>x.favorite === favorite[i]))}
    const favoriteValues = [...new Set(values)]

    return (
        <section className="popular-properties" id="popular" style={{paddingTop:"12vw"}}>
            <div className="box-popular" >
                <div className="title">
                    <h2>popular properties</h2>
                </div>
                <div className="popular">
                    {
                        favoriteValues.map((art)=>(
                            <div className="box-img">
                                <img src={`${url_api.images}${art.image}`} alt=""/>
                                <p>{art.description}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Popular