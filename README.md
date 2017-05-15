# rdss-raml-validation-test

This is an example of RAML validation using raml.org's [raml-js-parser-2](https://github.com/raml-org/raml-js-parser-2).

A wrapper is defined that means a RAML file can be given as a command line argument to the program and it will be validated.

## Installation

```
npm install
```

## Running

### Valid example

This is a copy of the RAML from the [external API specification](https://github.com/JiscRDSS/rdss-external-api-spec).

```
node index.js examples/api.raml
```

Should output:

```
OrganisationType : StringTypeDeclaration
         type: [ 'string' ]
Organisation : ObjectTypeDeclaration
         type: [ 'object' ]
Value : ObjectTypeDeclaration
         type: [ 'object' ]
Vocabulary : ObjectTypeDeclaration
         type: [ 'object' ]
Error : ObjectTypeDeclaration
         type: [ 'object' ]
ErrorResponse : ObjectTypeDeclaration
         type: [ 'object' ]
```

### Invalid example

This copy of the API RAML file has a typo in a type declaration on line 7.

```
node index.js examples/api-bad.raml
```

Should output:
```
Api contains errors.
error: Inheriting from unknown type
error: Property 'organisationType' refers to unknown type 'OrganisationType'
error: Validating instance against unknown type: 'OrganisationType'
error: Validating instance against unknown type: 'OrganisationType'
error: Inheriting from unknown type
error: Validating instance against unknown type: 'OrganisationType'
```

