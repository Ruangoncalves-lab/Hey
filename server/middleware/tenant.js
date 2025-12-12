import { Tenant } from '../models/index.js';

export const validateTenant = async (req, res, next) => {
    try {
        // 1. Try to get tenantId from Header (Priority)
        let tenantId = req.headers['x-tenant-id'];

        // 2. Fallback: Try User context (if authenticated)
        if (!tenantId && req.user && req.user.tenant_id) {
            tenantId = req.user.tenant_id;
        }

        // 3. Fallback: Try URL params (legacy)
        if (!tenantId && req.params.tid) {
            tenantId = req.params.tid;
        }

        if (!tenantId) {
            // If we are in a route that requires tenant, this is an error.
            // But if it's a public route, maybe we shouldn't block? 
            // For now, we assume this middleware is only used on protected routes.
            return res.status(400).json({ message: 'Tenant ID is missing. Please provide x-tenant-id header.' });
        }

        // Validate if user belongs to this tenant (Security)
        if (req.user) {
            const userTenantId = req.user.tenant_id.toString();
            const requestedTenantId = tenantId.toString();

            if (userTenantId !== requestedTenantId && req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Not authorized for this tenant' });
            }
        }

        // Check if tenant exists in DB
        const tenant = await Tenant.findById(tenantId);
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found in database' });
        }

        // Inject tenant into request
        req.tenant = tenant;
        req.tenantId = tenant._id;

        next();
    } catch (error) {
        console.error('Tenant Middleware Error:', error);
        res.status(500).json({ message: 'Server Error checking tenant' });
    }
};
