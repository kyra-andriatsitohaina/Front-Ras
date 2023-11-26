import { useForm } from "react-hook-form";
import { Validation } from "../utils/validation"
import { url_api } from "../../api/urlApi";
import axios from "axios";
import { useCookies } from "react-cookie"
import { AuthAdmin } from "../context/Context";
import { useContext, useRef, useState } from "react";
import { toast } from 'react-toastify'
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"

const LoginAdmin = () => {
    const {handleSubmit,register,formState:{errors}}=useForm()
    const [cookies, setCookie, removeCookie] = useCookies(['_admin']);
    const [Auth,setAuth] = useContext(AuthAdmin)
    const [confirm,setConfirm] = useState({emailConf:false,passwordConf:false})
    const navigate = useNavigate()
    const form = useRef(null)
    const onSubmit = (data)=>{axios.post(`${url_api.admin}`,data).then(res=>authAdmin(res.data))} 
    const authAdmin = (data)=>{
        setConfirm({emailExist:false,emailConf:false,passwordConf:false})
        if(data.status){
            setCookie("_admin", data.data.token, { path: "/"})
            toast.success("vous etes connecté ✋")
            form.current.reset()
            setAuth({status:true,data:{...jwtDecode(data.data.token)}})
            setTimeout(() => {
                navigate("/admin/dashboard/list");
            }, 1000);
        }else{
            switch (data.message) {
                case "invalid email":
                    setConfirm({emailConf:true})
                    break;
                case "invalid password":
                    setConfirm({passwordConf:true})
                    break;
            }
        }

    }
    return (
        <div className="login-admin">
            <form onSubmit={handleSubmit(onSubmit)} ref={form}>
                { confirm.emailConf && <label htmlFor="email">adresse email incorrect</label>}
                {errors.email && <label htmlFor="email">{errors.email.message}</label>}
                <input type="email" id="email" placeholder="votre adresse email ..." {...register("email",Validation.email)} onChange={()=>setConfirm({emailConf:false,passwordConf:false})}/>

                { confirm.passwordConf && <label htmlFor="password">mot de passe incorrect</label>}
                {errors.password && <label htmlFor="password">{errors.password.message}</label>}
                <input type="password" id="password" placeholder="votre mot de passe ..." {...register("password",Validation.password)} onChange={()=>setConfirm({emailConf:false,passwordConf:false})}/>
                <button>connexion</button>
            </form>
        </div>
    )
}

export default LoginAdmin