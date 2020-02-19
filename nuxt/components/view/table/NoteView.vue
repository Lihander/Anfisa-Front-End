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
    <div v-show="isNoteViewShow" class="note-view__wrapper">
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
      <div class="note-view__wrapper__footer">
        <div
          v-if="getNoteStatus"
          class="note-view__wrapper__footer__note-status"
        >
          {{ getNoteStatus }}
        </div>
        <AppButton
          class="note-view__wrapper__footer__save-button"
          btn-class="btnSuccess"
          @click="saveNote"
        >
          <font-awesome-icon :icon="saveNoteIcon" />
        </AppButton>
      </div>
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
    },
    getNoteStatus() {
      return this.$store.getters.getNoteStatus
    }
  },
  watch: {
    getNoteStatus() {
      setTimeout(() => {
        this.$store.commit("setNoteStatus", "")
      }, 3000)
    }
  },
  methods: {
    saveNote() {
      const variant = this.$store.getters.getSelectedVariant
      this.$store.dispatch("saveVariantTagsAndNote", { variant })
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
    background-color: $border-lightex;
    border: 5px solid $accent-color;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    z-index: 999;
    overflow: hidden;
    &__content {
      width: 100%;
      height: 85%;
      padding: 10px 0;
      background-color: $default-color;
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
    &__footer {
      height: 15%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 10px 0;
      &__note-status {
        width: 80%;
        text-align: center;
      }
      &__save-button {
        height: 50px !important;
        width: 50px !important;
        border-radius: 50%;
        margin: 0 10px;
      }
    }
  }
}
.hide-button {
  border-radius: 20px 0 0 20px !important;
  border-width: 5px !important;
  border-right: none !important;
}
</style>
