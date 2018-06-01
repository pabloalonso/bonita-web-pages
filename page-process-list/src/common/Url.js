import assignIn from 'lodash.assignin'; // deep assign

const isObjectEmpty = obj =>
  !Object.keys(obj)
    .filter(key => typeof obj[key] !== 'undefined')
    .some(key => obj.hasOwnProperty(key));

class Url {
  constructor(url, overridingProps = {}) {
    let props = url;

    if (typeof url === 'string') {
      const parser = document.createElement('a');
      parser.href = url;

      props = ['protocol', 'hostname', 'port', 'pathname'].reduce(
        (buffer, key) => {
          buffer[key] = parser[key];
          return buffer;
        },
        {
          queries: Url.parseQueries(parser.search),
          fragments: Url.parseFragments(parser.hash)
        }
      );
    }

    assignIn(this, props, overridingProps);
  }

  set(props) {
    return Object.assign(this, props);
  }

  get() {
    const { queries, fragments } = this;

    const url = [
      this.getPath(),
      Url.stringifyQueries(queries),
      Url.stringifyFragments(fragments)
    ];

    return url.join('');
  }

  getPath() {
    let { protocol, hostname, port, pathname } = this;
    port = port !== '' ? `:${port}` : port;
    return `${protocol}//${hostname}${port}${pathname}`;
  }

  static parseQueries(str) {
    const parsedStr = str[0] === '?' ? str.substr(1) : str;

    return parsedStr
      .replace(/\+/g, ' ')
      .split('&')
      .filter(param => param) // to have empty array if split on empty str
      .map(param => param.split('='))
      .map(([key, value]) => [key, value])
      .reduce((queries, [key, value]) => {
        queries[key] =
          typeof queries[key] === 'undefined'
            ? value
            : [].concat(queries[key], value);

        return queries;
      }, {});
  }

  static stringifyQueries(obj) {
    return isObjectEmpty(obj)
      ? null
      : '?' +
          Object.keys(obj)
            .map(key => [key, obj[key]])
            .filter(([key, value]) => typeof value !== 'undefined')
            .map(
              ([key, value]) =>
                !Array.isArray(value)
                  ? `${key}=${value}`
                  : value
                      .filter(element => typeof element !== 'undefined')
                      .map(element => `${key}=${element}`)
                      .join('&')
            )
            .join('&');
  }

  static parseFragments(str) {
    console.log('str', str);
    let parsedStr = str[0] === '#' ? str.substr(1) : str;

    parsedStr = `{${parsedStr}}`
      // en général :
      .replace(/([a-zA-Z0-9_]*):/g, '"$1":') //Replace simple cote by Double cote for param name *****: => "*****": // page:'main' => "page":'main'
      .replace(/:'([^'])'/g, `:"$1"`) // Replace simple cote by Double cote for string value :'*****' => :"*****" // "page":'main' => "page":"main"

      // For table :
      .replace(/([[,])'([^]+)'([\],])/g, '$1"$2"$3') // Replace simple cote by Double cote for param name in table ['*****'] => ["*****"] || ['*****', => ["*****", || ,'*****', => ,"*****", || ,'*****'] => ,"*****"]
      .replace(/,'([^]+)',/g, ',"$1",'); // Replace simple cote by Double cote for string value in table ,'*****', => ,"*****", // array:["a",'b',"c"] => array:["a","b","c"]

    console.log('parsedStr', parsedStr);

    return JSON.parse(parsedStr);
  }

  static stringifyFragments(obj) {
    const value = isObjectEmpty(obj)
      ? null
      : '#' +
        JSON.stringify(obj)
          .replace(/"([a-zA-Z0-9_]*)":/g, '$1:')
          .replace(/"/g, "'") //TODO pas assez bien, les " ne sont pas préservés dans les strings, e.i. page:"je chante "lalalala", seule parole du tube de l'été"
          //il faut faire l'inverse de parseFragments :

              // en général :
              .replace(/:"([^]+)"/g, ":'$1'") // remplace les guillemets par des apostrophes des :"*****" => :'*****' // page:"main"=> page:'main'

              // pour les tableaux :
              .replace(/([[,])"([^]+)"([\],])/g, "$1'$2'$3") // remplace les guillemets par des apostrophes des ["*****"] => ['*****'] || ["*****", => ['*****', || ,"*****", => ,'*****', || ,"*****"] => ,'*****']
              .replace(/,"([^]+)",/g, ",'$1',") // remplace les guillemets par des apostrophes des ,"*****", => ,'*****', puisque le replace d'au-dessus n'y arrive pas bizarremment // array:['a',"b",'c'] => array:['a','b','c']

          .slice(1, -1); // remove the two { and } that wrap the string

    console.log(value);
    return value;
  }
}

export default Url;
