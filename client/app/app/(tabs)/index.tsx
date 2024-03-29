import { Link, router } from "expo-router";
import {
	KeyboardAvoidingView,
	Text,
	TextInput,
	Button,
	StyleSheet,
	Pressable,
} from "react-native";
const Login = () => {
	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding">
			<Text style={styles.title}>MedOne</Text>
			<TextInput style={styles.input} placeholder="Email" />
			<TextInput
				style={styles.input}
				secureTextEntry={true}
				placeholder="Password"
			/>
				<Pressable style={styles.button} onPress={()=>router.navigate("/Signup")}>
					<Text style={{ fontSize: 16 }}>Sign In</Text>
				</Pressable>
			<Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		gap: 5,
	},
	title: {
		fontSize: 30,
		fontWeight: "bold",
		marginBottom: 20,
		color: "darkorange",
		paddingBottom: 15,
	},
	input: {
		height: 40,
		width: "80%",
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 10,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
	button: {
		width: "auto",
		paddingHorizontal: 15,
		padding: 10,
		backgroundColor: "orange",
		borderRadius: 5,
		color: "orange",
	},
	signUpText: {
		marginTop: 20,
	},
});

export default Login;
