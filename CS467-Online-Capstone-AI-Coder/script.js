
let navbar = document.querySelector(".header .navbar");
let loginBtn = document.getElementById("login-btn");
let formContainer = document.getElementById("form_container");

document.querySelector("#login-btn").onclick = () => {
    if (login) {
        login.classList.toggle('active');
    }
    if (navbar) {
        navbar.classList.remove('active');
    }
}

loginBtn.addEventListener("click", function() {
    formContainer.classList.toggle("visible");
});

document.querySelector('#menu-btn').onclick = () => {
    if (login) {
        login.classList.remove('active');
    }
    if (navbar) {
        navbar.classList.toggle('active');
    }
}

window.onscroll = () => {
    if (login) {
        login.classList.remove('active');
    }
    if (navbar) {
        navbar.classList.remove('active');
    }
}

var swiper = new Swiper(".gallery-slider", {
    grabCursor: true,
    loop: true,
    centeredSlides: true,
    spaceBetween: 20,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        700: {
            slidesPerView: 2,
        },
    }
});

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB5mNkSW1b-i0k2Z6b-7jr8n41wJPB2qmo",
    authDomain: "auth-568bd.firebaseapp.com",
    projectId: "auth-568bd",
    storageBucket: "auth-568bd.appspot.com",
    messagingSenderId: "211432818912",
    appId: "1:211432818912:web:03c9a4022fe31c2962a885",
    measurementId: "G-B65T27GK37"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register() {
    // Get all our input fields
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let full_name = document.getElementById('full_name').value
    let favourite_song = document.getElementById('favourite_song').value
    let milk_before_cereal = document.getElementById('milk_before_cereal').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!')
        return
        // Don't continue running the code
    }
    if (validate_field(full_name) == false || validate_field(favourite_song) == false || validate_field(milk_before_cereal) == false) {
        alert('One or More Extra Fields is Outta Line!!')
        return
    }

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(function() {
            // Declare user variable
            var user = auth.currentUser

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                email: email,
                full_name: full_name,
                favourite_song: favourite_song,
                milk_before_cereal: milk_before_cereal,
                last_login: Date.now()
            }

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).set(user_data)

            // DOne
            alert('User Created!!')
        })
        .catch(function(error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
}

// Set up our login function
function login() {
    // Get all our input fields
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!')
        return
        // Don't continue running the code
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(function() {
            // Declare user variable
            var user = auth.currentUser

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                last_login: Date.now()
            }

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).update(user_data)

            // DOne
            alert('User Logged In!!')

        })
        .catch(function(error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
}

// Validate Functions
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        // Email is good
        return true
    } else {
        // Email is not good
        return false
    }
}

function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
        return false
    } else {
        return true
    }
}

function validate_field(field) {
    if (field == null) {
        return false
    }

    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}
