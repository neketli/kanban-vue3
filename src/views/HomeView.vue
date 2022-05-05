<template>
  <div class="home">
    <div class="wrapper">
      <div class="cols">
        <column v-for="item in getColumns" :columnId="item.id" :key="item.id" />
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
    ...mapGetters(["getColumns"]),
  },
  components: { column },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  min-width: 100vw;
}

.wrapper {
  background: linear-gradient(#c935e0, #636ce3);
  display: flex;
  flex-wrap: wrap;
  height: 95vh;
  width: 100%;
}

.cols {
  display: flex;
  align-items: flex-start;
}

.btn {
  cursor: pointer;
  border-radius: 8px;
  border: none;
  background-color: #636ce3;
  margin: 15px;
  padding: 15px;
  transition: 0.3s linear;

  &:hover {
    transform: scale(1.1);
    text-shadow: 0 0 10px 2px rgb(0, 128, 255);
  }
}
</style>
