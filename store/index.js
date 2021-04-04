import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      todos: [],
      option: [
        {
          id: 0,
          label: '作業前',
        },
        {
          id: 1,
          label: '作業中',
        },
        {
          id: 2,
          label: '完了',
        },
      ],
    }),
    mutations: {
      insert: (state, obj) => {
        const d = new Date()
        const fmt =
          d.getFullYear() +
          '-' +
          ('00' + (d.getMonth() + 1)).slice(-2) +
          '-' +
          ('00' + d.getDate()).slice(-2) +
          ' ' +
          ('00' + d.getHours()).slice(-2) +
          ':' +
          ('00' + d.getMinutes()).slice(-2)
        const todosLength = state.todos.length
        const id = todosLength + 1
        state.todos.unshift({
          id,
          content: obj.content,
          created: fmt,
          state: '作業前',
        })
      },
      remove: (state, obj) => {
        for (let i = 0; i < state.todos.length; i++) {
          const ob = state.todos[i]
          if (ob.content === obj.content && ob.created === obj.created) {
            if (confirm('' + ob.content + 'を削除しますか？')) {
              state.todos.splice(i, 1)
              return
            }
          }
        }
      },
      changeState: (state, obj) => {
        const l = state.todos.length
        for (let i = 0; i < l; i++) {
          if (state.todos[i].id === obj.todo.id) {
            state.todos[i].state = obj.state
          }
        }
      },
    },
  })
}

export default createStore
