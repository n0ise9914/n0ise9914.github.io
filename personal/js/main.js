var skills = [
    {
        "header": "Languages",
        "captions": [
            "C#",
            "JS",
            "Kotlin",
            "Java",
            "PHP",
            "Lua"
        ],
        "values": [
            0.85,
            0.55,
            0.75,
            0.85,
            0.75,
            0.85
        ]
    },
    {
        "header": "Frameworks",
        "captions": [
            "ASP.NET MVC 5 ",
            "Crow",
            "Spring",
            "Laravel",
            "   ExpressJS",
        ],
        "values": [
            0.75,
            0.55,
            0.85,
            0.85,
            0.65,
        ]
    },
    {
        "header": "Android",
        "captions": [
            "MVC",
            "Dagger",
            "Realm",
            "Retrofit",
            " RxJava",
            "Litho"
        ],
        "values": [
            0.85,
            0.75,
            0.85,
            0.85,
            0.85,
            0.75
        ]
    },
    {
        "header": "Databases",
        "captions": [
            "Elastic",
            "Redis",
            "MongoDB",
            "Neo4J",
            "MySQL"
        ],
        "values": [
            0.55,
            0.85,
            0.85,
            0.75,
            0.85
        ]
    },
    {
        "header": "MISC",
        "captions": [
            "Docker",
            "PhoneGap  ",
            "CoronaSDK",
            "VueJS",
            " JavaFX",
        ],
        "values": [
            0.85,
            0.65,
            0.85,
            0.75,
            0.75
        ]
    },
    {
        "header": "Hobbies",
        "captions": [
            "Politics",
            "Chess  ",
            "PenTest",
            "SkateBoarding",
            "   Vainglory",
        ],
        "values": [
            0.85,
            0.85,
            0.85,
            0.75,
            0.75
        ]
    }
];

let pentagonIndex = 0;
let valueIndex = 0;
let width = 0;
let height = 0;
let radOffset = Math.PI / 2;
// let sides = 5; // Number of sides in the polygon
// let theta = 2 * Math.PI / sides; // radians per section

function getXY(i, radius) {
    return {
        "x": Math.cos(radOffset + theta * i) * radius * width + width / 2,
        "y": Math.sin(radOffset + theta * i) * radius * height + height / 2
    };
}

let hue = [];
let hueOffset = 25;

for (let s in skills) {
    $(".content").append('<div class="pentagon" id="interests"><div class="header"></div><canvas class="pentCanvas"/></div>');
    iv = parseInt(5-s) -1;
    hue[s] = (hueOffset + iv * 255 / skills.length) % 255;
}

$(".pentagon").each(function (index) {
    sides = skills[pentagonIndex].captions.length;

    theta = 2 * Math.PI / sides; // radians per section


    width = $(this).width();
    height = $(this).height();
    let ctx = $(this).find('canvas')[0].getContext('2d');
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    ctx.font = "15px Monospace";
    ctx.textAlign = "center";

    /*** LABEL ***/
    color = "hsl(" + hue[pentagonIndex] + ", 100%, 50%)";
    ctx.fillStyle = color;
    ctx.fillText(skills[pentagonIndex].header, width / 2, 15);

    ctx.font = "13px Monospace";

    /*** PENTAGON BACKGROUND ***/
    for (let i = 0; i < sides; i++) {
        // For each side, draw two segments: the side, and the radius
        ctx.beginPath();
        xy = getXY(i, 0.3);
        colorJitter = 25 + theta * i * 2;
        color = "hsl(" + hue[pentagonIndex] + ",100%," + colorJitter + "%)";
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.moveTo(0.5 * width, 0.5 * height); //center
        ctx.lineTo(xy.x, xy.y);
        xy = getXY(i + 1, 0.3);
        ctx.lineTo(xy.x, xy.y);
        xy = getXY(i, 0.37);
        console.log();
        ctx.fillText(skills[pentagonIndex].captions[valueIndex], xy.x, xy.y + 5);
        valueIndex++;
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    valueIndex = 0;
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
    ctx.lineWidth = 5;
    let value = skills[pentagonIndex].values[valueIndex];
    xy = getXY(i, value * 0.3);
    ctx.moveTo(xy.x, xy.y);
    /*** SKILL GRAPH ***/
    for (var i = 0; i < sides; i++) {
        xy = getXY(i, value * 0.3);
        ctx.lineTo(xy.x, xy.y);
        valueIndex++;
        value = skills[pentagonIndex].values[valueIndex];
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    valueIndex = 0;
    pentagonIndex++;
});
