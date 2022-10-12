module.exports = function isAModule(driver) {
  try {
    require.resolve(driver);
    return true;
  } catch (e) {
    return false;
  }
};
