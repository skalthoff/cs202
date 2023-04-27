const peopleContainer = $("#people-container");

const EPIC_API_KEY = "EhjrQ7GHtgJ9eaYizPgqwY9ow5Y8rGIq3XJgEgbS"
// Fetch the latest image from EPIC API and set it as the background
$.getJSON(
  `https://api.nasa.gov/EPIC/api/natural/images?api_key=${EPIC_API_KEY}`,
  function (data) {
    const latestImage = data[data.length - 1];
    const imageUrl = `https://api.nasa.gov/EPIC/archive/natural/${latestImage.date
      .substr(0, 10)
      .replace(/-/g, "/")}/png/${latestImage.image}.png?api_key=${EPIC_API_KEY}`;
    $("body").css("background-image", `url(${imageUrl})`);
  }
);

// Fetch the data from the People in Space API using jQuery
// Fetch the data from the People in Space API using jQuery
$.getJSON("http://api.open-notify.org/astros.json?callback=?", function (peopleData) {
  // Fetch the ISS altitude
  $.getJSON("https://api.wheretheiss.at/v1/satellites/25544", function (issData) {
    displayPeopleInSpace(peopleData, issData.altitude);
  });
});

function displayPeopleInSpace(peopleData, issAltitude) {
  const groupedByCraft = groupPeopleByCraft(peopleData.people);

  for (const craft in groupedByCraft) {
    const craftElement = createCraftElement(craft);
    const craftPeople = groupedByCraft[craft];

    craftPeople.forEach((person) => {
      const personElement = createPersonElement(person, craft === "ISS" ? issAltitude : null);
      craftElement.appendChild(personElement);
    });

    peopleContainer.append(craftElement);
  }
}



function groupPeopleByCraft(people) {
  return people.reduce((grouped, person) => {
    if (!grouped[person.craft]) {
      grouped[person.craft] = [];
    }
    grouped[person.craft].push(person);
    return grouped;
  }, {});
}

function createCraftElement(craftName) {
  const craftElement = document.createElement("div");
  craftElement.classList.add("craft");

  const craftNameElement = document.createElement("div");
  craftNameElement.classList.add("craft-name");
  craftNameElement.textContent = craftName;

  craftElement.appendChild(craftNameElement);

  return craftElement;
}
function createPersonElement(person, altitude) {
  const personElement = document.createElement("div");
  personElement.classList.add("person");

  personElement.textContent = altitude
    ? `${person.name} (ISS Altitude: ${altitude.toFixed(2)} km)`
    : `${person.name}`;

  return personElement;
}

