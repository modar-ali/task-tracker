<template>
  <button class="add-task-btn" v-if="tasks == ''" @click="addNewTask">
    Add Task
  </button>
  <div class="tasks">
    <Task
      @delete="handleDelete(index)"
      v-for="(task, index) of tasks"
      :key="task.name"
      :task="task"
      :tasks="tasks"
    />
  </div>
</template>

<script setup>
import Task from "@/components/Task.vue";
import { useRouter } from "vue-router";

const props = defineProps({
  tasks: Array,
});
const router = useRouter();

const handleDelete = (index) => {
  props.tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(props.tasks));
};
const addNewTask = () => {
  router.push({ name: "add" });
};
</script>

<style scoped>
.tasks {
  display: grid;
  gap: 1.25rem;
}

.add-task-btn {
  cursor: pointer;
  width: 150px;
  font-weight: bold;
  color: #fff;
  padding-block: 0.5rem;
  border: none;
  border-radius: 1.25rem;
  background-color: var(--clr-primary);
  box-shadow: 0 0 20px 2px hsla(var(--clr-primary-p), 0.3);
  transition: 0.3s;
}

.add-task-btn:hover {
  box-shadow: 0 0 30px 10px hsla(var(--clr-primary-p), 0.3);
}
</style>
