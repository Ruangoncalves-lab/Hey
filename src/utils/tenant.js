export const getTenantId = () => {
    const id = localStorage.getItem('tenantId');
    if (id === 'undefined' || id === 'null') return null;
    return id;
};

export const setTenantId = (id) => {
    if (id) {
        localStorage.setItem('tenantId', id);
    }
};

export const removeTenantId = () => {
    localStorage.removeItem('tenantId');
};
