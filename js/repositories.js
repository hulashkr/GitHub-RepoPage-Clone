// Array of objects containing repository information
const users = JSON.parse(localStorage.getItem("users"));
const cur_user = JSON.parse(localStorage.getItem("loggedInUser"));
const currentUserObject = users.find((user) => user.id === cur_user.id);

// Get the starredRepoIds array of the current user
const repo_ids = currentUserObject.starredRepos;
// Function to create HTML elements for each repository
function createRepositoryElements() {
  const container = document.getElementById("repositoriesContainer");

  try {
    // In another JavaScript file
    // console.log(window.repositories);

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const currentUserObject = users.find((user) => user.id === cur_user.id);
    // Check if the logged-in user exists
    if (loggedInUser) {
      // Get the username of the logged-in user
      const loggedInUsername = currentUserObject.username;

      // Get the DOM element with id "loggedInUserName"
      const loggedInUserNameElement =
        document.getElementById("loggedInUserName");

      // Set the inner text of the element to the username
      loggedInUserNameElement.innerText = loggedInUsername;
      const loggedInUserNameElement1 =
        document.getElementById("loggedInUserName1");

      // Set the inner text of the element to the username
      loggedInUserNameElement1.innerText = loggedInUsername;
    } else {
      console.error("Logged-in user not found in local storage.");
    }

    const repositories = JSON.parse(localStorage.getItem("repositories"));
    repositories.forEach((repo) => {
      const repoDiv = document.createElement("div");
      repoDiv.classList.add("home-article-content");

      const upDiv = document.createElement("div");
      upDiv.classList.add("up_div");

      // Repository Title
      const titleDiv = document.createElement("h3");
      titleDiv.textContent = repo.title;
      titleDiv.classList.add("left-up_div");
      upDiv.appendChild(titleDiv);

      const starredDiv = document.createElement("div");
      starredDiv.classList.add("right-up_div");

      // Add click event listener to toggle star status
      starredDiv.addEventListener("click", function () {
        if (!repo_ids.includes(repo.id)) {
          repo_ids.push(repo.id);
        } else {
          const index = repo_ids.indexOf(repo.id);
          if (index !== -1) {
            repo_ids.splice(index, 1);
          }
        }

        // Update the starredRepoIds array in the logged-in user's object
        cur_user.starredRepos = repo_ids;

        // Update local storage with the modified user object
        localStorage.setItem("loggedInUser", JSON.stringify(cur_user));

        // createRepositoryElements();
      });

      const starIcon = document.createElement("span");
      starIcon.innerHTML = repo_ids.includes(repo.id)
        ? `<svg height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="yellow" data-view-component="true" class="octicon octicon-star">
        <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
    </svg>`
        : `<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="currentColor" data-view-component="true" class="octicon octicon-star">
        <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
    </svg>`;

      starredDiv.appendChild(starIcon);
      starredDiv.innerHTML += repo_ids.includes(repo.id) ? " Starred" : " Star";

      upDiv.appendChild(starredDiv);

      repoDiv.appendChild(upDiv);

      const downDiv = document.createElement("div");
      downDiv.classList.add("down_div");

      // Languages
      const languagesDiv = document.createElement("h5");
      languagesDiv.textContent = repo.languages.join(", ");
      languagesDiv.classList.add("down_div_lang");
      downDiv.appendChild(languagesDiv);

      // Last Date
      const lastDateDiv = document.createElement("h5");
      lastDateDiv.textContent = "Updated on " + repo.last_date;
      lastDateDiv.classList.add("down_div");
      downDiv.appendChild(lastDateDiv);

      repoDiv.appendChild(downDiv);

      // Starred Status

      container.appendChild(repoDiv);
    });
  } catch (error) {
    console.error("Error fetching repositories:", error);
  }
}

