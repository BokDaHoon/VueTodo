var Storage = function () {
  var storage = sessionStorage;
  storage.dataObject = '[]';
  return {
    fetch: function () {
      return JSON.parse(storage.getItem('dataObject'));
    },
    save: function (text) {
      var tempData = JSON.parse(storage.getItem('dataObject'));
      tempData.push({id: tempData.length, state: 'none', text: text});
      return storage.setItem('dataObject', JSON.stringify(tempData));
    },
    update: function (id, text) {
      var tempData = JSON.parse(storage.getItem('dataObject'));
      var matchObject = _.find(tempData, function (todo) { return todo.id === id });
      if (matchObject) {
        matchObject.text = text;
        matchObject.state = 'none';
      }
      storage.setItem('dataObject', JSON.stringify(tempData));
    },
    updateState: function (id, state) {
      var tempData = JSON.parse(storage.getItem('dataObject'));
      var matchObject = _.find(tempData, function (todo) { return todo.id === id });
      if (matchObject) {
        matchObject.state = state;
      }
      storage.setItem('dataObject', JSON.stringify(tempData));
    },
    delete: function (id) {
      var tempData = JSON.parse(storage.getItem('dataObject'));
      tempData = _.filter(tempData, function (todo) { return todo.id !== id });
      storage.setItem('dataObject', JSON.stringify(tempData));
    },
    deleteCompletedTodo: function () {
      var tempData = JSON.parse(storage.getItem('dataObject'));
      tempData = _.filter(tempData, function (todo) { return todo.state === 'none' });
      storage.setItem('dataObject', JSON.stringify(tempData));
    }
  }
}
