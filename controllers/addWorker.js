module.exports = (req, res) => {
    if (req.session.userId) {
        return res.render("addWorker");
    }
    res.redirect("/auth/login");
};