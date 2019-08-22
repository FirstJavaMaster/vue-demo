// 分页查询的默认值
// 之所以写成函数的形式是为了每次被使用时都提供一个全新的"默认值",否则js对象引用传递导致此值被污染
function getDefaultPageQueryParams () {
  return {
    pageNo: 1,
    pageSize: 10,
    keyword: '',
    orderBy: ''
  }
}

// 精简js对象的字段, 如果字段的值为undefined/null/''时自动删除该字段
function simplifyObject (object) {
  Object.keys(object).forEach(key => {
    const value = object[key]
    if (value === undefined || value === null || value === '') {
      delete object[key]
    }
  })
  return object
}

// 覆盖对象的属性,但保留原对象(objectTo)的属性类型
function copyObjectKeepFieldType (objectFrom, objectTo) {
  Object.keys(objectFrom).forEach(key => {
    let value = objectFrom[key]
    // 如果目标对象原本没有对应字段, 或者对应字段是null/undefined时
    if (!objectTo.hasOwnProperty(key) || objectTo[key] === null || objectTo[key] === undefined) {
      if (!isNaN(value)) {
        value = Number(value)
      }
      objectTo[key] = value
      return
    }

    // 目标对象有对应字段
    switch (objectTo[key].constructor) {
      case String:
        objectTo[key] = String(value)
        break
      case Number:
        objectTo[key] = Number(value)
        break
      case Boolean:
        objectTo[key] = Boolean(value)
        break
      default:
        objectTo[key] = value
    }
  })
}

import pagination from "../components/pagination"

export default {
  data () {
    return {
      // 列表数据
      dataList: [],
      // 分页参数
      pageQueryParams: getDefaultPageQueryParams(),
      // 查询的总数据条数
      pageTotal: 0
    }
  },
  components: {pagination},
  methods: {
    // 通常在列表查询成功时调用此方法,用于将接口返回的分页数据同步到data和url上
    refreshQueryParams (pageQueryResponse) {
      // 从返回数据同步到data
      this.dataList = pageQueryResponse.data
      this.pageTotal = pageQueryResponse.total

      // 从data同步到url(删除没有值的字段)
      const pageQueryParams = simplifyObject(this.pageQueryParams)
      this.$router.replace({query: pageQueryParams})
    }
  },
  mounted () {
    // 页面渲染时判断url的参数,把参数的值同步到data中
    this.pageQueryParams = getDefaultPageQueryParams()
    copyObjectKeepFieldType(this.$route.query, this.pageQueryParams)
  }
}
