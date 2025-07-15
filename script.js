const countryInput = document.getElementById("country");
const cityInput = document.getElementById("city");
const dateInput = document.getElementById("date");
const notesInput = document.getElementById("notes");
const tripList = document.getElementById("tripList");

let trips = JSON.parse(localStorage.getItem("trips")) || [];

function displayTrips() {
  tripList.innerHTML = "";
  trips.forEach((trip, index) => {
    const div = document.createElement("div");
    div.className = "trip";
    div.innerHTML = `
      <h3>📍 ${trip.city}, ${trip.country}</h3>
      <small>🗓️ ${trip.date}</small>
      <p>${trip.notes}</p>
      <a class="map-link" href="https://www.google.com/maps/search/${trip.city},${trip.country}" target="_blank">🗺️ View on Google Maps</a>
      <button onclick="deleteTrip(${index})">🗑️</button>
    `;
    tripList.appendChild(div);
  });
}

function addTrip() {
  const country = countryInput.value.trim();
  const city = cityInput.value.trim();
  const date = dateInput.value;
  const notes = notesInput.value.trim();

  if (!country || !city || !date) {
    alert("Please fill all fields");
    return;
  }

  trips.push({ country, city, date, notes });
  localStorage.setItem("trips", JSON.stringify(trips));
  displayTrips();

  countryInput.value = "";
  cityInput.value = "";
  dateInput.value = "";
  notesInput.value = "";
}

function deleteTrip(index) {
  trips.splice(index, 1);
  localStorage.setItem("trips", JSON.stringify(trips));
  displayTrips();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Show trips on load
displayTrips();
