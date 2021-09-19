
// ...............{SIGNUP}.............

const signUp = () => {
  const name = document.getElementById("userName");
  const email = document.getElementById("userEmail");
  const password = document.getElementById("userPassword");

  console.log(userName.value, userEmail.value, userPassword.value);

  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(userCredential.user.uid);

      var myUser = {
        name: name.value,
        email: email.value,
        password: password.value,
        lastLoggedInAt: new Date()
      };

      firestore
        .collection("users")
        .doc(user.uid)
        .set(myUser)
        .then(() => {
          console.log("Data passed in Database");
          location.href = "signin.html";

        })
        .catch((error) => {
          console.log("Nai huwa add");
          console.log(error);
        });





    })

    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      alert(errorMessage);
      // ..
    });
};

// ...............{SIGNIN}.............

const signIn = () => {
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  console.log(email.value, password.value);

  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user.uid);

      location.href = "game.html";
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
};

const gameDashboard = () => {
  const userName = document.getElementById("userName");

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid);
      console.log(user.email);
      firestore.collection('users').doc(user.uid).get()
        .then((querySnapshot) => {
          const data = querySnapshot.data();
          console.log(querySnapshot);
          console.log(data);
          userName.innerHTML = data.name;
        })
    } else {
      console.log("user is signed out");
    }
  });
};

//Game

const level = 1;
let lifeCount =3;
const round = document.getElementById("roundNumber")
const life = document.getElementById("life")

round.innerText = level;
life.innerText= lifeCount;

let popped = 0;

document.addEventListener('mouseover', function (e) {

  if (e.target.classList.contains("bluee")) {

    e.target.style.backgroundColor = "#ededed";
    e.target.textContent = "POP!";
    popped++;
    removeEvent(e);
    checkAllPopped();
  }else if(e.target.classList.contains("red")|| e.target.classList.contains("pink")||e.target.classList.contains("green")|| e.target.classList.contains("yellow")){
    console.log("you mised")
    lifeCount--;
    life.innerText = lifeCount;
    if(lifeCount==0){
      alert("Game Over")
    }
  }
});


function removeEvent(e) {
  e.target.removeEventListener('mouseover', function () {

  })
};

function checkAllPopped() {
  if (popped === 24) {
    console.log('all popped!');
    let gallery = document.querySelector('#balloon-gallery');
    let message = document.querySelector('#yay-no-balloons');
    gallery.innerHTML = '';
    message.style.display = 'block';
  }
};

