function HashMap() {
  const capacity = 1;
  const map = [];
  const keys = [];

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

  return { hash, set, map, get, has, remove };
}

//creates a new node for each entry including key, value, and nextnode functionality to allow for linked lists at collisions
function Node(key, value, nextNode = null) {
  return { key, value, nextNode };
}

const test = HashMap();
test.set("abc", "one");
test.set("acb", "two");
test.set("bac", "three");
test.remove("acb");
console.log(test.map);
