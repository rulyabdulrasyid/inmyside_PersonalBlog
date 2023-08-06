const authRole = (permission) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json("Authorization header missing");
    }
    const token = authHeader.split(" ")[1];
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userRole = decodedToken.role;
      if (permission.includes(userRole)) {
        next();
      } else {
        return res.status(401).json("You don't have permission");
      }
    } catch (err) {
      return res.status(401).json("Invalid Token");
    }
  };
};

module.exports = { authRole };
