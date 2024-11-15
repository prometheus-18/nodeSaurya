module.exports = (sequelize, Sequelize) => {
  const tbl_admin = sequelize.define("ADMINS", {
    email: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
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
  return tbl_admin;
};
