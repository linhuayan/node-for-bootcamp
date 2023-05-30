function Node(x) {
  this.val = x;
  this.next = null;
}
Node.prototype.count = 0;

Node.prototype.push = function(element) {
  const node = new Node(element); // {1}
  let current = null; // {2}
  if (this.head == null) { // {3}
    this.head = node;
  } else {
    current = this.head; // {4}
    while (current.next != null) { // {5} 获得最后一项
      current = current.next;
    }
    // 将其next赋为新元素，建立链接
    current.next = node; // {6}
  }
  this.count++; // {7}
}

function reverseBetween(head, m, n) {
  // write code here
  console.log(head)
  let pre = null;
  let index = 1;
  let curr = head;
  let mPre = null;
  let mNode = null;
  while (curr.next && m > 1) {
    pre = curr;
    curr = curr.next;
    index++;

    if (index == m) {
      mPre = pre;
      mNode = curr;
      // pre = null;
    }
    while (index >= m && curr) {
      let temp = curr.next;
      curr.next = pre;
      pre = curr;
      curr = temp;
      index++;
      if (index > n) {
        mPre.next = pre;
        mNode.next = curr;
        break;
      }
    }
    if (index > n) {
      break;
    }
  }
  console.log(head);
  return head;
}

let head = new Node();
console.log(head);
head.push(1);
head.push(2);
console.log(head.next);

head.push(3);
head.push(4);
head.push(5);

reverseBetween(head, 2, 4);