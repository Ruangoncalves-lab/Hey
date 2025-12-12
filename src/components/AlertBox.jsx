import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

const AlertBox = ({ type = 'info', title, message }) => {
    const styles = {
        info: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
        success: 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
        warning: 'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800',
        error: 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
    };

    const icons = {
        info: <Info size={20} />,
        success: <CheckCircle size={20} />,
        warning: <AlertCircle size={20} />,
        error: <XCircle size={20} />,
    };

    return (
        <div className={`flex items-start gap-3 rounded-lg border p-4 ${styles[type]}`}>
            <div className="mt-0.5">{icons[type]}</div>
            <div>
                {title && <h4 className="font-semibold">{title}</h4>}
                <p className="text-sm">{message}</p>
            </div>
        </div>
    );
};

export default AlertBox;
