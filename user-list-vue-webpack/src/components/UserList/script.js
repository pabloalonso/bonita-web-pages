import fetchUsers from '../../../../common/api/src/fetchUsers.js'
export default {
  name: 'Users',
  props: {
    search: {
      type: String,
      default: ''
    }
  },
  watch: {
    // whenever search changes, this function will run
    search: function (newSearch, oldSearch) {
      this.fetchUsers({search: newSearch});
    },
    currentPage: function () {
      this.fetchUsers({search: this.search});
    }
  },
  data () {
    return {
      users: [],
      currentPage: 1,
      perPage: 10,
      totalRows: 20
    }
  },
  created () {
    // fetch the data when the view is created and the data is already being observed
    this.fetchUsers({search: this.search});
  },
  methods: {
    fetchUsers (searchOptions){
      searchOptions.page = this.currentPage -1;
      searchOptions.elementsByPage = this.perPage;
      fetchUsers(searchOptions).then((users) => { this.users = users });
    }
  }

}
