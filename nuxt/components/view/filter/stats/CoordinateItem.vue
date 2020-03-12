<template>
  <div class="coordinate">
    <div class="graphic">
      <input
        :value="center"
        type="number"
        :placeholder="placeholderCenterCoordinate"
        :min="min"
        :max="max"
        @change="centerHandler"
      />
      <div class="coordinate__range">
        <p>Range between {{ min }} to {{ max }}</p>
      </div>
      <VueSlider
        v-model="sliderRadius"
        class="slider"
        :data="marks"
        :marks="true"
        tooltip="none"
        :lazy="true"
        @change="sliderRadiusHandler"
      />
      <input
        :value="radius"
        type="number"
        :placeholder="placeholderRangeCoordinate"
        step="1"
        @change="radiusHandler"
      />
    </div>
    <div class="range">
      <input
        :value="selectedMin"
        type="number"
        :placeholder="placeholderMin"
        :min="min"
        :max="selectedMax"
        @change="minHandler"
      />
      <div class="separator"></div>
      <input
        :value="selectedMax"
        type="number"
        :placeholder="placeholderMax"
        :min="selectedMin"
        :max="max"
        @change="maxHandler"
      />
    </div>
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
import { STAT_NUMERIC } from "~/assets/js/constants.js"
import AppButton from "~/components/UI/Controls/Button.vue"

const marksData = {
  10: 10,
  30: 30,
  100: 100,
  "1kb": 1000,
  "3kb": 3000,
  "10kb": 10000,
  "30kb": 30000,
  "1mb": 100000
}

export default {
  name: "CoordinateItem",
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
        return [this.stat.data[0], this.stat.data[1]]
      }
    }
  },
  data() {
    return {
      placeholderCenterCoordinate: "Center coordinate",
      placeholderRangeCoordinate: "Coordinates range from center",
      placeholderMin: "Min bounds",
      placeholderMax: "Max bounds",
      center: null,
      radius: null,
      min: this.stat.data[0],
      max: this.stat.data[1],
      selectedMin: this.selected[0],
      selectedMax: this.selected[1],
      sliderRadius: null,
      marksData,
      marks: Object.keys(marksData)
    }
  },
  watch: {
    selected() {
      this.selectedMin = this.selected[0]
      this.selectedMax = this.selected[1]
    }
  },
  methods: {
    radiusHandler(value) {
      const newRadiusValue = Number(value)
      if (this.center === null) {
        this.center = this.min
      }
      this.radius = newRadiusValue
      this.sliderRadius = null
      this.selectedMin = Math.max(this.center - newRadiusValue, this.min)
      this.selectedMax = Math.min(this.center + newRadiusValue, this.max)
    },
    sliderRadiusHandler(selectedKey) {
      if (this.center === null) {
        this.center = this.min
      }
      this.sliderRadius = selectedKey
      this.radius = marksData[selectedKey]
      this.selectedMin = Math.max(
        this.center - marksData[selectedKey],
        this.min
      )
      this.selectedMax = Math.min(
        this.center + marksData[selectedKey],
        this.max
      )
    },
    centerHandler(data) {
      const value = Number(data)
      let newCenterValue
      if (!value || value < this.min) {
        newCenterValue = this.min
      } else if (value > this.max) {
        newCenterValue = this.max
      } else {
        newCenterValue = value
      }
      this.center = newCenterValue
      this.sliderRadius = null
      this.radius = null
      this.selectedMin = newCenterValue
      this.selectedMax = newCenterValue
    },
    minHandler(data) {
      const value = Number(data)
      if (value < this.min) {
        this.selectedMin = this.min
      } else if (value > this.selectedMax) {
        this.selectedMin = this.selectedMax
      } else {
        this.selectedMin = value
      }
      this.center = null
      this.radius = null
      this.sliderRadius = null
    },
    maxHandler(data) {
      const value = Number(data)
      if (value > this.max) {
        this.selectedMin = this.max
      } else if (value < this.selectedMin) {
        this.selectedMax = this.selectedMin
      } else {
        this.selectedMax = value
      }
      this.center = null
      this.radius = null
      this.sliderRadius = null
    },
    saveConditions() {
      const condition = [
        STAT_NUMERIC,
        this.stat.name,
        [this.selectedMin, this.selectedMax],
        null
      ]
      this.$store.commit("setCurrentConditions", condition)
    }
  }
}
</script>

<style lang="scss">
.coordinate {
  input {
    width: 100%;
    margin-bottom: 0;
  }
  &__range {
    margin-left: 5px;
    text-align: left;
    font-size: 10px;
    color: $neutral-placeholder;
  }
  .slider {
    margin: 60px 10px 24px 10px;
    padding: 0 !important;
    /deep/ .vue-slider {
      &-marks {
        width: 100%;
        height: 50px;
        top: -50px;
        background: rgb(255, 255, 255);
        background: linear-gradient(
          to bottom right,
          rgba(255, 255, 255, 1) 50%,
          rgba(220, 223, 230, 1) 51%
        );
      }
      &-mark {
        &-step {
          display: none;
        }
        &-label {
          margin-top: 5px;
          font-size: 9px;
          letter-spacing: 0;
          color: $primary-color;
        }
      }
      &-rail {
        background-color: $neutral-placeholder;
      }
      &-dot {
        top: -50px !important;
        margin-left: 3px !important;
        background-color: transparent;
        &-handle {
          background-color: $primary-color;
          width: 3px;
          height: 60px;
          border: 0;
          border-radius: 2px;
          &-focus {
            box-shadow: none;
            background-color: $accent-color;
          }
        }
      }
      &-process {
        background-color: $accent-color;
      }
    }
  }
  .graphic {
    border-bottom: 1px dotted $neutral-placeholder;
    padding: 10px;
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
  .save-button {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
}
</style>
