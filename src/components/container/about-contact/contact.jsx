const Contact = () => {
    return (
        <div className="contact" id="contact" style={{paddingTop:"10vw"}}>
            <h2>nous contactez</h2>
            <form action="">
                <input type="text" placeholder="enter your name ..."/>
                <input type="email" placeholder="enter your email adress ..."/>
                <textarea name="" id="" cols="30" rows="5" placeholder=" your message ..."></textarea>
                <button>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1.94631 9.31555C1.42377 9.14137 1.41965 8.86034 1.95706 8.6812L21.0433 2.31913C21.5717 2.14297 21.8748 2.43878 21.7268 2.95706L16.2736 22.0433C16.1226 22.5718 15.8179 22.5901 15.5946 22.0877L12.0002 14.0002L18.0002 6.00017L10.0002 12.0002L1.94631 9.31555Z"/></svg>
                        send mail
                </button>
            </form>
        </div>
    )
}

export default Contact