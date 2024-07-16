<template>
  <header class="header">
    <div class="container">
      <div class="header-wrapper">
        <router-link to="/"
          ><img
            alt="Vue logo"
            class="logo"
            src="@/assets/logo.svg"
            width="50"
            height="50"
        /></router-link>

        <nav class="nav">
          <ul class="nav-list">
            <li class="nav-list__item">
              <router-link to="/shops">Магазины</router-link>
            </li>
            <li class="nav-list__item">
              <router-link to="/cars">Автомобили</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: #e8e8e8;
  margin-bottom: 30px;
}
.header-wrapper {
  display: flex;
  align-items: center;
  padding-block: 15px;
}

.nav {
  margin-left: 30px;
}
.nav-list {
  display: flex;
  gap: 20px;
}
.nav-list__item {
  font-size: 21px;
}
</style>
