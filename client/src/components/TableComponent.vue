<script setup>
import EmptyComponent from "@/components/EmptyComponent.vue";

import { ref, onMounted, onUnmounted } from "vue";
const props = defineProps({
  columns: Array,
  data: Array,
});

// Логика изменения ширины столбцов таблицы
const thRef = ref(null);
const startOffset = ref(0);

// Вызываем при клике на край столбца
const onMouseDown = (event, th) => {
  thRef.value = th;
  // Определяем точку отсчета изменения ширины
  startOffset.value = th.offsetWidth - event.pageX;
};
// Вызываем при движении мыши с захватом заголовка
const onMouseMove = (event) => {
  // Если захвачен край заголовка колонки
  if (thRef.value) {
    // Изменяем его ширину относительно положения мыши
    thRef.value.style.width = `${startOffset.value + event.pageX}px`;
  }
};

const onMouseUp = () => {
  thRef.value = null;
};

onMounted(() => {
  const table = document.querySelector("table");
  table.querySelectorAll("th").forEach((th, i) => {
    if (i < props.columns.length - 1) {
      //  Создаем элемент для захвата на каждом заголовке
      const grip = document.createElement("div");
      grip.className = "grip";
      grip.textContent = "";
      grip.style.cssText = `
      top: 0;
      right: 0;
      bottom: 0;
      width: 5px;
      position: absolute;
      cursor: col-resize;
      `;
      // Вешаем обработчики на все элементы
      grip.addEventListener("mousedown", (e) => onMouseDown(e, th));
      // Добавляем к каждому заголовку
      th.appendChild(grip);
    }
  });
  // Вешаем события на document
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});
</script>

<template>
  <EmptyComponent v-if="!data.length" />

  <div class="table-wrapper">
    <table ref="table" class="table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.name">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td v-for="column in columns" :key="column.name">
            {{ item[column.name] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrapper {
  overflow-x: scroll;

  width: 100%;
  height: auto;
  padding: 10px;
  border-radius: 5px;
  background: #f5f3f3;
}

.table-wrapper::-webkit-scrollbar {
  display: none;
}
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #ccc;
  padding: 5px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: 30px;
  min-width: 20px;
}

.table th {
  position: relative;
  background-color: #f2f2f2;
}
table th:last-child {
  cursor: auto;
}
</style>
