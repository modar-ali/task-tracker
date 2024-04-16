<template>
  <form @submit.prevent="addTask">
    <div class="field name">
      <label>Task name :</label>
      <input type="text" v-model.trem="task.name" autofocus />
    </div>
    <div class="field desc">
      <label>Task description :</label>
      <textarea v-model.trem="task.description" />
    </div>
    <div class="task-btn">
      <button>add task</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const task = ref({
  id: Date.now(),
  name: "",
  description: "",
  completed: false,
});

const router = useRouter();

const emit = defineEmits(["add"]);

const addTask = () => {
  if (task.value.name && task.value.description) {
    emit("add", task.value);
    router.push({ name: "tasks" });
  }
};
</script>

<style scoped></style>