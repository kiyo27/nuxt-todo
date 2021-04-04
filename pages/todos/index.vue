<template>
  <section class="container">
    <h1>Todoリスト</h1>
    <div class="addArea">
      <input
        v-model="content"
        type="text"
        name="addName"
        placeholder="タスクを入力してください"
      />
      <button class="button button--green" @click="insert">追加</button>
    </div>
    <div class="Filter">
      <button
        class="button button--gray is-active"
        :class="{ 'is-active': !find_flg }"
        @click="flag_reset"
      >
        全て
      </button>
      <button
        class="button button--gray"
        :class="{ 'is-active': find_flg && find_state == '作業前' }"
        @click="find('作業前')"
      >
        作業前
      </button>
      <button
        class="button button--gray"
        :class="{ 'is-active': find_flg && find_state == '作業中' }"
        @click="find('作業中')"
      >
        作業中
      </button>
      <button
        class="button button--gray"
        :class="{ 'is-active': find_flg && find_state == '完了' }"
        @click="find('完了')"
      >
        完了
      </button>
    </div>
    <table class="Lists">
      <thead>
        <tr>
          <th>ID</th>
          <th>タスク</th>
          <th>登録日時</th>
          <th>状態</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in display_todos" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.content }}</td>
          <td>{{ item.created }}</td>
          <td>
            <select @change="changeState(item, $event)">
              <option :value="item.state" selected>{{ item.state }}</option>
              <option>作業前</option>
              <option>作業中</option>
              <option>完了</option>
            </select>
          </td>
          <td>
            <button class="button button--delete" @click="remove(item)">
              削除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => {
    return {
      content: '',
      find_state: '',
      find_flg: false,
    }
  },
  computed: {
    ...mapState(['todos']),
    display_todos() {
      if (this.find_flg) {
        const arr = []
        const data = this.todos
        data.forEach((element) => {
          if (element.state === this.find_state) {
            arr.push(element)
          }
        })
        return arr
      } else {
        return this.todos
      }
    },
  },
  methods: {
    insert() {
      if (this.content !== '') {
        this.$store.commit('insert', {
          content: this.content,
        })
        this.content = ''
      }
    },
    remove(todo) {
      this.$store.commit('remove', todo)
    },
    changeState(todo, event) {
      this.$store.commit('changeState', {
        todo,
        state: event.target.value,
      })
    },
    find(findState) {
      this.find_state = findState
      this.find_flg = true
    },
    flag_reset() {
      this.find_flg = false
    },
  },
}
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>
