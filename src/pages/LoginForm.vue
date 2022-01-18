<template>
  <div class="container">
    <div class="form_content">
      <form action="" @submit.prevent="sendForm">
        <h1 class="form-title">Вход</h1>
        <div class="form_fields">
          <div class="form_field">
            <input
              type="text"
              placeholder="Login"
              :class="{ error_input: error.login }"
              v-model="login"
            />
          </div>
          <div class="form_field">
            <input
              type="password"
              placeholder="Password"
              :class="{ error_input: error.password }"
              v-model="password"
            />
          </div>
        </div>
        <div class="error" v-if="error.text">{{ error.text }}</div>
        <div class="form_buttons">
          <button type="submit" class="button">Войти</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { postRequest } from "@/plugins/requests";

export default {
  data() {
    return {
      login: "",
      password: "",
      error: {
        login: false,
        password: false,
        text: "",
      },
    };
  },
  methods: {
    async sendForm() {
      if (this.login.length > 0) {
        if (this.password.length > 0) {
          const { data } = await postRequest("/auth", {
            login: this.login,
            password: this.password,
          });
          if (data.success) {
            localStorage.setItem("token", data.token);
            this.$router.push("/admin");
          } else {
            this.error.text = data.error;
          }
        } else this.error.password = true;
      } else this.error.login = true;
    },
  },
  watch: {
    login() {
      this.error.login = false;
      this.error.text = "";
    },
    password() {
      this.error.password = false;
      this.error.text = "";
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 415px;
  margin: 250px auto;
}

input {
  height: 45px;
  width: 100%;
  font-size: 14px;
  line-height: 16px;
  border: 2px solid #e9f2ff;
  border-radius: 5px;
  padding-left: 25px;
  outline: none;
}

.error_input {
  border: 2px solid #dc3545;
}

.form-title {
  color: #30507d;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  margin-bottom: 30px;
}

.form_content {
  background: #fff;
  box-shadow: 0px 6px 50px rgba(196, 196, 255, 0.25);
  border-radius: 20px;
  max-width: 415px;
  padding: 38px 30px;
}

.form_field {
  margin-bottom: 13px;
}

.button {
  display: block;
  background: #0f8b7f;
  border-radius: 5px;
  height: 45px;
  text-transform: uppercase;
  color: #fff;
  text-align: center;
  width: 100%;
  line-height: 45px;
  outline: none;
  border: none;
  cursor: pointer;
}

.button:hober {
  background-color: #0d6cf2;
}

.error {
  margin-bottom: 10px;
  color: #dc3545;
  text-align: center;
}
</style>
