// sessionStorage根据浏览器不同多约能存储5m左右的数据，如果用sessionStorage存储大数据，最好加过期时间（默认365天），每次打开浏览器将会对过期的数据进行清理
// 应该尽量使用sessionStorage，防止在用户浏览器中残留数据
function getDefaultExpire() {
  return +new Date() + (60 * 60 * 24 * 365) * 1000
}
function processSet(store, cache) {
  return function (key, value, expire) {
    cache[key] = {}
    if (typeof expire === 'number') {
      cache[key].expire = expire !== 0 ? +new Date() + expire * 1000 : 0
    } else {
      cache[key].expire = getDefaultExpire()
    }
    cache[key].value = value
    store.setItem('cache', JSON.stringify(cache))
  }
}
function processGet(cache) {
  return function (key, def) {
    var item = cache[key]
    if (item && item.expire && +new Date() > item.expire) {
      item = undefined
    }
    // 返回数据前切断引用关系
    return item === undefined ? def : JSON.parse(JSON.stringify(item.value))
  }
}
function processDelete(store, cache) {
  return function (...keys) {
    if (keys.length) {
      keys.forEach((item) => {
        delete cache[item]
      })
      store.setItem('cache', JSON.stringify(cache))
    }
  }
}
class Cache {
  constructor() {
    this.cache = JSON.parse(localStorage.getItem('cache'))
    // 每次起动清理sessionStorage中的过期数据
    if (this.cache) {
      var needClear = false
      for (var key in this.cache) {
        var item = this.cache[key]
        if (item.expire !== undefined) {
          if (item.expire && +new Date() > item.expire) {
            delete this.cache[key]
            needClear = true
          }
        } else {
          item.expire = getDefaultExpire()
          needClear = true
        }
      }
      if (needClear) {
        localStorage.setItem('cache', JSON.stringify(this.cache))
      }
    } else {
      this.cache = Object.create(null)
    }
    this.sessionCache = JSON.parse(sessionStorage.getItem('cache')) || Object.create(null)
  }
  // 设置一个缓存,如果以前这个key已设置过值，会被覆盖，expire为过期时间，单位为秒，默认一年
  set(key, value, expire) {
    processSet(localStorage, this.cache)(key, value, expire)
  }
  sessionSet(key, value, expire) {
    processSet(sessionStorage, this.sessionCache)(key, value, expire)
  }
  // 获取一个缓存的值，如果不存在返回undefined，或返回参数中提供的def缺省值
  get(key, def) {
    return processGet(this.cache)(key, def)
  }
  sessionGet(key, def) {
    return processGet(this.sessionCache)(key, def)
  }
  // 删除一个缓存的值,可同时传入多个key
  delete(params) {
    processDelete(localStorage, this.cache)(params)
  }
  sessionDelete(params) {
    processDelete(sessionStorage, this.sessionCache)(params)
  }
}
export default new Cache()
