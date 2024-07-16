<script setup>
import { ref, reactive, onMounted } from "vue";
import useCars from "@/composables/useCars.js";
import useShops from "@/composables/useShops";
import FormComponent from "@/components/FormComponent.vue";
import TableComponent from "@/components/TableComponent.vue";

const { createCar, getAllCars } = useCars();
const { getAllShops } = useShops();

const inputs = reactive([
  {
    name: "brand",
    value: "",
    placeholder: "Марка",
  },
  {
    name: "model",
    value: "",
    placeholder: "Модель",
  },
  {
    name: "price",
    value: "",
    placeholder: "Цена",
  },
]);

const cars = ref([]);
const shops = ref([]);
const columns = [
  { name: "brand", label: "Марка" },
  { name: "model", label: "Модель" },
];
const selectedShop = ref("");

//Функция вызывается при событии on-save
const onSave = async () => {
  const carData = {
    // Формируем объект со значениями
    brand: inputs[0].value,
    model: inputs[1].value,
    price: inputs[2].value,
    // указываем id магазина
    shopId: selectedShop.value,
  };

  // Функция composable создающая запрос на сервер
  await createCar(carData);
  // обновляем данные запрашивая их с сервера
  cars.value = await getAllCars();

  // сбрасываем поля в форме
  inputs[0].value = "";
  inputs[1].value = "";
  inputs[2].value = "";
};

onMounted(async () => {
  // Получаем данные с сервера
  cars.value = await getAllCars();
  shops.value = await getAllShops();
});
</script>

<template>
  <h1>Автомобили</h1>
  <br />
  <br />
  <FormComponent title="Добавить автомобиль" :on-save="onSave">
    <input
      v-for="input in inputs"
      :key="input.name"
      class="input"
      type="text"
      id="name"
      v-model="input.value"
      :placeholder="input.placeholder"
    />

    <select v-model="selectedShop" class="select">
      <option class="option" disabled value="">Выберите магазин</option>
      <option
        v-for="shop in shops"
        :key="shop.id"
        :value="shop.id"
        class="option"
      >
        {{ shop.name }}
      </option>
    </select>
  </FormComponent>
  <br />
  <TableComponent :columns="columns" :data="cars" />
</template>

<style scoped></style>
