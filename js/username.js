// Retrieve the logged-in user from local storage
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const currentUserObject = users.find((user) => user.id === cur_user.id);
// Check if the logged-in user exists
if (loggedInUser) {
  // Get the username of the logged-in user
  const loggedInUsername = currentUserObject.username;

  // Get the DOM element with id "loggedInUserName"
  const loggedInUserNameElement = document.getElementById("loggedInUserName");

  // Set the inner text of the element to the username
  loggedInUserNameElement.innerText = loggedInUsername;
} else {
  console.error("Logged-in user not found in local storage.");
}