function sortAndFilterRepositories(language) {
  const repositories = JSON.parse(localStorage.getItem("repositories"));
  const filteredRepositories = language
    ? repositories.filter((repo) => repo.languages.includes(language))
    : repositories;

  // Clear existing repositories
  const container = document.getElementById("repositoriesContainer");
  container.innerHTML = "";

  // Display filtered repositories
  filteredRepositories.forEach((repo) => {
    const repoDiv = document.createElement("div");
    repoDiv.classList.add("home-article-content");

    const upDiv = document.createElement("div");
    upDiv.classList.add("up_div");

    // Repository Title
    const titleDiv = document.createElement("h3");
    titleDiv.textContent = repo.title;
    titleDiv.classList.add("left-up_div");
    upDiv.appendChild(titleDiv);

    const starredDiv = document.createElement("div");
    starredDiv.classList.add("right-up_div");

    // Add click event listener to toggle star status
    starredDiv.addEventListener("click", function () {
      // Toggle star status
      const cur_user = JSON.parse(localStorage.getItem("loggedInUser"));
      const currentUserObject = users.find((user) => user.id === cur_user.id);

      // Get the starredRepoIds array of the current user
      const repo_ids = currentUserObject.starredRepos;

      if (!repo_ids.includes(repo.id)) {
        repo_ids.push(repo.id);
      } else {
        const index = repo_ids.indexOf(repo.id);
        if (index !== -1) {
          repo_ids.splice(index, 1);
        }
      }

      // Update the starredRepoIds array in the logged-in user's object
      cur_user.starredRepos = repo_ids;

      // Update local storage with the modified user object
      localStorage.setItem("loggedInUser", JSON.stringify(cur_user));
      sortAndFilterRepositories(language);
    });

    const starIcon = document.createElement("span");
    starIcon.innerHTML = repo_ids.includes(repo.id)
      ? `<svg height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="yellow" data-view-component="true" class="octicon octicon-star">
        <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
    </svg>`
      : `<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="currentColor" data-view-component="true" class="octicon octicon-star">
        <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
    </svg>`;

    starredDiv.appendChild(starIcon);
    starredDiv.innerHTML += repo_ids.includes(repo.id) ? " Starred" : " Star";
    upDiv.appendChild(starredDiv);

    repoDiv.appendChild(upDiv);

    const downDiv = document.createElement("div");
    downDiv.classList.add("down_div");

    // Languages
    const languagesDiv = document.createElement("h5");
    languagesDiv.textContent = repo.languages.join(", ");
    languagesDiv.classList.add("down_div_lang");
    downDiv.appendChild(languagesDiv);

    //stars
    const starsIcon = document.createElement("h5");

    if (repo.stars > 0) {
      //   starIcon.innerHTML = `<svg  height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="yellow" data-view-component="true" class="octicon octicon-star">
      //     <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
      // </svg>`;
      starsIcon.innerHTML += repo.stars;
    }
    starsIcon.classList.add("down_div_lang");
    downDiv.appendChild(starsIcon);

    // Last Date
    const lastDateDiv = document.createElement("h5");
    lastDateDiv.textContent = "Updated on " + repo.last_date;
    lastDateDiv.classList.add("down_div");
    downDiv.appendChild(lastDateDiv);

    repoDiv.appendChild(downDiv);

    // Starred Status

    container.appendChild(repoDiv);
  });
}

function sort_starAndFilterRepositories() {
  const repositories = JSON.parse(localStorage.getItem("repositories"));
  const sortByStars = (a, b) => b.stars - a.stars;

  // Sort the repositories array based on the number of stars
  repositories.sort(sortByStars);
  const filteredRepositories = repositories;

  // Clear existing repositories
  const container = document.getElementById("repositoriesContainer");
  container.innerHTML = "";

  // Display filtered repositories
  filteredRepositories.forEach((repo) => {
    const repoDiv = document.createElement("div");
    repoDiv.classList.add("home-article-content");

    const upDiv = document.createElement("div");
    upDiv.classList.add("up_div");

    // Repository Title
    const titleDiv = document.createElement("h3");
    titleDiv.textContent = repo.title;
    titleDiv.classList.add("left-up_div");
    upDiv.appendChild(titleDiv);

    const starredDiv = document.createElement("div");
    starredDiv.classList.add("right-up_div");

    // Add click event listener to toggle star status
    starredDiv.addEventListener("click", function () {
      // Toggle star status

      if (!repo_ids.includes(repo.id)) {
        repo_ids.push(repo.id);
      } else {
        const index = repo_ids.indexOf(repo.id);
        if (index !== -1) {
          repo_ids.splice(index, 1);
        }
      }

      // Update the starredRepoIds array in the logged-in user's object
      cur_user.starredRepos = repo_ids;

      // Update local storage with the modified user object
      localStorage.setItem("loggedInUser", JSON.stringify(cur_user));
      sort_starAndFilterRepositories();
    });

    const starIcon = document.createElement("span");
    starIcon.innerHTML = repo_ids.includes(repo.id)
      ? `<svg height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="yellow" data-view-component="true" class="octicon octicon-star">
        <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
    </svg>`
      : `<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="currentColor" data-view-component="true" class="octicon octicon-star">
        <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
    </svg>`;

    starredDiv.appendChild(starIcon);
    starredDiv.innerHTML += repo_ids.includes(repo.id) ? " Starred" : " Star";
    upDiv.appendChild(starredDiv);

    repoDiv.appendChild(upDiv);

    const downDiv = document.createElement("div");
    downDiv.classList.add("down_div");

    // Languages
    const languagesDiv = document.createElement("h5");
    languagesDiv.textContent = repo.languages.join(", ");
    languagesDiv.classList.add("down_div_lang");
    downDiv.appendChild(languagesDiv);

    //stars
    const starsIcon = document.createElement("h5");

    if (repo.stars > 0) {
      //   starIcon.innerHTML = `<svg  height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="yellow" data-view-component="true" class="octicon octicon-star">
      //     <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
      // </svg>`;
      starsIcon.innerHTML += repo.stars;
    }
    starsIcon.classList.add("down_div_lang");
    downDiv.appendChild(starsIcon);

    // Last Date
    const lastDateDiv = document.createElement("h5");
    lastDateDiv.textContent = "Updated on " + repo.last_date;
    lastDateDiv.classList.add("down_div");
    downDiv.appendChild(lastDateDiv);

    repoDiv.appendChild(downDiv);

    // Starred Status

    container.appendChild(repoDiv);
  });
}

