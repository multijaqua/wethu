// POST endpoint for user registration
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate email format
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    // Validate password strength (example: at least 6 characters)
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Check if username or email already exists (simulate database check)
    const existingUser = users.find(user => user.username === username || user.email === email);
    if (existingUser) {
        return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Create new user object
    const newUser = { username, email, password };
    users.push(newUser); // Simulate adding user to database

    console.log('New user registered:', newUser);
    res.status(200).json({ message: 'User registered successfully' });
});

function isValidEmail(email) {
    // Use a regular expression for basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

