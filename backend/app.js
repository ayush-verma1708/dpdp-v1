import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Import routes
import companyRoutes from './routes/company.routes.js';
import assetRouter from './routes/asset.routes.js';
import scopedRouter from './routes/scoped.routes.js';
import coverageRouter from './routes/coverage.routes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js'; // Ensure this path is correct
import controlFamiliesRoutes from './routes/controlFamilyRoutes.js'; // Import control families routes
import controlRoutes from './routes/controlRoutes.js'; // Import control routes
import actionRoutes from './routes/actionRoutes.js'; // Import action routes
import uploadRoutes from './routes/uploadRoutes.js'; // Import the new upload routes
import assetDetailRouter from './routes/assetDetail.routes.js';



const app = express();

app.use((cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
})))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes declaration
app.use("/api/v1/companies", companyRoutes)
app.use("/api/v1/assets", assetRouter)
app.use("/api/v1/scoped", scopedRouter)
app.use("/api/v1/coverage", coverageRouter)
app.use("/api/v1/companies", companyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/v1/control-families', controlFamiliesRoutes); // Add this line to handle control families
app.use('/api/v1/controls', controlRoutes); // Add control routes
app.use('/api/v1/actions', actionRoutes); // Add action routes
app.use('/api/v1/uploads', uploadRoutes); // Add this line to handle file uploads
app.use('/api/v1/assetDetails', assetDetailRouter);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

export { app };