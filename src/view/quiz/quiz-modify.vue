<template>
  <div class="container">
    <div class="title">
      <span>Edit</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> Return </span>
    </div>
    <el-divider></el-divider>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="100px" v-loading="loading" @submit.native.prevent>
            <el-form-item label="Expression" prop="title">
              <el-input size="medium" v-model="form.expression" placeholder="Enter an expression"></el-input>
            </el-form-item>
            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm('form')">Save</el-button>
              <el-button @click="resetForm('form')">Reset</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import quiz from '@/model/quiz'

export default {
  props: {
    editQuizID: {
      type: Number,
    },
  },
  data() {
    return {
      loading: false,
      form: {
        id: '',
        expression: '',
      },
    }
  },
  async mounted() {
    this.loading = true
    this.form = await quiz.getQuiz(this.editQuizID)
    this.loading = false
  },
  methods: {
    async submitForm() {
      const res = await quiz.editQuiz(this.editQuizID, this.form)
      if (res.code < window.MAX_SUCCESS_CODE) {
        this.$message.success(`${res.message}`)
        this.$emit('editClose')
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    back() {
      this.$emit('editClose')
    },
  },
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 0;
}

.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;

    .back {
      float: right;
      margin-right: 40px;
      cursor: pointer;
    }
  }

  .wrap {
    padding: 20px;
  }

  .submit {
    float: left;
  }
}
</style>
