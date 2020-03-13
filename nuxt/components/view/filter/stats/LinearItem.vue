<template>
  <div class="linear" @mouseup="onDragEnd">
    <div class="range">
      <input
        v-model.number="selectedMin"
        type="number"
        :step="step"
        :min="min"
        :max="selectedMax"
        :disabled="!isSimple"
      />
      <div class="separator"></div>
      <input
        v-model.number="selectedMax"
        type="number"
        :step="step"
        :min="selectedMin"
        :max="max"
        :disabled="!isSimple"
      />
    </div>
    <VueSlider
      v-if="!isSimple"
      :key="key"
      class="slider"
      :value="sliderValues"
      :enable-cross="false"
      :marks="sliderMarks"
      :min="min"
      :max="sliderMax"
      :interval="step"
      tooltip="none"
      @change="changeValues"
      @drag-end="onDragEnd"
    />
    <AppButton
      class="save-button"
      :btn-class="'btnPrimary'"
      @click="saveConditions"
    >
      {{ buttonText }}
    </AppButton>
  </div>
</template>

<script>
import { STAT_NUMERIC, LOG_EDITOR_MARKS } from "~/assets/js/constants.js"
import AppButton from "~/components/UI/Controls/Button.vue"
export default {
  name: "LinearItem",
  components: { AppButton },
  props: {
    stat: {
      type: Object,
      required: true
    },
    buttonText: {
      type: String,
      default() {
        return "ADD"
      }
    },
    selected: {
      type: Array,
      default() {
        return [
          this.roundLogarithmic(this.stat.data[0]),
          this.roundLogarithmic(this.stat.data[1])
        ]
      }
    },
    min: {
      type: Number,
      default() {
        return this.stat.data[0]
      }
    },
    max: {
      type: Number,
      default() {
        return this.stat.data[1]
      }
    },
    step: {
      type: Number,
      default() {
        return 0.0001
      }
    },
    isLogarithmic: {
      type: Boolean,
      default() {
        return false
      }
    },
    isSimple: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      fixedMin: this.selected[0] || this.roundLogarithmic(this.stat.data[0]),
      fixedMax: this.selected[1] || this.roundLogarithmic(this.stat.data[1]),
      selectedMin: this.selected[0] || this.roundLogarithmic(this.stat.data[0]),
      selectedMax: this.selected[1] || this.roundLogarithmic(this.stat.data[1]),
      key: 0
    }
  },
  computed: {
    marks() {
      if (this.isLogarithmic) {
        return LOG_EDITOR_MARKS
      }
      return Array(5)
        .fill("")
        .map((item, index) =>
          this.round(this.min + ((this.max - this.min) * index) / 4)
        )
    },
    sliderMarks() {
      if (this.isLogarithmic) {
        const scale = {}
        this.marks.forEach((item, index) => {
          scale[String(index)] = String(item)
        })
        return scale
      }
      return this.marks
    },
    sliderValues() {
      const values = [this.selectedMin, this.selectedMax]
      if (this.isLogarithmic) {
        return values.map(item => this.reverseInterpolation(item))
      }
      return values
    },
    sliderMax() {
      if (this.isLogarithmic) {
        return this.marks.length - 1
      }
      return this.max
    }
  },
  watch: {
    selected() {
      this.selectedMin = this.selected[0]
      this.selectedMax = this.selected[1]
    }
  },
  methods: {
    changeValues([min, max]) {
      if (this.isLogarithmic) {
        this.selectedMin = this.interpolation(min)
        this.selectedMax = this.interpolation(max)
      } else {
        this.selectedMin = min
        this.selectedMax = max
      }
    },
    saveConditions() {
      const condition = [
        STAT_NUMERIC,
        this.stat.name,
        [this.selectedMin, this.selectedMax],
        null
      ]
      this.$store.commit("setCurrentConditions", condition)
    },
    roundLogarithmic(value) {
      if (this.isLogarithmic) {
        return this.round(value)
      }
      return value
    },
    round(value) {
      return Math.round(value * 10000) / 10000
    },
    closestLeftMark(value) {
      const index = this.marks.findIndex(item => value < item)
      const lastMark = this.marks[this.marks.length - 1]
      return value >= lastMark
        ? lastMark
        : this.marks[index < 1 ? 0 : index - 1]
    },
    closestRightMark(value) {
      const mark = this.marks.find(item => value <= item)
      return mark || this.marks[0]
    },
    interpolation(x) {
      if (x <= 0) {
        return this.roundLogarithmic(this.fixedMin)
      }
      if (x >= this.marks.length - 1) {
        return this.roundLogarithmic(this.fixedMax)
      }
      const dot = Math.floor(x)
      let result =
        this.marks[dot] * (dot + 1 - x) + this.marks[dot + 1] * (x - dot)
      result = result < this.fixedMin ? this.fixedMin : result
      result = result > this.fixedMax ? this.fixedMax : result
      return this.roundLogarithmic(result)
    },
    reverseInterpolation(x) {
      if (x <= this.marks[0]) {
        return 0
      }
      if (x >= this.marks[this.marks.length - 1]) {
        return this.marks.length - 1
      }
      const left = this.closestLeftMark(x)
      const right = this.closestRightMark(x)
      const index = this.marks.findIndex(item => left <= item)
      if (right === left) {
        return index
      }
      const result =
        (index * (right - x) + (index + 1) * (x - left)) / (right - left)
      return this.roundLogarithmic(result)
    },
    onDragEnd() {
      if (this.isLogarithmic) {
        this.key += 1
      }
    }
  }
}
</script>

<style lang="scss">
.linear {
  input {
    width: 100%;
    margin-bottom: 0;
  }
  .range {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    .separator {
      width: 15%;
      margin: 0 10px;
      border-bottom: 2px solid $secondary-color;
    }
  }
  .slider {
    margin: 20px 20px;
    /deep/ .vue-slider {
      &-marks {
        background-color: $secondary-color;
        height: 2px !important;
        margin-left: -1px;
      }
      &-mark {
        top: 1px;
        height: 8px !important;
        width: 2px !important;
        box-shadow: none;
        &-step {
          border-radius: 0;
          background-color: $secondary-color;
          box-shadow: none;
        }
        &-label {
          margin-top: 2px;
        }
      }
      &-rail {
        background-color: $default-color;
      }
      &-dot {
        top: -20px !important;
        margin-left: -3px !important;
        background-color: transparent;
        &-handle {
          background-color: $secondary-color;
          width: 18px;
          height: 16px;
          border: 0;
          border-radius: 3px 3px 0 0;
          &:after {
            content: "";
            display: block;
            position: relative;
            top: 16px;
            left: 0;
            width: 0;
            height: 0;
            border-style: solid;
            border-color: transparent;
            border-top-color: $secondary-color;
            border-width: 9px;
          }
          &-focus {
            box-shadow: none;
            background-color: $accent-color;
            &:after {
              border-top-color: $accent-color;
            }
          }
        }
      }
      &-process {
        top: -24px !important;
        margin-left: -2px;
        border-radius: 0;
        height: 24px !important;
        background-color: $border-light;
      }
    }
  }
}
</style>
