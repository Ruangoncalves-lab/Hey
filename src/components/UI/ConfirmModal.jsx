import React from 'react';
import { Modal, Button } from './Basic'; // Assuming Basic exports Button, but Modal is in Complex. Adjusting imports.
import { Modal as UiModal } from './Complex';
import { Button as UiButton } from './Basic';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    return (
        <UiModal
            isOpen={isOpen}
            onClose={onClose}
            title={title || 'Confirm Action'}
            footer={
                <>
                    <UiButton variant="ghost" onClick={onClose}>Cancel</UiButton>
                    <UiButton variant="danger" onClick={() => { onConfirm(); onClose(); }} style={{ backgroundColor: '#ef4444', color: 'white' }}>Confirm</UiButton>
                </>
            }
        >
            <p style={{ color: 'var(--text-secondary)' }}>{message || 'Are you sure you want to proceed? This action cannot be undone.'}</p>
        </UiModal>
    );
};

export default ConfirmModal;
