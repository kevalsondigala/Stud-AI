import React, { useState, useRef } from 'react';
import { Upload, File, X, CheckCircle, AlertCircle, Image } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
}

export default function UploadPapers() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (fileList: File[]) => {
    const newFiles: UploadedFile[] = fileList.map(file => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading' as const,
      progress: 0
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach(file => {
      const interval = setInterval(() => {
        setFiles(prev => prev.map(f => {
          if (f.id === file.id) {
            const newProgress = f.progress + 10;
            if (newProgress >= 100) {
              clearInterval(interval);
              return { ...f, progress: 100, status: 'success' };
            }
            return { ...f, progress: newProgress };
          }
          return f;
        }));
      }, 200);
    });
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload Question Papers</h1>
        <p className="text-gray-600">Upload your old question papers, notes, or textbooks to generate AI-powered practice tests.</p>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-xl p-8 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
        <div
          className={`text-center ${dragActive ? 'bg-blue-50 border-blue-400' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Drop your files here, or click to browse
          </h3>
          <p className="text-gray-600 mb-4">
            Support for PDF, DOCX, and image files (JPG, PNG)
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Choose Files
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.docx,.doc,.jpg,.jpeg,.png"
            onChange={handleChange}
            className="hidden"
          />
        </div>
      </div>

      {/* File Types Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <File className="h-8 w-8 text-red-500 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">PDF Documents</h3>
          <p className="text-sm text-gray-600">Question papers, notes, and textbooks in PDF format</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <File className="h-8 w-8 text-blue-500 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Word Documents</h3>
          <p className="text-sm text-gray-600">DOCX and DOC files with questions and content</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <Image className="h-8 w-8 text-green-500 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Image Files</h3>
          <p className="text-sm text-gray-600">Scanned papers and handwritten notes (JPG, PNG)</p>
        </div>
      </div>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Files ({files.length})</h2>
          <div className="space-y-4">
            {files.map(file => (
              <div key={file.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {file.status === 'success' ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : file.status === 'error' ? (
                    <AlertCircle className="h-6 w-6 text-red-500" />
                  ) : (
                    <File className="h-6 w-6 text-blue-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{formatFileSize(file.size)}</p>
                  {file.status === 'uploading' && (
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      ></div>
                    </div>
                  )}
                  {file.status === 'success' && (
                    <p className="text-xs text-green-600 font-medium">Upload complete</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {files.some(f => f.status === 'success') && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-blue-900">Files processed successfully!</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Your files have been analyzed. You can now generate practice tests based on these papers.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}