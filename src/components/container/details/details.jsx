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
                <h3>
                    {
                    data.category == "maison" ? 
                        <img src="../../../img/house-icon.svg" />
                        :
                        <svg fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                        viewBox="0 0 245.562 245.562" xmlSpace="preserve">
                        <path d="M244.062,180.838L150.227,55.725c-1.417-1.889-3.639-3-6-3c-2.361,0-4.584,1.111-6,3l-38.904,51.873L83.876,87.002 c-1.416-1.889-3.639-3-6-3c-2.361,0-4.583,1.111-6,3L1.5,180.838c-1.704,2.272-1.978,5.314-0.708,7.855
                        c1.27,2.54,3.867,4.145,6.708,4.145h230.562c2.841,0,5.438-1.605,6.708-4.145C246.041,186.151,245.767,183.11,244.062,180.838z M22.5,177.838l55.376-73.836l15.446,20.596c1.416,1.889,3.639,3,6,3c2.361,0,4.583-1.111,6-3l38.904-51.873l78.836,105.113H22.5z"/>
                        </svg>
                    }
                    <span>{data.category} </span>
                </h3>
                {
                    data.category == "maison" &&
                    <>
                        <h3><img src="../../../img/snoring-icon.svg" /><span>{data.chambre} chambre</span></h3>
                        <h3><img src="../../../img/lamp-icon.svg" /><span>{data.elec}</span></h3>
                        <h3><img src="../../../img/hand-wash-icon.svg"/><span>{data.eau}</span></h3>
                        <h3><img src="../../../img/garage-icon.svg"  /><span>{data.garage}</span></h3>
                        <h3><img src="../../../img/parking-icon.svg" /><span>{data.access}</span></h3>
                    </>
                }
                
                <h3>
                    {data.type == "rent" && <img src="../../../img/for-rent-sign-board-icon.svg"/>}
                    {data.type == "sale" && <img src="../../../img/for-sale-sign-board-icon.svg"/>}
                    {data.type == "offer" && <img src="../../../img/sold-sign-board-icon.svg"/>}
                    <span>{data.type}</span>
                </h3>
                {
                    data.category == "terrain" &&
                        <h3><img src="../../../img/floor-plan-size-icon.svg" alt="" /><span>{data.superficie} m<sup>2</sup></span></h3>
  
                }
                <h3><img src="../../../img/map-icon.svg" alt="" /><span>{data.province}</span></h3>
                
            </div>
            <div className="tel">
                <h4>reponsable : {data.name}</h4>
                <h4>contact : {data.contact}</h4>
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