const UserModel = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    address: DataTypes.STRING,
    contactNumber: DataTypes.STRING,
    isDelete: DataTypes.BOOLEAN,
  });
};

export default UserModel;
