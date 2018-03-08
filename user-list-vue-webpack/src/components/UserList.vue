<template>
  <div class="user-list">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-bind:key="user.userName" v-for="user in users">
        {{ user.userName }}
      </li>
    </ul>
  </div>
</template>

<script>
import fetchUsers from '@bonita/api/src/fetchUsers.js'
export default {
  name: 'Users',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      users: []
    }
  },
  created () {
    // fetch the data when the view is created and the data is already being observed
    fetchUsers().then((users) => { this.users = users })
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
