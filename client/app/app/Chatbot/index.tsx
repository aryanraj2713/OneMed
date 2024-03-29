import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

const Index = () => {
	return (
        
			<WebView
				source={{ uri: "https://chatbot.hellotars.com/conv/dltBQU" }}
				style={{ flex: 1 }}
			/>
		
	);
};
export default Index;
