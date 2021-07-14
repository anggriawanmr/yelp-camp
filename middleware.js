module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You Need To Be Signed In First!");
    return res.redirect("/login");
  }
  next();
};
