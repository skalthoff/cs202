function playNote() {
    const dayOfWeek = new Date().getDay();
    const noteMapping = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  
    // Check for DeviceOrientationEvent support
    if ('DeviceOrientationEvent' in window) {
      // Request permission for iOS 13+
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
          .then(permissionState => {
            if (permissionState === 'granted') {
              window.addEventListener('deviceorientation', handleDeviceOrientation);
            } else {
              alert('Permission to access device orientation was denied.');
            }
          })
          .catch(console.error);
      } else {
        // Listen to the deviceorientation event for older devices
        window.addEventListener('deviceorientation', handleDeviceOrientation);
      }
    } else {
      alert('Device orientation is not supported by your browser.');
    }
  
    function handleDeviceOrientation(event) {
      let direction = Math.floor(event.webkitCompassHeading / 45);
      let note = noteMapping[(dayOfWeek + direction) % 7];
      document.getElementById('note-name').innerText = note;
  
      // Play the note using the Web Audio API or another library
    }
  }
  
  document.getElementById('play-note').addEventListener('click', playNote);
  