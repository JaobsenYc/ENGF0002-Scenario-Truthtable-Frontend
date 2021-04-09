<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header"><div class="title">Quiz List</div></div>
      <!-- 表格 -->
      <lin-table
        :tableColumn="tableColumn"
        :tableData="tableData"
        :operate="operate"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
        @row-click="rowClick"
        v-loading="loading"
      ></lin-table>
    </div>

    <!-- 编辑页面 -->
    <quiz-modify v-else @editClose="editClose" :editQuizID="editQuizID"></quiz-modify>
  </div>
</template>

<script>
import quiz from '@/model/quiz'
import LinTable from '@/component/base/table/lin-table'
import QuizModify from './quiz-modify'

export default {
  components: {
    LinTable,
    QuizModify,
  },
  data() {
    return {
      tableColumn: [
        { prop: 'Expression', label: 'Expression' },
        { prop: 'Average Grade', label: 'Average Grade' },
        { prop: 'Submission', label: 'Submission' },
      ],
      tableData: [],
      operate: [],
      showEdit: false,
      editQuizID: 1,
    }
  },
  async created() {
    this.loading = true
    await this.getQuizs()
    this.operate = [
      { name: 'Edit', func: 'handleEdit', type: 'primary' },
      {
        name: 'Delete',
        func: 'handleDelete',
        type: 'danger',
        permission: '删除图书',
      },
    ]
    this.loading = false
  },
  methods: {
    async getQuizs() {
      try {
        const quizs = await quiz.getQuizs()
        this.tableData = quizs
      } catch (error) {
        if (error.code === 10020) {
          this.tableData = []
        }
      }
    },
    handleEdit(val) {
      console.log('val', val)
      this.showEdit = true
      this.editQuizID = val.row.id
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该图书, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await quiz.deleteQuiz(val.row.id)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.getQuizs()
          this.$message({
            type: 'success',
            message: `${res.message}`,
          })
        }
      })
    },
    rowClick() {},
    editClose() {
      this.showEdit = false
      this.getQuizs()
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 30px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      height: 59px;
      line-height: 59px;
      color: $parent-title-color;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}
</style>
