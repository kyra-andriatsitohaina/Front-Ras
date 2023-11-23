const LoginAdmin = () => {

    return (
        <div className="login-admin">
            <form >
                <input type="email" id="email" placeholder="votre adresse email ..." />
                <input type="password" id="password" placeholder="votre mot de passe ..." />
                <button>connexion</button>
            </form>
        </div>
    )
}

export default LoginAdmin