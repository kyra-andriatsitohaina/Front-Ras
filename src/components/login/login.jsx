import { NavLink } from "react-router-dom"

const Login = () => {

    return (
        <section className="login" style={{height:"50vh"}}>
            <h2>Login page</h2>
            <NavLink to={"sigin"}> signin </NavLink>
            <NavLink to={"register"}> create account </NavLink>
        </section>
    )
}

export default Login