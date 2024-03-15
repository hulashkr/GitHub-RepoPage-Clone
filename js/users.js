const users = [
  { id: 0, username: "John Doe", password: "password1", starredRepos: [1, 2] },
  {
    id: 1,
    username: "Alice Smith",
    password: "password2",
    starredRepos: [0, 2, 3],
  },
  {
    id: 2,
    username: "Bob Johnson",
    password: "password3",
    starredRepos: [18, 11, 10],
  },
  {
    id: 3,
    username: "Emily Brown",
    password: "password4",
    starredRepos: [15, 12, 14],
  },
  {
    id: 4,
    username: "Michael Wilson",
    password: "password5",
    starredRepos: [1, 4, 8, 12, 13],
  },
];

// Store users array in localStorage
localStorage.setItem("users", JSON.stringify(users));

// Get the <span> element by its ID

// Function to handle login
function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const total_users = JSON.parse(localStorage.getItem("users"));
  // Check if user exists
  const user = total_users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    alert("Login successful!");
    // Redirect or do something after successful login
    window.location.href = "home.html";

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    // loggedInUserNameElement.appendChild(repoDiv);
  } else {
    alert("Invalid username or password. Please try again.");
  }
}

// Function to handle signup
function handleSignup(event) {
  event.preventDefault();
  const newUsername = document.getElementById("newUsername").value;
  const newPassword = document.getElementById("newPassword").value;

  // Add new user to localStorage

  const usersString = localStorage.getItem("users");

  // Parse the string back to an array
  const totalusers = JSON.parse(usersString);

  // Get the length of the users array
  const usersLength = totalusers.length;
  users.push({
    id: usersLength + 1,
    username: newUsername,
    password: newPassword,
  });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Signup successful! Please login.");
  // Show login section
  showLoginSection();
}

// Function to show login section
function showLoginSection() {
  document.getElementById("loginSection").style.display = "block";
  document.getElementById("signupSection").style.display = "none";
}

// Function to show signup section
function showSignupSection() {
  document.getElementById("loginSection").style.display = "none";
  document.getElementById("signupSection").style.display = "block";
}

// Event listeners
document.getElementById("loginForm").addEventListener("submit", handleLogin);
document.getElementById("signupForm").addEventListener("submit", handleSignup);
document
  .getElementById("showSignupBtn")
  .addEventListener("click", showSignupSection);
document
  .getElementById("showLoginBtn")
  .addEventListener("click", showLoginSection);

const logoutBu = document.querySelector(".logoutbtn");
logoutBu.addEventListener("click", function () {
  // Remove the item from localStorage
  localStorage.removeItem("repositories");
  localStorage.removeItem("loggedInUser");
  // Optionally, redirect the user to the login page or perform other logout actions
  window.location.href = "index.html";
});
