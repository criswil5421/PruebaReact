const jsf=require("json-schema-faker");
const fs=require("fs");
const mockDataSchema=require("./mockDataSchema");

jsf.extend("faker",() => require("@faker-js/faker"));

jsf.option({
	resolveJsonPath: true,
	alwaysFakeOptionals: true,
});

const json=JSON.stringify(jsf.generate(mockDataSchema));

fs.writeFile("src/api/db.json",json,function(err){
	if(err){
		return console.log(err);
	}
	else{
		console.log("Mock data generated.");
	}
});
