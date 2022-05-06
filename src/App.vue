<template>
  <nav class="navigation">
    <h2>Awesome kanban</h2>
    <button v-if="checkUser" class="btn" @click="logoutUser">Выход</button>
  </nav>
  <router-view />
</template>

<script>
export default {
  methods: {
    logoutUser() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/login");
    },
  },
  computed: {
    checkUser() {
      return this.$store.getters.checkUser;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/vars.scss";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: $white;
  @include font-default(24, 16);
}

.navigation {
  background-color: $gray;
  padding: 15px 0;
  display: flex;

  & h2 {
    margin: auto auto;
    color: white;
  }
}

.btn {
  @include font-default(18, 14);
  cursor: pointer;
  border-radius: 8px;
  border: none;
  background-color: $blue;
  margin: 15px;
  padding: 15px;
  transition: 0.3s linear;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px 2px $blue;
  }
}
</style>
