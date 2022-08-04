const loginPopup = document.querySelector('.login-popup');
const registerPopup = document.querySelector('.register-popup');
const navLogin = document.querySelector('.nav-des-login');
const navRegister = document.querySelector('.nav-des-register');
const overlay = document.querySelector('.overlay');
const loginCloseModal = document.querySelector('.login-close-modal');
const registerCloseModal = document.querySelector('.register-close-modal');
const bookslotCloseModal = document.querySelector('.bookslot-close-modal');
const searchButton = document.querySelector('.search-button');
var availableAreas = document.getElementsByClassName('available-areas');
const availableAreasEl = document.querySelector('.available-areas');
const registerButton = document.querySelector('.register-button');
const loginButton = document.querySelector('.login-button');
const logoutButton = document.querySelector('.nav-des-logout');
const viewBookings = document.querySelector('.nav-des-viewbookings');
const bookslotPopup = document.querySelector('.bookslot-popup');
const bookslotLoc = document.getElementById('bookslot-loc');
const bookslotButton = document.querySelector('.bookslot-button');
const viewBookingsDiv = document.querySelector('.view-bookings-div');
const bookings = document.querySelector('.bookings');
const bookingsCloseModal = document.querySelector('.viewbookings-close-modal');
const addBookings = document.querySelector('.add-bookings');
//##################################################################################################
//Checks the whether the user is logged in or not when the window Loads
window.onload = function () {
  var loginStatus = localStorage.getItem('isLoggedIn');
  if (loginStatus === 'true') {
    setNav();
  }
};
//##################################################################################################
//Manipulating the Layouts
navLogin.addEventListener('click', function () {
  loginPopup.classList.remove('hidden');
  overlay.classList.remove('hidden');
});
navRegister.addEventListener('click', function () {
  registerPopup.classList.remove('hidden');
  overlay.classList.remove('hidden');
});
loginCloseModal.addEventListener('click', function () {
  loginPopup.classList.add('hidden');
  overlay.classList.add('hidden');
});
bookslotCloseModal.addEventListener('click', function () {
  overlay.classList.add('hidden');
  bookslotPopup.classList.add('hidden');
});
registerCloseModal.addEventListener('click', function () {
  registerPopup.classList.add('hidden');
  overlay.classList.add('hidden');
});
bookingsCloseModal.addEventListener('click', function () {
  viewBookingsDiv.classList.add('hidden');
  overlay.classList.add('hidden');
});
//##################################################################################################
//Searching for the location
searchButton.addEventListener('click', async function () {
  const searchCity = document.querySelector('#location-input');
  if (searchCity.value.trim() === '') {
    window.alert('Please Enter a city');
    return;
  }
  const data = await axios
    .post('http://localhost:3000/locations', {
      city: searchCity.value,
    })
    .then(res => {
      if (res.data.status === 'Success') {
        availableAreas[0].innerHTML = '';
        document.getElementsByClassName('slots')[0].innerHTML = '';
        res.data.places.forEach(loc_1 => {
          var divs = document.createElement('div');
          var locName = document.createElement('p');
          divs.classList.add('available-locs');
          locName.innerHTML = loc_1;
          locName.style.marginLeft = '8px';
          divs.appendChild(locName);
          var bookButton = document.createElement('button');
          bookButton.innerHTML = 'Book';
          bookButton.classList.add('button-list');
          bookButton.type = 'button';
          bookButton.addEventListener('click', async function (event) {
            event.preventDefault();
            bookslotPopup.classList.remove('hidden');
            overlay.classList.remove('hidden');
            bookslotLoc.value = loc_1;
          });
          divs.appendChild(bookButton);
          divs.style.display = 'flex';
          availableAreas[0].appendChild(divs);
          availableAreasEl.classList.remove('hidden');
        });
      }
    })
    .catch(err => {
      if (err.response.data.status === 'Failed') {
        window.alert(err.response.data.places);
      }
    });
});
//##################################################################################################
//Booking the slot for Parking
bookslotButton.addEventListener('click', async function (event) {
  const isAuth = localStorage.getItem('isLoggedIn');
  if (isAuth === 'false') {
    alert('Please Login.. to continue');
    return;
  }
  const email = localStorage.getItem('loggedInEmail');
  const location = document.getElementById('bookslot-loc').value;
  const date = document.getElementById('datepicker').value;
  const vehicleno = document.getElementById('vehicleno').value;
  const bookingData = {
    email,
    location,
    date,
    vehicleno,
  };
  console.log(bookingData);
  if (location.length === 0 || date.length === 0 || vehicleno.length === 0) {
    console.log(bookingData);
    alert('Please Fill all the details');
    return;
  }
  const response = await axios
    .post('http://localhost:3000/registrations', bookingData)
    .then(res => {
      if (res.data.status === 'Success') {
        window.alert(
          'Slot has been confirmed, please view the bookings section for details'
        );
      }
    })
    .catch(err => {
      window.alert('An Error has been Occured...Please try after some time');
    });
});
//##################################################################################################
//Registering a User
registerButton.addEventListener('click', async function () {
  ///Collecting the data from the form
  const emailReg = document.getElementById('email').value;
  const passwordReg = document.getElementById('password').value;
  const cpasswordReg = document.getElementById('cpassword').value;
  //Checking whether the password and confirm password are equal or not, if not return
  if (passwordReg !== cpasswordReg) {
    console.log("Passwords Doesn't matches");
    window.alert('Password and Confirm Password doesnot matches, please check');
    return;
  }
  const res = await axios
    .post('http://localhost:3000/usersregister', {
      email: emailReg,
      password: passwordReg,
    })
    .then(res => {
      if (res.data.status === 'Success') {
        window.alert('Account Created Successfully...');
      }
      emailReg.value = '';
      passwordReg.value = '';
      cpasswordReg.value = '';
      registerPopup.classList.add('hidden');
      overlay.classList.add('hidden');
    })
    .catch(err => {
      window.alert(
        'An Error Occured..Possible Errors: Invalid Email or Password Length is less than 8'
      );
      // if (err.response.data.message.errors.email.message) {
      //   window.alert(err.response.data.message.errors.email.message);
      // }
      // if (err.response.data.message.errors.password.message) {
      //   window.alert(err.response.data.message.errors.password);
      // }
    });
});
//##################################################################################################
//Logging in a user
loginButton.addEventListener('click', async function () {
  //Collecting the data from the login form
  const emailLo = document.getElementById('lemail').value;
  const passwordLo = document.getElementById('lpassword').value;
  //Sending the data to the json server to check
  const res = await axios
    .post('http://localhost:3000/userslogin', {
      email: emailLo,
      password: passwordLo,
    })
    .then(res => {
      //If the credentials are wrong
      if (res.data.message === 'User Found') {
        window.alert('Login Success...');
        localStorage.setItem('loggedInEmail', emailLo);
        emailLo.value = '';
        passwordLo.value = '';
        // console.log(res);
        loginPopup.classList.add('hidden');
        overlay.classList.add('hidden');
        setNav();
        localStorage.setItem('isLoggedIn', true);
      }
    })
    .catch(err => {
      if (err.response.data.message) {
        window.alert('Invalid Credentials..Please check');
      }
    });
});
//##################################################################################################
//Changing the NavBar when the user Login
function setNav() {
  navLogin.classList.add('hidden');
  navRegister.classList.add('hidden');
  logoutButton.classList.remove('hidden');
  // console.log(logoutButton);
  viewBookings.classList.remove('hidden');
}
//##################################################################################################
//Logging out the user
logoutButton.addEventListener('click', function () {
  localStorage.setItem('isLoggedIn', 'false');
  localStorage.setItem('loggedInEmail', '');
  console.log(localStorage);
  navLogin.classList.remove('hidden');
  navRegister.classList.remove('hidden');
  logoutButton.classList.add('hidden');
  viewBookings.classList.add('hidden');
});
//##################################################################################################
//View Bookings Section
viewBookings.addEventListener('click', async function () {
  viewBookingsDiv.classList.remove('hidden');
  overlay.classList.remove('hidden');
  const email = localStorage.getItem('loggedInEmail');
  const resp = await axios
    .post('http://localhost:3000/viewbookings', { email })
    .then(res => {
      res.data.message.forEach(res1 => {
        var divs = document.createElement('div');
        var locName = document.createElement('p');
        locName.textContent = res1.location;
        var date = document.createElement('p');
        date.textContent = res1.date;
        var vehicleno = document.createElement('p');
        vehicleno.textContent = res1.vehicleno;
        divs.appendChild(locName);
        divs.appendChild(date);
        divs.appendChild(vehicleno);
        divs.style.display = 'flex';
        divs.style.gap = '2rem';
        divs.style.margin = '1rem';
        divs.style.backgroundColor = 'white';
        divs.style.padding = '0.5rem';
        divs.style.borderRadius = '1rem';
        addBookings.appendChild(divs);
      });
    })
    .catch(err => {
      console.log(err);
    });
});
//##################################################################################################
