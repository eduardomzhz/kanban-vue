let kanban = new Vue({
  el: '#kanban',
  data: {
    taskList: JSON.parse(localStorage.getItem('kanban') || '[]'),
    lastId: Number(localStorage.getItem('lastId') || 1),
    newTask: '',
    inputEnable: false
  },
  computed: {
    currentDate: function() {
      let date = new Date();
      return date.getDate() + '/' + Number(date.getMonth() + 1) + '/' + date.getFullYear();
    }
  },
  watch: {
    taskList: {
      handler: function(taskList) {
        this.saveTaskList();
      }
    }
  },
  methods: {
    addTask: function() {
      if (this.newTask !== '') {
        this.taskList.push({
          id: this.lastId,
          title: this.newTask,
          status: 'todo',
          dateCreated: this.currentDate,
          dateEdited: ''
        });
        this.newTask = '';
        this.lastId += 1;
      }
    },
    taskInStatus: function(status) {
      return this.taskList.filter(function(task) {
        return task.status === status;
      });
    },
    taskIndex: function(id) {
      return this.taskList.findIndex(function(task) {
        return task.id === id;
      });
    },
    moveTaskTo: function(id, status) {
      let index = this.taskIndex(id);
      if (index > -1) {
        this.taskList[index].status = status;
        this.taskList[index].dateEdited = this.currentDate;
        this.saveTaskList();
      }
    },
    removeTask: function(id) {
      let index = this.taskIndex(id);
      if (index > -1) {
        this.taskList.splice(index, 1);
      }
    },
    saveTaskList: function() {
      localStorage.setItem('kanban', JSON.stringify(this.taskList));
      localStorage.setItem('lastId', JSON.stringify(this.lastId));
    }
  }
});
