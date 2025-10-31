const url = "http://127.0.0.1:8000/leagues";

async function getLeagues() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error ${response.status}`);

    const data = await response.json();
    const listaDiv = document.getElementById("liga-list");
    listaDiv.innerHTML = "";

    data.ligas.forEach((liga) => {
      const p = document.createElement("p");
      p.textContent = `${liga.nombre} - ${liga.país}`;
      listaDiv.appendChild(p);
    });
  } catch (error) {
    console.error(error);
    document.getElementById("liga-list").textContent =
      "Error loading the leagues";
  }
}

getLeagues();
