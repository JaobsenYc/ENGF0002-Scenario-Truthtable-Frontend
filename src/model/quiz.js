/* eslint-disable class-methods-use-this */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Quiz {
  // constructor() {}

  // 类中的方法可以代表一个用户行为
  async createQuiz(data) {
    return _axios({
      method: 'post',
      url: 'v1/quiz',
      data,
    })
  }

  // 在这里通过 async await 语法糖让代码同步执行
  // 1. await 一定要搭配 async 来使用
  // 2. await 后面跟的是一个 Promise 对象
  async getQuiz(id) {
    const res = await get(`v1/quiz/${id}`)
    return res
  }

  async editQuiz(id, info) {
    const res = await put(`v1/quiz/${id}`, info)
    return res
  }

  async deleteQuiz(id) {
    const res = await _delete(`v1/quiz/${id}`)
    return res
  }

  async getQuizs() {
    return _axios({
      method: 'get',
      url: 'v1/quiz',
      handleError: true,
    })
  }
}

export default new Quiz()
