const nameEl = document.getElementById("pokemon-name");
const idEl = document.getElementById("pokemon-id");
const spriteBox = document.getElementById("sprite-container");
const typeBox = document.getElementById("types");

const heightEl = document.getElementById("height");
const weightEl = document.getElementById("weight");

const hpEl = document.getElementById("hp");
const attackEl = document.getElementById("attack");
const defenseEl = document.getElementById("defense");
const spAtkEl = document.getElementById("special-attack");
const spDefEl = document.getElementById("special-defense");
const speedEl = document.getElementById("speed");

const form = document.getElementById("pokemon-search");
const input = document.getElementById("search-input");

function clearDisplay() {
  spriteBox.innerHTML = "";
  typeBox.innerHTML = "";

  nameEl.textContent = "";
  idEl.textContent = "";
  heightEl.textContent = "";
  weightEl.textContent = "";

  hpEl.textContent = "";
  attackEl.textContent = "";
  defenseEl.textContent = "";
  spAtkEl.textContent = "";
  spDefEl.textContent = "";
  speedEl.textContent = "";
}

function createTypeTag(typeName) {
  return `<span class="type ${typeName}">${typeName}</span>`;
}

async function loadPokemon(query) {
  try {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return;

    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${cleanQuery}`
    );

    if (!response.ok) {
      throw new Error("Not found");
    }

    const data = await response.json();

    nameEl.textContent = data.name;
    idEl.textContent = `#${data.id}`;
    heightEl.textContent = `Height: ${data.height}`;
    weightEl.textContent = `Weight: ${data.weight}`;

    spriteBox.innerHTML = `
            <img id="sprite" src="${data.sprites.front_default}" alt="${data.name}">
        `;

    hpEl.textContent = data.stats[0].base_stat;
    attackEl.textContent = data.stats[1].base_stat;
    defenseEl.textContent = data.stats[2].base_stat;
    spAtkEl.textContent = data.stats[3].base_stat;
    spDefEl.textContent = data.stats[4].base_stat;
    speedEl.textContent = data.stats[5].base_stat;

    typeBox.innerHTML = data.types
      .map((t) => createTypeTag(t.type.name))
      .join("");
  } catch (err) {
    clearDisplay();
    alert("Pokémon not found. Try another name or ID.");
    console.error(err);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  loadPokemon(input.value);
});
