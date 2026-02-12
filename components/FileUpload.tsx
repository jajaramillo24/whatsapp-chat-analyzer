import React, { useState, useCallback } from 'react';

interface FileUploadProps {
    onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
    const [isDragging, setIsDragging] = useState(false);

    // Fix: Corrected the event type for the drag event handler to match the label element.
    const handleDrag = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    }, []);

    // Fix: Corrected the event type for the drop event handler to match the label element.
    const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onFileSelect(e.dataTransfer.files[0]);
        }
    }, [onFileSelect]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onFileSelect(e.target.files[0]);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-2xl text-center">
                 <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    Analizador de Chats de WhatsApp
                </h1>
                <p className="text-lg text-slate-400 mb-8">
                    Sube el archivo <code className="bg-slate-700 text-brand-whatsapp px-1 rounded">_chat.txt</code> exportado para visualizar las estadísticas de tu conversación.
                </p>

                <label htmlFor="file-upload" className={`relative block w-full p-8 md:p-12 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${isDragging ? 'border-brand-whatsapp bg-slate-800' : 'border-slate-600 hover:border-brand-whatsapp hover:bg-slate-800'}`}
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center justify-center space-y-4">
                         <svg className="w-16 h-16 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v10.5A2.25 2.25 0 0118.75 19.5H5.25A2.25 2.25 0 013 17.25z" />
                        </svg>
                        <p className="text-xl font-semibold text-slate-300">
                           Arrastra y suelta tu archivo aquí
                        </p>
                        <p className="text-slate-500">o</p>
                        <p className="px-4 py-2 bg-slate-700 text-white rounded-md font-semibold">
                            Selecciona un archivo
                        </p>
                    </div>
                    <input id="file-upload" type="file" className="opacity-0 absolute inset-0 w-full h-full" accept=".txt" onChange={handleChange} />
                </label>
                <p className="text-xs text-slate-600 mt-4">Tu privacidad es importante. El archivo se procesa en tu navegador y no se sube a ningún servidor.</p>
            </div>
        </div>
    );
};

export default FileUpload;