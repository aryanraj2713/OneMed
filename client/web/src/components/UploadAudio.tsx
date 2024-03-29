import { useState, ChangeEvent, FormEvent } from 'react';

function UploadAudio(): JSX.Element {
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                const response = await fetch('https://example.com/api/upload', {
                    method: 'POST',
                    body: formData,
                });
                if (response.ok) {
                    setUploadStatus('File uploaded successfully!');
                    setFile(null);
                } else {
                    setUploadStatus('File upload failed. Please try again.');
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                setUploadStatus('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <div className="text-center text-xl font-semibold mb-4">Upload Audio File</div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                        Choose Audio File
                    </label>
                    <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M20 4v8m8-8v8m-4 12h12M4 24h24m12-8l-8-8v16l8-8zm0 0l8 8v-16l-8 8zm-4 16V12"
                                />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                                <label
                                    htmlFor="file"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                >
                                    <span>Upload a file</span>
                                    <input
                                        id="file"
                                        name="file"
                                        type="file"
                                        className="sr-only"
                                        onChange={handleFileChange}
                                        accept=".mp3"
                                    />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">Audio files up to 10MB</p>
                        </div>
                    </div>
                </div>
                {file && (
                    <div className="text-sm font-medium text-green-700">
                        {file.name} selected for upload
                    </div>
                )}
                {uploadStatus && (
                    <div className="text-sm font-medium">
                        {uploadStatus}
                    </div>
                )}
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Upload
                </button>
            </form>
        </div>
    );
}

export default UploadAudio;
