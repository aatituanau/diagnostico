const base = "http://127.0.0.1:8000";
let allLeagues = []; // Guardamos todas las ligas aquí

async function getLeagues() {
  const sport = document.getElementById("sport-select").value;
  const url =
    sport === "basketball"
      ? `${base}/basketball-leagues?limit=20`
      : `${base}/leagues?limit=20`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    allLeagues = data.leagues || [];
    showLeagues(allLeagues);
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("league-list").innerHTML =
      '<p class="text-danger text-center">❌ Error al cargar</p>';
  }
}

function showLeagues(leagues) {
  const container = document.getElementById("league-list");
  container.innerHTML = "";

  if (leagues.length === 0) {
    container.innerHTML = '<p class="text-center">No hay ligas</p>';
    return;
  }

  leagues.forEach((league) => {
    const div = document.createElement("div");
    div.className = "col-md-4 col-sm-6 mb-3";
    div.innerHTML = `
      <div class="card h-100">
        <div class="card-body">
          ${
            league.logo
              ? `<img src="${league.logo}" class="mb-2" style="height: 40px;">`
              : ""
          }
          <h6 class="card-title">${league.name}</h6>
          <p class="card-text text-muted small">${league.country}</p>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

document.getElementById("search-input").addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filtered = allLeagues.filter((league) =>
    league.name.toLowerCase().includes(searchTerm)
  );
  showLeagues(filtered);
});

document.getElementById("sport-select").addEventListener("change", () => {
  document.getElementById("search-input").value = "";
  getLeagues();
});

getLeagues();
