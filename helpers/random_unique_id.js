exports.generate = () => {
    let numbers = "0123456789";
    let chars = "abcdefghijklmnopqrstuvwxyz";
    let elements = numbers + chars + chars.toUpperCase();
  
    let len = 8;
    let str = "";
    for (let i = 0; i < len; i++) {
      const pos = Math.floor(
        Math.random(0, elements.length - 1) * elements.length
      );
      str += elements[pos];
    }
    return str;
  };