function sort_activityAndFilterRepositories() {
  const repositories = JSON.parse(localStorage.getItem("repositories"));
  const sortByDate = (a, b) => {
    // Convert date strings to Date objects for comparison
    const dateA = new Date(a.last_date);
    const dateB = new Date(b.last_date);

    // Compare dates
    return dateB - dateA; // Sort in descending order (most recent first)
  };

  // Sort the repositories array based on the last_date property
  repositories.sort(sortByDate);
  const filteredRepositories = repositories;

  // Clear existing repositories
  const container = document.getElementById("repositoriesContainer");
  container.innerHTML = "";

  // Display filtered repositories
  filteredRepositories.forEach((repo) => {
    const repoDiv = document.createElement("div");
    repoDiv.classList.add("home-article-content");

    const upDiv = document.createElement("div");
    upDiv.classList.add("up_div");

    // Repository Title
    const titleDiv = document.createElement("h3");
    titleDiv.textContent = repo.title;
    titleDiv.classList.add("left-up_div");
    upDiv.appendChild(titleDiv);

    const starredDiv = document.createElement("div");
    starredDiv.classList.add("right-up_div");

    // Add click event listener to toggle star status
    starredDiv.addEventListener("click", function () {
      // Toggle star status

      if (!repo_ids.includes(repo.id)) {
        repo_ids.push(repo.id);
      } else {
        const index = repo_ids.indexOf(repo.id);
        if (index !== -1) {
          repo_ids.splice(index, 1);
        }
      }

      // Update the starredRepoIds array in the logged-in user's object
      cur_user.starredRepos = repo_ids;

      // Update local storage with the modified user object
      localStorage.setItem("loggedInUser", JSON.stringify(cur_user));
      sort_activityAndFilterRepositories();
    });

    const starIcon = document.createElement("span");
    starIcon.innerHTML = repo_ids.includes(repo.id)
      ? `<svg height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="yellow" data-view-component="true" class="octicon octicon-star">
        <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
    </svg>`
      : `<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="currentColor" data-view-component="true" class="octicon octicon-star">
        <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
    </svg>`;

    starredDiv.appendChild(starIcon);
    starredDiv.innerHTML += repo_ids.includes(repo.id) ? " Starred" : " Star";
    upDiv.appendChild(starredDiv);

    repoDiv.appendChild(upDiv);

    const downDiv = document.createElement("div");
    downDiv.classList.add("down_div");

    // Languages
    const languagesDiv = document.createElement("h5");
    languagesDiv.textContent = repo.languages.join(", ");
    languagesDiv.classList.add("down_div_lang");
    downDiv.appendChild(languagesDiv);

    //stars
    const starsIcon = document.createElement("h5");

    if (repo.stars > 0) {
      //   starIcon.innerHTML = `<svg  height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="yellow" data-view-component="true" class="octicon octicon-star">
      //     <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
      // </svg>`;
      starsIcon.innerHTML += repo.stars;
    }
    starsIcon.classList.add("down_div_lang");
    downDiv.appendChild(starsIcon);

    // Last Date
    const lastDateDiv = document.createElement("h5");
    lastDateDiv.textContent = "Updated on " + repo.last_date;
    lastDateDiv.classList.add("down_div");
    downDiv.appendChild(lastDateDiv);

    repoDiv.appendChild(downDiv);

    // Starred Status

    container.appendChild(repoDiv);
  });
}

// Initial display of all repositories
// sortAndFilterRepositories(null);

// Call the function when the page is loaded
window.onload = createRepositoryElements;
