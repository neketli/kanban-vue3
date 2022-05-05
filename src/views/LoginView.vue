<template>
  <div class="loginView">
    <div class="wrapper">
      <!-- login -->
      <section class="login">
        <div class="login__inner">
          <h1>А вы кто?</h1>
          <form class="login__form">
            <div class="login__item">
              <input
                v-model="user.email"
                id="email"
                type="email"
                placeholder=" "
              />
              <label for="email">Электронная почта</label>
            </div>
            <div class="login__item">
              <input
                v-model="user.password"
                id="pass"
                type="password"
                placeholder=" "
              />
              <label for="pass">Пароль</label>
            </div>
          </form>
          <ul class="errors">
            <li v-show="error">Пользователь не найден!</li>
          </ul>

          <button v-if="!loading" class="btn" @click="loginUser">Войти</button>
          <button v-else class="btn">Загрузка</button>

          <router-link to="/register" class="login__register"
            >Зарегистрироваться</router-link
          >
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async loginUser() {
      try {
        await this.$store.dispatch("loginUser", this.user);
        this.$router.push("/");
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
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

.login {
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

  &__register {
    color: $primary-black;
    font-size: 1.5rem;
    font-weight: 200;
    text-decoration: none;

    &:visited {
      color: $primary-black;
    }
  }
  .errors {
    color: red;
    margin: 15px;
  }
}
</style>
