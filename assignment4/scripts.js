// scripts.js
$(document).ready(function() {
    $("#switch").on("click", function() {
        $("#nature").fadeOut("slow", function() {
            $("#technology").fadeIn("slow");
        });
    });

    $("#switch-back").on("click", function() {
        $("#technology").fadeOut("slow", function() {
            $("#nature").fadeIn("slow");
        });
    });
});
$(document).ready(function () {
    const themes = [
        {
            title: "Theme 1",
            description: "Short description for Theme 1.",
        },
        {
            title: "Theme 2",
            description: "Short description for Theme 2.",
        },
        // Add more themes here
    ];

    let currentTheme = 0;

    function updateTheme() {
        $(".theme-title").text(themes[currentTheme].title);
        $(".theme-description").text(themes[currentTheme].description);
    }

    updateTheme();

    $(document).on("keydown", function (event) {
        if (event.which === 32) { // Space key
            currentTheme = (currentTheme + 1) % themes.length;
            updateTheme();
        }
    });

    // Play Tetris music
    const audioElement = document.getElementById("tetris-audio");
    audioElement.play();
});
