const { User } = require("./user.db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
console.log("About to require user.schema...");
const schemasModule = require("./user.schema");
console.log("Schema module loaded:", schemasModule);
console.log("RegisterUserData:", schemasModule.RegisterUserData);
console.log("LoginUserData:", schemasModule.LoginUserData);

const { RegisterUserData, LoginUserData } = schemasModule;


if (!RegisterUserData) {
  console.error("ERROR: RegisterUserData is undefined!");
  throw new Error("RegisterUserData is undefined - check user.schema.js");
}
if (!LoginUserData) {
  console.error("ERROR: LoginUserData is undefined!");
  throw new Error("LoginUserData is undefined - check user.schema.js");
}

console.log("Schemas verified successfully");

const JWT_SECRET = "your_super_secret"; 

async function registerUser(req, res) {
  try {
    const data = RegisterUserData.safeParse(req.body);
    if (!data.success) return res.status(400).json(data.error);


    const existing = await User.findOne({ username: data.data.username });
    if (existing) return res.status(400).json("Username already taken");


    const hashed = await bcrypt.hash(data.data.password, 10);


    const newUser = await User.create({ username: data.data.username, password: hashed });

    return res.json({ message: "User registered", userId: newUser._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json("something went wrong");
  }
}

async function loginUser(req, res) {
  try {
    const data = LoginUserData.safeParse(req.body);
    if (!data.success) return res.status(400).json(data.error);


    const user = await User.findOne({ username: data.data.username });
    if (!user) return res.status(400).json("Invalid credentials");


    const match = await bcrypt.compare(data.data.password, user.password);
    if (!match) return res.status(400).json("Invalid credentials");


    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "24h" });

    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json("something went wrong");
  }
}

module.exports = { registerUser, loginUser };
