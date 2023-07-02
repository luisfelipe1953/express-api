const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
  try {
    const user = new User(req.body);
    user.password = await bcrypt.hash(req.body.password, 12);
    await user.save();
    res.json({ message: "Registrado Correctamente" });
  } catch (err) {
    console.log(err);
    res.json({ error: "hubo un error" });
    next();
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    await res.status(401).json({ message: "El Usuario no Existe" });
    next();
  } else {
    if (!bcrypt.compareSync(password, user.password)) {
      await res.status(401).json({ message: "Password Incorrecto" });
      next()
    } else {
      const token = jwt.sign(
        {
          email: user.email,
          name: user.name,
          id: user._id,
        },
        "KEYSECRET",
        {
          expiresIn: "4h",
        }
      );

      res.json({ token });
    }
  }
};
