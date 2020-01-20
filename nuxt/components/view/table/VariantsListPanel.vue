<template>
  <div class="variants-list">
    <div class="variants-list__header">
      <DefaultSwitcher @selected="selectedItemChange" :items="switchItems"/>
    </div>
    <div class="variants-list__wrapper default-scroll">
      <div
        class="variants-list__item"
        :class="getSelectedVariantClass(item)"
        v-for="item in getVariants"
        :key="item.id"
        tabindex="-1"
        @click="getVariantsDetails(item)"
      >
        <VariantsItem :item="item"/>
      </div>
    </div>
  </div>
</template>

<script>
  import VariantsItem from "~/components/view/table/VariantsItem.vue";
  import DefaultSwitcher from "~/components/UI/Controls/DefaultSwitcher.vue";
  export default {
    name: "VariantsList",
    components: {DefaultSwitcher, VariantsItem},
    data() {
      return {
        selectedVariant: null,
        switchItems: [
          {
            name: 'GENE',
            isActive: false
          }, {
            name: 'VARIANTS',
            isActive: true
          }
        ]
      }
    },
    computed: {
      getVariants() {
        return this.$store.getters.getVariants
      },
      getSelectedVariantClass() {
        return item => {
          return this.selectedVariant === item.id ? 'variants-list__item__active' : '';
        }
      }
    },
    methods: {
      selectedItemChange(selectedItem) {
        this.switchItems.map(item => {
          item.isActive = selectedItem.name === item.name;
        });
      },
      getVariantsDetails(item) {
        if (this.selectedVariant !== item.id) {
          this.selectedVariant = item.id;
          this.$store.dispatch('getVariantDetails', item.id);
        }
      }
    }
  }
</script>

<style lang="scss">
  .variants-list {
    height: 100%;
    width: 21%;
    display: inline-block;
    font-size: 14px;
    background-color: $default-color;
    &__header {
      height: 5%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $secondary-color;
      padding: 5px 20px;
    }
    &__wrapper {
      height: 95%;
    }
    &__item {
      cursor: pointer;
      padding: 5px 0;
      border-bottom: 1px solid $border-base;
      transition: all ease .3s;

      &:hover {
        color: $primary-color;
        background-color: $light-color;
      }

      &__active {
        color: $default-color;
        background-color: $primary-color;

        &:hover {
          color: $default-color;
          background-color: $primary-color;
        }

        .variant-item {
          &__type {
            opacity: 1;
            width: 30px;
          }
        }
      }
    }
  }
</style>
