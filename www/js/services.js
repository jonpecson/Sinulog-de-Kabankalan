angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://pbs.twimg.com/profile_images/479740132258361344/KaYdH9hE.jpeg'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  }
})

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Ben Sparrow',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    notes: 'Odd obsession with everything',
    face: 'https://pbs.twimg.com/profile_images/479740132258361344/KaYdH9hE.jpeg'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    notes: 'Just the nicest guy',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];


  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})

.factory('DB', function($q, DB_CONFIG) {
  
    var self = this;
    self.db = null;

    self.init = function() {
        if (window.sqlitePlugin) {
            self.db = window.sqlitePlugin.openDatabase({
                name: DB_CONFIG.name
            });
        }
        else if (window.openDatabase)
            self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);

        for (var tableName in DB_CONFIG.tables) {
            var defs = [];
            var columns = DB_CONFIG.tables[tableName];
            for (var columnName in columns) {
                var type = columns[columnName];
                defs.push(columnName + ' ' + type);
            }
            var sql = 'CREATE TABLE IF NOT EXISTS ' + tableName + ' (' + defs.join(', ') + ')';
            self.query(sql);
        }

        self.insertAll
        ('subjects', [{
            "id": 1,
            "status" : "",
            "subjectName" : "Theology 1",   
            "desc" : "Faith and Creed and Basic Catholic Doctrine",
            "units" : 3,
            "course" : "BEED, BSED, BSBA, BSAct, BSA, BSIT, BSCS",
            "yearLevel" : 1,
            "semester" : 1
        }, {
            "id": 2,
            "status" : "",
            "subjectName" : "English 0",   
            "desc" : "English Plus",
            "units" : 3,
            "course" : "BEED, BSED, BSBA, BSAct, BSA, BSIT, BSCS",
            "yearLevel" : 1,
            "semester" : 1
        }, {
            "id": 3,
            "status" : "",
            "subjectName" : "Math 1",   
            "desc" : "College Algebra",
            "units" : 3,
            "course" : "BEED, BSED, BSBA, BSAct, BSA, BSIT, BSCS",
            "yearLevel" : 1,
            "semester" : 1
        }]);

    };

    self.insertAll = function(tableName, data) {
        var columns = [],
            bindings = [];

        for (var columnName in DB_CONFIG.tables[tableName]) {
            columns.push(columnName);
            bindings.push('?');
        }

        var sql = 'INSERT INTO ' + tableName + ' (' + columns.join(', ') + ') VALUES (' + bindings.join(', ') + ')';

        for (var i = 0; i < data.length; i++) {
            var values = [];
            for (var j = 0; j < columns.length; j++) {
                values.push(data[i][columns[j]]);
            }
            self.query(sql, values);
        }
    };

    self.delete = function(tablename, id) {
        var sql = 'DELETE '
    }

    self.query = function(sql, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();

        self.db.transaction(function(transaction) {
            transaction.executeSql(sql, bindings, function(transaction, result) {
                deferred.resolve(result);
            }, function(transaction, error) {
                deferred.reject(error);
            });
        });

        return deferred.promise;
    };

    self.fetchAll = function(result) {
        var output = [];

        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }

        return output;
    };

    return self;
})

.factory('Subjects', function(DB) {
    var self = this;

    self.getFirst = function(number) {
        return DB.query("SELECT * FROM subjects LIMIT ?", [number])
            .then(function(result) {
                return DB.fetchAll(result);
            });
    };

    self.getAllByName = function(name) {
        return DB.query("SELECT * FROM subjects WHERE name LIKE '%" + name.toLowerCase() + "%' ORDER BY subjectName")
            .then(function(result) {
                return DB.fetchAll(result);
            });
    };

    self.get = function(id) {
        return DB.query("SELECT * FROM subjects WHERE id = " + id)
            .then(function(result) {
                return DB.fetchAll(result);
            });
    };

    self.getByCourse = function(course, yearLevel, semester) {
        return DB.query("SELECT * FROM subjects WHERE course LIKE '%" + course + "%' AND yearLevel = " + yearLevel + " AND semester = " + semester)
            .then(function(result) {
                return DB.fetchAll(result);
            });
    };

    self.updateStatus = function(subjectId, status) {
        return DB.query("UPDATE subjects SET status = '" + status + "' WHERE id = " + subjectId)
            .then(function(result) {
                return result;
            });
    };
    return self;
});



