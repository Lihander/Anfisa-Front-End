<template>
  <div class="note-view">
    <CollapseButton
      class="buttons-list__button"
      :class="isNoteViewShow ? 'hide-button' : ''"
      btn-class="btnDefault"
      hide-class="btnDanger"
      :value="isNoteViewShow"
      :show-icon="showNoteViewIcon"
      :hide-icon="hideNoteViewIcon"
      @change="isNoteViewShow = !isNoteViewShow"
    />
    <div
      v-show="isNoteViewShow"
      class="note-view__wrapper"
      :style="
        isNoteViewShow
          ? { borderBottomRightRadius: '0' }
          : { borderBottomRightRadius: '20px' }
      "
    >
      <div class="note-view__wrapper__content">
        <textarea
          id="story"
          v-model="getNote"
          name="story"
          placeholder="Notes..."
          rows="5"
          cols="33"
        >
        </textarea>
      </div>
      <AppButton
        class="note-view__save-button"
        btn-class="btnSuccess"
        @click="saveNote"
      >
        <font-awesome-icon :icon="saveNoteIcon" />
      </AppButton>
    </div>
  </div>
</template>

<script>
import AppButton from "~/components/UI/Controls/Button.vue"
import CollapseButton from "~/components/UI/Controls/CollapseButton.vue"
export default {
  name: "NoteView",
  components: { CollapseButton, AppButton },
  data() {
    return {
      showNoteViewIcon: ["fas", "clipboard"],
      hideNoteViewIcon: ["fas", "times"],
      saveNoteIcon: ["fas", "save"],
      isNoteViewShow: false
    }
  },
  computed: {
    getNote: {
      get() {
        return this.$store.getters.getSelectedVariant.note
      },
      set(note) {
        const variantId = this.$store.getters.getSelectedVariant.id
        this.$store.commit("setVariantNote", { variantId, note })
      }
    }
  },
  methods: {
    saveNote() {
      const variant = this.$store.getters.getSelectedVariant
      this.$store.dispatch("saveVariantTagsAndNote", variant)
    }
  }
}
</script>

<style lang="scss">
.note-view {
  position: relative;
  .buttons-list__button {
    z-index: 1000;
    transition: color 0.3s ease-in-out;
  }
  &__wrapper {
    position: absolute;
    top: 0;
    right: -395px;
    width: 400px;
    height: 400px;
    background-color: $default-color;
    border: 5px solid $accent-color;
    border-bottom-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    z-index: 999;
    &__content {
      width: 100%;
      height: 100%;
      padding: 10px 0;
      textarea {
        height: 100%;
        padding: 5px 10px;
        font-size: 18px;
        resize: none;
        overflow: auto;
        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
        }
      }
    }
  }
  &__save-button {
    height: 50px;
    width: 50px;
    position: absolute;
    bottom: -5px;
    right: -50px;
    border-radius: 0 50% 50% 0;
    border-width: 5px !important;
    border-left: none !important;
    z-index: 1000;
    box-shadow: 5px 0 20px rgba(255, 255, 255, 0.5);
  }
}
.hide-button {
  border-radius: 20px 0 0 20px !important;
  border-width: 5px !important;
  border-right: none !important;
}
</style>
