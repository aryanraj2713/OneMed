import { Link, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import {
	KeyboardAvoidingView,
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	Pressable,
} from "react-native";
const Index = () => {
	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding">
			<Text style={styles.title}>MedOne</Text>
			<View style={styles.user}>
				<Text style={{ fontSize: 20 }}>Hello User</Text>
			</View>

			<View
				style={{
					width: "95%",
					padding: 10,
					margin: 10,
					borderRadius: 10,
					overflow: "hidden", // Ensure borderRadius works with child elements
					// Fallback color
				}}
			>
				<LinearGradient
					colors={["#FF9F00", "#FF6347"]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					style={{
						padding: 20,
						borderRadius: 10,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<View
							style={{
								flexDirection: "column",
								gap: 20,
							}}
						>  
							<Text
								style={{ fontSize: 17, color: "white", fontWeight: "bold" }}
							>
								Card Number
							</Text>
							<Text
								style={{ fontSize: 17, color: "white", fontWeight: "bold" }}
							>
								Name
							</Text>
							<Text
								style={{ fontSize: 17, color: "white", fontWeight: "bold" }}
							>
								Date of Joining
							</Text>
						</View>
						<View style={{ alignItems: "flex-end" }}>
							<Text
								style={{ fontSize: 25, fontWeight: "bold", color: "white" }}
							>
								OneMed
							</Text>
						</View>
					</View>
				</LinearGradient>
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		paddingTop: 60,
		gap: 5,
	},
	title: {
		fontSize: 30,
		fontWeight: "bold",
		marginBottom: 20,
		color: "darkorange",
		paddingBottom: 15,
	},
	user: {
		fontSize: 40,
		width: "100%",
		alignItems: "flex-start",
		paddingLeft: 20,
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

export default Index;
