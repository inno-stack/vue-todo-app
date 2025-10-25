<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white flex flex-col overflow-x-hidden"
  >
    <!-- Header (fixed-ish at top visually) -->
    <header
      class="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 px-6 py-4 bg-white/6 backdrop-blur-md border-b border-white/6 shadow-lg z-10"
    >
      <h1
        class="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 text-center"
      >
        Task Manager
      </h1>
      <button
        @click="handleLogout"
        class="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md w-full sm:w-auto"
      >
        Logout
      </button>
    </header>

    <!-- Content area (fills remaining height; makes task-list scrollable) -->
    <div class="flex-1 overflow-hidden">
      <main class="h-full p-6 max-w-3xl mx-auto w-full flex flex-col gap-6">
        <h2 class="text-xl font-semibold">Welcome, {{ userEmail }}</h2>

        <!-- Add / form -->
        <div
          class="bg-white/8 p-4 sm:p-6 rounded-2xl shadow-md flex flex-col sm:flex-row gap-4"
        >
          <input
            v-model="newTask"
            type="text"
            placeholder="What needs to be done?"
            @keyup.enter="addTask"
            class="flex-1 p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 min-w-0"
          />
          <button
            @click="addTask"
            class="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg transition w-full sm:w-auto"
          >
            Add Task
          </button>
        </div>

        <!-- Scrollable task area: uses available height, prevents horizontal overflow -->
        <section
          class="bg-white/6 rounded-2xl shadow-md p-4 flex-1 overflow-y-auto max-h-[60vh] sm:max-h-[65vh] min-h-[120px] scrollbar-custom"
        >
          <div v-if="tasks.length" class="space-y-3">
            <div
              v-for="task in tasks"
              :key="task.id"
              class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white/5 p-3 rounded-lg hover:bg-white/8 transition min-w-0"
            >
              <div
                class="flex items-start sm:items-center gap-3 flex-1 min-w-0"
              >
                <input
                  type="checkbox"
                  v-model="task.completed"
                  @change="toggleTask(task)"
                  class="w-5 h-5 accent-indigo-500 flex-shrink-0 mt-1 sm:mt-0"
                />

                <!-- edit input -->
                <template v-if="editingTaskId === task.id">
                  <input
                    v-model="editedTitle"
                    type="text"
                    class="w-full bg-white/10 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 break-words min-w-0"
                  />
                </template>

                <!-- normal text: wrap, no horizontal overflow -->
                <template v-else>
                  <span
                    :class="{ 'line-through text-gray-400': task.completed }"
                    class="whitespace-normal break-words text-sm sm:text-base leading-snug"
                  >
                    {{ task.title }}
                  </span>
                </template>
              </div>

              <div class="flex gap-3 items-center flex-shrink-0">
                <button
                  v-if="editingTaskId === task.id"
                  @click="updateTask(task)"
                  class="text-green-400 hover:text-green-500 transition text-sm"
                >
                  Save
                </button>
                <button
                  v-if="editingTaskId === task.id"
                  @click="cancelEdit"
                  class="text-gray-400 hover:text-gray-500 transition text-sm"
                >
                  Cancel
                </button>

                <button
                  v-else
                  @click="startEdit(task)"
                  class="text-blue-400 hover:text-blue-500 transition text-sm"
                >
                  Edit
                </button>

                <button
                  @click="deleteTask(task.id)"
                  class="text-red-400 hover:text-red-500 transition text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

          <p v-else class="text-gray-400 text-center mt-8">
            No tasks yet. Add one above 👆
          </p>
        </section>
      </main>
    </div>

    <!-- Footer -->
    <footer
      class="text-center py-4 text-gray-400 text-xs sm:text-sm border-t border-white/10 bg-black/10"
    >
      © {{ new Date().getFullYear() }} Task Manager • Built by Innocent
      <span class="text-blue-300"> Vue + Supabase</span>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabase";
import { useRouter } from "vue-router";

const router = useRouter();
const userEmail = ref("");
const newTask = ref("");
const tasks = ref([]);

// Edit state
const editingTaskId = ref(null);
const editedTitle = ref("");

// Get current user & tasks
onMounted(async () => {
  const { data } = await supabase.auth.getUser();
  if (!data?.user) {
    router.push("/login");
    return;
  }
  userEmail.value = data.user.email;
  await fetchTasks();
});

const fetchTasks = async () => {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return;
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching tasks:", error);
    tasks.value = [];
  } else {
    tasks.value = data || [];
  }
};

const addTask = async () => {
  if (!newTask.value?.trim()) return;
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return;

  const { data, error } = await supabase
    .from("tasks")
    .insert([
      {
        title: newTask.value.trim(),
        completed: false,
        user_id: userData.user.id,
      },
    ])
    .select();

  if (error) {
    console.error("Error adding task:", error);
    return;
  }

  if (data && data.length) tasks.value.unshift(data[0]);
  newTask.value = "";
};

const toggleTask = async (task) => {
  const { error } = await supabase
    .from("tasks")
    .update({ completed: task.completed })
    .eq("id", task.id);
  if (error) console.error("Error toggling task:", error);
};

const startEdit = (task) => {
  editingTaskId.value = task.id;
  editedTitle.value = task.title;
};

const updateTask = async (task) => {
  if (!editedTitle.value?.trim()) return;
  const { error } = await supabase
    .from("tasks")
    .update({ title: editedTitle.value.trim() })
    .eq("id", task.id);
  if (error) {
    console.error("Error updating task:", error);
    return;
  }
  const idx = tasks.value.findIndex((t) => t.id === task.id);
  if (idx !== -1) tasks.value[idx].title = editedTitle.value.trim();
  editingTaskId.value = null;
  editedTitle.value = "";
};

const cancelEdit = () => {
  editingTaskId.value = null;
  editedTitle.value = "";
};

const deleteTask = async (id) => {
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) {
    console.error("Error deleting task:", error);
    return;
  }
  tasks.value = tasks.value.filter((t) => t.id !== id);
};

const handleLogout = async () => {
  await supabase.auth.signOut();
  router.push("/login");
};
</script>
