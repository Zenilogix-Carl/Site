
class BilliardBall {
    constructor(number, size, allowForShadow) {
        var colors = ["yellow", "blue", "red", "purple", "orange", "green", "brown", "black"];
        var color = colors[(number - 1) % 8];
        var isStripe = (((number - 1) / 8) >= 1);

        this.number = number;

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('viewBox', allowForShadow ? '0 0 120 120' : '0 0 105 100');
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
        super(number, size, true);

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

class BilliardBallWithClick extends BilliardBallWithState {
    constructor(number, size, clickFn, text) {
        super(number, size, clickFn, text);
        var svg = this.element;
        svg.onclick = clickFn;
        this.dimElement(this.ballGraphic, false);
        this.showElement(this.foulText, true);
        this.showElement(this.checkMark, false);
        this.foulText.setAttribute("y", 75);
        var textColor;
        switch (number) {
        case 1:
        case 9:
            textColor = "blue";
            break;
        case 8:
            textColor = "red";
            break;
        default:
            textColor = "white";
            break;
        }
        this.foulText.setAttribute("fill", textColor);
        this.foulText.setAttribute("stroke", textColor);
    }
}

class CueBall {
    constructor (size, label, clickFn, textColor) {

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
        text.setAttribute("fill", textColor === undefined ? "red" : textColor);
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
        this.rackScore = 0;
        this.matchScore = 0;
        this.rackDefensives = 0;
        this.matchDefensives = 0;
        this.totalDefensives = 0;
        this.timeouts = 0;
    }

    clearMatch() {
        this.score = 0;
        this.matchScore = 0;
        this.matchDefensives = 0;
        this.clearRack();
    }

    clearRack() {
        this.rackScore = 0;
        this.rackDefensives = 0;
        this.totalDefensives = this.rackDefensives + this.matchDefensives;
        this.timeouts = 0;
    }

    addDefensive() {
        this.rackDefensives++;
        this.totalDefensives = this.rackDefensives + this.matchDefensives;
    }

    removeDefensive() {
        if (this.rackDefensives > 0) {
            this.rackDefensives--;
            this.totalDefensives = this.rackDefensives + this.matchDefensives;
        }
    }

    nextRack() {
        this.matchDefensives += this.rackDefensives;
        this.rackDefensives = 0;
    }

    updateScore() {
        var remaining = this.neededToWin - this.score;
        this.remaining = remaining > 0 ? remaining : 0;
    }
}

function bindInput(object, property, element, setAction) {
    object[property + 'SetAction'] = setAction;
    element.addEventListener("input", function () {
        object[property] = element.value;
    });
    var value = object[property];
    Object.defineProperty(object, property,
        {
            get() {
                return object['_' + property];
            },
            set(newValue) {
                object['_' + property] = newValue;
                var setAction = this[property + 'SetAction'];
                if (!(setAction === undefined)) {
                    setAction(object);
                    if (object[property] != element.value) {
                        element.value = object[property];
                    }
                }
            }
        });
    element.value = value;
}

function bindOutput(object, property, element, setAction) {
    object[property + 'SetAction'] = setAction;
    Object.defineProperty(object, property,
        {
            get() {
                if (isFinite(element.innerHTML)) {
                    return parseInt(element.innerHTML);
                }
                return element.innerHTML;
            },
            set(newValue) {
                element.innerHTML = newValue;
                var setAction = this[property + 'SetAction'];
                if (!(setAction === undefined)) {
                    setAction();
                }
            }
        });
}