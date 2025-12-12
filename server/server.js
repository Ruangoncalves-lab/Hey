import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { initScheduler } from './jobs/scheduler.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import tenantRoutes from './routes/tenantRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// OAuth Routes
import { facebookLogin, facebookCallback } from './controllers/oauthController.js';
app.get('/api/auth/facebook', facebookLogin);
app.get('/api/auth/facebook/callback', facebookCallback);

// API Routes
import metaAuthRoutes from './routes/metaAuthRoutes.js';
import metaApiRoutes from './routes/metaApiRoutes.js';

app.use('/api/meta-auth', metaAuthRoutes);
app.use('/api/meta', metaApiRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/webhooks', webhookRoutes);

// Google Auth
import googleAuthRoutes from './routes/googleAuthRoutes.js';
app.use('/api/auth/google', googleAuthRoutes);

import googleApiRoutes from './routes/googleApiRoutes.js';
app.use('/api/google', googleApiRoutes);

// Tenant Middleware validation
import { validateTenant } from './middleware/tenant.js';
app.use('/api/tenants/:tid', validateTenant, tenantRoutes);

app.get('/', (req, res) => {
    res.send('TrafficPro API (Supabase Edition) is running...');
});

// Error Handler
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// Start Scheduler
initScheduler();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
