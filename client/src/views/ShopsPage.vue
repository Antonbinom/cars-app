<script setup>
import { onMounted, reactive, ref } from "vue";
import FormComponent from "@/components/FormComponent.vue";
import TableComponent from "@/components/TableComponent.vue";
import useShops from "@/composables/useShops";

const { createShop, getAllShops } = useShops();

const shops = ref([]);

const inputs = reactive([
  {
    name: "name",
    value: "",
    placeholder: "Название магазина",
  },
  {
    name: "number",
    value: "",
    placeholder: "Телефон",
  },
]);

const columns = [
  { name: "name", label: "Магазин" },
  { name: "number", label: "Телефон" },
];

//Функция вызывается при событии on-save
const onSave = async () => {
  // Формируем объект со значениями
  const shopData = {
    name: inputs[0].value,
    number: inputs[1].value,
  };
  // Функция composable создающая запрос на сервер
  await createShop(shopData);
  // обновляем данные запрашивая их с сервера
  shops.value = await getAllShops();

  // сбрасываем поля в форме
  inputs[0].value = "";
  inputs[1].value = "";
};

onMounted(async () => {
  // Получаем данные с сервера
  shops.value = await getAllShops();
});
</script>

<template>
  <h1>Магазины</h1>
  <br />
  <br />
  <br />
  <FormComponent title="Добавить магазин" :on-save="onSave">
    <input
      v-for="input in inputs"
      :key="input.name"
      class="input"
      type="text"
      id="name"
      v-model="input.value"
      :placeholder="input.placeholder"
    />
  </FormComponent>
  <br />
  <TableComponent :columns="columns" :data="shops" />
</template>
