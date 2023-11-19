import { useRef } from "react"
import HeaderContact from "./header/contact"
import FavoriteLogin from "./header/favorite-login"
import HeaderLogo from "./header/logo"
import NavBar from "./header/nav-bar"
import SocialIcons from "./header/social-icons"

const Header = () => {
const header = useRef(null)
const Fn = ()=>{
    let bg = "transparent"
    window.scrollY > 25 ? bg = "gray" : null
    header.current.style.backgroundColor=bg
}
window.addEventListener("scroll",Fn)
    return (
        <header ref={header}>
            <div className="top-bar">
                <HeaderContact/>
            <div className="more">
                <FavoriteLogin/>
                <SocialIcons/>
            </div>
        </div>
        <div className="logo-nav">
            <HeaderLogo/>
            <NavBar/>
        </div>
    </header>
    )
}

export default Header