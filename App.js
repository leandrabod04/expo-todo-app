import React, { useState } from "react";
import { StyleSheet, SafeAreaView, FlatList, Text, View, TextInput, Button } from "react-native";
import { CheckBox } from "@rneui/themed";

export default function App() {
  const [tasks, setTasks] = useState([
    { key: "1", description: "Wash the dishes", completed: false },
    { key: "2", description: "Buy groceries", completed: false },
    { key: "3", description: "Study for test 1", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");

  const toggleTaskCompletion = (taskKey) => {
    setTasks(
      tasks.map((task) =>
        task.key === taskKey ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { key: String(tasks.length + 1), description: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleTaskCompletion(item.key)}
      />
      <Text style={[styles.taskText, item.completed && styles.completedTask]}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a new task here..."
          value={newTask}
          onChangeText={setNewTask}
        />
        <Button title="Add" onPress={addTask} />
      </View>

      <FlatList data={tasks} renderItem={renderItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  inputContainer: { flexDirection: "row", marginBottom: 10 },
  input: { flex: 1, borderBottomWidth: 1, marginRight: 10, padding: 5 },
  taskContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  taskText: { fontSize: 15 },
  completedTask: { textDecorationLine: "line-through", color: "gray" },
});
