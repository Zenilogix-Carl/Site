
class BilliardBall {
    constructor(number, size) {
        var colors = ["yellow", "blue", "red", "purple", "orange", "green", "brown", "black"];
        var color = colors[(number - 1) % 8];
        var isStripe = (((number - 1) / 8) >= 1);

        this.number = number;

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('viewBox', '0 0 120 120');
        svg.setAttribute('width', size);
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        var g = document.createElementNS("http://www.w3.org/2000/svg", 'g');
        this.ballGraphic = g;
        var circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');

        if (isStripe) {
            circle.setAttribute('cx', 50);
            circle.setAttribute('cy', 50);
            circle.setAttribute('r', 48);
            circle.setAttribute("style", "fill: white;");
            g.appendChild(circle);

            var path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
            path.setAttribute('d', "M 16 16 L 84 16 A 50 50 0 0 1 84 84 L 16 84  A 50 50 0 0 1 16 16 ");
            path.setAttribute("style", "fill: " + color + "; stroke-width: 1; stroke: grey;");
            g.appendChild(path);

            circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
            circle.setAttribute('cx', 50);
            circle.setAttribute('cy', 50);
            circle.setAttribute('r', 48);
            circle.setAttribute("style", "fill: transparent; stroke-width: 1; stroke: grey;");
            g.appendChild(circle);

        } else {
            circle.setAttribute('cx', 50);
            circle.setAttribute('cy', 50);
            circle.setAttribute('r', 48);
            circle.setAttribute("style", "fill: " + color + "; stroke-width: 1; stroke: grey;");
            g.appendChild(circle);
        }

        circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        circle.setAttribute('cx', 50);
        circle.setAttribute('cy', 50);
        circle.setAttribute('r', 27);
        circle.setAttribute("style", "fill: white; stroke-width: 1; stroke: grey;");
        g.appendChild(circle);
        var text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        text.setAttribute("x", 50);
        text.setAttribute("y", 53);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.setAttribute("font-weight", "bold");
        text.setAttribute("font-size", number > 9 ? "32px" : "40px");
        text.innerHTML = number;
        g.appendChild(text);
        svg.appendChild(g);

        this.element = svg;
    }
}

class BilliardBallWithState extends BilliardBall {

    constructor(number, size, clickFn, foulText) {
        super(number, size);

        var svg = this.element;
        svg.onclick = function () { clickFn(number)};
        var text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        text.setAttribute("style", "visibility: hidden; filter: drop-shadow(10px 10px 5px)");
        text.setAttribute("x", 50);
        text.setAttribute("y", 50);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.setAttribute("font-size", "30px");
        text.setAttribute("fill", "red");
        text.setAttribute("stroke-width", "1");
        text.setAttribute("stroke", "white");
        text.innerHTML = foulText;
        svg.appendChild(text);
        this.foulText = text;
        text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        text.setAttribute("style", "visibility: hidden; filter: drop-shadow(10px 10px 5px)");
        text.setAttribute("x", 40);
        text.setAttribute("y", 90);
        text.setAttribute("font-size", "80px");
        text.setAttribute("fill", "green");
        text.setAttribute("stroke-width", "1");
        text.setAttribute("stroke", "white");
        text.innerHTML = "&#x2714;";
        svg.appendChild(text);
        this.checkMark = text;

        this.showNormal();
    }

    dimElement(elem, dim) {
        if (dim) {
            elem.style.filter = "brightness(30%)";
        } else {
            elem.style.filter = "drop-shadow(10px 10px 5px)";
        }
    }

    showElement(elem, show) {
        elem.style.visibility = show ? "visible" : "hidden";
    }

    showNormal() {
        this.dimElement(this.ballGraphic, false);
        this.showElement(this.foulText, false);
        this.showElement(this.checkMark, false);
    }

    showPocketed(checked) {
        this.dimElement(this.ballGraphic, true);
        this.showElement(this.foulText, false);
        this.showElement(this.checkMark, checked);
    }

