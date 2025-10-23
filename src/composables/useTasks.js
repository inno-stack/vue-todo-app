import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabase";

export function useTasks() {
  const tasks = ref([]);
  const loading = ref(false);
  const error = ref("");

  // ✅ Fetch all tasks for the logged-in user
  const fetchTasks = async () => {
    loading.value = true;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error: err } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (err) error.value = err.message;
    else tasks.value = data;

    loading.value = false;
  };

  // ➕ Add task
  const addTask = async (title) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error: err } = await supabase
      .from("tasks")
      .insert([{ title, user_id: user.id, completed: false }]);
    if (err) error.value = err.message;
    await fetchTasks();
  };

  // ✅ Toggle task completion
  const toggleTask = async (task) => {
    const { error: err } = await supabase
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", task.id);
    if (err) error.value = err.message;
    await fetchTasks();
  };

  // ❌ Delete task
  const deleteTask = async (id) => {
    const { error: err } = await supabase.from("tasks").delete().eq("id", id);
    if (err) error.value = err.message;
    await fetchTasks();
  };

  onMounted(fetchTasks);

  return { tasks, loading, error, addTask, toggleTask, deleteTask, fetchTasks };
}
