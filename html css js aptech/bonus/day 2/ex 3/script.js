document.getElementById("openContactPagebtn").addEventListener("click", () => {
  window.location.href = "contact.html";
});

let articleCount = 1;

document.getElementById("addArticlebtn").addEventListener("click", () => {
  articleCount++;

  const section = document.getElementById("articles");
  const original = document.querySelector(".article");

  const newArticle = original.cloneNode(true);

  newArticle.id = "article-" + articleCount;
  newArticle.querySelector("h2").innerText = "New Article " + articleCount;
  newArticle.querySelectorAll("p")[0].innerText =
    "This is a new article with some placeholder text.";
  newArticle.querySelectorAll("p")[1].innerText =
    "More content for the new article.";

  section.appendChild(newArticle);
});
