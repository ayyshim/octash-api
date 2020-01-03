module.exports = () => {
  const today = new Date();
  const date = today.toDateString();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return `${date} ${time}`;
};
