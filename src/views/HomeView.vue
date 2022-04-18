<template>
  <div class="home">
    <nav class="navigation">
      <h2>Awesome kanban</h2>
    </nav>
    <div class="wrapper">
      <div class="cols">
        <column v-for="item in getColumns" :columnId="item.id" :key="item.id" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import column from "@/components/Column.vue";

export default {
  name: "HomeView",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getColumns"]),
  },
  components: { column },
};
</script>

<style lang="scss" scoped>
.navigation {
  background-color: rgb(13, 50, 152);
  padding: 15px 0;
  display: flex;

  & h2 {
    margin: 0 auto;
    color: white;
  }
}

.main {
  background: linear-gradient(#c935e0, #636ce3);
  display: flex;
}
</style>
