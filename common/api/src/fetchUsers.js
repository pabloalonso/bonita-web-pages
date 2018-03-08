
const options = {
  method: 'GET',
  credentials: 'same-origin', // automatically send cookies for the current domain
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    // 'Cookie': document.cookie,
    'Access-Control-Allow-Origin': '*'
  },
  mode: 'cors',
  cache: 'default'
}

const url = '/bonita/API/identity/user?p=0&c=10&o=userName ASC&f=enabled=true'

// return a promise with users as the first parameter
export default function () {
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
