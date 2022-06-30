class Stack {
  #items = [];
  push = (element) => this.#items.push(element);
  pop = () => this.#items.pop();
  isempty = () => this.#items.length === 0;
  empty = () => (this.#items.length = 0);
  size = () => this.#items.length;
  peek = function(){
    let item = this.pop();
    this.push(item);
    return item;
  }
}


class Pair {
  constructor(page, str) {
    this.page = page;
    this.str = str;
  }
}

const prev_page = new Stack();
let page_uri = new Stack();
let searched = new Stack();