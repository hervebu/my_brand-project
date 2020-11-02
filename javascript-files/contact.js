

var contactForm = document.getElementById('contact-form');
contactForm.addEventListener("submit",submitFun);
 
function submitFun(e) {
    e.preventDefault();
    let senderName = document.getElementById('sender-name').value;
    let senderEmail = document.getElementById('sender-email').value;
    let msgValue = document.getElementById('msg-box').value;
    fetch('https://hervebu.herokuapp.com/query',
        {
            method:'POST',
            headers: {
                'Accept': 'application/json, */*',
                'content-type': 'application/json'
            },
            body:JSON.stringify({
                senderName: senderName,
                email: senderEmail,
                message: msgValue
            })
            
        }
    ).then( () => {
        contactForm.reset()
        alert(`"${senderName}", your message has been sent successfully.`)
    }).catch ((err) => {
        alert(`"${senderName}", there was an error while sending message`)
        console.log(err)
    })

 }
