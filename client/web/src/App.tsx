import Hero from "./components/hero";
import Login from "./components/login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";

export default function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Hero />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
