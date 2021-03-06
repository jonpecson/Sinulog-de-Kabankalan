angular.module('starter.services', [])

// let's create a re-usable factory that generates the $firebaseAuth instance
.factory("Auth", ["$firebaseAuth",  function($firebaseAuth) {
  var ref = new Firebase("https://sinulogdekabankalan.firebaseio.com//");
  return $firebaseAuth(ref);
}])

.factory('DB', function($q, DB_CONFIG) {
    var self = this;
    self.db = null;

    if (window.sqlitePlugin)
            self.db = window.sqlitePlugin.openDatabase({
                name: DB_CONFIG.name
            });
        else if (window.openDatabase)
            self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);

    self.init = function() {
        if (window.sqlitePlugin)
            self.db = window.sqlitePlugin.openDatabase({
                name: DB_CONFIG.name
            });
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

        self.insertAll('subjects', [{
            "id": 0,
            "status": "",
            "subjectName": "Psychology 1",
            "desc": "Gen. Psy. w/ Moral Regen & Drug Abuse Ed.",
            "units": 3,
            "course": "BEED, BSED, BSBA, BSAct, BSA, BSIT, BSCS",
            "yearLevel": 1,
            "semester": 1
        }, {
            "id": 1,
            "status": "",
            "subjectName": "Acctng. 1",
            "desc": "Principles of Accounting",
            "units": 6,
            "course": "BEED, BSED, BSBA, BSAct, BSA, BSIT, BSCS",
            "yearLevel": 1,
            "semester": 1
        }, {
            "id": 2,
            "status": "",
            "subjectName": "IT 101",
            "desc": "IT Fundamentals",
            "units": 3,
            "course": "BEED, BSED, BSBA, BSAct, BSA, BSIT, BSCS",
            "yearLevel": 1,
            "semester": 1
        }, {
            "id": 3,
            "status": "",
            "subjectName": "IT 102",
            "desc": "Programming 1",
            "units": 3,
            "course": "BEED, BSED, BSBA, BSAct, BSA, BSIT, BSCS",
            "yearLevel": 1,
            "semester": 1
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

    self.updateStatus = function(subjectId, status, dateModified) {
        return DB.query("UPDATE subjects SET status = '" + status + "', dateModified=" + dateModified + " WHERE id = " + subjectId)
            .then(function(result) {
                return result;
            });
    };

    return self;
});
