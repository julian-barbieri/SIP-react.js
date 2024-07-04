export default function createNode(row, col, gCost, hCost, parent) {
    return { row, col, gCost, hCost, parent };
  }