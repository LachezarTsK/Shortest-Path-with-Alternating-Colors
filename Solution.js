
/**
 * @param {number} numberOfNodes
 * @param {number[][]} redEdges
 * @param {number[][]} blueEdges
 * @return {number[]}
 */
var shortestAlternatingPaths = function (numberOfNodes, redEdges, blueEdges) {

    this.RED = 0;
    this.BLUE = 1;
    this.graph = new Map();
    initializeGraph(redEdges, blueEdges);

    return breadthFirstSearch(numberOfNodes);
};

/**
 * @param {number} nexNode
 * @param {number} color
 * @param {number} distanceFromStart
 */
function Edge(nexNode, color, distanceFromStart) {
    this.nextNode = nexNode;
    this.color = color;
    this.distanceFromStart = distanceFromStart;
}

/**
 * @param {number} numberOfNodes
 * @return {number[]}
 */
function breadthFirstSearch(numberOfNodes) {

    const queue = new Queue();
    queue.enqueue(new Edge(0, this.RED, 0));
    queue.enqueue(new Edge(0, this.BLUE, 0));

    const visited = new Array(numberOfNodes);
    for (let i = 0; i < visited.length; i++) {
        visited[i] = new Array(2).fill(false);
    }
    visited[0][0] = true;
    visited[0][1] = true;

    const shortestPath = new Array(numberOfNodes).fill(-1);

    while (!queue.isEmpty()) {

        let current = queue.dequeue();
        shortestPath[current.nextNode] = (shortestPath[current.nextNode] === -1) ?
                                          current.distanceFromStart :
                                          Math.min(shortestPath[current.nextNode], current.distanceFromStart);

        if (this.graph.has(current.nextNode) === false) {
            continue;
        }

        const next = this.graph.get(current.nextNode);
        for (let edge of next) {
            if (visited[edge.nextNode][edge.color] === false && edge.color !== current.color) {
                visited[edge.nextNode][edge.color] = true;
                edge.distanceFromStart = current.distanceFromStart + 1;
                queue.enqueue(edge);
            }
        }
    }
    return shortestPath;
}


/**
 * @param {number[][]} redEdges
 * @param {number[][]} blueEdges
 * @return {void}
 */
function initializeGraph(redEdges, blueEdges) {

    for (let edge of redEdges) {
        if (this.graph.has(edge[0]) === false) {
            this.graph.set(edge[0], []);
        }
        this.graph.get(edge[0]).push(new Edge(edge[1], this.RED, Number.MAX_SAFE_INTEGER));
    }

    for (let edge of blueEdges) {
        if (this.graph.has(edge[0]) === false) {
            this.graph.set(edge[0], []);
        }
        this.graph.get(edge[0]).push(new Edge(edge[1], this.BLUE, Number.MAX_SAFE_INTEGER));
    }
}