    showFoul() {
        this.dimElement(this.ballGraphic, true);
        this.showElement(this.foulText, true);
        this.showElement(this.checkMark, false);
    }
}

class CueBall {
    constructor (size, label, clickFn) {

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('viewBox', '0 0 120 120');
        svg.setAttribute('width', size);
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.onclick = function () { clickFn()};
        svg.setAttribute("style", "filter: drop-shadow(10px 10px 5px)");
        var g = document.createElementNS("http://www.w3.org/2000/svg", 'g');
        var circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');

        circle.setAttribute('cx', 50);
        circle.setAttribute('cy', 50);
        circle.setAttribute('r', 48);
        circle.setAttribute("style", "fill: white; stroke-width: 1; stroke: grey ;");
        g.appendChild(circle);

        svg.appendChild(g);
        var text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        text.setAttribute("style", "filter: drop-shadow(10px 10px 5px)");
        text.setAttribute("x", 50);
        text.setAttribute("y", 50);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.setAttribute("font-size", "20px");
        text.setAttribute("font-weight", "bold");
        text.setAttribute("fill", "red");
        text.setAttribute("stroke", "darkred");
        text.setAttribute("stroke-width", "1");
        text.innerHTML = label;
        svg.appendChild(text);

        this.element = svg;
    }

}

class Rack
{
    constructor(size, label, clickFn) {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('viewBox', '0 0 120 120');
        svg.setAttribute('width', size);
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.onclick = function () { clickFn() };
        svg.setAttribute("style", "filter: drop-shadow(10px 10px 5px)");
        var g = document.createElementNS("http://www.w3.org/2000/svg", 'g');

        var path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        path.setAttribute('d', "M 10 80 L 50 8 L 90 80 Z");
        path.setAttribute("style", "fill: transparent; stroke-width: 8; stroke: brown;");
        g.appendChild(path);

        svg.appendChild(g);
        var text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        text.setAttribute("style", "filter: drop-shadow(10px 10px 5px)");
        text.setAttribute("x", 50);
        text.setAttribute("y", 50);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.setAttribute("font-size", "18px");
        text.setAttribute("font-weight", "bold");
        text.setAttribute("fill", "yellow");
        text.setAttribute("stroke", "white");
        text.setAttribute("stroke-width", "1");
        text.innerHTML = label;
        svg.appendChild(text);

        this.element = svg;
    }
}

class Player {
    constructor(name, setupFn) {
        this.name = name;

        if (!(setupFn === undefined)) {
            setupFn(this);
        }
    }

    bindName(inputElement) {
        var obj = this;
        inputElement.oninput = function() {
            obj.name = inputElement.value;
        }
    }
}

class PlayerWithScore extends Player {
    constructor(name, setupFn) {
        super(name, setupFn);

        this.score = 0;
        this.neededToWin = 0;
    }

    bindScore(htmlElement) {
        this.scoreElement = htmlElement;
    }

    getScore() {
        return this.score;
    }

    setScore(score) {
        this.score = score;
        this.updateScore();
    }

    updateScore() {
        //this.scoreElement.innerHTML = this.score;
        var remaining = this.neededToWin - this.score;
        this.remainingElement.innerHTML = remaining > 0 ? remaining : 0;
    }

    bindNeededToWin(inputElement, htmlElement) {
        var obj = this;
        inputElement.addEventListener("input", function () {
            obj.neededToWin = inputElement.value;
            obj.updateScore();
        });
        this.remainingElement = htmlElement;
    }
}

function bindInput(object, property, element) {
    element.addEventListener("input", function () {
        object[property] = element.value;
    });
    Object.defineProperty(object, property,
        {
            get() {
                return element.value;
            },
            set(newValue) {
                element.value = newValue;
            }
        });
}

function bindOutput(object, property, element) {
    Object.defineProperty(object, property,
        {
            get() {
                return element.innerHTML;
            },
            set(newValue) {
                element.innerHTML = newValue;
            }
        });
}