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
      title: this.$store.state.columns.find((el) => el.id === this.columnId)
        .title,
    };
  },
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
    createItem() {
      this.$store.commit({
        type: "createItem",
        columnId: this.columnId,
      });
    },
    updateColumn() {
      this.$store.commit({
        type: "updateColumn",
        columnId: this.columnId,
        title: this.title,
      });
      this.editMode = false;
    },
    deleteColumn() {
      this.$store.commit({
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
.column {
  list-style: none;
  margin: 15px;
  padding: 15px;
  background: rgba($color: #333, $alpha: 0.5);
  max-width: 50%;
  min-height: 2rem;
  display: inline-block;
}

span {
  color: white;
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
  color: white;
  cursor: pointer;

  transition: 0.3s linear;

  &:hover {
    transform: scale(1.1);
    text-shadow: 0 0 10px 2px white;
  }
}
</style>
