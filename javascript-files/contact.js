

var messagesCollection = firebase.database().ref('messages');

let contactForm = document.getElementById('contact-form');
contactForm.addEventListener("submit",submitFun);
 

function submitFun(e) {
    e.preventDefault();
     

    var senderName = document.getElementById('sender-name').value;
    var senderEmail = document.getElementById('sender-email').value;
    var msgSubject = document.getElementById('msg-subject').value;
    var msgValue = document.getElementById('msg-box').value;

    saveMsg(senderName,senderEmail,msgSubject,msgValue);
     contactForm.reset();
    alert(`${senderName}, your message has been sent successfully.`);
    
 }

 
 function saveMsg (senderName,senderEmail,msgSubject,msgValue) {
     var newMessageCollection = messagesCollection.push();

     newMessageCollection.set({
         name:senderName,
         email:senderEmail,
         subject:msgSubject,
         message:msgValue
     });
 }
