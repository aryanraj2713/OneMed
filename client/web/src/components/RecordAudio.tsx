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

    const stepOne = async () => {
        const formData = new FormData();
        formData.append('voice_input', file as Blob);
        const response = await fetch('http://127.0.0.1:8000/chat/medicalvoicesummary', {
            method: 'POST',
            body: formData,
            headers: {
                accept: 'application/json',
            },
        });
        const data = await response.json();
        // console.log(data);
        if (response.ok) {
            setUploadStatus('File uploaded successfully!');
            localStorage.setItem('audio_summary', data.medical_summary); // store the medical summary in local storage
            console.log(data.medical_summary);
            setFile(null);
        } else {
            setUploadStatus('File upload failed. Please try again.');
        }
    };

    const steptwo = async () => {
        const audio_summary = localStorage.getItem('audio_summary');
        const response = await fetch('http://127.0.0.1:8000/chat/medicalsummary', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'user_input': audio_summary
            })
        });
        const data = await response.json();
        console.log(data.medical_summary);
        localStorage.setItem('audio_mini_summary', JSON.stringify(data.medical_summary)); // store the medical mini summary in local storage
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
                await stepOne();
                await steptwo();
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
