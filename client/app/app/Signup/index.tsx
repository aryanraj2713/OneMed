import { router } from 'expo-router';
import { KeyboardAvoidingView, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
const Index = () => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>MedOne</Text>
      <Text style={styles.subtitle}>Sign Up</Text>
      <TextInput style={styles.input} placeholder="Name" />
      <TextInput style={styles.input} placeholder="Age" />
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input}  secureTextEntry={true} placeholder="Password"  />
      <TextInput style={styles.input} placeholder="Blood Group" />
      <TextInput style={styles.input} placeholder="Allergies" />
       <TextInput style={styles.input} placeholder="Family Doctor" />
        <TextInput style={styles.input} placeholder="Current Medication" />
        <TextInput style={styles.input} placeholder="Medical History" />
        <TextInput style={styles.input} placeholder="Health Insurance Number" />
        <TextInput style={styles.input} placeholder="Emergency Contact" />



      <Pressable style={styles.button} onPress={()=>{router.push("/Dashboard/")}} ><Text style={{fontSize:16}}>Sign In</Text></Pressable>
      <Text style={styles.signUpText}>Already have an account? Sign In</Text>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
	gap: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
	color: 'darkorange',
	paddingBottom: 15,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
	color: 'darkorange',
	paddingBottom: 15,

  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
	borderRadius: 5,
	
  },
  button: {
	width: 'auto',
	paddingHorizontal: 15,
	padding: 10,
	backgroundColor: 'orange',
	borderRadius: 5,
	color: 'orange',
  },
  signUpText: {
    marginTop: 20,

  },
});

export default Index;