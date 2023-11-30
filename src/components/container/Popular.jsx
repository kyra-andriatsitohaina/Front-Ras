import { useContext } from "react"
import { url_api } from "../../api/urlApi"

const Popular = ({popular}) => {
    const favorite = []
    for(let i = 0 ; i< popular.length;i++){favorite.push(popular[i].favorite)}
    favorite.sort()
    favorite.reverse()
    favorite.splice(5,favorite.length)
    const values = []
    for(let i = 0 ;i<=4;i++){values.push(...popular.filter(x=>x.favorite === favorite[i]))}
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
                            <div className="box-img" key={art.id}>
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