module.exports = (sequelize, Sequelize) => {
    const product = sequelize.define("PRODUCTS", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      product_title: {
        type: Sequelize.STRING
      },
      product_description: {
        type: Sequelize.STRING
      },
      product_tag: {
        type: Sequelize.STRING
      },
      product_image: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
        defaultValue: "ACTIVE"
      },
      isDeleted: {
        type: Sequelize.BOOLEAN(true, false),
        defaultValue: false
      },
    });
    return product;
  };
  