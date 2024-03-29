import Hero from "./components/hero";
import Login from "./components/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import Uploaddocument from "./components/upload-document";
import Uploadaudio from "./components/upload-audio";
import Recordaudio from "./components/record-audio";

export default function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Hero />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/upload-docs" element={<Uploaddocument />} />
					<Route path="/upload-audio" element={<Uploadaudio />} />
					<Route path="/record-audio" element={<Recordaudio />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
