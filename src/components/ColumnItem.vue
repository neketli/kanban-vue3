<template>
  <li
    draggable="true"
    class="column__item item"
    @dragstart="startDrag($event, this.item)"
  >
    <span class="item__title">
      {{ this.item.title }}
    </span>
  </li>
</template>

<script>
export default {
  name: "ColumnItem",
  props: ["item"],
  computed: {},
  methods: {
    startDrag(event, item) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("itemId", Number(item.id));
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
</style>
