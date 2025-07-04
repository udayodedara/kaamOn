import { DataTypes, Sequelize } from "sequelize";
import dbConfig from "../config/db.config.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: false,
});

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = sequelize.define("User", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: false,
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
db.Wallet = sequelize.define("Wallet", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  balance: DataTypes.FLOAT,
  userId: DataTypes.STRING,
  totalEarned: DataTypes.FLOAT,
  totalSpent: DataTypes.FLOAT,
  totalWithdrawn: DataTypes.FLOAT,
  lockedBalance: DataTypes.FLOAT,
});
db.Transaction = sequelize.define("Transaction", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  walletId: DataTypes.STRING,
  amount: DataTypes.FLOAT,
  type: DataTypes.STRING,
  taskId: DataTypes.STRING,
  isDelete: DataTypes.BOOLEAN,
});
db.Proposal = sequelize.define("Proposal", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  userId: DataTypes.STRING,
  taskId: DataTypes.STRING,
  message: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM("PENDING", "REJECTED", "APPROVED"),
    allowNull: false,
    defaultValue: "PENDING",
  },
  proposedAmount: {
    type: DataTypes.FLOAT,
    validate: {
      min: 1,
    },
    allowNull: false,
  },
});
db.Review = sequelize.define("Review", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  authorId: DataTypes.STRING,
  targetId: DataTypes.STRING,
  rating: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 5,
    },
  },
  comment: DataTypes.STRING,
  isDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  taskId: DataTypes.STRING,
});
db.Task = sequelize.define("Task", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  creatorId: DataTypes.STRING,
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  baseAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  status: {
    type: DataTypes.ENUM("PENDING", "COMPLETE", "CANCEL"),
    defaultValue: "PENDING",
  },
  assigneeId: DataTypes.STRING,
  completedAt: {
    type: DataTypes.DATE,
  },
  isDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Review <> User
db.User.hasMany(db.Review, { foreignKey: "authorId", as: "Author" });
db.User.hasMany(db.Review, { foreignKey: "targetId", as: "Target" });
db.Review.belongsTo(db.User, {
  foreignKey: "authorId",
  as: "AuthoredReviews",
});
db.Review.belongsTo(db.User, { foreignKey: "targetId", as: "ReceivedReviews" });

// Task <> User
db.Task.belongsTo(db.User, { foreignKey: "creatorId", as: "Creator" });
db.Task.belongsTo(db.User, { foreignKey: "assigneeId", as: "Assignee" });
db.User.hasMany(db.Task, { foreignKey: "creatorId", as: "CreatedTasks" });
db.User.hasMany(db.Task, { foreignKey: "assigneeId", as: "AssignedTasks" });

// Task <> Review
db.Task.hasOne(db.Review, { foreignKey: "taskId" });
db.Review.belongsTo(db.Task, { foreignKey: "taskId" });

// Proposal <> Task
db.Proposal.belongsTo(db.Task, { foreignKey: "taskId" });
db.Task.hasMany(db.Proposal, { foreignKey: "taskId" });

// Proposal <> User
db.Proposal.belongsTo(db.User, { foreignKey: "userId" });
db.User.hasMany(db.Proposal, { foreignKey: "userId" });

// Wallet <> Transaction
db.Wallet.hasMany(db.Transaction, { foreignKey: "walletId" });
db.Transaction.belongsTo(db.Wallet, { foreignKey: "walletId" });

// Wallet <> User
db.Wallet.belongsTo(db.User, { foreignKey: "userId" });
db.User.hasMany(db.Wallet, { foreignKey: "userId" });

export default db;
