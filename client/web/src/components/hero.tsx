import { Button } from "./ui/button";
import {Link} from "react-router-dom";
function Hero() {
	return (
		<div>
			<div className="flex-col h-screen w-full items-center justify-center bg-gray-100">
				<div className="flex w-full justify-center items-center py-6 gap-10">
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
				<div className="flex w-full h-[80vh] items-center justify-around ">
					<div>
						<p className="leading-7 w-[30vw]">
							As a result, people stopped telling jokes, and the kingdom fell
							into a gloom. But there was one person who refused to let the
							king's foolishness get him down: a court jester named Jokester.
						</p>
						<Link to="/login">
							<Button className="w-full mt-5 text-amber-500 font-bold text-2xl">
								Try me!
							</Button>
						</Link>
					</div>

					<img
						src="https://illustrations.popsy.co/amber/video-call.svg"
						alt="hero"
						className="w-1/2"
					/>
				</div>
			</div>
		</div>
	);
}

export default Hero;
