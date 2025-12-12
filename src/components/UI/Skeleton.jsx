import React from 'react';

export const Skeleton = ({ width, height, borderRadius = '0.25rem', className = '', style = {} }) => {
    return (
        <div
            className={`ui-skeleton ${className}`}
            style={{
                width,
                height,
                borderRadius,
                ...style
            }}
        />
    );
};
