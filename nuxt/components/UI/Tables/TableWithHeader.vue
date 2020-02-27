<template>
  <div class="table-with-header__wrapper">
    <div class="header__wrapper">
      <div class="header__title">
        {{ tableData.title.toUpperCase() }}
      </div>
      <div class="header__buttons-list">
        <div class="header__buttons-list__item">
          <slot name="btns" />
        </div>
      </div>
    </div>
    <div v-show="tableCollapse" class="table__wrapper default-scroll">
      <div class="table__wrapper__content">
        <BaseTable v-if="tableData.type !== 'pre'" :data="tableData.data" />
        <div class="varinat-content" v-else>
          <pre>{{ tableData.content }}</pre>
        </div>
      </div>
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

    .default-scroll {
      &::-webkit-scrollbar {
        height: 10px;
      }
    }
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
    font-weight: 800;
    font-size: 16px;
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
    transform: rotateX(180deg);
    &__content {
      transform: rotateX(180deg);
    }
  }
}

.varinat-content {
  background-color: $default-color;
  padding: 10px 20px;
  font-size: 14px;
}
</style>
