<template>
  <div class="user-info">
    <div class="report">
      <span>Report</span>
      <AppButton class="btnPrimary">
        EXPORT
      </AppButton>
    </div>
    <div class="user-info-name">
      <AppButton class="btnDefaultOutline">
        Sign in
      </AppButton>
    </div>
    <div v-show="false" class="user-info-avatar">
      <font-awesome-icon :icon="['fas', 'user-circle']" />
    </div>
  </div>
</template>

<script>
import AppButton from "~/components/UI/Controls/Button.vue"
export default {
  name: "HeaderUserInfo",
  components: { AppButton }
}
</script>

<style lang="scss">
.user-info {
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: $default-color;
  padding: 10px 20px;
  &-name {
    width: 50%;
    text-align: right;
    font-size: 14px;
  }
  &-avatar {
    margin-left: 20px;
  }
  .report {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 14px;
    margin-right: 30px;
    span {
      font-size: 18px;
      margin-bottom: 5px;
    }
  }
  .fa-user-circle {
    font-size: 48px;
  }
}
</style>
