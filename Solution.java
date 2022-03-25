
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.Queue;
import java.util.LinkedList;

public class Solution {

    private static class Edge {

        int nextNode;
        int color;
        int distanceFromStart;

        public Edge(int nexNode, int color, int distanceFromStart) {
            this.nextNode = nexNode;
            this.color = color;
            this.distanceFromStart = distanceFromStart;
        }
    }

    private static final int RED = 0;
    private static final int BLUE = 1;
    private Map<Integer, List<Edge>> graph;

    public int[] shortestAlternatingPaths(int numberOfNodes, int[][] redEdges, int[][] blueEdges) {
        initializeGraph(redEdges, blueEdges);
        return breadthFirstSearch(numberOfNodes);
    }

    private int[] breadthFirstSearch(int numberOfNodes) {

        Queue<Edge> queue = new LinkedList<>();
        queue.add(new Edge(0, RED, 0));
        queue.add(new Edge(0, BLUE, 0));

        boolean[][] visited = new boolean[numberOfNodes][2];
        visited[0][0] = true;
        visited[0][1] = true;

        int[] shortestPath = new int[numberOfNodes];
        Arrays.fill(shortestPath, -1);

        while (!queue.isEmpty()) {

            Edge current = queue.poll();
            shortestPath[current.nextNode] = (shortestPath[current.nextNode] == -1)
                    ? current.distanceFromStart
                    : Math.min(shortestPath[current.nextNode], current.distanceFromStart);

            if (!graph.containsKey(current.nextNode)) {
                continue;
            }

            List<Edge> next = graph.get(current.nextNode);
            for (Edge edge : next) {
                if (visited[edge.nextNode][edge.color] == false && edge.color != current.color) {
                    visited[edge.nextNode][edge.color] = true;
                    edge.distanceFromStart = current.distanceFromStart + 1;
                    queue.add(edge);
                }
            }
        }
        return shortestPath;
    }

    private void initializeGraph(int[][] redEdges, int[][] blueEdges) {

        graph = new HashMap<>();
        for (int[] edge : redEdges) {
            graph.putIfAbsent(edge[0], new ArrayList<>());
            graph.get(edge[0]).add(new Edge(edge[1], RED, Integer.MAX_VALUE));
        }

        for (int[] edge : blueEdges) {
            graph.putIfAbsent(edge[0], new ArrayList<>());
            graph.get(edge[0]).add(new Edge(edge[1], BLUE, Integer.MAX_VALUE));
        }
    }
}
