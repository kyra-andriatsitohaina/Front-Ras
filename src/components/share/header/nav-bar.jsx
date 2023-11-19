import { useState } from "react";

const NavBar = () => {
    const List = [{id:"properties",name:"List Items"},{id:"popular",name:"popular"},{id:"about",name:"about"},{id:"contact",name:"contact"}]
    const [active,setActive] = useState(window.location.hash)
    const getHash = (id)=>{setActive( `#${id}`)}
    return (
        <nav className="nav-bar">
            <ul>
                <li onClick={()=>getHash()}><a href="/"><svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M20 20.0001C20 20.5524 19.5523 21.0001 19 21.0001H5C4.44772 21.0001 4 20.5524 4 20.0001V11.0001L1 11.0001L11.3273 1.61162C11.7087 1.26488 12.2913 1.26488 12.6727 1.61162L23 11.0001L20 11.0001V20.0001ZM9 10.0001V16.0001H15V10.0001H9ZM11 12.0001H13V14.0001H11V12.0001Z"/></svg></a>
                </li>
                {List.map((list,index)=><li key={index}   onClick={()=>getHash(list.id)}><a href={`#${list.id}`} className={(`#${list.id}`== active) ? "active" : ""} >{list.name}</a></li>)}
            </ul>
        </nav>
    )
}

export default NavBar