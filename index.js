// Array for user objetct.
const USERS = {};
//Variable that creates alert messages.
const WARNINGS_MESSAGE = document.getElementById('warnings');
const USER_NAME = document.getElementById('name').value;
const TELEPHONE_NUMBER = document.getElementById('telephone').value;


document.addEventListener("DOMContentLoaded", function(event) {
    //código a ejecutar cuando el DOM está listo para recibir acciones
    if (localStorage.getItem('email') !== null) {
        console.log(`Email address exists`);
        openNewPage()
    } else {
        console.log(`Email address not found`);
    }
   
});

// Delete the dom and create the message "Congratulations you can stop by for your gift".
function openNewPage() {

    const root = document.getElementById('root');
    root.innerHTML= '';

    const div = document.createElement('div');
    const h1 = document.createElement('h1');
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    const codigoPremio = document.createElement('h2');
    

    div.classList = 'divFelicidades';
    img.setAttribute('src', 'https://amcce.org/images/AMCCE-BLANCO.svg');
    img.classList = 'logoAMCCE';
    h1.style.color = 'white';
    

    h1.textContent = '¡Gracias por tu registro!';
    h2.textContent = 'Ven por tu regalo al stand 710 de la AMCCE.';
    codigoPremio.textContent = 'Este es tu código: ' + localStorage.getItem('codigo')

    div.append(h1, h2, img, codigoPremio);

    root.appendChild(div);
}

//Check and save the name.
function saveName (){
    const USER_NAME = document.getElementById('name').value;

    if ( USER_NAME == null || USER_NAME.length == 0 || /^\s+$/.test(USER_NAME) ) {
        WARNINGS_MESSAGE.innerHTML ='Hey escribe un nombre';
            } else {
                USERS.name = USER_NAME;
                }
}

//Check and save telephone number.
function saveNumber(){
    const TELEPHONE_NUMBER = document.getElementById('telephone').value;

    if (TELEPHONE_NUMBER == null || TELEPHONE_NUMBER.length == 0 || /^\s+$/.test(TELEPHONE_NUMBER)){
        WARNINGS_MESSAGE.innerHTML ='Tú número telefónico debe tener 10 digitos.';
            } else {
                USERS.telephone = TELEPHONE_NUMBER;
            }
}

//Check and save email.
function saveEmail(){
    const EMAIL = document.getElementById('email').value;
  // Define our regular expression.
    const IS_VALID_EMAIL =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    // Using test we can check if the text match the pattern.
        if( IS_VALID_EMAIL.test( jQuery('#email').val() ) ){
            USERS.email = EMAIL;
            return true;
        }else{
            // alert('Email is invalid, skip form submission');
            return false;
        }
}

function checkbox() {
    const THANKS_MESSAGE = document.getElementById('thanksForSuscribing');
    const CHECKBOX = document.getElementById('checkboxNewsLetter');

        if (CHECKBOX.checked == true) {
            THANKS_MESSAGE.innerHTML = '¡Gracias por suscribirte!';
            USERS.newLetter = true;
        } else {
            USERS.newLetter = false;
        }
}


function onsub(event){
    event.preventDefault();
    document.getElementById('divBtn').style.display = 'none';
    document.getElementById('reload').style.display = 'block';
    saveName();
    checkbox();
    saveNumber();
    saveEmail();
          fetch('https://cafeetrusca.com/api/newsLetter', {
            method: "POST",
            body: JSON.stringify(USERS),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
              }
          }).then(response => {
            response.json().then(parsedValue => {  console.log(parsedValue);
            localStorage.setItem('codigo', parsedValue.codigo),
            localStorage.setItem('email', parsedValue.email),
            location.reload()
            
        })}).catch(err => console.log(err));
   
};


    //Botones
const logo = document.getElementById('logo');
logo.addEventListener('click', () => {
    window.open('https://cafeetrusca.com/');
})

const face = document.getElementById('btnFacebook');
face.addEventListener('click', () => {
    window.open('https://www.facebook.com/cafeetrusca/?locale=es_LA');
})

const twitter = document.getElementById('btnTwitter');
twitter.addEventListener('click', () => {
    window.open('https://twitter.com/cafeetrusca?lang=es');
})

const instagram = document.getElementById('btnInstagram');
instagram.addEventListener('click', () => {
    window.open('https://www.instagram.com/cafe.etrusca/');
})


// //llamada a facebook
// // function statusChangeCallback(response) {
// //     console.log('statusChangeCallback');
// //     console.log(response);
// //     if (response.status === 'conected'){
// //         testAPI();
// //     } else {
// //         document.getElementById('thanksForSuscribing').innerHTML = "Please log" +
// //         'into this webpage';
// //     }
// // }

// // function checkLoginState() {               // Called when a person is finished with the Login Button.
// //     FB.getLoginStatus(function(response) {   // See the onlogin handler
// //       statusChangeCallback(response);
// //     });
// //   }
// FB.getLoginStatus(function(response) {
//     if (response.status === 'connected') {
//       // The user is logged in and has authenticated your
//       // app, and response.authResponse supplies
//       // the user's ID, a valid access token, a signed
//       // request, and the time the access token 
//       // and signed request each expire.
//       var uid = response.authResponse.userID;
//       var accessToken = response.authResponse.accessToken;
//     } else if (response.status === 'not_authorized') {
//       // The user hasn't authorized your application.  They
//       // must click the Login button, or you must call FB.login
//       // in response to a user gesture, to launch a login dialog.
//     } else {
//       // The user isn't logged in to Facebook. You can launch a
//       // login dialog with a user gesture, but the user may have
//       // to log in to Facebook before authorizing your application.
//     }
//    });


// // window.fbAsyncInit = function() {
// //     FB.init({
// //       appId      : '{your-app-id}',
// //       cookie     : true,
// //       xfbml      : true,
// //       version    : '{api-version}'
// //     });
      
// //     FB.AppEvents.logPageView();   
      
// //   };

//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = "https://connect.facebook.net/en_US/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));