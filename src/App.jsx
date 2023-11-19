import {Route, Routes } from "react-router-dom"
import NotFound from "./components/container/not-found/notfound"
import Acceuil from "./Acceuil"

const App = () => {
    return (
        <>  
            <Routes>
                <Route path="/" element={<Acceuil/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </>
    )
}

export default App