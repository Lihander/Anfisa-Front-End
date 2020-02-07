<template>
  <div class="sample-item">
    <div class="genotype">
      {{data}}
    </div>
  </div>
</template>

<script>
export default {
  name: "SampleItem",
  props: {
    data: {
      type: String,
      required: true
    }
  },
  computed: {
  }
}
</script>

<style scoped></style>
