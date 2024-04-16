<template>
  <nav>
    <RouterLink :to="{ name: 'tasks' }">Tasks</RouterLink>
    <RouterLink :to="{ name: 'add' }">Add new project</RouterLink>
  </nav>

  <RouterView @add="handleAdd" :tasks="tasks" />
</template>

<script setup>
import { ref } from "vue";

const tasks = ref([]);

if (localStorage.getItem("tasks")) {
  tasks.value = JSON.parse(localStorage.getItem("tasks"));
}

const handleAdd = async (task) => {
  tasks.value.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};
</script>

<style scoped>
nav {
  display: flex;
  gap: 1.25rem;
}

nav a {
  text-decoration: none;
  color: var(--f-clr-60);
  font-weight: bold;
  padding-block: 0.625rem;
}

.router-link-active {
  color: var(--f-clr-100);
  border-bottom: 3px solid var(--clr-primary);
}
</style>
