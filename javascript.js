function HashMap() {
  let capacity = 16;
  const loadFactor = 0.75;
  let map = new Array(capacity).fill(null);
  let keys = [];
  let values = [];

  //takes key and produces hash code and modulo function to create an index within 0 and capacity - 1
  let hash = (key) => {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  };

  // sets hashmap entries by hashing key to find bucket where we store a key and value pair
  let set = (key, value) => {
    let code = hash(key);
    let node = Node(key, value);
    values.push(value);
    // if there is no node already in bucket
    if (map[code] == undefined) {
      map[code] = [node];
      keys.push(key);
      //if the key already exists, we overwrite the value
    } else if (keys.includes(key)) {
      let object = map.flat().find((obj) => obj.key === key);
      object.value = value;
      // if there already exists a node in the bucket, we add the new node using a linked list
    } else {
      map[code][map[code].length - 1].nextNode = node;
      map[code].push(node);
      keys.push(key);
    }
    //test whether bucket has reached load factor to expand buckets (double them)
    let size = showEntries().length;
    if (size > capacity * loadFactor) {
      console.log("yes");
      capacity = capacity * 2;
      let newMap = new Array(capacity).fill(null);
      for (let i = 0; i < map.length; i++) {
        newMap[i] = map[i];
      }
      map = newMap;
      console.log(map);
    }
  };

  //returns the value of a specific key; if key doesn't exist returns null
  let get = (key) => {
    let object = map.flat().find((obj) => obj.key === key);
    if (object == undefined) {
      return null;
    } else {
      return object.value;
    }
  };

  // returns true if key exists in hashmap and false if not
  let has = (key) => {
    let object = map.flat().find((obj) => obj.key === key);
    if (object == undefined) {
      return false;
    } else {
      return true;
    }
  };

  //removes object with a specific key and then returns true; if key doesn't exist, returns false
  let remove = (key) => {
    let object = map.flat().find((obj) => obj.key === key);
    if (object == undefined) {
      return false;
    } else {
      let targetArray = map
        .filter((innerArray) => innerArray)
        .find((innerArray) => innerArray.includes(object));
      console.log(targetArray);
      let previousNode = targetArray.filter((obj) => obj.nextNode === object);
      console.log(previousNode);
      let nextNode = object.nextNode;
      console.log(nextNode);
      previousNode.nextNode = nextNode;
      let index = targetArray.indexOf(object);
      targetArray.splice(index, 1);
      return true;
    }
  };

  //returns length of hash map (filled buckets)
  let length = () => {
    return keys.length;
  };

  //clears hashmap
  let clear = () => {
    map = [];
    keys = [];
    values = [];
    return;
  };

  //returns array of all keys
  let showKeys = () => {
    return keys;
  };

  //returns array of all values
  let showValues = () => {
    return values;
  };

  //returns array containing arrays of each key value pair
  let showEntries = () => {
    const entries = [];
    for (let i = 0; i < map.length; i++) {
      if (map[i] != undefined) {
        for (let j = 0; j < map[i].length; j++) {
          entries.push([map[i][j].key, map[i][j].value]);
        }
      }
    }
    return entries;
  };

  return {
    hash,
    set,
    map,
    get,
    has,
    remove,
    length,
    clear,
    showKeys,
    showValues,
    showEntries,
  };
}

//creates a new node for each entry including key, value, and nextnode functionality to allow for linked lists at collisions
function Node(key, value, nextNode = null) {
  return { key, value, nextNode };
}

const test = HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
console.log(test.map);
