{
   var reflectionsList = {};
   var studentsList = [];
}

Preamble
  = (TextLine)+ Reflections {return {'studentsEmails':studentsList, 'reflectionsDict':reflectionsList};}
  
Reflections
  = (Reflection [\n]*)+ {return reflectionsList;}

Reflection
  = email:Email "," name:Name "," text:Text {studentsList.push(email);reflectionsList[email] = {'text':text, 'name':name};}
  / email:Email "," name:Name "," {studentsList.push(email);reflectionsList[email] = {'text':'', 'name':name};}

Name
  = name:([A-z]/" ")+ {return name.join("")}
Text
  = textlines:TextLine+ {return textlines.join("")}

TextLine
  = !Email text:[^\n]+ [\n]* {return text.join("");}
  / !Email [\n] {return "";}


Email
  = login:[a-z/0-9]+ "@bepid.cin.ufpe.br" {return login.join("") + "@bepid.cin.ufpe.br"}