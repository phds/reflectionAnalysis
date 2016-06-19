// {
//   "statements": [
//     {
//       "question": "Como foi o processo, quais os principais benefícios e os principais desafios de se conceber em equipe uma solução \“long tail\" usando CBL?",
//       "id": 1
//     },
//     {
//       "question": "Neste meu primeiro contato desenvolvendo para iOS, pude perceber que...",
//       "id": 2
//     },
//   ]
// }

// {
//   "statement": {
//     "question": "Como foi o processo, quais os principais benefícios e os principais desafios de se conceber em equipe uma solução \“long tail\" usando CBL?",
//     "id": 1
//   }
//   "reflections": [
//     {
//       "id": 132
//       "student_id": 22
//       "text": "Me concentrar em entregar algo de valor para o usuário; a focar no que realmente importa e de que forma podemos passar a nossa solução para ele.",
//     },
//     {
//       "id": 133
//       "student_id": 53
//       "text": "Me ajudou a ter uma ideia de como as features do produto iriam interagir e como isso seria a experiência disso como produto.",
//     }
//   ]
// }
  
  Parse.initialize("YALt9tjcUpW61Hz5aIPYbehm9uCgh5NXXRVM18T6", "5wwhJ6hfqu8cG4s6jMKMQWrmImiQKDTE9trvgL6x");

  function getReflectionsByStatementJSON(statementId) {
    var promise = new RSVP.Promise(function(fulfill, reject) {
        var ReflectionStatement = Parse.Object.extend('ReflectionStatement');
        var reflectionStatementQuery = new Parse.Query(ReflectionStatement);
        reflectionStatementQuery.include('reflections.author');
        reflectionStatementQuery.get(statementId).then(function(statement) {
          var res = {};
          res["statement"] = {"id":statement.id, "question": statement.get('text')};
          res["reflections"] = [];

          var reflections = statement.get('reflections');
          _.each(reflections, function(reflection) {
            res["reflections"].push({"id":reflection.id, "student_id":reflection.get('author').id, "text":reflection.get('text')});
          })
          fulfill(res);
        })
    });
    return promise;
  }

  function getReflectionStatementsJSON() {
    //This function only returns reflections from the Bepid 2016 Class

    var promise = new RSVP.Promise(function(fulfill, reject) {
      var res = {"statements":[]};
      var classId = '1Z1D0PkvC9';

      var CBLClass = Parse.Object.extend('CBLClass');
      var cblClassQuery = new Parse.Query(CBLClass);
      return cblClassQuery.get(classId).then(function(cblClass) {
        var ReflectionStatement = Parse.Object.extend('ReflectionStatement');
        var query = new Parse.Query(ReflectionStatement);
        query.equalTo('cblClass', cblClass);
        return query.find().then(function(statements) {
          _.each(statements, function(statement) {
            var s = {'id': statement.id, 'question': statement.get('text')};
            res["statements"].push(s);
          })
          fulfill(res);
        })  
      })

    })
    return promise;
  }  
