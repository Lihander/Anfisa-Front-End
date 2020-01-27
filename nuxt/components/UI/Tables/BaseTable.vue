<template>
  <table>
    <tbody>
      <tr v-for="row in getData" :key="row.title">
        <th v-html="row[0].title"></th>
        <td
          v-for="(details, index) in row[0].data"
          :key="index"
          v-html="details"
        ></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "BaseTable",
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    getData() {
      return this.data.filter(item => {
        return item[0].data.length > 0
      })
    }
  }
}
</script>

<style lang="scss"></style>
