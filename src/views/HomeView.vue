<template>
  <div class="home">
    <div class="wrapper">
      <div class="cols">
        <column v-for="item in columns" :columnId="item.id" :key="item.id" />
        <button class="btn btn-add_column" @click="createColumn">
          + Add column
        </button>
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
  methods: {
    async createColumn() {
      await this.$store.dispatch("createColumn");
    },
  },
  computed: {
    ...mapGetters(["columns"]),
  },
  components: { column },
};
</script>

<style lang="scss" scoped>
@import "@/assets/vars.scss";

.home {
  width: 100%;
  min-width: 100vw;
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
  height: 95vh;
  width: 100%;
}

.cols {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
</style>
