import { useState } from "react"
import {Outlet} from "react-router-dom"
import { ArtDetailAdmin, ShowDetailArt } from "../context/Context"
import DetailAdmin from "./detail"
const Admin = () => {
    const [showDetail,setShowDetail] = useState(false)
    const [artDetail,setArtDetail] = useState([])
    const [validate,setValidate]= useState(false)
    return (
        <section className="admin">
            <ShowDetailArt.Provider value={[showDetail,setShowDetail]}>
                <ArtDetailAdmin.Provider value={[artDetail,setArtDetail]}>
                    {/* <ValidateArticle.Provider value={[validate,setValidate]}> */}
                        <div className={showDetail ? "trans": "detailArt "  } >
                            <DetailAdmin/>
                        </div>
                        <Outlet/>
                    {/* </ValidateArticle.Provider> */}
                </ArtDetailAdmin.Provider>
            </ShowDetailArt.Provider>
        </section>
    )
}

export default Admin
