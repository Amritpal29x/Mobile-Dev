import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

const headerImage = require("../../../assets/images/tutorial-web.png");

export default function NoteEditorScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <ImageBackground source={headerImage} style={styles.headerBackground} imageStyle={styles.headerImage}>
            <View style={styles.headerOverlay}>
              <Pressable style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backButtonText}>Back</Text>
              </Pressable>
              <Text style={styles.headerTitle}>Edit Note</Text>
            </View>
          </ImageBackground>

          <View style={styles.contentArea}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              placeholder="Note title"
              placeholderTextColor="#94a3b8"
              style={styles.titleInput}
              value={title}
              onChangeText={setTitle}
            />

            <Text style={styles.label}>Note body</Text>
            <TextInput
              placeholder="Write your note here..."
              placeholderTextColor="#94a3b8"
              style={styles.bodyInput}
              multiline
              value={body}
              onChangeText={setBody}
              textAlignVertical="top"
            />

            <View style={styles.buttonRow}>
              <Pressable style={styles.actionButton} onPress={() => router.back()}>
                <Text style={styles.actionText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveText}>Save</Text>
              </Pressable>
            </View>
            {saved ? <Text style={styles.savedMessage}>Note saved successfully.</Text> : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#eef2ff",
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    paddingBottom: 32,
  },
  headerBackground: {
    height: 220,
    justifyContent: "flex-end",
  },
  headerImage: {
    resizeMode: "cover",
  },
  headerOverlay: {
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    paddingBottom: 20,
    paddingHorizontal: 22,
    paddingTop: 20,
  },
  backButton: {
    borderColor: "rgba(255,255,255,0.8)",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 18,
  },
  contentArea: {
    marginTop: -32,
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    minHeight: 420,
  },
  label: {
    color: "#334155",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 10,
  },
  titleInput: {
    backgroundColor: "#f8fafc",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 22,
  },
  bodyInput: {
    backgroundColor: "#f8fafc",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    color: "#0f172a",
    fontSize: 16,
    minHeight: 240,
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#e2e8f0",
    borderRadius: 16,
    justifyContent: "center",
    paddingVertical: 16,
  },
  actionText: {
    color: "#334155",
    fontSize: 15,
    fontWeight: "700",
  },
  saveButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#4338ca",
    borderRadius: 16,
    justifyContent: "center",
    paddingVertical: 16,
  },
  saveText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
  },
  savedMessage: {
    color: "#16a34a",
    marginTop: 18,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "700",
  },
});
