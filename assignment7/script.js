



// Add your EPIC API key here
const EPIC_API_KEY = "EhjrQ7GHtgJ9eaYizPgqwY9ow5Y8rGIq3XJgEgbS";

// Fetch the latest image from EPIC API and set it as the background
fetch(
  `https://api.nasa.gov/EPIC/api/natural/images?api_key=${EPIC_API_KEY}`
)
  .then((response) => response.json())
  .then((data) => {
    const latestImage = data[data.length - 1];
    const imageUrl = `https://api.nasa.gov/EPIC/archive/natural/${latestImage.date
      .substr(0, 10)
      .replace(/-/g, "/")}/png/${latestImage.image}.png?api_key=${EPIC_API_KEY}`;
    document.body.style.backgroundImage = `url(${imageUrl})`;
  });

// The rest of the code remains unchanged...
const peopleContainer = document.getElementById("people-container");

// Fetch the data from the People in Space API
fetch("http://api.open-notify.org/astros.json")
  .then((response) => response.json())
  .then((data) => {
    // Mock altitude data
    const mockAltitudeData = data.people.map((person, index) => ({
      craft: person.craft,
      altitude: (index + 1) * 10000, // Assuming a difference of 10,000 meters
    }));

    displayPeopleInSpace(data, mockAltitudeData);
  });

function displayPeopleInSpace(peopleData, altitudeData) {
  const groupedPeople = groupPeopleByCraft(peopleData.people);

  for (const craft in groupedPeople) {
    const craftDiv = document.createElement("div");
    craftDiv.className = "craft";

    const craftName = document.createElement("div");
    craftName.className = "craft-name";
    craftName.textContent = craft;
    craftDiv.appendChild(craftName);

    groupedPeople[craft].forEach((person) => {
      const personDiv = document.createElement("div");
      personDiv.className = "person";

      const personName = document.createElement("span");
      personName.textContent = person.name;
      personDiv.appendChild(personName);

      const personAltitudeData = altitudeData.find(
        (data) => data.craft === person.craft
      );
      const scaledHeight = (personAltitudeData.altitude / 100000) * 100;
      personDiv.style.paddingTop = `${scaledHeight}px`;

      craftDiv.appendChild(personDiv);
    });

    peopleContainer.appendChild(craftDiv);
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
