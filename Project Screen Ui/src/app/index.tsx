import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";

type Note = {
  id: string;
  title: string;
  content: string;
  date: string;
};

const initialNotes: Note[] = [
  {
    id: "1",
    title: "Meeting Notes",
    content:
      "Discuss project milestones, UI improvements, and deployment timeline.",
    date: "May 10, 2026",
  },
  {
    id: "2",
    title: "Shopping List",
    content: "Milk, Bread, Eggs, Coffee, and Fruits for the week.",
    date: "May 08, 2026",
  },
  {
    id: "3",
    title: "React Native Ideas",
    content:
      "Build a productivity app with offline sync and dark mode support.",
    date: "May 05, 2026",
  },
];

export default function NotesApp() {
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [notes, setNotes] = useState(initialNotes);

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] =
    useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [savedMessage, setSavedMessage] = useState("");

  const [deleteMenuNoteId, setDeleteMenuNoteId] =
    useState<string | null>(null);

  // RESPONSIVE SCREEN SIZE
  const { width, height } = useWindowDimensions();

  // DEVICE CHECKS
  const isTablet = width >= 768;
  const isLandscape = width > height;

  // SCREEN ORIENTATION
  const lockLandscape = async () => {
    if (isTablet) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    }
  };

  const lockPortrait = async () => {
    if (!isTablet) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    }
  };

  // AUTO ORIENTATION
  useEffect(() => {
    if (isTablet) {
      lockLandscape();
    } else {
      lockPortrait();
    }
  }, [width]);

  // RESPONSIVE VALUES
  const numColumns = isTablet ? 2 : 1;

  const horizontalPadding = isTablet ? 35 : 20;

  const cardWidth = isTablet
    ? isLandscape
      ? "48%"
      : "47%"
    : "100%";

  const headerHeight = isTablet ? 300 : 220;

  const titleSize = isTablet ? 55 : 40;

  const cardPadding = isTablet ? 24 : 18;

  const searchHeight = isTablet ? 65 : 55;

  const buttonSize = isTablet ? 75 : 56;

  // CLEAR EDITOR
  const clearEditor = () => {
    setEditingNoteId(null);
    setTitle("");
    setContent("");
  };

  // SEARCH FILTER
  const filteredNotes = useMemo(
    () =>
      notes.filter((note) => {
        const searchLower = search.toLowerCase();

        return (
          note.title.toLowerCase().includes(searchLower) ||
          note.content.toLowerCase().includes(searchLower)
        );
      }),
    [notes, search]
  );

  // CREATE NOTE
  const handleCreateNote = () => {
    clearEditor();
    setSavedMessage("");
    setDeleteMenuNoteId(null);
    setIsEditorOpen(true);
  };

  // EDIT NOTE
  const handleEditNote = (note: Note) => {
    setEditingNoteId(note.id);
    setTitle(note.title);
    setContent(note.content);

    setSavedMessage("");
    setDeleteMenuNoteId(null);

    setIsEditorOpen(true);
  };

  // WEB CONTEXT MENU
  const getContextMenuProps = (noteId: string) =>
    Platform.OS === "web"
      ? {
          onContextMenu: (event: {
            preventDefault: () => void;
            stopPropagation: () => void;
          }) => {
            event.preventDefault();
            event.stopPropagation();
            setDeleteMenuNoteId(noteId);
          },
        }
      : {};

  // DELETE NOTE
  const handleDeleteNote = (noteId: string) => {
    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== noteId)
    );

    setDeleteMenuNoteId(null);

    setSavedMessage("Note deleted.");
  };

  // BACK BUTTON
  const handleBack = () => {
    clearEditor();
    setIsEditorOpen(false);
  };

  // SAVE NOTE
  const handleSave = () => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      Alert.alert(
        "Missing Note",
        "Please enter both title and content."
      );
      return;
    }

    const savedNote = {
      id: editingNoteId ?? Date.now().toString(),
      title: trimmedTitle,
      content: trimmedContent,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    setNotes((currentNotes) =>
      editingNoteId
        ? currentNotes.map((note) =>
            note.id === editingNoteId ? savedNote : note
          )
        : [savedNote, ...currentNotes]
    );

    setSavedMessage(
      editingNoteId ? "Note updated." : "Saved."
    );

    clearEditor();
    setIsEditorOpen(false);
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          backgroundColor: darkMode ? "#121212" : "#F5F7FB",
        },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={!isEditorOpen && styles.homeScrollContent}
      >
        {/* HEADER */}
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
          }}
          style={[
            styles.header,
            {
              height: headerHeight,
            },
          ]}
          imageStyle={styles.headerImage}
        >
          <View style={styles.overlay}>
            <Text
              style={[
                styles.headerTitle,
                {
                  fontSize: titleSize,
                },
              ]}
            >
              My Notes
            </Text>

            {/* THEME SWITCH */}
            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>
                <Ionicons
                  name={darkMode ? "moon" : "sunny"}
                  size={18}
                  color={darkMode ? "black" : "white"}
                />
              </Text>

              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
              />
            </View>
          </View>
        </ImageBackground>

        {isEditorOpen ? (
          <View
            style={[
              styles.editorContainer,
              {
                paddingHorizontal: horizontalPadding,
              },
            ]}
          >
            {/* EDITOR HEADING */}
            <Text
              style={[
                styles.editorHeading,
                {
                  color: darkMode ? "#fff" : "#111",
                  fontSize: isTablet ? 38 : 28,
                },
              ]}
            >
              {editingNoteId ? "Edit Note" : "Create Note"}
            </Text>

            {/* SAVE BUTTON */}
            <View style={styles.saveButtonRow}>
              <Pressable
                style={styles.saveButton}
                onPress={handleSave}
              >
                <Text style={styles.buttonText}>Save</Text>
              </Pressable>
            </View>

            {/* TITLE INPUT */}
            <TextInput
              placeholder="Enter note title..."
              placeholderTextColor="#777"
              value={title}
              onChangeText={setTitle}
              style={[
                styles.titleInput,
                {
                  backgroundColor: darkMode
                    ? "#1E1E1E"
                    : "#fff",

                  color: darkMode ? "#fff" : "#111",

                  fontSize: isTablet ? 24 : 20,
                },
              ]}
            />

            {/* CONTENT INPUT */}
            <TextInput
              placeholder="Start writing here..."
              placeholderTextColor="#777"
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
              style={[
                styles.contentInput,
                {
                  backgroundColor: darkMode
                    ? "#1E1E1E"
                    : "#fff",

                  color: darkMode ? "#fff" : "#111",

                  minHeight: isTablet ? 500 : 300,

                  fontSize: isTablet ? 20 : 16,
                },
              ]}
            />
          </View>
        ) : (
          <>
            {/* SAVED MESSAGE */}
            {savedMessage ? (
              <Text style={styles.savedMessage}>
                {savedMessage}
              </Text>
            ) : null}

            {/* SEARCH BAR */}
            <View
              style={[
                styles.searchContainer,
                {
                  backgroundColor: darkMode
                    ? "#1E1E1E"
                    : "#fff",

                  marginHorizontal: horizontalPadding,

                  height: searchHeight,
                },
              ]}
            >
              <Ionicons
                name="search-outline"
                size={25}
                color={darkMode ? "#aaa" : "#191717d5"}
                style={styles.searchIcon}
              />

              <TextInput
                placeholder="Search notes..."
                placeholderTextColor={
                  darkMode ? "#aaa" : "#666"
                }
                value={search}
                onChangeText={setSearch}
                style={[
                  styles.searchInput,
                  {
                    backgroundColor: darkMode
                      ? "#1E1E1E"
                      : "#fff",

                    color: darkMode ? "#fff" : "#111",

                    fontSize: isTablet ? 20 : 16,
                  },
                ]}
              />
            </View>

            {/* NOTES LIST */}
            <FlatList
              data={filteredNotes}
              key={numColumns}
              numColumns={numColumns}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              columnWrapperStyle={
                isTablet
                  ? {
                      justifyContent: "space-between",
                    }
                  : undefined
              }
              contentContainerStyle={{
                paddingHorizontal: horizontalPadding,
                paddingBottom: 1,
              }}
              renderItem={({ item }) => (
                <Pressable
                  {...getContextMenuProps(item.id)}
                  onPress={() => handleEditNote(item)}
                  onLongPress={() =>
                    setDeleteMenuNoteId(item.id)
                  }
                  style={[
                    styles.card,
                    {
                      backgroundColor: darkMode
                        ? "#1E1E1E"
                        : "#ffffff",

                      width: cardWidth,

                      padding: cardPadding,
                    },
                  ]}
                >
                  {/* NOTE TITLE */}
                  <Text
                    style={[
                      styles.noteTitle,
                      {
                        color: darkMode ? "#fff" : "#111",

                        fontSize: isTablet ? 24 : 20,
                      },
                    ]}
                  >
                    {item.title}
                  </Text>

                  {/* NOTE CONTENT */}
                  <Text
                    numberOfLines={10}
                    style={[
                      styles.noteContent,
                      {
                        color: darkMode ? "#ccc" : "#555",

                        fontSize: isTablet ? 18 : 15,

                        lineHeight: isTablet ? 30 : 22,
                      },
                    ]}
                  >
                    {item.content}
                  </Text>

                  {/* NOTE DATE */}
                  <Text style={styles.noteDate}>
                    {item.date}
                  </Text>

                  {/* DELETE MENU */}
                  {deleteMenuNoteId === item.id ? (
                    <View style={styles.deleteMenu}>
                      <Pressable
                        style={styles.deleteButton}
                        onPress={() =>
                          handleDeleteNote(item.id)
                        }
                      >
                        <Text style={styles.deleteButtonText}>
                          Delete
                        </Text>
                      </Pressable>
                    </View>
                  ) : null}
                </Pressable>
              )}
            />
          </>
        )}
      </ScrollView>

      {/* BACK BUTTON */}
      {isEditorOpen ? (
        <Pressable
          accessibilityLabel="Go back"
          style={styles.backArrowButton}
          onPress={handleBack}
        >
          <Ionicons
            name="arrow-back-outline"
            size={30}
            color="white"
          />
        </Pressable>
      ) : null}

      {/* PLUS BUTTON */}
      {!isEditorOpen ? (
        <Pressable
          accessibilityLabel="Create note"
          style={[
            styles.plusButton,
            {
              width: buttonSize,
              height: buttonSize,
              borderRadius: buttonSize / 2,
            },
          ]}
          onPress={handleCreateNote}
        >
          <Text style={styles.plusButtonText}>+</Text>
        </Pressable>
      ) : null}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    justifyContent: "flex-end",
  },

  headerImage: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    flex: 1,
    justifyContent: "flex-end",
    padding: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerTitle: {
    fontWeight: "700",
    color: "#fff",
  },

  switchContainer: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
    borderRadius: 999,
    flexDirection: "row",
    paddingHorizontal: 8,
    position: "absolute",
    right: 10,
    top: 35,
  },

  switchText: {
    marginRight: 6,
  },

  savedMessage: {
    color: "#22a316",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 18,
    textAlign: "center",
  },

  homeScrollContent: {
    paddingBottom: 96,
  },

  plusButton: {
    alignItems: "center",
    backgroundColor: "#4A90E2",
    bottom: 50,
    elevation: 20,
    justifyContent: "center",
    position: "absolute",
    right: 30,
    zIndex: 10,
  },

  plusButtonText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "600",
    lineHeight: 38,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 16,
    paddingHorizontal: 15,
    elevation: 10,
  },

  searchIcon: {
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
  },

  card: {
    borderRadius: 18,
    marginTop: 18,
    elevation: 20,
  },

  noteTitle: {
    fontWeight: "700",
    marginBottom: 8,
  },

  noteContent: {
    marginBottom: 12,
  },

  noteDate: {
    fontSize: 13,
    color: "#888",
    fontWeight: "500",
  },

  deleteMenu: {
    alignItems: "flex-end",
    marginTop: 14,
  },

  deleteButton: {
    backgroundColor: "#331616",
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },

  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  editorContainer: {
    paddingTop: 35,
    paddingBottom: 50,
  },

  editorHeading: {
    fontWeight: "700",
    marginBottom: 20,
  },

  saveButtonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 40,
    marginTop: -60,
  },

  saveButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 14,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  backArrowButton: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: 15,
    height: 40,
    justifyContent: "center",
    left: 18,
    position: "absolute",
    top: 35,
    width: 50,
    zIndex: 20,
  },

  titleInput: {
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontWeight: "600",
    elevation: 2,
    marginBottom: 18,
  },

  contentInput: {
    borderRadius: 18,
    padding: 18,
    lineHeight: 26,
    elevation: 2,
  },
});