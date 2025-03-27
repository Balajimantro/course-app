const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/registerUser");

exports.register = async (req, res) => {
  try {
    const { name, email, password, latitude, longitude } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const profileImage = req.file ? req.file.filename : null;
    
    const user = new User({
      name,
      email,
      profileImage,
      password: hashedPassword,
      latitude,
      longitude,
    });

    await user.save();
    res.status(201).json({ message: "registration successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    user.token = token;
    await user.save();
    
    res.status(201).json({ message: "login successfully", token, user });
  } catch (err) {
    res.status(500).json({ message: "login failed" });
  }
};

// Get User
exports.getUser = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};

exports.updateUser = async(req, res) => {
  try {
    const updateData ={ ...req.body};
    if(req.file) {
      updateData.profileImage = req.file.filename
    }
    const user = await User.findByIdAndUpdate(req.user.id, updateData, {new: true});
    res.status(res.statusCode).json({message: "User updated successfully", user});
  } catch(err) {
    res.status(res.statusCode).json({message: err.message})
  }
}

exports.validateToken = async(req, res) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    return res.status(200).json({ message: "Token is valid"});
  } catch(error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}