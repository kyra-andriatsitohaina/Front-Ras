const Navbar = () => {

    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light" style={{display:"flex",justifyContent:"end"}}>
            <ul className="navbar-nav">
                <li className="nav-item d-none d-sm-inline-block">
                    <a href="index3.html" className="nav-link">Home</a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <a href="#" className="nav-link">list</a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <a href="#" className="nav-link">validation </a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar