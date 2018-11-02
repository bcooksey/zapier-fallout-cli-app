const generateId = () => {
  return Math.floor(Math.random() * 1000);
}

const getValueFromStoreKey = (data, key) => {
  let value;
  if (data && data[key] && data[key].list) {
    value = data[key].list;
    value.reverse();
  } else {
    value = [];
  }
  return value;
}

module.exports = {
  generateId,
  getValueFromStoreKey
};
