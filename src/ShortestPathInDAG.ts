class AdjNode {
    cost: number
    dstID: string
}

class Graph {
    nodes: { [id: string]: AdjNode[] }

    connect(srcID: string, dstID: string, cost: number) {
        var node = new AdjNode()
        node.cost = cost
        node.dstID = dstID

        var nodes = this.nodes[srcID]
        if (nodes) {
            nodes.push(node)
        } else {
            this.nodes[srcID] = [node]
        }
    }

    findShortest() {

    }
}

var graph = new Graph()
graph.connect("S", "A", 10)
graph.connect("S", "B", 20)
graph.connect("A", "C", 30)
graph.connect("A", "D", 10)
graph.connect("B", "D", 20)
graph.connect("C", "D", 5)
graph.connect("C", "T", 20)
graph.connect("D", "T", 10)
graph.findShortest()
