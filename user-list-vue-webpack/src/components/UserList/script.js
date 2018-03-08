import fetchUsers from '../../../../common/api/src/fetchUsers.js'
export default {
  name: 'Users',
  props: ['search'],
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
