function playNote() {
    const dayOfWeek = new Date().getDay();
    const noteMapping = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
  
        // Combine the latitude, longitude, and dayOfWeek to determine the note
        let combinedValue = Math.floor(latitude) + Math.floor(longitude) + dayOfWeek;
        let note = noteMapping[combinedValue % 7];
        document.getElementById('note-name').innerText = note;
  
        // Play the note using the Web Audio API or another library
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  }
  
  document.getElementById('play-button').addEventListener('click', playNote);
  