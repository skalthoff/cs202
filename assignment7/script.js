function playNote() {
    const dayOfWeek = new Date().getDay();
    const noteMapping = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition(
        (position) => {
          const heading = position.coords.heading;
          if (heading !== null) {
            const direction = Math.floor(heading / 45);
            const note = noteMapping[(dayOfWeek + direction) % 7];
            document.getElementById('note-name').innerText = note;
            
            // Play the note using the Web Audio API or another library
          } else {
            alert('Cannot obtain compass heading. Make sure your device has a compass and try again.');
          }
        },
        (error) => {
          alert('Error obtaining location: ' + error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  }
  
  document.getElementById('play-note').addEventListener('click', playNote);
  