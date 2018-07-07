require('babel-register')({
  presets: [ 'es2015' ]
});

const chai = require('chai');
const Cache = require('../js/cache');

const expect = chai.expect;

let cacheInst;

describe('Cache', () => {
  beforeEach(() => {
    cacheInst = new Cache(10);
  });

  describe('addToHead', () => {
    it('should set head and tail to node when map is empty', () => {
      cacheInst.addToHead({key: '1', value: 'foo', next: null, pre: null});
      expect(cacheInst.head.value).equal('foo');
      expect(cacheInst.tail.value).equal('foo');
      expect(cacheInst.length).equal(1);
      expect(cacheInst.head.pre).to.be.null;
      expect(cacheInst.head.next).to.be.null;
      expect(cacheInst.tail.pre).to.be.null;
      expect(cacheInst.tail.next).to.be.null;
    });

    it('should add a node to head of the list when list has only one member', () => {
      const node = {key: '1', value: 'foo', next: null, pre: null};
      cacheInst.head = node;
      cacheInst.tail = node;
      cacheInst.length = 1;
      cacheInst.addToHead({value: 'bar', next: null, pre: null});
      expect(cacheInst.head.value).equal('bar');
      expect(cacheInst.head.pre.value).equal('foo');
      expect(cacheInst.tail.next.value).equal('bar');
      expect(cacheInst.tail.value).equal('foo');
      expect(cacheInst.length).equal(2);
      expect(cacheInst.head.next).to.be.null;
      expect(cacheInst.tail.pre).to.be.null;
    });

    it('should add a node to head of the list when list has more than one member', () => {
      const node1 = {key: '1', value: 'bar', next: null, pre: null};
      const node2 = {key: '2', value: 'foo', next: node1, pre: null};
      node1.pre = node2;
      cacheInst.head = node1;
      cacheInst.tail = node2;
      cacheInst.length = 2;
      cacheInst.addToHead({value: 'baz', next: null, pre: null});
      expect(cacheInst.head.value).equal('baz');
      expect(cacheInst.head.pre.value).equal('bar');
      expect(cacheInst.tail.next.value).equal('bar');
      expect(cacheInst.tail.value).equal('foo');
      expect(cacheInst.length).equal(3);
      expect(cacheInst.head.next).to.be.null;
      expect(cacheInst.tail.pre).to.be.null;
    });
  });

  describe('removeFromTail', () => {
    it('should remove one node from the tail for list with length 2', () => {
      const node1 = {key: '1', value: 'bar', next: null, pre: null};
      const node2 = {key: '2', value: 'foo', next: node1, pre: null};
      node1.pre = node2;
      cacheInst.head = node1;
      cacheInst.tail = node2;
      cacheInst.length = 2;
      cacheInst.removeFromTail();
      expect(cacheInst.head.value).equal('bar');
      expect(cacheInst.tail.value).equal('bar');
      expect(cacheInst.head.pre).to.be.null;
      expect(cacheInst.head.next).to.be.null;
      expect(cacheInst.tail.pre).to.be.null;
      expect(cacheInst.tail.next).to.be.null;
      expect(cacheInst.length).equal(1);
    });

    it('should set head and tail to null for list with length 1', () => {
      const node = {key: '1', value: 'foo', next: null, pre: null};
      cacheInst.head = node;
      cacheInst.tail = node;
      cacheInst.length = 1;
      cacheInst.removeFromTail();
      expect(cacheInst.head).to.be.null;
      expect(cacheInst.tail).to.be.null;
      expect(cacheInst.length).equal(0);
    });

    it('should remove one node from the tail for list with length 3', () => {
      const node1 = {key: '1', value: 'baz', next: null, pre: null};
      const node2 = {key: '2', value: 'bar', next: node1, pre: null};
      const node3 = {key: '3', value: 'foo', next: node2, pre: null};
      node1.pre = node2;
      node2.pre = node3;
      cacheInst.head = node1;
      cacheInst.tail = node3;
      cacheInst.length = 3;
      cacheInst.removeFromTail();
      expect(cacheInst.head.value).equal('baz');
      expect(cacheInst.tail.value).equal('bar');
      expect(cacheInst.head.pre.value).equal('bar');
      expect(cacheInst.head.next).to.be.null;
      expect(cacheInst.tail.pre).to.be.null;
      expect(cacheInst.tail.next.value).equal('baz');
      expect(cacheInst.length).equal(2);
    });
  });

  describe('removeEntity', () => {
    it('should remove the entity from the tail for list with length 3', () => {
      const node1 = {key: '1', value: 'baz', next: null, pre: null};
      const node2 = {key: '2', value: 'bar', next: node1, pre: null};
      const node3 = {key: '3', value: 'foo', next: node2, pre: null};
      node1.pre = node2;
      node2.pre = node3;
      cacheInst.head = node1;
      cacheInst.tail = node3;
      cacheInst.map = {
        '1': node1,
        '2': node2,
        '3': node3
      };
      cacheInst.length = 3;
      cacheInst.removeEntity('3');
      expect(cacheInst.head.value).equal('baz');
      expect(cacheInst.tail.value).equal('bar');
      expect(cacheInst.head.pre.value).equal('bar');
      expect(cacheInst.head.next).to.be.null;
      expect(cacheInst.tail.pre).to.be.null;
      expect(cacheInst.tail.next.value).equal('baz');
      expect(cacheInst.length).equal(2);
    });

    it('should remove the entity from the head for list with length 3', () => {
      const node1 = {key: '1', value: 'baz', next: null, pre: null};
      const node2 = {key: '2', value: 'bar', next: node1, pre: null};
      const node3 = {key: '3', value: 'foo', next: node2, pre: null};
      node1.pre = node2;
      node2.pre = node3;
      cacheInst.head = node1;
      cacheInst.tail = node3;
      cacheInst.map = {
        '1': node1,
        '2': node2,
        '3': node3
      };
      cacheInst.length = 3;
      cacheInst.removeEntity('1');
      expect(cacheInst.head.value).equal('bar');
      expect(cacheInst.tail.value).equal('foo');
      expect(cacheInst.head.pre.value).equal('foo');
      expect(cacheInst.head.next).to.be.null;
      expect(cacheInst.tail.pre).to.be.null;
      expect(cacheInst.tail.next.value).equal('bar');
      expect(cacheInst.length).equal(2);
    });

    it('should remove the entity from the middle for list with length 3', () => {
      const node1 = {key: '1', value: 'baz', next: null, pre: null};
      const node2 = {key: '2', value: 'bar', next: node1, pre: null};
      const node3 = {key: '3', value: 'foo', next: node2, pre: null};
      node1.pre = node2;
      node2.pre = node3;
      cacheInst.head = node1;
      cacheInst.tail = node3;
      cacheInst.map = {
        '1': node1,
        '2': node2,
        '3': node3
      };
      cacheInst.length = 3;
      cacheInst.removeEntity('2');
      expect(cacheInst.head.value).equal('baz');
      expect(cacheInst.tail.value).equal('foo');
      expect(cacheInst.head.pre.value).equal('foo');
      expect(cacheInst.head.next).to.be.null;
      expect(cacheInst.tail.pre).to.be.null;
      expect(cacheInst.tail.next.value).equal('baz');
      expect(cacheInst.length).equal(2);
    });


    it('should remove the entity from tail for list with length 2', () => {
      const node1 = {key: '1', value: 'bar', next: null, pre: null};
      const node2 = {key: '2', value: 'foo', next: node1, pre: null};
      node1.pre = node2;
      cacheInst.head = node1;
      cacheInst.tail = node2;
      cacheInst.map = {
        '1': node1,
        '2': node2
      };
      cacheInst.length = 2;
      cacheInst.removeEntity('2');
      expect(cacheInst.head.value).equal('bar');
      expect(cacheInst.tail.value).equal('bar');
      expect(cacheInst.head.pre).to.be.null;
      expect(cacheInst.head.next).to.be.null;
      expect(cacheInst.tail.pre).to.be.null;
      expect(cacheInst.tail.next).to.be.null;
      expect(cacheInst.length).equal(1);
    });

    it('should remove the entity from head for list with length 2', () => {
      const node1 = {key: '1', value: 'bar', next: null, pre: null};
      const node2 = {key: '2', value: 'foo', next: node1, pre: null};
      node1.pre = node2;
      cacheInst.head = node1;
      cacheInst.tail = node2;
      cacheInst.map = {
        '1': node1,
        '2': node2
      };
      cacheInst.length = 2;
      cacheInst.removeEntity('1');
      expect(cacheInst.head.value).equal('foo');
      expect(cacheInst.tail.value).equal('foo');
      expect(cacheInst.head.pre).to.be.null;
      expect(cacheInst.head.next).to.be.null;
      expect(cacheInst.tail.pre).to.be.null;
      expect(cacheInst.tail.next).to.be.null;
      expect(cacheInst.length).equal(1);
    });

    it('should remove the entity from a list with length 1', () => {
      const node = {key: '1', value: 'foo', next: null, pre: null};
      cacheInst.head = node;
      cacheInst.tail = node;
      cacheInst.map = {
        '1': node
      };
      cacheInst.length = 1;
      cacheInst.removeEntity('1');
      expect(cacheInst.head).to.be.null;
      expect(cacheInst.tail).to.be.null;
      expect(cacheInst.map).to.be.empty;
      expect(cacheInst.length).equal(0);
    });
  });

  describe('getEntity', () => {
    it('should move the entity to the head from middle for list of three', () => {
      const node1 = {key: '1', value: 'baz', next: null, pre: null};
      const node2 = {key: '2', value: 'bar', next: node1, pre: null};
      const node3 = {key: '3', value: 'foo', next: node2, pre: null};
      node1.pre = node2;
      node2.pre = node3;
      cacheInst.head = node1;
      cacheInst.tail = node3;
      cacheInst.map = {
        '1': node1,
        '2': node2,
        '3': node3
      };
      cacheInst.length = 3;
      cacheInst.getEntity('2');
      expect(cacheInst.head.value).equal('bar');
      expect(cacheInst.tail.value).equal('foo');
      expect(cacheInst.head.pre.value).equal('baz');
      expect(cacheInst.head.next).to.be.null;
      expect(cacheInst.tail.pre).to.be.null;
      expect(cacheInst.tail.next.value).equal('baz');
      expect(cacheInst.length).equal(3);
    });

    it('should move the entity to the head from tail for list of three', () => {
      const node1 = {key: '1', value: 'baz', next: null, pre: null};
      const node2 = {key: '2', value: 'bar', next: node1, pre: null};
      const node3 = {key: '3', value: 'foo', next: node2, pre: null};
      node1.pre = node2;
      node2.pre = node3;
      cacheInst.head = node1;
      cacheInst.tail = node3;
      cacheInst.map = {
        '1': node1,
        '2': node2,
        '3': node3
      };
      cacheInst.length = 3;
      cacheInst.getEntity('3');
      expect(cacheInst.head.value).equal('foo');
      expect(cacheInst.tail.value).equal('bar');
      expect(cacheInst.head.pre.value).equal('baz');
      expect(cacheInst.head.next).to.be.null;
      expect(cacheInst.tail.pre).to.be.null;
      expect(cacheInst.tail.next.value).equal('baz');
      expect(cacheInst.length).equal(3);
    });

    it('should move the entity from tail for list with length 2', () => {
      const node1 = {key: '1', value: 'bar', next: null, pre: null};
      const node2 = {key: '2', value: 'foo', next: node1, pre: null};
      node1.pre = node2;
      cacheInst.head = node1;
      cacheInst.tail = node2;
      cacheInst.map = {
        '1': node1,
        '2': node2
      };
      cacheInst.length = 2;
      cacheInst.getEntity('2');
      expect(cacheInst.head.value).equal('foo');
      expect(cacheInst.tail.value).equal('bar');
      expect(cacheInst.length).equal(2);
    });
  });
});
