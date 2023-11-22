import { useContext, useEffect, useState } from "react"
import Login from "../login/login"
import { DetailContext, ModalContext, RegisterContext } from "../context/Context"
import Details from "../container/details/details"

const Modal = () => {
const [modal,setModal] = useContext(ModalContext)
const [detailContext,setDetailContext] = useContext(DetailContext)
const [registerUser,setRegisterUser] = useState(false)
useEffect(()=>{
    modal.show ? (document.body.style.overflowY="hidden") : (document.body.style.overflowY="auto")
},[modal])
    return (
        <>
            {
                modal.show && (
                    <>
                        <section className="modal">
                            {modal.login && <RegisterContext.Provider value={[registerUser,setRegisterUser]}><Login/></RegisterContext.Provider>}
                        </section>
                        {detailContext.hidden && <section className="box-details"> <Details data={detailContext.data}/></section>}
                    </>

                )
            }
        </>
    )
}

export default Modal