import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/login', isAuthenticated, (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            req.flash('error', 'User not found');
            return res.redirect('/login');
        }

        const isMatch = await user.isPasswordMatch(password);

        if (!isMatch) {
            req.flash('error', 'Incorrect email or password');
            return res.redirect('/login');
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 86400, // expires in 24 hours
        });

        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // expires in 24 hours
        });

        req.flash('success', 'Successfully logged in');
        res.redirect('/');
    } catch (error) {
        req.flash('error', 'An error occurred while logging in');
        res.redirect('/login');
    }
});

export default router;