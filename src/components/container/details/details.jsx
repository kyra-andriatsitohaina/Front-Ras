import { useContext } from "react"
import { ModalContext } from "../../context/Context"
import { UrlApi } from "../../../api/urlApi"

const Details = ({data}) => {
    const [modal,setModal] = useContext(ModalContext)
    return (
        <section className="details">
            <div className="box1">
                <img src={`${UrlApi.baseUrl}client/images/${data.image}`} alt="" />
                <div className="infos">
                    <div className="title-price">
                        <h2>{data.title}</h2>
                        <h3>price : {data.price} ar</h3>
                    </div>
                    <p>{data.description}</p>
                </div>
            </div>
            <div className="box2">
                <button title="add favorite">
                    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"/></svg>
                    <span>favorite</span>
                </button>
                <button onClick={()=>setModal(false)}>back</button>
            </div>
        </section>
    )
}

export default Details