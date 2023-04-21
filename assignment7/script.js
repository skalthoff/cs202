const EPIC_API_KEY = "EhjrQ7GHtgJ9eaYizPgqwY9ow5Y8rGIq3XJgEgbS";
const peopleContainer = $("#people-container");

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
$.getJSON("http://api.open-notify.org/astros.json?callback=?", function (data) {
  // Mock altitude data
  const mockAltitudeData = data.people.map((person, index) => ({
    craft: person.craft,
    altitude: (index + 1) * 10000, // Assuming a difference of 10,000 meters
  }));

  displayPeopleInSpace(data, mockAltitudeData);
});

// The rest of the functions remain unchanged...

function displayPeopleInSpace(peopleData, altitudeData) {
  const groupedByCraft = groupPeopleByCraft(peopleData.people);

  for (const craft in groupedByCraft) {
    const craftElement = createCraftElement(craft);
    const craftPeople = groupedByCraft[craft];

    craftPeople.forEach((person) => {
      const altitude = altitudeData.find((data) => data.craft === craft).altitude;
      const personElement = createPersonElement(person, altitude);
      craftElement.appendChild(personElement);
    });

    // Use the 'append' method instead of 'appendChild'
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
