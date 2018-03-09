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
    search: function () {
      this.currentPage = 1;
      this.$refs.usersTable.refresh();
    }
  },
  data () {
    return {
      users: [],
      currentPage: 1,
      perPage: 10,
      totalRows: 200
    }
  },
  methods: {
    tableProvider () {
      let searchOptions = {};
      searchOptions.search = this.search;
      searchOptions.page = this.currentPage -1;
      searchOptions.elementsByPage = this.perPage;
      return fetchUsers(searchOptions).then((response) => {
        let items = response.data;
        let contentRange = response.headers.get('Content-Range');
        if (contentRange.lastIndexOf('/') >= 0) {
          let nbElements = contentRange.substring(contentRange.lastIndexOf('/') + 1);
          if (nbElements) {
            this.totalRows = Number.parseInt(nbElements);
          }
        }
        // Must return an array of items or an empty array if an error occurred
        return(items || [])
      })
    }
  }

}
