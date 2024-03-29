import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "./ui/button";
function Login() {
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
						initialValues={{ email: "", password: "", username: "" }}
						validate={(values) => {
							const errors: { email?: string } = {}; // Add type declaration for 'errors' object
							if (!values.email) {
								errors.email = "Required";
							} else if (
								!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
							) {
								errors.email = "Invalid email address";
							}
							return errors;
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(async () => {
								try {
									const response = await fetch('http://127.0.0.1:8000/auth/login', {
										method: 'POST',
										headers: {
											'Accept': 'application/json',
											'Content-Type': 'application/x-www-form-urlencoded'
										},
										body: new URLSearchParams({
											'grant_type': '',
											'username': values.email,
											'password': values.password,
											'scope': '',
											'client_id': '',
											'client_secret': ''
										})
									});
									console.log(response);
									window.location.href = "/dashboard";
									console.log(response);
								} catch (error) {
									console.error("Error logging in:", error);
								}
							}, 400);
							setSubmitting(false);
						}}
					>
						{({ isSubmitting }) => (
							<Form className="w-full max-w-sm">
								<div className="mb-4">
									<Field
										type="email"
										name="email"
										placeholder="Email"
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									/>
									<ErrorMessage
										name="email"
										component="div"
										className="text-red-500 text-xs italic"
									/>
								</div>
								<div className="mb-6">
									<Field
										type="password"
										name="password"
										placeholder="Password"
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									/>
									<ErrorMessage
										name="password"
										component="div"
										className="text-red-500 text-xs italic"
									/>
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
			</div>
		</div>
	);
}

export default Login;
