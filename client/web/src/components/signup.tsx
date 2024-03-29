import { Formik, Form, Field } from "formik";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
function Signup() {
	return (
		<div className="flex flex-col w-full h-auto">
			<div>
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
				<div className="flex flex-col w-full h-[70vh] items-center justify-center">
					<h1 className="text-xl font-bold mb-4">Login here</h1>
					<Formik
						initialValues={{ age: 20, name: "", email: "", phone: "", password: "", address: "", is_hospital: false }}
						validate={(values) => {
							const errors: { email?: string, name?: string, phone?: string, password?: string } = {};
							// Add type declaration for 'errors' object
							if (!values.email) {
								errors.name = "Required";
							} else if (
								!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
							) {
								errors.email = "Invalid email address";
							} else if (!values.name) {
								errors.name = "Required";
							} else if (!values.phone) {
								errors.phone = "Required";
							} else if (!values.password) {
								errors.password = "Required";
							}
							return errors;
						}}
						onSubmit={(values, { setSubmitting }) => {
							try {
								setTimeout(async () => {
									console.log(values);
									values.age = parseInt(values.age.toString());
									const url = "http://127.0.0.1:8000/auth/signup";
									const response = await fetch(url, {
										method: "POST",
										headers: {
											"Content-Type": "application/json",
										},
										body: JSON.stringify(values),
									});
									window.location.href = "/dashboard";
									console.log(response);
									setSubmitting(false);
								}, 400);

							} catch (error) {
								console.error(error);
							}
						}}
					>
						{({ isSubmitting }) => (
							<Form className="w-full max-w-sm">
								<div className="mb-4">
									<Field
										type="name"
										name="name"
										placeholder="Name"
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									/>
									{/* <ErrorMessage
										name="name"
										component="div"
										className="text-red-500 text-xs italic"
									/> */}
								</div>
								<div className="mb-4">
									<Field
										type="address"
										name="address"
										placeholder="Address"
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									/>
									{/* <ErrorMessage
										name="address"
										component="div"
										className="text-red-500 text-xs italic"
									/> */}
								</div>
								<div className="mb-4">
									<Field
										type="email"
										name="email"
										placeholder="Email"
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									/>
									{/* <ErrorMessage
										name="email"
										component="div"
										className="text-red-500 text-xs italic"
									/> */}
								</div>
								<div className="mb-4">
									<Field
										type="phone"
										name="phone"
										placeholder="Phone Number"
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									/>
									{/* <ErrorMessage
										name="phone"
										component="div"
										className="text-red-500 text-xs italic"
									/> */}
								</div>
								<div className="mb-6">
									<Field
										type="password"
										name="password"
										placeholder="Password"
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									/>
									{/* <ErrorMessage
										name="password"
										component="div"
										className="text-red-500 text-xs italic"
									/> */}
								</div>
								<Button
									type="submit"
									disabled={isSubmitting}
									className=" font-bold w-full text-amber-500 text-xl"
								>
									{isSubmitting ? "Submitting..." : "Submit"}
								</Button>
							</Form>
						)}
					</Formik>
				</div>
				<div className="flex w-full items-center  justify-center gap-2">
					Already have an account? <Link to="/Login" className="underline">Sign in</Link>
				</div>
			</div>
		</div>
	);
}

export default Signup;
