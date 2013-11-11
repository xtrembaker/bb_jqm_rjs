/**
 * class to manage a database
 * src : http://developer.apple.com/library/safari/#documentation/iPhone/Conceptual/SafariJSDatabaseGuide/UsingtheJavascriptDatabase/UsingtheJavascriptDatabase.html
 * src : building iPhoneApp with HTML, CSS and Javascript - Jonathan Stark - O'Reilly
 * Tutorial : you can specify 4 types of callbacks function for createTables, save, update, deleteRow, select and reset methods:
 The 4 callbacks type are
 - trSuccess executed if a whole transaction has succeeded
 - trError executed if a whole transaction has failed
 - sqlSuccess executed after each successful sql query in a transaction
 - sqlError executed after each failed sql query in a transaction
 SQL errors are automatically logged in the errors table

 You must use a json array to pass your specific callabacks functions to the database method you want to use

 * @param string dbShortName
 * @param string dbVersion
 * @param string dbDisplayName
 * @param int dbMaxSize max 65536 bytes -> 5 MB
 * @param lib.SchemaSQL dbSchema
 * @author sebastianharris & nicolasblanchot
 */
//define([
//  'lib/lib',
//  'lib/schema_sql'
//], function(
//  lib,
//  SchemaSQL
//) {

  var worker = self;

  var Database = function(dbShortName, dbVersion, dbDisplayName, dbMaxSize){
    // public attributes
    this.schema = {};
    // private attributes
    var shortName = dbShortName;
    var version = dbVersion;
    var displayName = dbDisplayName;
    var maxSize = 65536;
//    if (lib.isNumeric(dbMaxSize) && dbMaxSize < 65536) {
//      maxSize = parseInt(dbMaxSize, 10);
//    }
    var db = null;
    //var debug = toDebug;

    var queryBuffer = [];

    /**
     * Sql Query default error handling
     * src : building iphone App with HTML, CSS and JS
     * @author Jonathan Stark & nicolasblanchot
     */
    var errorHandler = function(transaction, error) {
//      if (debug) {
//        alert('Oops. Error was ' + error.message + ' (Code ' + error.code + ')');
//      }
      var values = [
        error.code,
        error.message,
        lib.getDatetime()
      ];
      // store errors in errors table
      transaction.executeSql('INSERT INTO errors (code, message, created_at) VALUES (?, ?, ?);',
        values
      );
      return false;
    };
    /**
     * nulldata handling function (necessary for handling errors more easily
     * when you do not has data in your SQL query)
     * @author nicolasblanchot
     */
    var nullDataHandler = function(transaction, results) {
      return false;
    };
    /**
     * Database connection error handling
     * src : building iphone App with HTML, CSS and JS
     * @author nicolasblanchot
     */
    var transactionErrorHandler = function() {
      return false;
    };
    /**
     * nulldata handling function (necessary for handling errors more easily
     * when you do not has data in your SQL query)
     * @author nicolasblanchot
     */
    var transactionSuccessHandler = function() {
      return false;
    };


    /**
     * generate an ad hoc function to change db schema by droping old tables and
     * creating new ones when changing db version number
     * @param  {object} callbacks callbacks object
     * @param  {Schema} schema    database schema object
     * @author nicolasblanchot and arnaudbusson
     */
    var createTablesTransactionGen = function(callbacks, schema) {
      // get table list
      var tables = schema.getTables();
      

      // create a specific sql success function executed after dropping a table
      var createSpecicifTableGen = function(name) {
        return function createSpecicifTable(tr) {
          var query = schema.getCreationTableQuery(tables[name]);
          tr.executeSql(
            query,
            [],
            callbacks.sqlSuccess,
            callbacks.sqlError
          );
        };
      };

      var modifySchemaTransaction = function (tr) {
        // parse the database schema and drop each table that exists.
        for (var tblName in tables) {
          tr.executeSql(
            'DROP TABLE IF EXISTS ' + tblName + ';',
            [],
            createSpecicifTableGen(tblName),
            callbacks.sqlError
          );
        }
      };
      return modifySchemaTransaction;
    };

    var changeVersion = function(oldVersion, newVersion, transaction,
      transationError, transactionSuccess) {
      try {
        // comment out for crash recovery.
        db.changeVersion(
          oldVersion, newVersion, transaction, transationError, transactionSuccess
        );
      } catch(e) {
        alert('changeversion 1.0 -> 2.0 failed');
        alert('DB Version: '+db.version);
      }
    };

    // private methods
    function execute(queryType, query, data, callbacks) {
      // log in console
      if (debug) {
        console.log(query);
        console.log(data);
      }
      // execute query
      try {
        if (!db) {
          queryBuffer.push(arguments);
          return;
        }
        db.transaction(
          function(tr) {
            tr.executeSql(
              query,
              data,
              callbacks.sqlSuccess,
              callbacks.sqlError
            );
          },
          callbacks.trError,
          callbacks.trSuccess
        );
      } catch(e) {
        if(debug){
          alert('Error - ' + queryType + ' : ' + e.message);
        }
      }
    }
    /**
     * get the callbacks functions to use after sql queries succeed or fail and
     * after transaction succeed or fail. Defautl Error loggin is always active
     * event if you use your own sqlError callback function
     * @param json myCallbacks
     * @author nicolasblanchot
     */
     function getCallbacks(myCallbacks){
      if (!myCallbacks){
        myCallbacks = {};
      }
      if (!myCallbacks.trSuccess){
        myCallbacks.trSuccess = transactionSuccessHandler;
      }
      if (!myCallbacks.trError){
        myCallbacks.trError = transactionErrorHandler;
      }
      if (!myCallbacks.sqlSuccess){
        myCallbacks.sqlSuccess = nullDataHandler;
      }
      if (!myCallbacks.sqlError){
        myCallbacks.sqlError = errorHandler;
      } else {
        // add the custom callback to the default comportement
        var myErrorHandling = myCallbacks.sqlError;
        myCallbacks.sqlError = function(transaction, error){
          errorHandler(transaction, error);
          myErrorHandling();
        };
      }
      return myCallbacks;
    }
    
    this.schema.tablesList = {};
    
    this.schema.addTable = function(table) {
      this.tablesList[table.name] = table;
    };
    /**
     * get the sql description of a specific table
     * @param string tableName
     * @return string
     * @author nicolasblanchot
     */
    this.schema.getTable = function(tableName) {
      return this.tablesList[tableName];
    };
    /**
     * get the sql description of a specific table
     * @param string tableName
     * @author nicolasblanchot
     */
    this.schema.deleteTable = function(tableName) {
      if(this.tablesList[tableName] !== undefined) {
        this.tablesList[tableName] = undefined;
      }
    };
    /**
     * get the sql description of a specific table
     * @retrun array
     * @author nicolasblanchot
     */
    this.schema.getTables = function() {
      return this.tablesList;
    };
    /**
     * Construct the SQL Query to create a table
     * @param json table
     */
    this.schema.getCreationTableQuery = function(table) {
      var fieldList = [];
      var fields = table.fields;
      fields.created_at = "DATETIME";
      fields.updated_at = "DATETIME";
      for (var fieldName in fields) {
        fieldList.push(fieldName + " " + fields[fieldName]);
      }
      query = "CREATE TABLE IF NOT EXISTS " + table.name + " (" +
        fieldList.join(',');

      if (table.primary_key !== undefined && table.primary_key.length > 0){
        query += ", PRIMARY KEY(" + table.primary_key.join(',') + ")";
      }
      query += ");";
      return query;
    };
    
    /**
    * get the current datetime (MySQL format)
    * @author sebastianharris
    */
   this.getDatetime = function(){
    var time = new Date();
    var year = lib.leadingChars(time.getFullYear(), 4);
    var month = lib.leadingChars(time.getMonth() + 1);
    var day = lib.leadingChars(time.getDate());
    var hours = lib.leadingChars(time.getHours());
    var minutes = lib.leadingChars(time.getMinutes());
    var seconds = lib.leadingChars(time.getSeconds());
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
   };
   
   /**
   * modify a number to transform it in string adding a first character if neccessary
   * @param int number
   * @param int length
   * @param string character
   * @author sebastianharris
   */
  this.leadingChars = function(number, length, character){
  	if(!character){
  		character = "0";
  	}
  	if(!length){
  		length = 2;
  	}
  	var nb = number.toString();
  	if(nb.length < length){
  		for(var i = 0; i <= length - nb.length; i++){
  			nb = character + nb;
  		}
  	}
  	return nb;
  };

    //privileged methods
    /**
     * initialize the connection to the database
     * src : safarir reference library
     * @author sebastianharris
     */
    this.connect = function(myCallbacks) {
      var callbacks = getCallbacks(myCallbacks);
      //add errors table in schema to log transaction errrors
      this.schema.addTable({
        "name": "errors",
        "fields": {
          "id" : "INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT",
          "code" : "INT(1) NOT NULL DEFAULT ''",
          "message"  : "TEXT NOT NULL DEFAULT ''"
        },
        "primary_key" : []
      });

      var creationTrSuccess = function() {
        myCallbacks.trSuccess();

        queryBuffer.forEach(function(el, ind) {
          execute(el[0], el[1], el[2], el[3]);
        });
        queryBuffer = [];
      };
      
      try {
        if (!openDatabase) {
            alert('database is not supported');
        } else {
          db = openDatabase(shortName, '', displayName, maxSize);
          // check if we have to change version
          if (db.version != version && db.changeVersion) {
            var changeVersionFct = createTablesTransactionGen(callbacks, this.schema);

            changeVersion(
              db.version,
              version,
              changeVersionFct,
              callbacks.trError, //transaction error handler
              creationTrSuccess //transaction success handler
            );
          } else {
            //self.postMessage('creationTrSuccess');
            creationTrSuccess();
          }
        }
      } catch(e) {
        var errorCaught = {
          error : e
        };
        // Error handling code goes here.
        if (e == 2) {
            // INVALID_STATE_ERR  => Version number mismatch.
            alert('Invalid database version.');
        } else {
            alert('Unknown error ' + e + '.');
        }
        return;
      }
    };
    /**
     * Create database tables
     * @param json callbacks
     * @author sebastianharris & nicolasblanchot
     */
    this.createTables = function(myCallbacks) {
      var callbacks = getCallbacks(myCallbacks);
      var tables = this.schema.getTables();
      try {
        db.transaction(
          createTablesTransactionGen(callbacks, this.schema),
          callbacks.trError, //transaction error handler
          callbacks.trSuccess //transaction success handler
        );
      } catch (e){
        console.log(e);
      }
    };
    /**
     * Reset your database or specific tables. Dropped tables are automatically created again.
     * @param json myCallbacks
     * @param array tablesName
     * @author sebastianharris & nicolasblanchot
     */
    this.reset = function(myCallbacks, tablesName){
      // get callbacks function
      var callbacks = getCallbacks(myCallbacks);
      // modify callbacks.trSuccess in order to recreate tables on success
      var myTrSuccess = callbacks.trSuccess;
      var that = this;
      callbacks.trSuccess = function(){
        that.createTables({
          trSuccess : myTrSuccess
        });
      };
      // get tables to drop
      if (!tablesName){
        tablesName = Object.keys(this.schema.getTables());
      }
      // drop tables
      db.transaction(
        function(tr) {
          tablesName.forEach(function(item, ind){
            tr.executeSql(
              'DROP TABLE IF EXISTS ' + item + ';',
              [],
              callbacks.sqlSuccess,
              callbacks.sqlError
            );
          });
        },
        callbacks.trError,
        callbacks.trSuccess
      );
    };
    /**
     * Execute an SQL query
     * @param string query
     * @param array data
     * @param json myCallbacks
     * @author sebastianharris & nicolasblanchot
     */
    this.sql = function(query, data, myCallbacks){
      var callbacks = getCallbacks(myCallbacks);
      if (!data){
        data = [];
      }
      execute('sql', query, data, callbacks);
    };
    /**
     * Save data in the specified table (no multiple item saving)
     * @param string tableName
     * @param json item
     * @param json myCallbacks
     * @author sebastianharris & nicolasblanchot
     */
    this.save = function(tableName, item, myCallbacks) {
      var table_structure = this.schema.tablesList[tableName].fields;
      // get callbacks methods
      var callbacks = getCallbacks(myCallbacks);
      // prepare query
      var columns = [];
      var values = '';
      var data = [];
      item.created_at = this.getDatetime();
      item.updated_at = this.getDatetime();
      for(var p in item){
        if(p in table_structure){
          columns.push(p);
          data.push(item[p]);
          values += (values === '')? '?' : ', ?';
        }
      }
      var query = "INSERT INTO " + tableName + " (" + columns.join(', ') + ") VALUES (" + values + ")";
      execute('insert', query, data, callbacks);
    };
    /**
     * Update a row in a table
     * @param string tableName
     * @param json values
     * @param string conditions
     * @param string conditionsData
     * @param json myCallbacks
     * @author sebastianharris & nicolasblanchot
     */
     this.update = function(tableName, values, conditions, conditionsData, myCallbacks) {
      // get custom callback functions
      var callbacks = getCallbacks(myCallbacks);
      // add datetime to the row
      values.updated_at = lib.getDatetime();
      // prepare the query
      var fieldsToChange = '';
      var data = [];

      for (var p in values){
        if (p != 'id') {
          data.push(values[p]);
          fieldsToChange += (fieldsToChange === '') ? p + ' = ?' :  ', ' + p + ' = ?';
        }
      }
      conditionsData.forEach(function(item, ind) {
        data.push(item);
      });

      // execute query
      var query = "UPDATE " + tableName + " SET " + fieldsToChange;
      if (conditions && conditions !== ''){
        query += " WHERE " + conditions;
      }
      execute('update', query, data, callbacks);
    };
    /**
     * delete row in a table
     * @param string tableName
     * @param string conditions
     * @param array conditionsData
     * @param json myCallbacks
     * @author sebastianharris & nicolasblanchot
     */
    Database.prototype.deleteRows = function(tableName, conditions, conditionsData, myCallbacks){
      // get callbacks
      var callbacks = getCallbacks(myCallbacks);
      // query
      var query = 'DELETE FROM ' + tableName;
      if (conditions && conditions !== ''){
        query += ' WHERE ' + conditions ;
      }
      if (!conditionsData){
        conditionsData = [];
      }
      execute('delete', query, conditionsData, callbacks);
    };
    /**
     * find rows in a table
     * @param string tableName
     * @param array fields
     * @param string conditions
     * @param array conditionsData
     * @param json myCallbacks
     * @param json order
     * @param int nbRows
     * @param int offset
     * @author sebastianharris & nicolasblanchot
     */
    this.find = function(tableName, fields, conditions, conditionsData, myCallbacks, order, nbRows, offset){
      var callbacks = getCallbacks(myCallbacks);
      if(!nbRows){
        nbRows = '';
      }
      if(!offset){
        offset = '';
      }
      var query = "SELECT " + fields.join(', ') + " FROM " + tableName;

      if (conditions && conditions !== '' && conditionsData &&
       conditionsData !== []){
        query += " WHERE " + conditions;
      } else {
        conditions = '';
        conditionsData = [];
      }
      if (order && order !== '' && order !== {}){
        var ord = '';
        for (var el in order){
          var str = el + ' ' + order[el];
          ord += (ord === '')? str : ', ' + str;
        }
        query += " ORDER BY " + ord;
      }
      if (nbRows && nbRows !== '' && nbRows != -1){
        query += " LIMIT " + nbRows;
      }
      if (offset && offset !== '' && offset != -1){
        query += " OFFSET " + offset;
      }
      execute('select', query, conditionsData, callbacks);
    };
  };
  
  
  self.onmessage = function(event){
    var data = JSON.parse(event.data);
    if('method' in data){
      switch(data.method){
        case 'createDb':
          db = openDatabase('mytestdb', '1.0', 'my first database', 2 * 1024 * 1024);
          db.transaction(function(tx){
            tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)',[],function(){
              worker.postMessage('create logs table');
            });
            tx.executeSql('INSERT INTO LOGS (id,log) VALUES (?, ?)', [1, 'toto'],function(){
              worker.postMessage('insert into logs');
            });
            tx.executeSql('INSERT INTO LOGS (id,log) VALUES (?, ?)', [2, 'titi'],function(){
              worker.postMessage('insert into logs');
            });
          });
          
          //self.postMessage('coucou');
          
          db.transaction(function (tx) {
            worker.postMessage('blibil');
            tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) {
              var len = results.rows.length, i;
              worker.postMessage(len);
              //msg = "";
  //            document.querySelector('#status').innerHTML +=  msg;
              for (i = 0; i < len; i++){
                worker.postMessage(results.rows.item(i).log );
                 //alert(results.rows.item(i).log );
              }
            }, function(){
              worker.postMessage('error from read...');
            });
         });
          
          //var database = new Database(data.data.shortName, data.data.version, data.data.displayName, 2 * 1024 * 1024);
//          var callbacks = {
//            trSuccess : data.trSuccess,
//            trError : data.trError
//          }
//          var connect = database.connect(callbacks);
//          var afterConnect = {connect : connect};
          
          break;
        case 'insertTable':
          db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) {
              var len = results.rows.length, i;
              worker.postMessage(len);
              //msg = "";
  //            document.querySelector('#status').innerHTML +=  msg;
              for (i = 0; i < len; i++){
                worker.postMessage(results.rows.item(i).log );
              }
            }, function(){
              worker.postMessage('error from read...');
            });
         });
          
          break;
          
      }
    }
  }
  
  //return Database;
//});
