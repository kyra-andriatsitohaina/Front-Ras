import { useContext } from "react"
import Login from "../login/login"
import { DetailContext, LoginContext, ModalContext } from "../context/Context"
import Details from "../container/details/details"

const Modal = () => {
const [modal,setModal] = useContext(ModalContext)
const [detailContext,setDetailContext] = useContext(DetailContext)
const [loginContext,setLoginContext] = useContext(LoginContext)
    return (
        <>
            {
                modal && (
                <section className="modal">
                    {loginContext && <Login/>}
                    {detailContext.hidden && <Details data={detailContext.data}/>}
                </section>)
            }
        </>
    )
}

export default Modal