<template>
  <div class="container_error">
    <h1 class="text">404</h1>
    <h2 class="text">Страница не найдена</h2>
    <router-link to="/" class="link">Вернуться на гланую</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style>
.container_error {
  max-width: 500px;
  margin: 250px auto;
  text-align: center;
  border: 3px solid #09413b;
  padding: 40px;
}
.text {
  padding-bottom: 10px;
}
.link {
  text-decoration: none;
  font-size: 20px;
}
</style>
