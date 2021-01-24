//build PLot function
function CreatePlot(id) {

    //Retreive JSON datafile
    d3.json("samples.json").then((data)=> {console.log(data)
      
      //assigning json file and loop to a variable 
      var sampleData = data.samples;

      //sample ids
      var sampleFilter = sampleData.filter(object => object.id == id);
      var samples= sampleFilter[0]

      //Otu_ids, sample_values, and otu_labels list from filtered id
      var otuList = samples.otu_ids;
      var samplesList = samples.sample_values;
      var otuLabels = samples.otu_labels;

      //Slice Data: sample-values, labels, otu_id, only need to display the top 10 OTU ID
      var sampleValues = samplesList.slice(0,10).reverse();
      var labels = otuLabels.slice(0,10).reverse();
      var otuId = otuList.slice(0,10).reverse();

      //Insert "OTU_ID" infront of each value
      var otuId = otuId.map(row => "OTU_ID " + row)
      
      // Trace1 for Top 10 OTU_ID
      var trace1 = {
        x: sampleValues,
        y: otuId,
        text: labels, 
        type:"bar",
        orientation: "h",
      }
      var layout1 = {
        margin: {
                  l: 120,
                  r: 40,
                  t: 75,
                  b: 75
                },
              };
      var data1 = [trace1];
      
      // Bubble Chart
      var trace2={
        x: otuList,
        y: samplesList,
        text: otuLabels,
        mode: "markers",
        marker: {
          color: otuList,
          colorscale: "Greens",
          size: samplesList,
          }
      };
      var data2=[trace2]
      var layout2 = {
            xaxis: {title: 'otu id'},
            height: 500
            }
      Plotly.newPlot("bar", data1, layout1);
      Plotly.newPlot("bubble", data2, layout2);
      })
      };

// Demographics
function MetaData(id){
    //Retreive JSON 
    d3.json("samples.json").then((data)=> {
      var metadata = data.metadata;
      //Filter metadata by ID
      var metadataList = metadata.filter(object => object.id == id);
      var results = metadataList[0]
      //Select info box
      var select = d3.select("#sample-metadata");
      //Empty existing table
      select.html("");
      //Insert data
      Object.entries(results).forEach(([key, value]) => {
        select.append("h5").text(`${key}: ${value}`);
        });
      });
    };

   //Menu 
  function DropDown(){
    //Retreive JSON
    d3.json("samples.json").then((data)=> {
      //Retreive id values in name list
      var names = data.names;
      //Select the dropdown menu
      var select = document.getElementById("selDataset");
      //Loop through each item in the name list to add in the dropdown menu
      for (i=0; i< names.length; i++)
      {
        var option = document.createElement("Option");
        var id = document.createTextNode(names[i]);
        option.appendChild(id);
        option.setAttribute("value",names[i]);
        select.insertBefore(option, select.lastChild);
      };
    //Call the CreatePlot & MetaData function and display the visuals/demographics info from the first id
    CreatePlot(names[0]);
      MetaData(names[0]);
    });
  };
  
  //Create the function for the change event
  function optionChanged(id) {
    CreatePlot(id);
    MetaData(id);
  }
  //Call DropDown() Function
  DropDown();
