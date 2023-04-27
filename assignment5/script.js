$(document).ready(function () {
  fetchPeopleInSpace();

  function fetchPeopleInSpace() {
    $.ajax({
      url: "http://api.open-notify.org/astros.json",
      success: function (data) {
        populatePeopleContainer(data);
      },
      error: function (error) {
        console.error("Error fetching data: ", error);
      },
    });
  }

  function populatePeopleContainer(data) {
    const peopleContainer = $("#people-container");
    peopleContainer.empty();

    // Create a map to store unique crafts
    const craftMap = new Map();

    data.people.forEach((person) => {
      if (craftMap.has(person.craft)) {
        craftMap.get(person.craft).push(person.name);
      } else {
        craftMap.set(person.craft, [person.name]);
      }
    });

    // Iterate through the map and create the table
    craftMap.forEach((names, craft) => {
      const craftElement = $("<div>").addClass("craft");
      const craftNameElement = $("<div>").addClass("craft-name").text(craft);
      const namesList = names.map(name => $("<div>").addClass("person").text(name));
      const peopleList = $("<div>").addClass("people-list");

      namesList.forEach(nameElement => peopleList.append(nameElement));
      craftElement.append(craftNameElement);
      craftElement.append(peopleList);
      peopleContainer.append(craftElement);
    });
  }
});
