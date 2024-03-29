import { Link } from 'react-router-dom'
import RecordAudio from './RecordAudio'

const Recordaudio = () => {
    return (
        <div>
            <RecordAudio />
            <div className=' flex justify-center py-10'>
                <Link to="/dashboard">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Go to Dashboard
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Recordaudio;