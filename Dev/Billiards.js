
class BilliardBall {
    constructor(number, size, allowForShadow) {
        var colors = ["yellow", "blue", "red", "purple", "orange", "green", "brown", "black"];
        var color = Number.isInteger(number) ? colors[(number - 1) % 8] : colors[0];
        var isStripe = Number.isInteger(number) ? (((number - 1) / 8) >= 1) : false;

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
            circle.setAttribute("style", "fill: transparent; stroke-width: 1; stroke: var(--ballOutline);");
            g.appendChild(circle);

        } else {
            circle.setAttribute('cx', 50);
            circle.setAttribute('cy', 50);
            circle.setAttribute('r', 48);
            circle.setAttribute("style", "fill: " + color + "; stroke-width: 1; stroke: var(--ballOutline);");
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
        text.setAttribute("style", "visibility: hidden;");
        text.classList.add('dropShadow');
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
        text.setAttribute("style", "visibility: hidden;");
        text.classList.add('dropShadow');
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
            elem.classList.remove('dropShadow');
            elem.classList.add('dimmed');
        } else {
            elem.classList.add('dropShadow');
            elem.classList.remove('dimmed');
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
        svg.classList.add('dropShadow');
        var g = document.createElementNS("http://www.w3.org/2000/svg", 'g');
        var circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');

        circle.setAttribute('cx', 50);
        circle.setAttribute('cy', 50);
        circle.setAttribute('r', 48);
        circle.setAttribute("style", "fill: white; stroke-width: 1; stroke: grey ;");
        g.appendChild(circle);

        svg.appendChild(g);
        var text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        text.classList.add('dropShadow');
        text.setAttribute("x", 50);
        text.setAttribute("y", 50);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.setAttribute("font-size", "20px");
        text.setAttribute("font-weight", "bold");
        text.setAttribute("fill", textColor === undefined ? "red" : textColor);
        text.setAttribute("stroke", "darkred");
        text.setAttribute("stroke-width", "1");
        var labelLines = label.split('\n');
        if (labelLines.length > 1) {
            var first = true;
            labelLines.forEach((line) => {
                var tspan = document.createElementNS("http://www.w3.org/2000/svg", 'tspan');
                tspan.setAttribute('x', 50);
                if (first) {
                    tspan.setAttribute('dy', ((1-labelLines.length)/2).toString()+ 'em');
                } else {
                    tspan.setAttribute('dy', '1.2em');
                }
                tspan.textContent = line;
                text.append(tspan);
                first = false;
            });
        } else {
            text.textContent = label;
        }
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
        svg.classList.add('dropShadow');
        var g = document.createElementNS("http://www.w3.org/2000/svg", 'g');

        var path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        path.setAttribute('d', "M 10 80 L 50 8 L 90 80 Z");
        path.setAttribute("style", "fill: transparent; stroke-width: 8; stroke: brown;");
        g.appendChild(path);

        svg.appendChild(g);
        var text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        text.classList.add('dropShadow');
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

class Shield {
    constructor(size, id, label, isDull, clickFn) {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("id", id);
        svg.setAttribute('viewBox', '0 0 140 100');
        svg.setAttribute('height', size);
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.setAttribute('class', 'shield');
        svg.onclick = function () { clickFn() };
        var g = document.createElementNS("http://www.w3.org/2000/svg", 'g');

        var path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        path.setAttribute('d', "M 70 0 Q 50 20 30 20 Q 30 80 70 100 Z");
        path.setAttribute("style", "fill: " + (isDull? "darkgrey":"gold") + "; stroke-width: 0; stroke: transparent;");
        g.appendChild(path);

        path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        path.setAttribute('d', "M 70 0 Q 90 20 110 20 Q 110 80 70 100 Z");
        path.setAttribute("style", "fill: " + (isDull ? "gainsboro" : "khaki") + "; stroke-width: 0; stroke: transparent;");
        g.appendChild(path);

        path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        path.setAttribute('d', "M 70 0 Q 50 20 30 20 Q 30 80 70 100");
        path.setAttribute("style", "fill: transparent; stroke-width: 1; stroke: black;");
        g.appendChild(path);

        path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        path.setAttribute('d', "M 70 0 Q 90 20 110 20 Q 110 80 70 100");
        path.setAttribute("style", "fill: transparent; stroke-width: 1; stroke: black;");
        g.appendChild(path);

        svg.appendChild(g);
        var text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        text.setAttribute("x", 70);
        text.setAttribute("y", 50);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.setAttribute("font-size", "70px");
        text.setAttribute("font-weight", "bold");
        text.setAttribute("fill", "black");
        text.setAttribute("stroke", "black");
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

    copy(src) {
        this.name = src.name;
        return this;
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

    copy(src) {
        super.copy(src);
        this.score = src.score;
        this.neededToWin = src.neededToWin;
        this.rackScore = src.rackScore;
        this.matchScore = src.matchScore;
        this.rackDefensives = src.rackDefensives;
        this.matchDefensives = src.matchDefensives;
        this.totalDefensives = src.totalDefensives;
        this.timeouts = src.timeouts;

        return this;
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
    object[property] = value;
    element.value = value;
}

function bindOutput(object, property, element, setAction) {
    var value = object[property];
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
    object[property] = value;
}

function setDarkMode(isDarkMode) {
    var r = document.querySelector(':root');
    if (isDarkMode) {
        r.style.setProperty('--background', 'black');
        r.style.setProperty('--popupBackground', 'black');
        r.style.setProperty('--foreground', 'white');
        r.style.setProperty('--dropShadowFilter', 'none');
        r.style.setProperty('--ballOutline', 'white');
    } else {
        r.style.setProperty('--background', 'lightblue');
        r.style.setProperty('--popupBackground', 'white');
        r.style.setProperty('--foreground', 'black');
        r.style.setProperty('--dropShadowFilter', 'drop-shadow(10px 10px 5px)');
        r.style.setProperty('--ballOutline', 'grey');
    }
}

async function getLastModified(url) {
    var response = await fetch(url, { method: "HEAD" });
    var lastModified = response.headers.get("Last-Modified");

    return lastModified;
}