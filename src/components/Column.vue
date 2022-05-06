<template>
  <ul
    @drop="onDrop($event, this.columnId)"
    @dragenter.prevent
    @dragover.prevent
    class="column"
  >
    <span v-if="!editMode">{{ getColumnTitle }}</span>
    <input v-else type="text" name="title" v-model="title" />

    <columnItem
      v-for="item in getColumnItems"
      :item="item"
      :key="item.id"
    ></columnItem>

    <div v-if="!editMode" class="controls">
      <button class="btn btn-add" @click="createItem">+</button>
      <button class="btn btn-edit" @click="editMode = true">&#128393;</button>
    </div>
    <div v-else class="controls-edit">
      <button class="btn btn-apply" @click="updateColumn">&#10003;</button>
      <button class="btn btn-delete" @click="deleteColumn">&#128465;</button>
      <button class="btn btn-cancel" @click="editMode = false">&#11198;</button>
    </div>
  </ul>
</template>

<script>
import columnItem from "@/components/ColumnItem";

export default {
  name: "Column",
  props: ["columnId"],
  data() {
    return {
      editMode: false,
      title: this.$store.state.column.columns.find(
        (el) => el.id === this.columnId
      ).title,
    };
  },
  computed: {
    getColumnItems() {
      return this.$store.state.item.items.filter(
        (el) => el.columnId === this.columnId
      );
    },
    getColumnTitle() {
      return this.$store.state.column.columns.find(
        (el) => el.id === this.columnId
      ).title;
    },
    columns() {
      return this.$store.getters.columns;
    },
  },
  methods: {
    onDrop(event, columnId) {
      const itemId = event.dataTransfer.getData("itemId");
      const item = this.$store.state.item.items.find((el) => el.id == itemId);
      item.columnId = columnId;
      item.itemId = itemId;
      this.$store.dispatch("updateItem", item);
    },
    createItem() {
      this.$store.dispatch({
        type: "createItem",
        columnId: this.columnId,
      });
    },
    updateColumn() {
      this.$store.dispatch("updateColumn", {
        columnId: this.columnId,
        title: this.title,
      });
      this.editMode = false;
    },
    deleteColumn() {
      this.$store.dispatch({
        type: "deleteColumn",
        columnId: this.columnId,
      });
    },
  },
  components: {
    columnItem,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/vars.scss";

.column {
  list-style: none;
  margin: 15px;
  padding: 15px;
  background: rgba($color: $black, $alpha: 0.4);
  max-width: 25%;
  min-height: 2rem;
  display: inline-block;
  border-radius: 8px;
}

span {
  color: $white;
}

.controls {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  margin: 0 5px;
  padding: 2px;
  font-size: 1.5rem;
  background: transparent;
  border: none;
  color: $white;
  cursor: pointer;

  transition: 0.3s linear;

  &:hover {
    transform: scale(1.1);
    text-shadow: 0 0 10px 2px $white;
  }
}
</style>
