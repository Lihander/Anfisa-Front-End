<template>
  <div class="load-view-toolbar">
    <AppButton
      class="close-button"
      :btn-class="'btnDanger'"
      @click="$emit('close')"
    >
      <font-awesome-icon :icon="['fas', 'arrow-circle-left']" />
    </AppButton>
    <div class="list-sort">
      <span>Sort By:</span>
      <AppButton
        class="sort-btn"
        btn-class="btnPrimaryWithoutBorder"
        @click="sortBy"
      >
        <font-awesome-icon :icon="['fas', 'calendar-alt']" />
        <font-awesome-icon
          v-if="sortDate === 'asc'"
          class="sticker"
          :icon="['fas', 'sort-up']"
        />
        <font-awesome-icon
          v-else-if="sortDate === 'desc'"
          class="sticker"
          :icon="['fas', 'sort-down']"
        />
        <font-awesome-icon v-else class="sticker" :icon="['fas', 'sort']" />
      </AppButton>
      <AppButton
        class="sort-btn"
        btn-class="btnPrimaryWithoutBorder"
        @click="sortBy"
      >
        <font-awesome-icon
          v-if="sortAlpha === 'asc'"
          class="sticker"
          :icon="['fas', 'sort-alpha-up']"
        />
        <font-awesome-icon
          v-else
          class="sticker"
          :icon="['fas', 'sort-alpha-down']"
        />
      </AppButton>
    </div>
  </div>
</template>

<script>
import AppButton from "~/components/UI/Controls/Button.vue"
export default {
  name: "LoadToolbar",
  components: {
    AppButton
  },
  data() {
    return {
      sortDate: "",
      sortAlpha: ""
    }
  },
  methods: {
    sortBy() {}
  }
}
</script>

<style lang="scss">
.load-view-toolbar {
  height: 7%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .list-sort {
    height: 100%;
    width: calc(100% - 50px);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid $neutral-placeholder;
    padding-left: 20px;
    span {
      display: block;
      font-size: 16px;
      font-weight: 600;
      margin-right: 10px;
    }
    .sort-btn {
      width: 50px;
    }
  }
  .close-button {
    height: 100%;
    width: 50px;
    border-radius: 0;
  }
}
</style>
