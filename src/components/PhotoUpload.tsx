import { useRef } from 'react';

interface PhotoUploadProps {
  sectionId: string;
  photo: string | null;
  onPhotoChange: (sectionId: string, photo: string | null) => void;
}

export default function PhotoUpload({ sectionId, photo, onPhotoChange }: PhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoChange(sectionId, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleRemovePhoto = () => {
    onPhotoChange(sectionId, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // No photo - subtle upload area - responsive
  if (!photo) {
    return (
      <div className="flex justify-center">
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          className="group cursor-pointer transition-all duration-300 hover:scale-102 w-full max-w-md"
        >
          <div className="border-2 border-dashed border-valentine-purple/15 hover:border-valentine-coral/40 rounded-xl sm:rounded-2xl px-6 sm:px-8 py-5 sm:py-6 transition-all duration-300 bg-white/40 hover:bg-white/60">
            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-valentine-purple/30 group-hover:text-valentine-coral/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-valentine-purple/40 group-hover:text-valentine-purple/60 text-xs sm:text-sm font-light transition-colors">
                Add a photo (optional)
              </p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      </div>
    );
  }

  // Photo exists - show preview with controls - improved with proper object-fit
  return (
    <div className="flex justify-center">
      <div className="relative group max-w-md w-full">
        {/* Photo preview - no distortion with proper aspect ratio handling */}
        <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xl ring-2 sm:ring-4 ring-valentine-purple/10">
          <img 
            src={photo} 
            alt="Memory" 
            className="w-full h-auto max-h-64 sm:max-h-80"
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </div>
        
        {/* Controls on hover - responsive */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl sm:rounded-b-2xl p-3 sm:p-4 flex justify-center gap-2 sm:gap-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 sm:px-5 py-1.5 sm:py-2 bg-white/95 hover:bg-white text-valentine-purple text-xs sm:text-sm font-light rounded-full transition-all duration-200 shadow-lg"
          >
            Change photo
          </button>
          <button
            onClick={handleRemovePhoto}
            className="px-4 sm:px-5 py-1.5 sm:py-2 bg-white/95 hover:bg-white text-valentine-coral text-xs sm:text-sm font-light rounded-full transition-all duration-200 shadow-lg"
          >
            Remove
          </button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
