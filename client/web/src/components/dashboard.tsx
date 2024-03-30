import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import MedicalRecords from "./MedicalRecords";
import ConsultationRecords from "./ConsultationRecords";
import { Link } from "react-router-dom";

function Dashboard() {
	const [activeButton, setActiveButton] = useState(""); // State to track active button

	// Function to handle button click
	const handleButtonClick = (buttonName: string) => {
		if (activeButton === buttonName) {
			setActiveButton(""); // Deactivate button if it's already active
		} else {
			setActiveButton(buttonName); // Activate button
		}
	};

	const [user, setUser] = useState({
		id: 0,
		age: 0,
		name: "",
		email: "",
		blood_group: "",
		health_insurance: "",
		emergency_contact: "",
		allergies: "",
		current_medications: "",
		family_doctor: "",
	});

	const [userId, setUserId] = useState(0);

	const handleSearch = async () => {
		try {
			const response = await fetch(`http://127.0.0.1:8000/search/search?medical_number=${userId}`, {
				method: 'GET',
				headers: {
					'accept': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			console.log(data); // Handle the JSON response here
			setUser(data);
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}
	}


	return (
		<div className="w-full h-auto min-h-screen flex flex-col gap-10 p-10">
			<div className="flex w-full justify-center items-center pb-6 gap-10">
				<h1 className=" text-4xl font-extrabold text-center tracking-tighter  lg:text-6xl font-sans">
					OneMed
				</h1>
				<div className="mt-3  flex  items-center  justify-center">
					<div className="w-fit  rounded-xl bg-black p-2">
						<h3 className=" text-2xl  font-semibold tracking-wide text-center text-amber-500">
							EHS on Steroids
						</h3>
					</div>
				</div>
			</div>
			<hr />
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				Hello Admin
			</h1>
			<div className="w-full h-[20%] px-10 flex items-center justify-center gap-4">
				<Input className="w-[70%] " onChange={
					(e) => {
						setUserId(parseInt(e.target.value));
					}
				} placeholder="Search for a patient"
				/>
				<Button onClick={handleSearch}>Search</Button>
			</div>
			<div className="w-full flex justify-center">
				<div className="w-full  h-auto   flex justify-between max-w-5xl">
					<div className="h-auto bg-orange-200 border border-black px-2 py-2 flex flex-col gap-2 rounded-2xl">
						Blood Group
						<div>
							<div className="w-full flex justify-center text-7xl p-8 items-center font-bold">
								{user.blood_group}
							</div>
						</div>
					</div>
					<div className="h-auto w-[20%] flex flex-col gap-4">
						<div className="h-[50%] bg-orange-200 border border-black px-2 py-2 flex flex-col gap-2 rounded-2xl">
							ID
							<div>
								<p className="w-full flex justify-center text-2xl pb-2 font-bold">
									{user.id == 0 ? "" : user.id}
								</p>
							</div>
						</div>
						<div className="h-full bg-orange-200 border border-black px-2 py-2 flex flex-col gap-2 rounded-2xl">
							Allergies
							<div>
								<ul className=" pt-2 text-xl font-bold pl-10">
									{user.allergies}
								</ul>
							</div>
						</div>
					</div>
					<div className="h-auto bg-orange-200 border border-black px-2 py-2 flex flex-col gap-2 rounded-2xl">
						Insurance company <br /> & Number
						<div>
							<div className="flex justify-center text-xl pt-10 items-center font-bold">
								{user.health_insurance}
							</div>
							{/* <br />
							<div className="w-full flex justify-center text-3xl items-center font-bold">
								{user.insurance_number}
							</div> */}
						</div>
					</div>
					<div className="h-full w-[20%] flex flex-col gap-4">
						<div className="h-auto bg-orange-200 border border-black px-2 py-2 flex flex-col gap-2 rounded-2xl">
							Family Doctor
							<div>
								<p className="w-full flex justify-center text-xl pb-2 font-bold">
									{user.family_doctor}
								</p>
							</div>
						</div>
						<div className="h-auto bg-orange-200 border border-black px-2 py-2 flex flex-col gap-2 rounded-2xl">
							Age
							<div>
								<p className="w-full flex justify-center text-xl pb-2 font-bold">
									{user.age == 0 ? "" : user.age}
								</p>
							</div>
						</div>
						<div className="h-auto bg-orange-200 border border-black px-2 py-2 flex flex-col gap-2 rounded-2xl">
							Emergency Contact
							<div>
								<p className="w-full flex justify-center text-xl pb-2 font-bold">
									{user.emergency_contact}
								</p>
							</div>
						</div>
					</div>
					<div className="h-auto bg-orange-200 border border-black px-4 py-2 flex flex-col gap-2 rounded-2xl">
						Current Medication
						<div>
							<div className="w-full flex justify-center text-xl pt-10 items-center font-bold">
								<ul>
									{user.current_medications}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <div className="flex w-full justify-center">
				<div className="p-4 flex flex-col w-full h-auto border max-w-5xl bg-orange-200 border-black rounded-2xl">
					<div className="pb-5 font-bold ">
						User's summary for medical history{" "}
					</div>
					<div>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis
						cupiditate blanditiis quam accusamus corporis et quas veniam optio
						delectus. Neque nisi perferendis natus odit distinctio et
						accusantium omnis, saepe obcaecati!{" "}
					</div>
				</div>
			</div> */}
			<div className="flex w-full justify-center ">
				<div className="flex w-full bg-orange-200 rounded-2xl border-black border py-10 justify-evenly max-w-5xl">
					<Link to="/upload-docs">
						<Button>Upload Document</Button>
					</Link>
					{/* <Link to="/upload-audio">
					<Button>
						Upload Audio
					</Button>
				</Link> */}
					<Link to="/recordAudio">
						<Button>Record Audio</Button>
					</Link>
				</div>
			</div>
			<div className="flex w-full justify-center">
				<div className="w-full bg-orange-200 rounded-2xl flex flex-col max-w-5xl">
					<div className="flex w-full h-auto justify-center items-center ">
						<button
							type="button"
							className={`w-[50%] border border-black p-5 ${activeButton === "Medical" ? "bg-orange-300" : "bg-gray-50"
								} rounded-tl-xl`}
							onClick={() => handleButtonClick("Medical")}
						>
							Medical Records
						</button>
						<button
							type="button"
							className={`w-[50%] border border-black p-5 ${activeButton === "Consultation" ? "bg-orange-300" : "bg-gray-50"
								} rounded-tr-xl`}
							onClick={() => handleButtonClick("Consultation")}
						>
							Consultation Records
						</button>
					</div>
					<div className="p-10">
						{activeButton === "Medical" ? (
							<MedicalRecords />
						) : (
							<ConsultationRecords />
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
