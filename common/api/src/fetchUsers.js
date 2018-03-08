
const options = {
  method: 'GET',
  credentials: 'same-origin', // automatically send cookies for the current domain
  headers: {
    'Content-Type': 'application/json'
  },
  mode: 'cors',
  cache: 'default'
}

// return a promise with users as the first parameter
export default function (searchOptions) {
  let url = `/bonita/API/identity/user?p=${searchOptions.page}&c=${searchOptions.elementsByPage}&o=userName ASC&f=enabled=true&s=${searchOptions.search}`;
  return fetch(url, options)
    .then(function (response) {
      if (response.ok) {
        return Promise.resolve(response.json())
      }
      return Promise.reject(response.error())
    })
}

/* A process looks like that :
{
"firstname":"Walter",
"icon":"icons/default/icon_user.png",
"creation_date":"2018-02-07 16:08:52.442",
"userName":"walter.bates","title":"Mr",
"created_by_user_id":"-1",
"enabled":"true",
"lastname":"Bates",
"last_connection":"2018-03-08 11:58:23.881",
"password":"",
"manager_id":"3",
"id":"4",
"job_title":"Human resources benefits",
"last_update_date":"2018-02-07 16:08:52.442"
}
*/
