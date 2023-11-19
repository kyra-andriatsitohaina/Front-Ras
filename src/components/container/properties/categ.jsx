import { useContext } from "react"
import { ArticleContext } from "../../context/Context"
import FilterCategory from "./FilterCateg";

const Categories = ({category}) => {
    const [data,setData] = useContext(ArticleContext)
    const filtre = []
    for(let i= 0 ; i< category.length;i++){filtre.push(data.filter((d)=>d.category === category[i]))}
    return (
        <>
            {
                filtre.map((d,index)=>(<div className="categ" key={index}><FilterCategory data={d} idCateg={index} category={category}/></div>))
            }
        </>
    )
}

export default Categories