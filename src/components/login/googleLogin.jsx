import { GoogleLogin } from '@leecheuk/react-google-login';
import { IdClient } from "../utils/google";

const LoginGoogle = () => {
    const onSuccess = (res)=>{
        console.log(res.profileObj);
        // const pseudo = res.profileObj.name
        // const email = res.profileObj.email
        // const photo = res.profileObj.image
        // const password = res.profileObj.googleId
        // console.log("data : ",res.profileObj);
        // const url = "/auth"
        // axios.post(`${url_api.users}${url}`,{pseudo,email,photo,password})
        // .then(res=>addData(res))
        // .catch(err=>console.log(err))
        // form.current.reset()

        // setTimeout(() => {
        //     setModal(false)
        // }, 1000);
    }
    const onFailure = (res)=>{
        // console.log("failure",res);
        return
    }


    return (
            <GoogleLogin
                clientId={IdClient}
                buttonText="sign up via google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
            />
    )   

}

export default LoginGoogle