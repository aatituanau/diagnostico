const url = "http://127.0.0.1:8000/leagues";

async function getLeagues() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error ${response.status}`);

    const data = await response.json();
    const listDiv = document.getElementById("league-list");
    listDiv.innerHTML = "";

    data.leagues.forEach((league) => {
      const p = document.createElement("p");
      p.textContent = `${league.name} - ${league.country}`;
      listDiv.appendChild(p);
    });
  } catch (error) {
    console.error(error);
    document.getElementById("league-list").textContent =
      "Error loading the leagues";
  }
}

getLeagues();
