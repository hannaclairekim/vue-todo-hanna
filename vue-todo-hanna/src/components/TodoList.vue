<template>
  <div>
    <transition-group name="list" tag="ul">
      <!-- <ul> -->
          <li v-for="(items, index) in this.$store.state.todoItems" v-bind:key="items.item">
            <i class="checkBtn fas fa-check" v-bind:class="{checkBtnCompleted: items.completed}" 
                v-on:click="toggleComplete(items, index)"></i>
            <span v-bind:class="{textComplited: items.completed}">{{items.item}}</span>
            <span class="removeBtn" v-on:click="removeTodo(items, index)">
                <i class="removeBtn fas fa-trash-alt"></i>
            </span>
          </li>
      <!-- </ul> -->
      </transition-group>
  </div>
</template>

<script>
export default {
    methods: {
        removeTodo(item, index) {
            // this.$emit('removeItem', item, index);
            this.$store.commit('removeOneItem', {item, index});
        },
        toggleComplete(items, index) {
            // this.$emit('toggleItem', items, index);
            this.$store.commit('toggleOneItem', {items, index});
        }
    }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted {
  color: #b3adad;
}
.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}

/* 리스트 아이템 트랜지션 효과 */
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>