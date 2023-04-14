function loadImage(src, pixelWidth) {
    const img = new Image();
    img.src = src;
    img.onload = function () {
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'block';

        setTimeout(() => {
            const aspectRatio = img.height / img.width;
            const newWidth = pixelWidth;
            const newHeight = Math.round(newWidth * aspectRatio);
            const canvas = document.createElement('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            const container = document.getElementById('container');
            container.innerHTML = '';
            container.style.width = `${newWidth * 10}px`;
            container.style.height = `${newHeight * 10}px`;
            for (let y = 0; y < newHeight; y++) {
                for (let x = 0; x < newWidth; x++) {
                    const pixelData = ctx.getImageData(x, y, 1, 1).data;
                    const pixelDiv = document.createElement('div');
                    pixelDiv.style.backgroundColor = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3] / 255})`;
                    pixelDiv.classList.add('pixel');
                    container.appendChild(pixelDiv);
                }
            }
            spinner.style.display = 'none';
            initFlashlight(container);
        }, 500);
    };
}

function initFlashlight(container) {
    const flashlight = document.getElementById('flashlight');
    const flashlightRadius = 80;
    const flashlightDiameter = flashlightRadius * 2;

    flashlight.style.width = `${flashlightDiameter}px`;
    flashlight.style.height = `${flashlightDiameter}px`;

    container.addEventListener('mousemove', (e) => {
        flashlight.style.display = 'block';
        flashlight.style.top = `${e.pageY - flashlightRadius}px`;
        flashlight.style.left = `${e.pageX - flashlightRadius}px`;

        const mask = `radial-gradient(circle ${flashlightRadius}px at ${e.pageX - container.offsetLeft}px ${e.pageY - container.offsetTop}px, rgba(0,0,0,0), rgba(0,0,0,0.8))`;
        container.style.backgroundImage = mask;
    });

    container.addEventListener('mouseleave', () => {
        flashlight.style.display = 'none';
        container.style.backgroundImage = 'none';
    });
}

document.getElementById('file-input').addEventListener('change', function (e) {
    const file = e.target.files[0];
    const pixelWidth = parseInt(document.getElementById('width-value').textContent);
    loadImage(URL.createObjectURL(file), pixelWidth);
});

const widthSlider = document.getElementById('width-slider');
widthSlider.addEventListener('input', function (e) {
    document.getElementById('width-value').textContent = e.target.value;
});

// Load the default image when the site loads
loadImage('default.jpg', 30);
