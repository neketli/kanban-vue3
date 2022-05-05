<template>
  <li
    draggable="true"
    class="column__item item"
    @dragstart="startDrag($event, this.item)"
  >
    <span v-if="!editMode" class="item__title">
      {{ this.item.title }}
    </span>
    <input v-else type="text" name="title" v-model="this.item.title" />

    <div v-if="!editMode" class="controls">
      <button class="btn btn-edit" @click="editMode = true">&#128393;</button>
    </div>
    <div v-else class="controls-edit">
      <button class="btn btn-apply" @click="updateItem">&#10003;</button>
      <button class="btn btn-delete" @click="deleteItem">&#128465;</button>
      <button class="btn btn-cancel" @click="editMode = false">&#11198;</button>
    </div>
  </li>
</template>

<script>
export default {
  name: "ColumnItem",
  props: ["item"],
  data() {
    return {
      editMode: false,
    };
  },
  computed: {},
  methods: {
    startDrag(event, item) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("itemId", item.id);
    },
    updateItem() {
      this.$store.commit({
        type: "updateItem",
        itemId: this.item.id,
        title: this.item.title,
      });
      this.editMode = false;
    },
    deleteItem() {
      this.$store.commit({
        type: "deleteItem",
        itemId: this.item.id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  box-sizing: border-box;
  background: #fff;
  margin: 5px;
  padding: 5px;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
}

.btn {
  margin: 0 5px;
  font-size: 1.5rem;
  background: transparent;
  border: none;
  color: black;
  cursor: pointer;

  transition: 0.3s linear;

  &:hover {
    transform: scale(1.1);
    text-shadow: 0 0 10px 2px white;
  }
}
</style>
