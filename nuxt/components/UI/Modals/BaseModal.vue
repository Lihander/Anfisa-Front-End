<template>
  <transition name="modal">
    <div class="modal__wrapper" @click="$emit('close')">
      <div class="modal-content" @click.stop="">
        <!-- header -->
        <div class="modal-header">
          <span class="modal-title"> {{ title }} </span>
          <div class="header-buttons">
            <slot name="header-buttons" />
            <span class="button-close" @click="$emit('close')">
              <font-awesome-icon :icon="['fas', 'times']" />
            </span>
          </div>
        </div>

        <!-- body -->
        <div class="modal-body default-scroll">
          <slot name="body" />
        </div>

        <!-- footer -->
        <div v-if="showFooter" class="modal-footer">
          <slot name="footer">
            <AppButton class="btnPrimary" @click="$emit('close')">
              OK
            </AppButton>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import AppButton from "~/components/UI/Controls/Button.vue"

export default {
  name: "BaseModal",
  components: { AppButton },
  props: {
    title: {
      type: String,
      required: true
    },
    showFooter: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  computed: {},
  mounted() {
    document.body.addEventListener("keyup", e => {
      if (e.keyCode === 27) {
        this.$emit("close")
      }
    })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.modal__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.2s ease;
  right: 0;
  z-index: 998;
  background-color: rgba(00, 00, 00, 0.48);
}

.modal-content {
  position: relative;
  max-width: 80vw;
  height: 75vh;
  background-color: $default-color;
  transition: all 0.2s ease;
  border-radius: 8px;
  overflow: hidden;
  z-index: 999;
  @media screen and (min-width: 900px) {
    min-width: 500px;
  }
}
.modal-header {
  height: 10%;
  display: flex;
  align-self: center;
  justify-content: space-between;
  padding: 10px 25px;
  color: $default-color;
  background-color: $secondary-color;
  border-bottom: 1px solid $primary-color;
  .modal-title {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  span {
    font-size: 22px;
    font-weight: 600;
  }
  .header-buttons {
    display: flex;
    align-self: center;
    justify-content: flex-end;
    .button-close {
      margin-left: 30px;
      cursor: pointer;
      color: $default-color;
      transition: all 0.3s ease;
      &:hover {
        color: $neutral-secondary;
      }
    }
  }
}
.modal-body {
  height: 80%;
  text-align: center;
}

.modal-footer {
  height: 10%;
  text-align: right;
  padding: 10px 25px;
  border-top: 1px solid $secondary-color;
  margin-top: 1px;
}

// animation
.modal-enter,
.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-content,
.modal-leave-active .modal-content {
  transform: scale(1.2);
}
</style>
