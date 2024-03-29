import { useState, ChangeEvent, FormEvent } from 'react';

function RecordAudio(): JSX.Element {
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [recording, setRecording] = useState<boolean>(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream);
                setMediaRecorder(mediaRecorder);
                const chunks: Blob[] = [];
                mediaRecorder.ondataavailable = (e) => {
                    chunks.push(e.data);
                };
                mediaRecorder.onstop = () => {
                    const blob = new Blob(chunks, { type: 'audio/mp3' });
                    setFile(new File([blob], 'recorded_audio.mp3'));
                };
                mediaRecorder.start();
                setRecording(true);
            })
            .catch(error => console.error('Error accessing user media:', error));
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setRecording(false);
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
            <div className="text-center text-xl font-semibold mb-4">Upload or Record Audio</div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            {recording ? (
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={stopRecording}>Stop Recording</button>
                            ) : (
                                <>
                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={startRecording}>Start Recording</button>
                                    <div className="mt-2">- or -</div>
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
                                    <p className="text-xs text-gray-500">Audio files up to 10MB</p>
                                </>
                            )}
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

export default RecordAudio;
