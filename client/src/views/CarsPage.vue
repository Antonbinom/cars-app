<script setup>
import { ref, reactive, onMounted, watchEffect } from "vue";
import useCars from "@/composables/useCars.js";
import useShops from "@/composables/useShops";
import FormComponent from "@/components/FormComponent.vue";
import TableComponent from "@/components/TableComponent.vue";
import EmptyComponent from "@/components/EmptyComponent.vue";

const { createCar, getAllCars } = useCars();
const { getAllShops } = useShops();

const inputs = reactive([
  {
    name: "brand",
    value: "",
    placeholder: "Марка",
    isValid: false,
  },
  {
    name: "model",
    value: "",
    placeholder: "Модель",
    isValid: false,
  },
  {
    name: "price",
    value: "",
    placeholder: "Цена",
    isValid: false,
  },
]);

const cars = ref([]);
const shops = ref([]);
const columns = [
  { name: "brand", label: "Марка" },
  { name: "model", label: "Модель" },
];
const selectedShop = ref("");
const isFormValid = ref(false);

// Валидируем форму
watchEffect(() => {
  // следим за полями формы и селектом
  inputs.forEach((input) => {
    // не даем ввести символы кроме цифр
    if (input.name === "price") {
      input.value = input.value.replace(/[^0-9]/g, "");
    }
    // проверка на пустоту
    input.isValid = !!input.value.length;
  });
  // если поля пусты или селект не выбран запрещаем отправку формы
  isFormValid.value =
    inputs.every((input) => input.isValid) && !!selectedShop.value;
});

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
  onCleanInputs();
};

// Чистим все инпуты и селект
const onCleanInputs = () => {
  inputs.forEach((input) => {
    input.value = "";
  });
  selectedShop.value = "";
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
  <FormComponent
    title="Добавить автомобиль"
    :on-save="onSave"
    :clean-inputs="onCleanInputs"
    :isFormValid="isFormValid"
  >
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
  <TableComponent v-if="cars.length" :columns="columns" :data="cars" />
  <EmptyComponent v-if="!cars.length" />
</template>

<style scoped></style>
