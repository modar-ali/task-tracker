<template>
  <form @submit.prevent="editTask">
    <div class="field name">
      <label>Task name :</label>
      <input type="text" v-model.trem="task.name" autofocus />
    </div>
    <div class="field desc">
      <label>Task description :</label>
      <textarea v-model.trem="task.description" />
    </div>
    <div class="task-btn">
      <button>edit task</button>
    </div>
  </form>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps(["id", "tasks"]);
const router = useRouter();
const route = useRoute();
const emit = defineEmits(["edit"]);

const task = ref({});

onMounted(() => {
  for (let taskObj of props.tasks) {
    if (taskObj.id == route.params.id) {
      task.value = taskObj;
    }
  }
});

const editTask = () => {
  if (task.value.name && task.value.description) {
    localStorage.setItem("tasks", JSON.stringify(props.tasks));
    router.push({ name: "tasks" });
  }
};
</script>

<style scoped></style>
