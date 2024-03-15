const names = [
  "Sepsis Prediction",
  "Data Analysis",
  "Machine Learning",
  "Deep Learning",
  "Natural Language Processing",
];
const authors = [
  "John Doe",
  "Alice Smith",
  "Bob Johnson",
  "Emily Brown",
  "Michael Wilson",
];
const languages = [
  ["JavaScript", "HTML", "CSS"],
  ["Python", "Java"],
  ["Ruby", "C++"],
  ["Python", "R"],
  ["Java", "Kotlin"],
];
const dates = [
  "1 Feb, 2023",
  "2 Feb, 2023",
  "3 Feb, 2023",
  "4 Feb, 2023",
  "5 Feb, 2023",
];

if (!localStorage.getItem("repositories")) {
  const repositories = [];

  for (let i = 0; i < 20; i++) {
    const randomIndex = Math.floor(Math.random() * names.length);
    const randomLanguages =
      languages[Math.floor(Math.random() * languages.length)];

    const randomStars = Math.floor(Math.random() * 10);

    repositories.push({
      id: i,
      title: names[randomIndex],
      author: authors[Math.floor(Math.random() * authors.length)],
      last_date: dates[i % dates.length],
      languages: randomLanguages,

      stars: randomStars,
    });
  }

  // Store repositories array in localStorage
  localStorage.setItem("repositories", JSON.stringify(repositories));
}

const logoutBut = document.querySelector(".logoutbtn");
logoutBut.addEventListener("click", function () {
  // Remove the item from localStorage
  localStorage.removeItem("repositories");
  // Optionally, redirect the user to the login page or perform other logout actions
  window.location.href = "index.html";
});
