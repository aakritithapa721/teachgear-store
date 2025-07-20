const isAdmin = (req, res, next) => {
    console.log(req.user)
    if (req.user && req.user.role == 'user'){
        return next();
        }

        return res.status(403).json({ success: false,
            message: 'Access denied: Admins only'
        });
};

module.exports = isAdmin;

