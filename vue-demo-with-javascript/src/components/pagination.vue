<template>
  <el-row type="flex" justify="end" v-if="total" class="pagination">
    <!--注意这里的v-if判断,依靠此判断来保证pageQueryMixins已经准备完成,解决vue中mixins功能异步的问题-->
    <el-pagination background layout="prev, pager, next" :total="total"
                   :page-size="pageQueryParams.pageSize" :current-page.sync="pageQueryParams.pageNo"
                   @current-change="change">
    </el-pagination>
  </el-row>
</template>

<script>

  export default {
    name: 'pagination',
    props: {
      total: Number,
      pageQueryParams: Object
    },
    methods: {
      change () {
        this.$emit('change')
      }
    }
  }
</script>

<style scoped>
  .pagination {
    margin: 1rem 0;
  }
</style>