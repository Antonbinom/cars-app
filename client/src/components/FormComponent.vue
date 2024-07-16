<script setup>
import { ref } from "vue";

const props = defineProps({
  title: { type: String, require: true },
  onSave: { type: Function, require: true },
  cleanInputs: { type: Function, require: true },
  isFormValid: { type: Boolean, require: true },
});

const open = ref(false);
function onSave() {
  // Вызываем родительскую пропс функцию
  props.onSave();
  // Закрываем модалку
  onClose();
}

function onClose() {
  props.cleanInputs();
  open.value = false;
}
</script>

<template>
  <button class="btn open" @click="open = true">
    {{ title }}
  </button>
  <Teleport to="body">
    <transition name="fade" appear>
      <div v-if="open" @click="onClose" class="modal-overlay"></div>
    </transition>
    <transition name="pop" appear>
      <div v-if="open" class="modal">
        <h3 class="modal-title">{{ title }}</h3>
        <form @submit.prevent="onSave">
          <slot />
          <div class="modal-footer">
            <div class="error-message" :class="!isFormValid ? 'visible' : ''">
              Заполните все поля
            </div>
            <button :disabled="!isFormValid" type="submit" class="btn save">
              Сохранить
            </button>
          </div>
        </form>
        <button type="button" class="close" @click="onClose">x</button>
      </div>
    </transition>
  </Teleport>
</template>

<style>
.modal-overlay {
  content: "";
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
  background: #2c3e50;
  opacity: 0.6;
  cursor: pointer;
}

.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;

  max-width: 300px;
  height: fit-content;
  margin: auto;
  padding: 30px;
  padding-bottom: 20px;

  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.modal-title {
  margin-bottom: 20px;
  font-size: 20px;
  text-align: center;
}

.btn {
  padding: 10px;
  background: #a9d684;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: ease all 0.3s;
}

.btn:hover {
  background: #a98c5c;
}
.open {
  margin-bottom: 20px;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  border: none;
  border-radius: 50%;
  background: transparent;
}

.save {
  width: 100%;
}
.save:disabled {
  background: #b7b7b7;
  cursor: not-allowed;
}

.input {
  width: 100%;
  padding: 8px;
  margin-bottom: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.input:focus {
  outline: none;
  border-color: #999;
}

.select {
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  appearance: none; /* Убрать стандартный вид select */
  background-repeat: no-repeat;
  background-position: right center;
  background-size: 16px;
  cursor: pointer;
}

.select:focus {
  outline: none;
  border-color: #999;
}

.option[disabled] {
  color: #aaa;
}

.option[selected] {
  background-color: #007bff; /* Синий цвет фона для выбранной option */
  color: #fff;
}

.error-message {
  margin-block: 10px;
  text-align: center;
  color: red;
  font-size: 14px;
  opacity: 0;
}
.error-message.visible {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}
</style>
