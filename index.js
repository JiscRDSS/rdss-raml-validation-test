// step1
var raml = require("raml-1-parser");

// step2
var fs = require("fs");
var path = require("path");

// Here we create a file name to be loaded
var fName = path.resolve(__dirname, process.argv[2]);

// Parse our RAML file with all the dependencies
var api;

try {
    api = raml.loadApiSync(apiPath = fName, options = { rejectOnErrors: true });
}
catch(err) {
    console.log(err.message);
    for(var i = 0; i < err.parserErrors.length; i++) {
        console.log("error: " + err.parserErrors[i].message);
    }

    return;
}

var apiResources = api.resources;

/**
 * Process resource (here we just trace different paramters of URL)
 **/
function processResource(res) {
    // User-friendly name (if provided)
    if (res.displayName) {
        console.log(res.displayName);
    }

    // Trace resource's relative URI
    var relativeUri = res.relativeUri;
    // Next method returns full relative URI (which is equal with previous one
    // for top-level resources, but for subresources it returns full path from the
    // resources base URL)
    var completeRelativeUri = res.completeRelativeUri;
    // trace both of them
    console.log(completeRelativeUri, "(", relativeUri, ")");

    // Let's enumerate all URI parameters
    if (res.uriParameters) {

        Object.keys(res.uriParameters).forEach(function(key){

            var uriParam = res.uriParameters[key];
            // Here we trace URI parameter's name and types
            console.log("\tURI Parameter:", uriParam.name, uriParam.type.join(","));
        })
    }

    // Recursive call this function for all subresources
    if (res.resources) {

        Object.keys(res.resources).forEach(function(key){

            var subRes = res.resources[key];
            processResource(subRes);
        })
    }
}

// Enumerate all the resources
Object.keys(apiResources).forEach(function(key){
    processResource(apiResources[key])
})

api.types().forEach(function (type) {

    console.log(type.name() + " : " + type.kind());
    console.log("\t type:", type.type())

});