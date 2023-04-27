const db = require("../server/config/connection");
const { User } = require("../server/models");

const userData = require("./userSeeds.json");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    const users = await User.insertMany(userData);

    console.log("Users seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  }
});
