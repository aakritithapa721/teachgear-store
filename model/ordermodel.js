module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Order", {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    status: { type: DataTypes.STRING, defaultValue: "Pending" }
  });
};