import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import routes
import companyRoutes from './routes/company.routes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js'; // Make sure this path is correct

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

// routes declaration
app.use("/api/v1/companies", companyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // Add this line


export { app };
