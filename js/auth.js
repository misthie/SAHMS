// Toggle forms
function showSignup() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
}

function showLogin() {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
}
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const uid = user.uid;
    firebase.database().ref("users/" + uid).once("value")
      .then(snapshot => {
        const data = snapshot.val();
        console.log("User role:", data.role);
        if (data.role === "admin") {
          console.log("You are an admin!");
        } else {
          console.log("Not an admin:", data.role);
        }
      })
      .catch(err => console.error(err));
  }
});

// LOGIN
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((cred) => {
      const uid = cred.user.uid;

      return firebase.database().ref("users/" + uid).once("value");
    })
    .then((snapshot) => {
      const userData = snapshot.val();

      // 🛡 SAFETY CHECK
      if (!userData || !userData.role) {
        alert("User role not found. Please contact admin.");
        return;
      }

      if (userData.role === "admin") {
        window.location.href = "dashboard.html";
      } else {
        window.location.href = "dashboard.html";
      }
    })
    .catch((error) => {
      alert(error.message);
    });
}


// SIGNUP
function signup() {
   const email = document.getElementById("signupEmail").value;
   const password = document.getElementById("signupPassword").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((cred) => {
    const uid = cred.user.uid;
    console.log("User created with UID:", uid);

    // Write to database
    return firebase.database().ref("users/" + uid).set({
      email: email,
      role: "patient" // default
    });
  })
  .then(() => {
    console.log("User data added to database!");
    alert("Account created! You can now login.");
    showLogin();
  })
  .catch(err => alert(err.message));
}
