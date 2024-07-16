<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import FormComponent from "@/components/FormComponent.vue";
import TableComponent from "@/components/TableComponent.vue";
import EmptyComponent from "@/components/EmptyComponent.vue";
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

const isFormValid = ref(false);

// Валидируем форму
watch(inputs, () => {
  // следим за полями формы и селектом
  inputs.forEach((input) => {
    input.isValid = !!input.value.length;
  });
  // если поля пусты или селект не выбран запрещаем отправку формы
  isFormValid.value = inputs.every((input) => input.isValid);
});

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
  onCleanInputs();
};
// Чистим все инпуты
const onCleanInputs = () => {
  inputs.forEach((input) => {
    input.value = "";
  });
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
  <FormComponent
    title="Добавить магазин"
    :clean-inputs="onCleanInputs"
    :on-save="onSave"
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
  </FormComponent>
  <br />
  <TableComponent v-if="shops.length" :columns="columns" :data="shops" />
  <EmptyComponent v-if="!shops.length" />
</template>
