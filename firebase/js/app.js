//put the interpreter into strict mode
"use strict";

//create a new Firebase application using the Firebase
//console, https://console.firebase.google.com/

//setup OAuth with GitHub
//- on Firebase, enable the GitHub sign-in method
//- go to GitHub, and go to your account settings
//- under Developer Settings on the left, choose OAuth applications
//- fill out the form, setting the Authorization Callback URL
//  to the URL provided by Firebase 

//paste the Firebase initialization code here
  // Initialize Firebase
var config = {
    apiKey: "AIzaSyDkOc-dU1uu7A3s6R66rF2MUmMhdGLAizo",
    authDomain: "tasks-demo-432e1.firebaseapp.com",
    databaseURL: "https://tasks-demo-432e1.firebaseio.com",
    storageBucket: "tasks-demo-432e1.appspot.com",
    messagingSenderId: "85562750293"
};
firebase.initializeApp(config);
 
 var currentUser;
 var authProvider = new firebase.auth.GithubAuthProvider();

firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
        currentUser = user;
        console.log(currentUser);
    } else {
        // forces the user to sign in if they haven't signed. Redirects them to sign in
        firebase.auth().signInWithRedirect(authProvider);
    }
 });
 // links it to CSS
var taskForm = document.querySelector(".new-task-form");
var taskTitleInput = taskForm.querySelector(".new-task-title");
var taskList = document.querySelector(".task-list");

// for challenges, make two different tasksRef for each channel
var tasksRef = firebase.database().ref("tasks");
var purgeButton = document.querySelector(".btn-purge");

// when the user clicks submit, record their data to the database
taskForm.addEventListener("submit", function(evt) {
    evt.preventDefault();
    var task = {
        title:taskTitleInput.value.trim(), 
        done: false,
        //saves the current date and time relative to the server
        createdOn: firebase.database.ServerValue.TIMESTAMP,
        createdBy: {
            uid: currentUser.uid, 
            displayName: currentUser.displayName,
            email: currentUser.email
        }
    };
    // puts the task in the database
    tasksRef.push(task);
    taskTitleInput.value = "";
    return false;
});
function renderTask(snapshot) {
    // val returns the data that is in the db
    var task = snapshot.val();
    var li = document.createElement("li");

    var spanTitle = document.createElement("span");
    spanTitle.textContent = task.title;
    spanTitle.classList.add("task-title");
    li.appendChild(spanTitle);

    var spanCreation = document.createElement("span");
    //gets the time from now. ie a few seconds ago, 1 day ago etc
    spanCreation.textContent = moment(task.createdOn).fromNow() + " by " + (task.createdBy.displayName || task.createdBy.email);
    spanCreation.classList.add("task-creation");
    li.appendChild(spanCreation);

    // if task is done, make text gray and then strike through
    if (task.done) {
        li.classList.add("done");
        purgeButton.classList.remove("hidden");
}


    // clickable tasks
    li.addEventListener("click", function() {
        // console.log("click for " + task.title);
        snapshot.ref.update({
            done: !task.done

        });
    });
    
    
    taskList.appendChild(li);
}

function render (snapshot) {
    taskList.innerHTML = "";
    purgeButton.classList.add("hidden");
    snapshot.forEach(renderTask);
}
//.on == .addEventListener for firebase
tasksRef.on("value", render);

purgeButton.addEventListener("click", function() {
    // console.log("button clicked");
tasksRef.once("value", function(snapshot) {
        snapshot.forEach(function(taskSnapshot) {
            if (taskSnapshot.val().done) {
                taskSnapshot.ref.remove();
            }
        });
    });
});