$(document).ready(function () {
    const canvas = document.getElementById('tetrominoes-background');
    const ctx = canvas.getContext('2d');
    const themes = [
        {
            name: 'Blue / Cyan',
            description: 'Very crisp colors and reminiscent of Mega Man.',
            colors: ['#002D69', '#00FFFF'],
        },
        {
            name: 'Forest / Chartreuse',
            description: 'A nice combo, very fresh and comforting.',
            colors: ['#128712', '#62D962'],
        },
        {
            name: 'Magenta / Pink',
            description: 'This one always makes me think of cotton candy.',
            colors: ['#FF00FF', '#FFA8FF'],
        },
        {
            name: 'Blue / Green',
            description: 'Reminds me of the old Seattle Seahawks logo.',
            colors: ['#1B4C1B', '#4CFF4C'],
        },
        {
            name: 'Red / Seafoam',
            description: 'Christmasy colors, pastel but just as clashing. Ugly.',
            colors: ['#9C3838', '#9CFF9C'],
        },
        {
            name: 'Seafoam / Cornflower',
            description: 'I looks nice together if you like boring pastels lacking contrast.',
            colors: ['#00A800', '#0070EC'],
        },
        {
            name: 'Red / Gray',
            description: 'This one reminds me of lava and ash. I\'m always happy to see this palette.',
            colors: ['#FF0000', '#A0A0A0'],
        },
        {
            name: 'Purple / Burgundy',
            description: 'Nice combo, and the only double-dark set.',
            colors: ['#7B30C7', '#810000'],
        },
        {
            name: 'Blue / Red',
            description: 'Makes me think of the American flag, except the colors aren\'t dark enough.',
            colors: ['#0000FF', '#FF0000'],
        },
        {
            name: 'Red / Orange',
            description: 'Yuck. It makes me think of clowns or fast food logos.',
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
