import { Outlet, Route, Routes } from "react-router-dom"
import Login from "../login/login"
import NotFound from "../container/not-found/notfound"

const Router = () => {

    return (
        <section>
            <Routes>
                <Route path="/" element={<h2>salut</h2>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/services" element={<h2>Services </h2>}/>

                {/* <Route path="/users" element={<Users/>}/>
                <Route path="/users/:id" element={<User/>} >
                    <Route path="album" element={<h2>mes albums</h2>}/>
                </Route> */}
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <Outlet/>
        </section>
    )
}

export default Router