import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  danger = false
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <div className="flex justify-end space-x-3">
          <Button variant="outline\" onClick={onClose}>
            {cancelText}
          </Button>
          <Button 
            variant={danger ? 'danger' : 'primary'} 
            onClick={handleConfirm}
          >
            {confirmText}
          </Button>
        </div>
      }
    >
      <div className="flex items-start">
        {danger && (
          <div className="mr-3 flex-shrink-0 text-red-500">
            <AlertTriangle size={24} />
          </div>
        )}
        <p className="text-gray-700">
          {message}
        </p>
      </div>
    </Modal>
  );
};