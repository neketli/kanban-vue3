<template>
  <ul
    @drop="onDrop($event, this.columnId)"
    @dragenter.prevent
    @dragover.prevent
    class="column"
  >
    <span>{{ getColumnTitle }}</span>
    <columnItem
      v-for="item in getColumnItems"
      :item="item"
      :key="item.id"
    ></columnItem>
  </ul>
</template>

<script>
import columnItem from "@/components/ColumnItem";

export default {
  name: "Column",
  props: ["columnId"],
  computed: {
    getColumnItems() {
      return this.$store.state.items.filter(
        (el) => el.columnId === this.columnId
      );
    },
    getColumnTitle() {
      return this.$store.state.columns.find((el) => el.id === this.columnId)
        .title;
    },
  },
  methods: {
    onDrop(event, column) {
      const itemId = event.dataTransfer.getData("itemId");
      const item = this.$store.state.items.find((el) => el.id == itemId);
      item.columnId = column;
    },
  },
  components: {
    columnItem,
  },
};
</script>

<style lang="scss" scoped>
.column {
  list-style: none;
  margin: 15px;
  padding: 15px;
  background: rgba($color: #333, $alpha: 0.3);
  max-width: 30%;
  min-height: 2rem;
  display: inline-block;
}
</style>
