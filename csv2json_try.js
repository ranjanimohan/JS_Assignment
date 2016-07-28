var fs = require('fs');
var filedata = fs.readFileSync("sample.csv");
   var datatoString=filedata.toString();
   var myArray= datatoString.split('\r\n');
   var header=myArray[0].split(',');
   var row=myArray.length;
   var col=header.length;
   var jArray=[];
   var Cont_Array=[];
   var pop_index_15 = header.indexOf("Population (Millions) 2015");
   var gdp_index_15 = header.indexOf("GDP Billions (USD) 2015");
   var pop_index_13 = header.indexOf("Population (Millions) 2013");
   var gdp_index_13 = header.indexOf("GDP Billions (USD) 2013");
   var ppp_index_13 = header.indexOf("Gross domestic product based on Purchasing-Power-Parity (PPP) valuation of Country GDP in Billions (Current International Dollar) 2013");
   var continents = ["Asia","Africa","Australia","NorthAmerica","SouthAmerica","Europe"];
    var Asia =  ["China","India","Indonesia","Japan","Republic of Korea","Saudi Arabia"];
    var Africa = ["South Africa"];
    var Australia = ["Australia"];
    var NorthAmerica = ["Canada","Mexico","USA"];
    var SouthAmerica = ["Argentina","Brazil"];
    var Europe = ["France","Germany","Italy","Russia","Turkey","United Kingdom","European Union"];

pop = [0,0,0,0,0,0];
gdp = [0,0,0,0,0,0];
console.log(continents.length);

/*---------------Aggregating population and gdp based on continents-------------------*/
console.log(pop_index_15);
console.log(gdp_index_15);
for (i = 1; i < row-1; i++) {
   var myNewLine=myArray[i].split(',');
  // console.log(myNewLine[0]);
     if(Asia.indexOf(myNewLine[0]) > -1){
       pop[0] = parseFloat(pop[0]) + parseFloat(myNewLine[pop_index_15]);
       gdp[0] = parseFloat(gdp[0]) + parseFloat(myNewLine[gdp_index_15]);
     }
     else if(Africa.indexOf(myNewLine[0]) > -1){
       pop[1] = parseFloat(pop[1]) + parseFloat(myNewLine[pop_index_15]);
       gdp[1] = parseFloat(gdp[1]) + parseFloat(myNewLine[gdp_index_15]);
     }
     else if(Australia.indexOf(myNewLine[0]) > -1){
       pop[2] = parseFloat(pop[2]) + parseFloat(myNewLine[pop_index_15]);
       gdp[2] = parseFloat(gdp[2]) + parseFloat(myNewLine[gdp_index_15]);
     }
     else if(NorthAmerica.indexOf(myNewLine[0]) > -1){
       pop[3] = parseFloat(pop[3]) + parseFloat(myNewLine[pop_index_15]);
       gdp[3] = parseFloat(gdp[3]) + parseFloat(myNewLine[gdp_index_15]);
     }
     else if(SouthAmerica.indexOf(myNewLine[0]) > -1){
       pop[4] = parseFloat(pop[4]) + parseFloat(myNewLine[pop_index_15]);
       gdp[4] = parseFloat(gdp[4]) + parseFloat(myNewLine[gdp_index_15]);
     }
     else if(Europe.indexOf(myNewLine[0]) > -1){
       pop[5] = parseFloat(pop[5]) + parseFloat(myNewLine[pop_index_15]);
       gdp[5] = parseFloat(gdp[5]) + parseFloat(myNewLine[gdp_index_15]);
     }
}

/*-----------------Converting aggregte data to json file---------------------*/

for (var i = 0; i < continents.length; i++) {
  var obj1 = {};
  cont_value = continents[i];
  pop_value = pop[i];
  gdp_value = gdp[i];
  obj1['Continent'] = cont_value;
  obj1['Population'] = pop_value;
  obj1['GDP 2015'] = gdp_value;
  Cont_Array.push(obj1);
}
  console.log(Cont_Array);
  fs.writeFile( "aggregate.json", JSON.stringify( Cont_Array ), "utf8", (err) => {
  if (err) throw err;
  });

   csvtojson(pop_index_13,"country_pop.json");
   csvtojson(gdp_index_13,"country_gdp.json");
   csvtojson(ppp_index_13,"country_ppp.json");

   /*----------function to convert csv to json file--------------*/
   function csvtojson(index,filename){
   jArray=[];
   var i=0,j=0;
   for (i = 1; i < row-1; i++) {
      var obj = {};
      var myNewLine=myArray[i].split(',');
      for (j = 0; j< col; j++) {
        key = header[0];
        value = myNewLine[0];
        key1 = header[index];
        value1 = myNewLine[index];
        obj[key] = value;
        obj[key1] = value1;
      };
        jArray.push(obj);
};
jArray.sort(function(a,b){
  return parseFloat(b[key1])-parseFloat(a[key1]);
})
//console.log( jArray);
fs.writeFile( filename, JSON.stringify( jArray ), "utf8", (err) => {
if (err) throw err;
});
}
