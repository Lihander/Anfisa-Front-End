<template>
  <div class="table-with-header__wrapper">
    <div class="header__wrapper">
      <div class="header__title">
        {{ tableData.title }}
      </div>
      <div class="header__buttons-list">
        <div class="header__buttons-list__item">
          <slot name="btns" />
        </div>
      </div>
    </div>
    <div v-show="tableCollapse" class="table__wrapper default-scroll">
      <BaseTable :data="tableData.data" />
    </div>
  </div>
</template>

<script>
import BaseTable from "~/components/UI/Tables/BaseTable.vue"
export default {
  name: "TableWithHeader",
  components: { BaseTable },
  props: {
    tableData: {
      type: Object,
      required: true
    },
    tableCollapse: {
      type: Boolean,
      default() {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
.table-with-header {
  &__wrapper {
    width: 100%;
    display: inline-block;
    padding: 10px;
  }
}

.header {
  &__wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 5px 20px;
    color: $default-color;
    background-color: $primary-color;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  &__title {
    flex: 1;
    font-weight: 600;
    font-size: 20px;
  }
  &__buttons-list {
    flex: 2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    &__item {
      width: 5%;
    }
  }
}

.table {
  &__wrapper {
    width: 100%;
  }
}
</style>
