import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';
import { login } from '../controllers/authController.js'; 

const router = express.Router();

// Login route
router.post('/login', login);

// Create new user (admin only)
// router.post('/create-user', auth, adminAuth, async (req, res) => {
//   const { username, password, role } = req.body;

//   try {
//     const user = new User({ username, password, role });
//     await user.save();
//     res.status(201).json({ msg: 'Admin user created successfully' });
//   } catch (err) {
//     res.status(400).json({ msg: err.message });
//   }
// });
router.post('/create-user', auth, async (req, res) => {
  const { username, password, role } = req.body;
  try {
      const user = new User({ username, password, role });
      await user.save();
      res.status(201).json({ msg: 'User created successfully' });
  } catch (err) {
      res.status(400).json({ msg: err.message });
  }
});

export default router;

// import express from 'express';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
// import User from '../models/User.js';
// import auth from '../middleware/auth.js';
// import adminAuth from '../middleware/adminAuth.js';
// import { login } from '../controllers/authController.js'; // Ensure this matches the export in your controller

// const router = express.Router();

// // Login route
// router.post('/login', login);

// // Create new user (admin only)
// router.post('/create-user', auth, adminAuth, async (req, res) => {
//   const { username, password, role } = req.body;

//   try {
//     const user = new User({ username, password, role: role || 'user' });
//     await user.save();
//     res.status(201).json({ msg: 'User created successfully' });
//   } catch (err) {
//     res.status(400).json({ msg: err.message });
//   }
// });

// export default router;

// // // Import necessary modules
// // import express from 'express';
// // import bcrypt from 'bcryptjs';
// // import User from '../models/User.js';
// // import auth from '../middleware/auth.js';
// // import adminAuth from '../middleware/adminAuth.js';
// // import { login } from '../controllers/authController.js'; // Import the login function

// // const router = express.Router();

// // // Login route
// // router.post('/login', login);

// // // Create new user (admin only)
// // router.post('/create-user', auth, adminAuth, async (req, res) => {
// //   const { username, password } = req.body;

// //   try {
// //     const user = new User({ username, password });
// //     await user.save();
// //     res.status(201).json({ msg: 'User created successfully' });
// //   } catch (err) {
// //     res.status(400).json({ msg: err.message });
// //   }
// // });

// // // Create new admin user (no auth required for this operation)
// // router.post('/create-admin', async (req, res) => {
// //   const { username, password } = req.body;

// //   try {
// //     // Hash the password
// //     const salt = await bcrypt.genSalt(10);
// //     const hashedPassword = await bcrypt.hash(password, salt);

// //     // Create a new admin user
// //     const adminUser = new User({ username, password: hashedPassword, role: 'admin' });
// //     await adminUser.save();

// //     res.status(201).json({ msg: 'Admin user created successfully' });
// //   } catch (err) {
// //     res.status(400).json({ msg: err.message });
// //   }
// // });

// // export default router;
