import React from "react";
import { X } from "lucide-react";

interface ModalFormProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ModalForm({ title, open, onClose, children }: ModalFormProps) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="bg-card border border-border rounded-xl w-full max-w-lg mx-4 p-6 animate-fade-in max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-display font-semibold">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-secondary transition-colors">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
