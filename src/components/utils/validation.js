export const Validation={
    pseudo :{
                required:"veuillez saisir un pseudo",
                pattern:
                    {
                        value: /^([a-zA-Z]+)/,
                        message: "veuillez saisir un pseudo correct sans chiffre"
                    }
                },
    password :{
                required:"veuillez saisir un mot de passe",
                pattern:
                    {
                        value: /^([a-zA-Z-0-9]+)/,
                        message: "veuillez saisir un mot de passe avec des chiffres et des lettres"
                    }
                },
    email :{
                    
                required:"veuillez saisir un adresse email valide",
                pattern:
                    {
                        value: /^[\w\.%\-]+@[\w.\-]+\.[a-zA-Z]/,
                        message: "veuillez saisir un email valide"
                    }
            },

}