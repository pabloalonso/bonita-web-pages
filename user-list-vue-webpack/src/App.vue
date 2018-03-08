<template>
  <div id="app">
    <img src="./assets/logo.png">
    <Filters :userList="users"/>
    <UserList/>
  </div>
</template>

<script>
import UserList from './components/UserList/UserList'
import Filters from './components/Filters'
import fetchUsers from '@bonita/api/src/fetchUsers.js'

export default {
  name: 'App',
  data () {
    return {
      users: []
    }
  },
  created () {
    // fetch the data when the view is created and the data is already being observed
    fetchUsers().then((users) => { this.users = users })
  },
  components: {
    UserList,
    Filters
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
