<template>
  <div class="filters">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-bind:key="user.userName" v-for="user in userList">
        {{ user.userName }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Filters',
  props: ['userList'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      usersList: []
    }
  },
  created () {

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
