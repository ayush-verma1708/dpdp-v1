import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Import routes
import companyRoutes from './routes/company.routes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js'; // Ensure this path is correct
import controlFamiliesRoutes from './routes/controlFamilyRoutes.js'; // Import control families routes
import controlRoutes from './routes/controlRoutes.js'; // Import control routes
import actionRoutes from './routes/actionRoutes.js'; // Import action routes


const app = express();

// Middleware setup
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Route setup
app.use("/api/v1/companies", companyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/v1/control-families', controlFamiliesRoutes); // Add this line to handle control families
app.use('/api/v1/controls', controlRoutes); // Add control routes
app.use('/api/v1/actions', actionRoutes); // Add action routes


// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

export { app };

// // import express from 'express';
// // import cookieParser from 'cookie-parser';
// // import cors from 'cors';
// // // Import routes
// // import actionRoutes from './routes/actionRoutes.js';
// // import controlFamiliesRoutes from './routes/controlFamilyRoutes.js';
// // import controlRoutes from './routes/controlRoutes.js';
// // import uploadRoutes from './routes/uploadRoutes.js'; // Import the upload routes

// // const app = express();

// // // Middleware setup
// // app.use(cors({
// //     origin: process.env.CORS_ORIGIN,
// //     credentials: true
// // }));

// // app.use(express.json({ limit: "16kb" }));
// // app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// // app.use(express.static("public"));
// // app.use(cookieParser());

// // // Route setup
// // app.use('/api/v1/actions', actionRoutes); // Route for actions
// // app.use('/api/v1/control-families', controlFamiliesRoutes); // Route for control families
// // app.use('/api/v1/controls', controlRoutes); // Route for controls
// // app.use('/api/v1/upload', uploadRoutes); // Route for file uploads

// // // Global error handling middleware
// // app.use((err, req, res, next) => {
// //   console.error(err.stack);
// //   res.status(err.statusCode || 500).json({
// //     message: err.message || 'Internal Server Error',
// //     error: process.env.NODE_ENV === 'development' ? err : {}
// //   });
// // });

// // export { app };

// import express from 'express';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// // Import routes
// import companyRoutes from './routes/company.routes.js';
// import authRoutes from './routes/authRoutes.js';
// import userRoutes from './routes/userRoutes.js'; // Ensure this path is correct

// const app = express();

// // Middleware setup
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }));

// app.use(express.json({ limit: "16kb" }));
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"));
// app.use(cookieParser());

// // Route setup
// app.use("/api/v1/companies", companyRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);

// // Global error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.statusCode || 500).json({
//     message: err.message || 'Internal Server Error',
//     error: process.env.NODE_ENV === 'development' ? err : {}
//   });
// });

// export { app };
// // // import express from 'express';
// // // import cookieParser from 'cookie-parser';
// // // import cors from 'cors';
// // // // import routes
// // // import companyRoutes from './routes/company.routes.js';
// // // import authRoutes from './routes/authRoutes.js';
// // // import userRoutes from './routes/userRoutes.js'; // Make sure this path is correct

// // // const app = express();

// // // app.use(cors({
// // //     origin: process.env.CORS_ORIGIN,
// // //     credentials: true
// // // }));

// // // app.use(express.json({limit: "16kb"}));
// // // app.use(express.urlencoded({extended:true, limit:"16kb"}));
// // // app.use(express.static("public"));
// // // app.use(cookieParser());

// // // // routes declaration
// // // app.use("/api/v1/companies", companyRoutes);
// // // app.use('/api/auth', authRoutes);
// // // app.use('/api/users', userRoutes); // Add this line


// // // export { app };