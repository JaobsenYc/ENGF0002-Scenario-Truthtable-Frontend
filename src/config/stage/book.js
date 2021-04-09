const quizRouter = {
  route: null,
  name: null,
  title: 'Quiz management',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/quiz/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: 'Add quiz',
      type: 'view',
      name: 'QuizCreate',
      route: '/quiz/add',
      filePath: 'view/quiz/quiz-create.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: 'Quiz List',
      type: 'view',
      name: 'QuizCreate',
      route: '/quiz/list',
      filePath: 'view/quiz/quiz-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default quizRouter
