<template>
  <div class="task" :class="{ 'border-color': task.completed }">
    <div class="showed-part">
      <div class="title">{{ task.name }}</div>
      <div class="icons">
        <div class="expand" @click="toggleShow">
          <svg
            viewBox="0 0 1024 1024"
            class="icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M917.333333 364.8L851.2 298.666667 512 637.866667 172.8 298.666667 106.666667 364.8 512 768z"
            />
          </svg>
        </div>
        <div class="edit" @click="editTask">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 21H21"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20.0651 7.39423L7.09967 20.4114C6.72438 20.7882 6.21446 21 5.68265 21H4.00383C3.44943 21 3 20.5466 3 19.9922V18.2987C3 17.7696 3.20962 17.2621 3.58297 16.8873L16.5517 3.86681C19.5632 1.34721 22.5747 4.87462 20.0651 7.39423Z"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.3097 5.30981L18.7274 8.72755"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="trash" @click="deleteTask">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.5001 6H3.5"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path d="M9.5 11L10 16" stroke-width="1.5" stroke-linecap="round" />
            <path
              d="M14.5 11L14 16"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
              stroke-width="1.5"
            />
          </svg>
        </div>
        <div @click="makeItComplete" :class="{ completed: task.completed }">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 14L9 19L20 8M6 8.88889L9.07692 12L16 5"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
    <p class="description" v-if="showDesc">{{ task.description }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const emit = defineEmits(["delete"]);
const router = useRouter();

const props = defineProps({
  task: Object,
  tasks: Array,
});
const showDesc = ref(false);

const toggleShow = () => {
  showDesc.value = !showDesc.value;
};
const deleteTask = () => {
  emit("delete");
};
const makeItComplete = () => {
  props.task.completed = !props.task.completed;
  localStorage.setItem("tasks", JSON.stringify(props.tasks));
};
const editTask = () => {
  router.push({ name: "editTask", params: { id: props.task.id } });
};
</script>

<style scoped>
.task {
  width: 500px;
  background-color: var(--clr-bg-light);
  border-left: 3px solid var(--clr-secondary);
  border-radius: 0 2rem 2rem 0;
}

@media(max-width: 767px) {
  .task {
    width: 350px;
  }
}

.showed-part {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
}

.title {
  color: #fff;
  font-weight: bold;
}

.icons {
  display: flex;
  gap: 0.5rem;
}

svg.icon {
  fill: #fff;
}

svg {
  cursor: pointer;
  width: 20px;
  height: 20px;
  stroke: #fff;
  transition: 0.3s;
}

svg:hover {
  stroke: var(--clr-primary);
}

.expand svg:hover {
  fill: var(--clr-primary);
}

.completed svg {
  stroke: var(--clr-primary);
}

.description {
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  padding: 1.25rem;
  border-top: 3px solid #fff;
}

.border-color {
  border-left-color: var(--clr-primary);
}
</style>
