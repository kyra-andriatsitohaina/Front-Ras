import { useContext } from "react"
import { DetailContext, ModalContext } from "../../context/Context"
import { url_api } from "../../../api/urlApi"

const Details = ({data}) => {
    const [modal,setModal] = useContext(ModalContext)
    const [detailContext,setDetailContext] = useContext(DetailContext)

    return (
        <section className="details">
            <div className="box1">
                <img src={`${url_api.images}${data.image}`} alt="" />
                <div className="infos">
                    <div className="title-price">
                        <h2>{data.title}</h2>
                        <h3>price : {data.price} ar</h3>
                    </div>
                    <p>{data.description}</p>
                </div>
            </div>
            <div className="box3">
                <h3><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 11V20H20V17H4V20H2V4H4V14H12V7H18C20.2091 7 22 8.79086 22 11ZM8 13C6.34315 13 5 11.6569 5 10C5 8.34315 6.34315 7 8 7C9.65685 7 11 8.34315 11 10C11 11.6569 9.65685 13 8 13Z"/></svg><span>6 beds</span></h3>
                <h3><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 11V20H20V17H4V20H2V4H4V14H12V7H18C20.2091 7 22 8.79086 22 11ZM8 13C6.34315 13 5 11.6569 5 10C5 8.34315 6.34315 7 8 7C9.65685 7 11 8.34315 11 10C11 11.6569 9.65685 13 8 13Z"/></svg><span>5 baths</span></h3>
                <h3><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 11V20H20V17H4V20H2V4H4V14H12V7H18C20.2091 7 22 8.79086 22 11ZM8 13C6.34315 13 5 11.6569 5 10C5 8.34315 6.34315 7 8 7C9.65685 7 11 8.34315 11 10C11 11.6569 9.65685 13 8 13Z"/></svg><span>Not parking</span></h3>
                <h3><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 11V20H20V17H4V20H2V4H4V14H12V7H18C20.2091 7 22 8.79086 22 11ZM8 13C6.34315 13 5 11.6569 5 10C5 8.34315 6.34315 7 8 7C9.65685 7 11 8.34315 11 10C11 11.6569 9.65685 13 8 13Z"/></svg><span>Not furnished</span></h3>
            </div>
            <div className="box2">
                <button title="add favorite">
                    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"/></svg>
                    <span>favorite</span>
                </button>
                <button onClick={()=>{setModal({show:false,login:false});setDetailContext({hidden:false})}}>back</button>
            </div>
        </section>
    )
}

export default Details