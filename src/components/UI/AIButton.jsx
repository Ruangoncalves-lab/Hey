import React from 'react';
import { Button } from './Basic';
import { Sparkles, Loader2 } from 'lucide-react';

const AIButton = ({ onClick, isLoading, children, style, ...props }) => {
    return (
        <Button
            onClick={onClick}
            disabled={isLoading}
            style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                border: 'none',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                ...style
            }}
            {...props}
        >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            {children || 'Ask AI'}
        </Button>
    );
};

export default AIButton;
