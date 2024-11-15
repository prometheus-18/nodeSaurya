const jwt = require("jsonwebtoken");
const secretKey = "abcTTT6543uzzzyyyuccccr434cvewqjhgder";
// const invalidatedTokens = new Set();
const bcrypt = require('bcryptjs');
const db = require('../../../IndexFiles/modelsIndex');
const RegisterEmployee = db.tbl_admin;

exports.createEmployee = async (req, res) => {
    try {
        const { email,username, password } = req.body;
        const user = await RegisterEmployee.findOne({
            where: {
                email
            }
        });
        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);
        if (user) {
            return res.status(403).send({ code: 403, message: "Employee Already Exists" })
        } else if (!user) {
            const response = await RegisterEmployee.create({
                email,username, password: hash
            });
            return res.status(200).send({
                code: 200, message: "Employee Registered Successfully!",
                data: response
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    };
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = await RegisterEmployee.findOne({ where: { email: email } });
        // Check if user exists
        if (!user) {
            return res.status(401).send({ code: 401, message: "Invalid credentials" });
        }
        // Compare entered password with hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ code: 401, message: "Invalid password" });
        }
        // If credentials are valid, create a JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, { expiresIn: '10h' });

        return res.status(200).send({ code: 200, message: "Login successful",token, id: user.id,user_name:user.username });
    } catch (error) {
        console.error(error, "Error");
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};


