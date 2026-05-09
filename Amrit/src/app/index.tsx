import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.homeLogo}>
          <Ionicons name="home" size={45} color="#85CC17" />
        </View>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Sign in</Text>
            <Text style={styles.subtitle}>Experience the joy of telecare AI.</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputContainer}>
                  <Ionicons name="mail-unread-outline" size={22} color="black" style={styles.inputIcon} />
                <TextInput
                  placeholder="Enter your email address"
                  placeholderTextColor="#52575f"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="emailAddress"
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed" size={22} color="black" style={styles.inputIcon} />
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor="#515459"
                  secureTextEntry
                  textContentType="password"
                  style={styles.input}
                />
              </View>
            </View>

            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>
            </Pressable>

            <View style={styles.socialRow}>
              <Pressable style={styles.socialButton}>
                <FontAwesome6 name="facebook-f" size={22} color="#010101" />
              </Pressable>
              <Pressable style={styles.socialButton}>
                <FontAwesome6 name="google" size={22} color="#010101" />
              </Pressable>
              <Pressable style={styles.socialButton}>
                <FontAwesome6 name="instagram" size={22} color="#010101" />
              </Pressable>
            </View>
            
            <Text style={styles.accountText}>
              Do you have an account ?{" "}
              <Text style={styles.linkText}>Signup</Text>
            </Text>
            <Text style={styles.forgotPasswordText}>Forget your password?</Text>
          
          </View>
        </View>
        
      </KeyboardAvoidingView>
    </SafeAreaView>
  

);
  
  
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#dbe3eb",
  },
  
  keyboardView: {
    flex: 1,
  },
  homeLogo: {
    alignItems: "center",
    marginTop: 18,
  },
  container: {
    flex: 1,
    padding: 24,
  },
   
  header: {
    alignItems: "center",
    marginTop: -10,
    marginBottom: 72,
  },
  title: {
    color: "#111827",
    fontSize: 34,
    fontWeight: "800",
    textAlign: "center",
  },
  subtitle: {
    color: "#6B7280",
    fontSize: 16,
    lineHeight: 22,
    marginTop: 8,
    textAlign: "center",
  },
  
  form: {
    top:-10,
    gap: 18,
  },
  field: {
    gap: 8,
  },
  label: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "700",
  },
  inputContainer: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#111827",
    borderRadius: 8,
    borderWidth: 1.5,
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 14,
  },
  inputIcon: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "900",
  },
  input: {
    flex: 1,
    color: "#111827",
    fontSize: 16,
    paddingVertical: 14,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#87df28",
    borderRadius: 8,
    marginTop: 8,
    paddingVertical: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  socialRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 18,
    justifyContent: "center",
    marginTop: 8,
  },
  socialButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#111827",
    borderRadius: 8,
    borderWidth: 1.5,
    height: 52,
    justifyContent: "center",
    width: 52,
  },
  accountText: {
    color: "#374151",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 30,
    textAlign: "center",
  },
  forgotPasswordText: {
    color: "#87df28",
    fontSize: 15,
    fontWeight: "600",
    marginTop: -8,
    textAlign: "center",
  },
  linkText: {
    color: "#87df28",
  },
});
