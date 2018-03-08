<template>
  <div class="filters">
    <h1>Search: </h1>
    <input v-bind:value="searchFilter"
           v-on:input="updateSearch($event.target.value)" >
   </div>
</template>

<script>

export default {
  name: 'Filters',
  props: ['search'],
  data () {
    return {
      searchFilter: this.search
    }
  },
  methods: {
    updateSearch: function (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
