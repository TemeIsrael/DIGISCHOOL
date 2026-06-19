import React, { useRef, useState } from 'react';
import { UploadCloud, File, X, AlertCircle } from 'lucide-react';

export interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  accept?: string;
  maxSizeMB?: number;
  label?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = 'application/pdf,image/png,image/jpeg,image/jpg',
  maxSizeMB = 10,
  label = 'Sélectionner un fichier'
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    setError(null);
    const sizeLimit = maxSizeMB * 1024 * 1024;
    
    if (file.size > sizeLimit) {
      setError(`La taille du fichier ne doit pas dépasser ${maxSizeMB} Mo`);
      return false;
    }

    // Check MIME type against accept patterns
    const acceptedTypes = accept.split(',');
    const isAccepted = acceptedTypes.some((type) => {
      const trimmed = type.trim();
      if (trimmed.startsWith('.')) {
        return file.name.endsWith(trimmed);
      }
      return file.type === trimmed;
    });

    if (!isAccepted) {
      setError('Format de fichier non supporté');
      return false;
    }

    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    onFileSelect(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-semibold text-slate-700">{label}</label>}

      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-200 hover:border-digi-purple/40 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-white group"
        >
          <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-digi-purple transition-colors mb-3" />
          <p className="text-sm font-bold text-slate-700">Glissez-déposez votre fichier ici</p>
          <p className="text-xs text-slate-400 mt-1">ou cliquez pour parcourir les fichiers</p>
          <p className="text-[10px] text-slate-400 mt-3 font-semibold uppercase tracking-wider">
            PDF, PNG, JPG (Max. {maxSizeMB}Mo)
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={accept}
            className="hidden"
          />
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-digi-purple-bg text-digi-purple rounded-lg">
              <File className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700 truncate max-w-xs">{selectedFile.name}</p>
              <p className="text-xs text-slate-400 font-semibold">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} Mo
              </p>
            </div>
          </div>
          <button
            onClick={removeFile}
            className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1.5 text-xs font-semibold text-digi-danger">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
