<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-bind:key="process.name" v-for="process in processes">
        {{ process.displayName }}
      </li>
    </ul>
  </div>
</template>

<script>
import fetchProcesses from '@bonita/api/src/fetchProcesses.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      processes: []
    }
  },
  created () {
    // fetch the data when the view is created and the data is already being observed
    fetchProcesses().then((processes) => { this.processes = processes })
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
