<template>
  <div class="registerView">
    <div class="wrapper">
      <!-- register -->
      <section class="register">
        <div class="register__inner">
          <h1>Давайте вас запишем...</h1>
          <form class="register__form">
            <div class="register__item">
              <input
                id="email"
                type="email"
                placeholder=" "
                v-model="newUser.email"
              />
              <label for="email">Электронная почта</label>
            </div>
            <div class="register__item">
              <input
                id="pass"
                type="password"
                placeholder=" "
                v-model="newUser.password"
              />
              <label for="pass">Пароль</label>
            </div>
          </form>
          <ul class="errors">
            <li v-show="!validation.email && newUser.email != ''">
              Пожалуйста, введите корректный email адрес!
            </li>
            <li v-show="!validation.password && newUser.password != ''">
              Пароль должен содержать не менее 5 символов!
            </li>
            <li v-show="error">
              Пользователь с таким email адресом уже существует!
            </li>
          </ul>

          <button v-if="!loading" class="btn" @click="registerUser">
            Зарегистрироваться
          </button>
          <button v-else class="btn">Загрузка...</button>
          <router-link to="/login" class="register__login">Войти</router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterView",
  data() {
    return {
      newUser: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async registerUser() {
      try {
        await this.$store.dispatch("registerUser", this.newUser);
        this.$router.push("/");
      } catch (error) {}
    },
  },
  computed: {
    validation() {
      const emailRE =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return {
        email: emailRE.test(this.newUser.email),
        password: this.newUser.password.trim().length > 5,
      };
    },
    isValid() {
      const validation = this.validation;
      return Object.keys(validation).every(function (key) {
        return validation[key];
      });
    },
    loading() {
      return this.$store.getters.loading;
    },
    error() {
      return this.$store.getters.error;
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-white: #e6f0f3;
$primary-black: #022231;
$primay-bluesky: #8ac5f0;
$primary-blue: #3398e0;

.register {
  width: 100vw;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &__inner {
    width: 60%;
    height: 88%;
    background-color: #e6f0f3;
    box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & h1 {
      font-size: 3rem;
      text-align: center;
      color: $primary-black;
    }
  }

  &__item {
    font-family: "Nunito";
    display: flex;
    flex-direction: column-reverse;
    width: 42vw;
    margin: 0 auto;
    text-align: center;
  }

  input {
    border: none;
    border-radius: 8px;
    font-size: 1.5rem;
    padding: 20px;
    margin-top: 30px;
    border-bottom: 0.1rem solid $primary-black;
    background-color: #d2d9db;
    outline: none;
    text-align: center;
  }

  label {
    text-align: center;
    font-size: 1.5rem;
    padding-left: 1rem;
    color: #9cacbf;
    transform: translateY(5rem);
    transform-origin: left top;
    cursor: text;
    transition: all 0.3s;
  }

  input:focus,
  input:not(:placeholder-shown) {
    transition: all 0.2s linear;
    border-bottom: 0.2rem solid $primay-bluesky;
    background-color: #ffffff;
  }

  input:focus ~ label,
  input:not(:placeholder-shown) ~ label {
    padding: 0;
    color: $primary-black;
    transform: translateY(1rem) scale(1);
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  &__login {
    color: $primary-black;
    font-size: 1.5rem;
    font-weight: 200;
    text-decoration: none;

    &:visited {
      color: $primary-black;
    }
  }
}

.errors {
  color: red;
  margin: 15px;
}
</style>
