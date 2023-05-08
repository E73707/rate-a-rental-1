const db = require("../server/config/connection");
const { User, Admin } = require("../server/models");
const bcrypt = require("bcrypt");

// const adminData = require("./adminSeeds.json");

db.once("open", async () => {
  await Admin.deleteMany({});
  const adminData = [
    {
      username: "admin1",
      email: "admin1@gmail.com",
      password: "admin1",
    },
    {
      username: "admin2",
      email: "admin2@gmail.com",
      password: "admin2",
    },
  ];

  const hashedAdminsData = await Promise.all(
    adminData.map(async (adminData) => {
      const hashedPassword = await bcrypt.hash(adminData.password, 10);
      return { ...adminData, password: hashedPassword };
    })
  );
  await Admin.insertMany(hashedAdminsData);
  console.log("successfully seeded admins");
});
