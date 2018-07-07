class Cache {
  constructor(maxLength) {
    this.map = {};
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.maxLength = maxLength ? maxLength : 500;
  }

  addToHead(node) {
    node.pre = this.head;
    node.next = null;

    if(this.head ) {
      this.head.next = node;
    }
    this.head = node;
    if(!this.tail) {
      this.tail = node;
    }
    this.map[node.key] = node;
    this.length++;
  }

  removeFromTail() {
    if(this.tail) {
      delete this.map[this.tail];
      if(this.tail === this.head) {
        this.tail = null;
        this.head = null;
      } else {
        this.tail.next.pre = null;
        this.tail = this.tail.next;
      }
      this.length--;
    } else {
      throw new Error('There is no tail to remove');
    }
  }

  addEntity(key, value) {
    if(this.length >= this.maxLength) {
      console.log('length is getting larger that max lenght, removing one from tail');
      this.removeFromTail();
    }

    this.addToHead({
      key,
      value,
      next: null,
      pre: null
    });
  }

  removeEntity(key) {
    let node = this.map[key];

    if(node.pre) {
      node.pre.next = node.next;
    } else {
      this.tail = node.next;
    }

    if(node.next) {
      node.next.pre = node.pre;
    } else {
      this.head = node.pre;
    }

    node = null;

    delete this.map[key];
    this.length--;
  }

  getEntity(key) {
    if(!this.map) {
      console.log('cache is empty');
      return;
    }

    if(!this.map[key]) {
      console.log('could not find the entity');
      return;
    }
    if(this.head === this.map[key]) {
      console.log('The entity is already in head');
      return this.map[key];
    }
    let value = this.map[key].value;
    this.removeEntity(key);
    this.addToHead({
      key,
      value: value,
      pre: null,
      next: null
    });
    value = null;
    return this.map[key];
  }
}
module.exports = Cache;
