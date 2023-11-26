import { useForm } from "react-hook-form";
import axios from "axios";
import { url_api } from "../../api/urlApi";
import { useContext, useRef, useState } from "react";
import { AuthAdmin, EditAdmin } from "../context/Context";
import { Validation } from "../utils/validation";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'


const EditProfileAdmin = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['_admin']);
    const [Admin,setAdmin] = useContext(AuthAdmin)
    const [Edit,setEdit] = useContext(EditAdmin)
    const pass1 = useRef(null)
    const pass2 = useRef(null)
    const [confirm,setConfirm] = useState(false)
    const {handleSubmit,register,formState:{errors}}=useForm()

    const navigate = useNavigate()
    const onSubmit = (data)=>{
        if(data.password==data.passwordConfirm){
            setConfirm(false)
            toast.success("mise à jour effectué 👍")
            removeCookie(["_admin"],{path:"/"})
            console.log(data);
            delete data.passwordConfirm
            axios.patch(`${url_api.admin}`,data).then(
                setTimeout(()=>{
                    navigate("/admin/login");
                    window.location.reload(false)
                },1000)
            )
        }else{
            setConfirm(true)
        }

    } 
    return (
        <div className="box-edit">
            <form onSubmit={handleSubmit(onSubmit)}>
                {errors.email && <label htmlFor="email">{errors.email.message}</label>}
                <input type="email" placeholder="new email" id="email"{...register("email",Validation.email)}/>
                
                {errors.password && <label htmlFor="password">{errors.password.message}</label>}
                <input type="password" placeholder="new password ..." {...register("password",Validation.password)}  id="password"/>
                {confirm && <label htmlFor="password2">Passwords Don't Match</label>}
                <input type="password" placeholder="confirm password ..."  id="password2" {...register("passwordConfirm")} />
                <button>update profile</button>
            </form>
            <button className="up" title="close edit" onClick={()=>setEdit(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 501.56"><path d="M15.47 366.66h481.06c8.52 0 15.47 6.95 15.47 15.47v103.95c0 8.52-6.95 15.48-15.47 15.48H15.47C6.96 501.56 0 494.6 0 486.08V382.13c0-8.52 6.96-15.47 15.47-15.47zM210.58 154.5H159.6a8.986 8.986 0 0 1-5.05-1.6c-4.01-2.78-5-8.29-2.21-12.3L247.73 3.78c.58-.81 1.29-1.54 2.14-2.14 3.97-2.83 9.48-1.9 12.31 2.07l97.02 136.27a8.829 8.829 0 0 1 2.05 5.67c0 4.88-3.96 8.85-8.85 8.85h-50.96v142.69c0 4.71-2.29 8.9-5.97 11.79-3.06 2.42-7.18 3.93-11.61 3.93h-55.7c-4.42 0-8.55-1.5-11.62-3.92-3.68-2.89-5.96-7.06-5.96-11.8V154.5z"/></svg>
            </button>
        </div>
    )
}

export default EditProfileAdmin