
#include <queue>
#include <unordered_map>
#include <vector>
using namespace std;

class Solution {

    struct Edge {
        int nextNode;
        int color;
        int distanceFromStart;

        Edge(int nexNode, int color, int distanceFromStart) {
            this->nextNode = nexNode;
            this->color = color;
            this->distanceFromStart = distanceFromStart;
        }
    };

    inline static const int RED = 0;
    inline static int BLUE = 1;
    unordered_map<int, vector<Edge>> graph;

public:

    vector<int> shortestAlternatingPaths(int numberOfNodes, vector<vector<int>>& redEdges, vector<vector<int>>& blueEdges) {
        initializeGraph(redEdges, blueEdges);
        return breadthFirstSearch(numberOfNodes);
    }

private:

    vector<int> breadthFirstSearch(int numberOfNodes) {

        queue<Edge> queue;
        queue.emplace(0, RED, 0);
        queue.emplace(0, BLUE, 0);

        vector <vector<bool>> visited(numberOfNodes, vector<bool>(2, false));
        visited[0][0] = true;
        visited[0][1] = true;

        vector<int> shortestPath(numberOfNodes, -1);

        while (!queue.empty()) {

            Edge current = queue.front();
            queue.pop();

            shortestPath[current.nextNode] = (shortestPath[current.nextNode] == -1) ?
                                              current.distanceFromStart :
                                              min(shortestPath[current.nextNode], current.distanceFromStart);

            if (graph.find(current.nextNode) == graph.end()) {
                continue;
            }

            vector<Edge> next = graph[current.nextNode];
            for (Edge edge : next) {
                if (visited[edge.nextNode][edge.color] == false && edge.color != current.color) {
                    visited[edge.nextNode][edge.color] = true;
                    edge.distanceFromStart = current.distanceFromStart + 1;
                    queue.push(edge);
                }
            }
        }
        return shortestPath;
    }

    void initializeGraph(const vector<vector<int>>& redEdges, const vector<vector<int>>& blueEdges) {

        for (const auto& edge : redEdges) {
            if (graph.find(edge[0]) == graph.end()) {
                graph[edge[0]] = vector<Edge>();
            }
            graph[edge[0]].emplace_back(edge[1], RED, INT_MAX);
        }

        for (const auto& edge : blueEdges) {
            if (graph.find(edge[0]) == graph.end()) {
                graph[edge[0]] = vector<Edge>();
            }
            graph[edge[0]].emplace_back(edge[1], BLUE, INT_MAX);
        }
    }
};
