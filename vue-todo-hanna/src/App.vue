<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addItem="addOneItem"></TodoInput>
    <TodoList v-bind:propsdata="todoItems" 
          v-on:removeItem="removeOneItem" 
          v-on:toggleItem="toggleOneItem"></TodoList>
    <TodoFooter v-on:removeAllItem="clearAllItem"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue';
import TodoList from './components/TodoList.vue';
import TodoInput from './components/TodoInput.vue';
import TodoFooter from './components/TodoFooter.vue';

export default {
  data: function() {
    return {
      todoItems: []
    }
  },
  created: function(){
      if(localStorage.length > 0) {
          for (let i=0; i<localStorage.length; i++) {
              if(localStorage.key(i) !== 'loglevel:webpack-dev-server') {
                // this.todoItems.push(localStorage.key(i));
                  this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
              }
          }
      }
  },
  components: {
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter
  },
  methods: {
    addOneItem: function(todoItem) {
      const obj = {completed: false, item: todoItem};
				// 저장하는 로직
			localStorage.setItem(todoItem, JSON.stringify(obj));
      this.todoItems.push(obj);
    },
    removeOneItem: function(items, index){
      localStorage.removeItem(items.item);
      this.todoItems.splice(index, 1);
    },
    toggleOneItem: function(items, index){
      // items.completed = !items.completed;
      this.items[index].completed = !this.items[index].completed;
      localStorage.removeItem(items.item);
      localStorage.setItem(items.item, JSON.stringify(items));
    },
    clearAllItem: function(){
      localStorage.clear();
      this.todoItems = [];
    }
  }
}
</script>

<style>
body {
  text-align: center;
  background-color: #F6F6F6;
}

input {
  border-style: groove;
  width: 200px;
}

button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0,0,0,0.03);
}
</style>
