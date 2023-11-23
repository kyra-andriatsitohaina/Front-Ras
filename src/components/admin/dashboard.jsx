import AsideNav from "./asideNav"
import TopNav from "./topNav"
import {Outlet} from "react-router-dom"

const Dasboard = () => {

    return (
        <div className="dashboard">
            <AsideNav/>
            <div className="container">
                <TopNav/>
                <Outlet/>
            </div>
        </div>
    )
}

export default Dasboard