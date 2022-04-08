 form.addEventListener("submit", () => {

        const login =  {
            email : email.value,
            senha : senha.value
        }

        fetch("/login",{
            method: "POST",
            body: JSON.stringify(login),
            headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => { 
            console.log(data)
            if(data.status == "error"){
                   // success.style.display = "none"
                    error.style.display = "block"
                    error.innerText = data.error
            }
        }) 

       /* fetch("/home",{
            method: "POST",
            body: JSON.stringify("Qualquermerda"),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    */

}) 