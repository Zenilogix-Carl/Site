// JavaScript source code

class BilliardBall {
    constructor(number, size) {
        try {
            var colors = ["yellow", "blue", "red", "purple", "orange", "green", "brown", "black"];
            var color = colors[(number - 1) % 8];
            var isStripe = (((number - 1) / 8) >= 1);

            this.id = ++BilliardBall.lastId;
            this.number = number;

            this.ballElementId = "ball-element-" + this.id;
            this.ballId = "ball-id-" + this.id;

            var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute('id', this.ballElementId);
            svg.setAttribute('viewBox', '0 0 120 120');
            svg.setAttribute('width', size);
            svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            var g = document.createElementNS("http://www.w3.org/2000/svg", 'g');
            g.setAttribute('id', this.ballId);
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
        } catch (e) {
            window.alert(e.message);
        } 
    }

    static lastId = 0;
}
