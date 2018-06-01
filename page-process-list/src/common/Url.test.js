import Url from './Url';

describe('Url', () => {
  let equivalences = {};

  equivalences.queries = {
    string: '?a=a&b=2&array=a&array=2&array=3',
    object: { a: 'a', b: '2', array: ['a', '2', '3'] }
  };
  equivalences.fragments = {
    string:
      "#a:'a',b:'2',c:3,array:['a','2',3,{a:'a',b:'2',c:3}],object:{a:'a',b:'2',c:3,array:['a','2',3],object:{a:'a',b:'2',c:3}}",
    object: {
      a: 'a',
      b: '2',
      c: 3,
      array: ['a', '2', 3, { a: 'a', b: '2', c: 3 }],
      object: {
        a: 'a',
        b: '2',
        c: 3,
        array: ['a', '2', 3],
        object: { a: 'a', b: '2', c: 3 }
      }
    }
  };
  equivalences.url = {
    string: `http://localhost:3000/bonita/portal/${
      equivalences.queries.string
    }${equivalences.fragments.string}`,
    object: {
      protocol: 'http:',
      hostname: 'localhost',
      port: '3000',
      pathname: '/bonita/portal/',
      queries: equivalences.queries.object,
      fragments: equivalences.fragments.object
    }
  };

  describe('constructor', () => {
    it('should decompose url with params', () => {
      const url = new Url(equivalences.url.string);
      expect(url).toEqual(equivalences.url.object);
    });

    it('should decompose url without params', () => {
      const url = new Url('http://dev.localhost:3000/bonita/portal');
      expect(url).toEqual({
        protocol: 'http:',
        hostname: 'dev.localhost',
        port: '3000',
        pathname: '/bonita/portal',
        queries: {},
        fragments: {}
      });
    });

    it('should clone Url instance', () => {
      const url = new Url(equivalences.url.object);
      expect(url).toEqual(equivalences.url.object);
    });

    it('should override with second argument', () => {
      const url1 = new Url(equivalences.url.string, {});
      expect(url1).toEqual(equivalences.url.object);

      const url2 = new Url(equivalences.url.string, {
        protocol: 'https:',
        hostname: 'bonita',
        port: '1337',
        queries: {},
        fragments: {}
      });
      expect(url2).toEqual({
        protocol: 'https:',
        hostname: 'bonita',
        port: '1337',
        pathname: equivalences.url.object.pathname,
        queries: {},
        fragments: {}
      });
    });
  });

  describe('getPath', () => {
    it('should recompose path', () => {
      const url = new Url(equivalences.url.string);
      expect(url.getPath()).toEqual('http://localhost:3000/bonita/portal/');
    });

    it('should recompose path without port', () => {
      const url = new Url('http://localhost/bonita/portal/');
      expect(url.getPath()).toEqual('http://localhost/bonita/portal/');
    });
  });

  describe('get', () => {
    it('should recompose url', () => {
      const url = new Url(equivalences.url.string);
      expect(url.get()).toEqual(equivalences.url.string);
    });
  });

  describe('set', () => {
    it('should update url', () => {
      const url = new Url(equivalences.url.string);
      url.set({
        protocol: 'https:',
        hostname: 'bonita',
        port: '1337',
        queries: {},
        fragments: {}
      });
      expect(url).toEqual({
        protocol: 'https:',
        hostname: 'bonita',
        port: '1337',
        pathname: equivalences.url.object.pathname,
        queries: {},
        fragments: {}
      });
    });
  });

  describe('parse & stringify', () => {
    it('should parse queries', () => {
      expect(Url.parseQueries(equivalences.queries.string)).toEqual(
        equivalences.queries.object
      );
      expect(Url.parseQueries('')).toEqual({});
      expect(Url.parseQueries('?')).toEqual({});
      expect(Url.parseQueries('string=with space')).toEqual({
        string: 'with space'
      });
      expect(Url.parseQueries('string=with ?')).toEqual({
        string: 'with ?'
      });
      expect(Url.parseQueries('?string=with ?')).toEqual({
        string: 'with ?'
      });
    });

    it('should stringify queries', () => {
      expect(Url.stringifyQueries(equivalences.queries.object)).toEqual(
        equivalences.queries.string
      );
      expect(Url.stringifyQueries({ a: undefined })).toEqual(null);
      expect(Url.stringifyQueries({})).toEqual(null);
      expect(Url.stringifyQueries({ string: 'with space' })).toEqual(
        '?string=with space'
      );
      expect(Url.stringifyQueries({ string: 'with ?' })).toEqual(
        '?string=with ?'
      );
    });

    it('should parse fragments', () => {
      expect(Url.parseFragments(equivalences.fragments.string)).toEqual(
        equivalences.fragments.object
      );
      expect(Url.parseFragments('')).toEqual({});
      expect(Url.parseFragments('#')).toEqual({});
      expect(Url.parseFragments("string:'with space'")).toEqual({
        string: 'with space'
      });
      expect(Url.parseFragments("string:'with #'")).toEqual({
        string: 'with #'
      });
      expect(Url.parseFragments("#string:'with #'")).toEqual({
        string: 'with #'
      });
    });

    it('should stringify fragments', () => {
      expect(Url.stringifyFragments(equivalences.fragments.object)).toEqual(
        equivalences.fragments.string
      );
      expect(Url.stringifyFragments({})).toEqual(null);
      expect(Url.stringifyFragments({ string: 'with space' })).toEqual(
        "#string:'with space'"
      );
      expect(Url.stringifyFragments({ string: 'with #' })).toEqual(
        "#string:'with #'"
      );
    });
  });
});
