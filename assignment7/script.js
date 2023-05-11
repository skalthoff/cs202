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

function playSound(note) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  const noteFrequencies = {
    'C': 261.63,
    'D': 293.66,
    'E': 329.63,
    'F': 349.23,
    'G': 392.00,
    'A': 440.00,
    'B': 493.88,
  };

  const duration = document.getElementById('duration').value;
  const frequencyMultiplier = document.getElementById('frequency').value;

  oscillator.frequency.value = noteFrequencies[note] * frequencyMultiplier;
  oscillator.type = 'sine'; // Change this to 'square', 'sawtooth', or 'triangle' for different sounds

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.01);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start(audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration / 1000);

  setTimeout(() => {
    oscillator.stop();
  }, duration);
}

function handleDeviceOrientation(event) {
    let direction = Math.floor(event.webkitCompassHeading / 45);
    let note = noteMapping[(dayOfWeek + direction) % 7];
    document.getElementById('note-name').innerText = note;
  
    playSound(note);
  }
  