const base = "http://127.0.0.1:8000";
let leaguesData = [];

function apiUrlForSport(sport) {
  return sport === "basketball"
    ? `${base}/basketball/leagues`
    : `${base}/leagues`;
}

async function getLeagues() {
  const sport = document.getElementById("sport-select")?.value || "soccer";
  const url = apiUrlForSport(sport);
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error ${response.status}`);

    const data = await response.json();
    leaguesData = data.leagues || [];
    showLeagues(leaguesData);
  } catch (error) {
    console.error(error);
    document.getElementById("league-list").innerHTML =
      '<p class="text-danger">❌ Error loading the leagues</p>';
  }
}

function showLeagues(list) {
  const container = document.getElementById("league-list");
  container.innerHTML = "";

  if (!Array.isArray(list) || list.length === 0) {
    container.innerHTML = '<p class="text-muted">No leagues found</p>';
    return;
  }

  list.forEach((league) => {
    const div = document.createElement("div");
    div.classList.add("col-md-4", "mb-3");
    div.innerHTML = `
      <div class="card shadow-sm border-0">
        <div class="card-body">
          <h5 class="card-title">${league.name}</h5>
          <p class="card-text text-muted">${league.country || ""}</p>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

document.getElementById("sport-select")?.addEventListener("change", () => {
  getLeagues();
});
