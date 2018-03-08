<template>
  <div>
    <input type="text" v-model="search" v-on:input="handleSearchMessage"/>
  </div>
</template>

<script>

export default {
  name: 'Filters',
  data () {
    return {
      search: 'test message'
    }
  },
  methods: {
    handleSearchMessage: function () {
      this.$emit('search', { search: this.search })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
