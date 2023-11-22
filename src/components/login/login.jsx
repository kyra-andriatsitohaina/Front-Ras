import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthUser,  ModalContext, RegisterContext } from "../context/Context"
import { Validation } from "../utils/validation"
import { useForm } from "react-hook-form"
import axios from "axios"
import {  url_api } from "../../api/urlApi"
import { gapi } from "gapi-script"
import LoginGoogle from "./googleLogin"
import { IdClient } from "../utils/google"
import { toast } from 'react-toastify'
import { useCookies } from "react-cookie"
import { jwtDecode } from "jwt-decode"

const Login = () => {
    const [modal,setModal] = useContext(ModalContext)
    const [registerContext,setRegisterContext] = useContext(RegisterContext)
    
    const {handleSubmit,register,formState:{errors}}=useForm()
    const form = useRef(null)
    const [cookies, setCookie, removeCookie] = useCookies(['_auth']);
    const [Auth,setAuth] = useContext(AuthUser)
    const [confirm,setConfirm] = useState({emailConf:false,passwordConf:false})
    const img = useRef()
    const navigate = useNavigate()
    const formData = new FormData()
    const getPhoto = (e)=>{formData.append("photo",e.target.files[0]);
    img.current.src = window.URL.createObjectURL(e.target.files[0])
}

    const onSubmit = (data)=>{
        setConfirm({emailExist:false,emailConf:false,passwordConf:false})
        const url = (data.pseudo ? "/new" : "/auth")
        let postData = null
        if(data.pseudo){
            formData.append("pseudo",data.pseudo)
            formData.append("email",data.email)
            formData.append("password",data.password)
            postData = formData
        }else{
            postData = {...data}
        }
        axios.post(`${url_api.users}${url}`,postData).then(res=>addData(res))
    } 
    const addData = (res)=>{
        if(res.data.status){
            setCookie("_auth", res.data.data.token, { path: "/"})
            toast.success("vous etes connecté ✋")
            form.current.reset()
            setAuth({status:true,data:{...jwtDecode(res.data.data.token)}})
            setTimeout(() => {
                navigate("/article/list");
                window.location.reload(false)
            }, 1000);
        }else{
            switch (res.data.message) {
                case "email exist":
                    setConfirm({emailExist:true})
                    break;
                case "invalid email":
                    setConfirm({emailConf:true})
                    break;
                case "invalid password":
                    setConfirm({passwordConf:true})
                    break;
                default:
                    // toast.danger("⚠️ status invalid ⚠️")
                    break;
            }
        }
       
    }
    useEffect(()=>{const start=()=>{gapi.client.init({clientId:IdClient,scope:""})};gapi.load("client:auth2",start)},
    [])
    return (
        <section className="login">
            <button className="close" onClick={()=>setModal({modal:false,login:false})}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"/></svg>
            </button>
            <form onSubmit={handleSubmit(onSubmit)} ref={form} encType="multipart/form-data">
                {errors.pseudo && <label htmlFor="pseudo">{errors.pseudo.message}</label>}
                {
                    registerContext && 
                    <input type="text" name="pseudo" placeholder="pseudo ..." id="pseudo" {...register("pseudo",Validation.pseudo)}/>
                }

                { confirm.emailExist && <label htmlFor="email">cet adrese e-mail est deja utlisé</label>}
                { confirm.emailConf && <label htmlFor="email">adresse email incorrect</label>}
                {errors.email && <label htmlFor="email">{errors.email.message}</label>}
                <input type="email" name="email" placeholder="email ..." id="email"{...register("email",Validation.email)} onChange={()=>setConfirm({emailConf:false,emailExist:false,passwordConf:false})}/>

                { confirm.passwordConf && <label htmlFor="password">mot de passe incorrect</label>}
                {errors.password && <label htmlFor="password">{errors.password.message}</label>}
                <input type="password" name="password"  placeholder="password ..." id="password"{...register("password",Validation.password)} onChange={()=>setConfirm({emailConf:false,emailExist:false,passwordConf:false})}/>
                {
                    registerContext && (
                        <>
                            <label htmlFor="photo" title="choose photo">
                                <img src="img/image-add-fill.svg"  ref={img}  style={{width:"3.5vw",height:"3.5vw"}}/>
                            </label>
                            <input type="file" name="photo" hidden id="photo" onChange={getPhoto} />
                        </>
                    )
                }
                <button>{registerContext ? "create account" : "signin"}</button>
            </form>
            <div className="more">
                {
                    !registerContext ? (
                        <>  
                            <LoginGoogle/>
                            <div>
                                <h3>don't have a account ? </h3>
                                <button onClick={()=>setRegisterContext(true)}>signup</button>
                            </div>
                        </>
                    ) : (
                    <div style={{alignSelf:"end",width:"100%"}}>
                        <h3>I have a account ? </h3>
                        <button onClick={()=>setRegisterContext(false)}>signin</button>
                    </div>
                    )
                }
            </div>
        </section>
    )
}

export default Login