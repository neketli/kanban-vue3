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
      <button class="btn btn-edit" @click="editMode = true">
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            d="M421.7 220.3l-11.3 11.3-22.6 22.6-205 205c-6.6 6.6-14.8 11.5-23.8 14.1L30.8 511c-8.4 2.5-17.5 .2-23.7-6.1S-1.5 489.7 1 481.2L38.7 353.1c2.6-9 7.5-17.2 14.1-23.8l205-205 22.6-22.6 11.3-11.3 33.9 33.9 62.1 62.1 33.9 33.9zM96 353.9l-9.3 9.3c-.9 .9-1.6 2.1-2 3.4l-25.3 86 86-25.3c1.3-.4 2.5-1.1 3.4-2l9.3-9.3H112c-8.8 0-16-7.2-16-16V353.9zM453.3 19.3l39.4 39.4c25 25 25 65.5 0 90.5l-14.5 14.5-22.6 22.6-11.3 11.3-33.9-33.9-62.1-62.1L314.3 67.7l11.3-11.3 22.6-22.6 14.5-14.5c25-25 65.5-25 90.5 0z"
          />
        </svg>
      </button>
    </div>
    <div v-else class="controls-edit">
      <button class="btn btn-apply" @click="updateColumn">
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
          />
        </svg>
      </button>
      <button class="btn btn-delete" @click="deleteColumn">
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
          />
        </svg>
      </button>
      <button class="btn btn-cancel" @click="editMode = false">
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
          />
        </svg>
      </button>
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
@import "@/assets/vars";

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
  margin-top: 15px;
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

.icon {
  width: 16px;
  height: 16px;

  fill: $white;
}

input {
  padding: 5px 15px;
  outline: none;
  border: none;
  border-radius: 5px;
  margin: 5px;
  transition: all 0.2s linear;

  &:focus {
    box-shadow: 0 0 2px 2px rgba($color: $black, $alpha: 0.4);
  }
}
</style>
