<script setup>
import { onMounted, ref } from "vue";
import useCars from "@/composables/useCars.js";

import TableComponent from "@/components/TableComponent.vue";

const { getAllCars } = useCars();

const columns = [
  { name: "brand", label: "Марка" },
  { name: "model", label: "Модель" },
  { name: "price", label: "Стоимость" },
  { name: "Shop.name", label: "Магазин" },
  { name: "Shop.number", label: "Телефон" },
];

const data = ref([]);

onMounted(async () => {
  // Получаем данные с сервера
  data.value = await getAllCars();
});
</script>

<template>
  <h1>Таблица с данными об автомобилях</h1>
  <br />
  <br />
  <TableComponent :columns="columns" :data="data" />
</template>

<style scoped>
.table {
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
  background-color: #f2f2f2;
}
</style>
