module.exports = (req, res) => {
    if (req.session.userId) {
        return res.render("addClient");
    }
    res.redirect("/auth/login");
};