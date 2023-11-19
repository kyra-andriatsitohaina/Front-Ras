import FromBlog from "./footer/from-blog"
import Locations from "./footer/locations"
import PropertyTypes from "./footer/property-types"

const Footer = () => {

    return (
        <footer>
            <PropertyTypes/>
            <Locations/>
            <FromBlog/>
            <div className="foot">
                <h6>&copy; gasytech@gmail.com - 2023 - designed by Anthony</h6>
            </div>
            <img src="img/background-glass-3.png" alt="" id="img1"/>
            <img src="img/background-house-1.png" alt="" id="img2"/>
        </footer>
    )
}

export default Footer