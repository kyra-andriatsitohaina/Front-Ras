import { useContext } from "react";
import { CategoryContext } from "../../context/Context";
import { UrlApi } from "../../../api/urlApi";

const FilterCategory = ({data,idCateg}) => {
    const [dataCategory,setDataCategory] = useContext(CategoryContext)
    return (
        <>  
            <div className="title-desc">
                <h2>{dataCategory[idCateg].category}</h2>
                <p>{dataCategory[idCateg].description}</p>
            </div>
            <div className="box-property" style={{flexWrap:"wrap"}} >
                    {data.map((art)=>(
                            <div className="property" key={art.id}>
                                <div className="info">
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                    </button>
                                </div>
                                <img src={`${UrlApi.baseUrl}client/images/${art.image}`} alt=""/>
                                <h3>{art.title}</h3>
                                <p>{art.description}</p>
                                <div className="btns">
                                    <button>
                                        <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"/></svg>
                                        <span>favorite</span>
                                    </button>
                                    <button disabled>{art.price} ar</button>
                                </div>
                            </div>
                        )
                    )}
            </div>
        </>
    )
}

export default FilterCategory