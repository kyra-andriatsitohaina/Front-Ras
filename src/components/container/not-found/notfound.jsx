import { Link } from "react-router-dom"

const NotFound = () => {

    return (
        <div>
            <h2>Page not found !!</h2>
            <Link to={"/"}>retour à la page d'acceuil</Link>

        </div>
    )
}

export default NotFound