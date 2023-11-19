import { useContext } from "react"
import { LoginContext, ModalContext } from "../context/Context"

const Login = () => {
    const [modal,setModal] = useContext(ModalContext)
    const [login,setLogin] = useContext(LoginContext)
    return (
        <section className="login">
            <button className="close" onClick={()=>setModal(false)}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"/></svg>
            </button>
            <form action="">
                {
                    login && 
                <input type="text" name="pseudo" placeholder="pseudo ..." id="pseudo"/>
                }
                <input type="email" name="email" placeholder="email ..." id="email"/>
                <input type="password" name="password" placeholder="password ..." id="password"/>
                {
                    login && (
                        <>
                            <label htmlFor="photo" title="choose photo">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 1024 1024">
                                <path d="M854.6 288.7L639.4 73.4c-6-6-14.2-9.4-22.7-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.6-9.4-22.6zM400 402c22.1 0 40 17.9 40 40s-17.9 40-40 40-40-17.9-40-40 17.9-40 40-40zm296 294H328c-6.7 0-10.4-7.7-6.3-12.9l99.8-127.2a8 8 0 0 1 12.6 0l41.1 52.4 77.8-99.2a8 8 0 0 1 12.6 0l136.5 174c4.3 5.2.5 12.9-6.1 12.9zm-94-370V137.8L790.2 326H602z"/>
                                </svg>
                            </label>
                            <input type="file" name="photo"  hidden id="photo"/>
                        </>
                    )
                }
                <button>signin</button>
            </form>
            <div className="more">
                <button className="google">
                    <img src="img/shape.png" alt="google" />
                </button>
                <div>
                    <h3>don't have a account ? </h3>
                    <button onClick={()=>setLogin(true)}>signup</button>
                </div>

            </div>

        </section>
    )
}

export default Login