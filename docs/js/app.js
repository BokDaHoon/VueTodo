var app = new Vue({
	el: '#app',
	data: function () {
		return {
			storage: {},
			todoList: []
		}
	},
	created: function () {
		this.storage = new Storage();
		this.loadTodoList();
	},
	methods: {
		loadTodoList: function () {
			this.todoList = this.storage.fetch();
		},
		inputTodo: function (event) {
			if (event.keyCode === 13 && event.target.value !== '') {
				this.storage.save(event.target.value);
				event.target.value = '';
				this.loadTodoList();
			}
		},
		deleteTodo: function (todoId, event) {
			this.storage.delete(todoId);
			this.loadTodoList();
		},
		editTodo: function (todoId, event) {
			if (event.keyCode === 13 && event.target.value !== '') {
				this.storage.update(todoId, event.target.value);
				this.loadTodoList();
			}
		},
		todoState: function (state) {
			if (state === 'none') {
				return null;
			}
			return state
		},
		todoComplete: function (todoId, event) {
			this.storage.updateState(todoId, ((event.target.checked === true) ? 'completed' : 'none'));
			this.loadTodoList();
		},
		todoChangeEditMode: function (todoId) {
			this.storage.updateState(todoId, 'editing');
			this.loadTodoList();
		},
		deleteCompletedTodo: function () {
			this.storage.deleteCompletedTodo();
			this.loadTodoList();
		},
		cancelEdit: function (todoId) {
			this.storage.updateState(todoId, 'none');
			this.loadTodoList();
		}
	},
	computed: {
		leftTodoCount: function () {
			return _.filter(this.todoList, function (todo) { return todo.state !== 'completed' }).length;
		}
	},
	directives: {
		focus: function (el) {
			el.focus();
		}
	}
})
