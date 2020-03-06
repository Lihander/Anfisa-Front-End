<template>
  <div class="note-view">
    <div class="content">
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
    <div class="footer">
      <div v-if="getNoteStatus" class="note-status">
        {{ getNoteStatus }}
      </div>
      <AppButton class="save-button" btn-class="btnSuccess" @click="saveNote">
        <font-awesome-icon :icon="saveNoteIcon" />
      </AppButton>
    </div>
  </div>
</template>

<script>
import AppButton from "~/components/UI/Controls/Button.vue"
export default {
  name: "NoteView",
  components: { AppButton },
  data() {
    return {
      saveNoteIcon: ["fas", "save"]
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
  width: 400px;
  height: 400px;
  background-color: $border-lightex;
  border: 5px solid $accent-color;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  overflow: hidden;
  .content {
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
  .footer {
    height: 15%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px 0;
    .note-status {
      width: 80%;
      text-align: center;
    }
    .save-button {
      height: 50px !important;
      width: 50px !important;
      border-radius: 50%;
      margin: 0 10px;
    }
  }
}
.hide-button {
  border-radius: 20px 0 0 20px !important;
  border-width: 5px !important;
  border-right: none !important;
}
</style>
