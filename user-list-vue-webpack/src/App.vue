<template>
  <div id="app">
    <img src="./assets/logo.png">
    <Filters :search="searchQuery"
             @input="search => { searchQuery = search }"/>
    <UserList :search="searchQuery"/>
  </div>
</template>

<script>
import UserList from './components/UserList/UserList'
import Filters from './components/Filters'

export default {
  name: 'App',
  data () {
    return {
      searchQuery: ''
    }
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
