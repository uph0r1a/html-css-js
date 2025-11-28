const authorContainer = document.getElementById("author-container");
const loadMoreBtn = document.getElementById("load-more-btn");

let currentIndex = 0;
const PAGE_SIZE = 8;
let authors = [];

const fetchAuthors = async () => {
  try {
    const res = await fetch(
      "https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json"
    );
    if (!res.ok) throw new Error("Network response was not ok");
    authors = await res.json();
    displayAuthors(authors.slice(currentIndex, currentIndex + PAGE_SIZE));
  } catch (err) {
    authorContainer.innerHTML =
      '<p class="error-msg">There was an error loading the authors</p>';
    console.error(err);
  }
};

const displayAuthors = (authorSlice) => {
  if (!authorSlice || authorSlice.length === 0) return;

  const fragment = document.createDocumentFragment();

  authorSlice.forEach(({ name, image, url, bio }) => {
    const card = document.createElement("div");
    card.className = "user-card";

    card.innerHTML = `
      <h2 class="author-name">${name}</h2>
      <img class="user-img" src="${image}" alt="${name} avatar">
      <div class="purple-divider"></div>
      <p class="bio">${bio.length > 50 ? bio.slice(0, 50) + "..." : bio}</p>
      <a class="author-link" href="${url}" target="_blank">${name} page</a>
    `;

    fragment.appendChild(card);
  });

  authorContainer.appendChild(fragment);
};

loadMoreBtn.addEventListener("click", () => {
  currentIndex += PAGE_SIZE;
  displayAuthors(authors.slice(currentIndex, currentIndex + PAGE_SIZE));

  if (currentIndex + PAGE_SIZE >= authors.length) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = "No more data to load";
  }
});

fetchAuthors();
