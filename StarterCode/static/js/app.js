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


  