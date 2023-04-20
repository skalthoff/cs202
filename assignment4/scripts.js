$(document).ready(function () {
    const canvas = document.getElementById('tetrominoes-background');
    const ctx = canvas.getContext('2d');

    const themes = [
        {
          name: 'Blue / Cyan',
          description: 'This palette features crisp and refreshing colors that evoke a sense of playfulness and energy, reminiscent of the classic game Mega Man.',
          colors: ['#002D69', '#00FFFF'],
        },
        {
          name: 'Forest / Chartreuse',
          description: 'A natural and calming color combination that brings a sense of freshness and comfort, perfect for a relaxing gaming experience.',
          colors: ['#128712', '#62D962'],
        },
        {
          name: 'Magenta / Pink',
          description: 'A playful and fun palette that reminds us of sweet treats like cotton candy. It\'s a great choice for those who want to add a touch of whimsy to their gameplay.',
          colors: ['#FF00FF', '#FFA8FF'],
        },
        {
          name: 'Blue / Green',
          description: 'This palette brings to mind the iconic Seattle Seahawks logo, featuring bold and vibrant colors that are sure to make a statement on the game board.',
          colors: ['#1B4C1B', '#4CFF4C'],
        },
        {
          name: 'Red / Seafoam',
          description: 'While this palette may be reminiscent of Christmas, the soft pastel colors create a unique and understated combination, perfect for those who prefer a more subdued look.',
          colors: ['#9C3838', '#9CFF9C'],
        },
        {
          name: 'Seafoam / Cornflower',
          description: 'These pastel colors may be considered "boring" by some, but the subtle contrast of seafoam and cornflower creates a soothing and calming effect on the eyes.',
          colors: ['#00A800', '#0070EC'],
        },
        {
          name: 'Red / Gray',
          description: 'A fiery and dramatic palette that evokes images of lava and ash. The contrast between the bright red and cool gray makes for an exciting and dynamic gameplay experience.',
          colors: ['#FF0000', '#A0A0A0'],
        },
        {
          name: 'Purple / Burgundy',
          description: 'This palette features a sophisticated and bold color combination that is sure to make a statement. It\'s the only double-dark set, making it a unique and elegant option.',
          colors: ['#7B30C7', '#810000'],
        },
        {
          name: 'Blue / Red',
          description: 'This palette combines the bold and striking colors of blue and red to create a dynamic and energetic atmosphere on the game board. The contrast between the two colors is sure to keep players engaged and focused, making it a great choice for those who want a more intense gaming experience.',
          colors: ['#0000FF', '#FF0000'],
        },
        {
          name: 'Red / Orange',
          description: 'Although this palette may not be everyone\'s cup of tea, the bold and bright colors can add a touch of energy and excitement to the game board. It\'s a great choice for those who want to stand out from the crowd.',
          colors: ['#FF0000', '#FFA000'],
        },
      ];
      

    let currentTheme = 0;

    function applyTheme(theme) {
        $('.theme-name').text(theme.name);
        $('.theme-description').text(theme.description);
        $('body').css('color', theme.colors[1]);
        drawTetrominoesBackground(theme.colors);
    }

    applyTheme(themes[currentTheme]);

    $(document).on('keydown', function (e) {
        if (e.key === ' ') {
            e.preventDefault();
            currentTheme = (currentTheme + 1) % themes.length;
            applyTheme(themes[currentTheme]);
        }
    });
    $(document).on('click', function (e) {
        e.preventDefault();
        currentTheme = (currentTheme + 1) % themes.length;
        applyTheme(themes[currentTheme]);
    });



    // Play the Tetris music on loop
    const tetrisMusic = document.getElementById('tetris-music');
    tetrisMusic.play();


    function drawTetrominoesBackground(colors) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const blockSize = 25;

        // Tetrominoes shapes
        const shapes = [
            [
                [1, 1, 1],
                [0, 1, 0],
            ],
            [
                [1, 1, 0],
                [0, 1, 1],
            ],
            [
                [0, 1, 1],
                [1, 1, 0],
            ],
            [
                [1, 1],
                [1, 1],
            ],
            [
                [1, 1, 1, 1],
            ],
            [
                [1, 1, 1],
                [1, 0, 0],
            ],
            [
                [1, 1, 1],
                [0, 0, 1],
            ],
        ];

        function drawTetromino(x, y, shape, color) {
            ctx.fillStyle = color;
            for (let row = 0; row < shape.length; row++) {
                for (let col = 0; col < shape[row].length; col++) {
                    if (shape[row][col]) {
                        ctx.fillRect(x + col * blockSize, y + row * blockSize, blockSize, blockSize);
                    }
                }
            }
        }

        function generateRandomTetromino() {
            const shapeIndex = Math.floor(Math.random() * shapes.length);
            const x = Math.floor(Math.random() * (canvas.width / blockSize)) * blockSize;
            const y = Math.floor(Math.random() * (canvas.height / blockSize)) * blockSize;
            const color = colors[Math.floor(Math.random() * colors.length)];

            drawTetromino(x, y, shapes[shapeIndex], color);
        }

        for (let i = 0; i < 100; i++) {
            generateRandomTetromino();
        }
    }
});
