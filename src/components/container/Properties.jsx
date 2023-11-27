import { useEffect, useState } from "react"
import { CategoryContext } from "../context/Context"
import Categories from "./properties/categ"
import Search from "./properties/search"
import axios from "axios"
import { url_api } from "../../api/urlApi"

const Properties = () => {
    const [dataCategory,setDataCategory] = useState([])
    const categ = []
    dataCategory.map((data)=>{categ.push(data.province)})
    useEffect(()=>{
        axios.get(url_api.category)
        .then(res=> setDataCategory(res.data))
        .catch(err=>console.log(err))
    },[])
    return (
        <CategoryContext.Provider value={[dataCategory,setDataCategory]}>
            <section className="featured-properties" id="properties">
                <Search />
                    <div className="box-container">
                        <Categories category={categ} />
                    </div>
            </section>
        </CategoryContext.Provider>
    )
}

export default Properties