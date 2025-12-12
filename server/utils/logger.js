import { AuditLog } from '../models/index.js';

export const logAction = async (tenantId, userId, action, resource, resourceId, details = {}) => {
    try {
        await AuditLog.create({
            tenant_id: tenantId,
            user_id: userId,
            action,
            resource,
            resource_id: resourceId,
            details
        });
    } catch (error) {
        console.error('Failed to create audit log:', error);
    }
};
