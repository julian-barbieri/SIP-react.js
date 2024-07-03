export default function PriorityQueue() {
    this.items = [];
  
    this.enqueue = function (element) {
      this.items.push(element);
      this.items.sort((a, b) => a.gCost + a.hCost - (b.gCost + b.hCost));
    };
  
    this.dequeue = function () {
      if (this.isEmpty()) {
        return null;
      }
      return this.items.shift();
    };
  
    this.isEmpty = function () {
      return this.items.length === 0;
    };
  }