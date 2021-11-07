import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);  // use는 vue의 플러그인

const storage = {
    fetch() {
        const arr = []; // this.todoItems 접근이 불가하기 때문에 선언
        if(localStorage.length > 0) {
            for (let i=0; i<localStorage.length; i++) {
                if(localStorage.key(i) !== 'loglevel:webpack-dev-server') {
                    // this.todoItems.push(localStorage.key(i));
                    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }
            }
        }
        return arr;
    }
}

export const store = new Vuex.Store({
    state: {
        todoItems: storage.fetch()
    },
    mutations: {
        addOneItem(state, todoItem) {
            const obj = {completed: false, item: todoItem};
            // 저장하는 로직
            localStorage.setItem(todoItem, JSON.stringify(obj));
            // this.todoItems.push(obj);
            state.todoItems.push(obj);
        },
        removeOneItem(state, payload){
            localStorage.removeItem(payload.item.item);
            // this.todoItems.splice(index, 1);
            state.todoItems.splice(payload.index, 1);
        },
        toggleOneItem(state, payload){
            // items.completed = !items.completed;
            state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
            localStorage.removeItem(payload.items.item);
            localStorage.setItem(payload.items.item, JSON.stringify(payload.items));
        },
        clearAllItem(state){
            localStorage.clear();
            // this.todoItems = [];
            state.todoItems = [];
        }
    }
});