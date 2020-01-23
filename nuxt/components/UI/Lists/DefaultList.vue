<template>
  <v-list>
    <v-list-item-group color="primary">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        @dblclick="$emit('dblclick', item)"
        @click="$emit('click', item)"
      >
        <v-list-item-content>
          {{ item }}
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: "DefaultList",
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
.v-list {
  padding: 0;
}
</style>
