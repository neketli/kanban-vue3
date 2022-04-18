<template>
  <li class="column__item item">
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
};
</script>

<style lang="scss" scoped>
.item {
  box-sizing: border-box;
  background: #fff;
  margin: 5px;
  padding: 5px;
  border-radius: 8px;
}
</style>
