/*
    WS -> Worksheet
*/

let data = {
    ws_name: "Budget Summary of Insurance",
    current_q: "Current Quarter",
    prev_q: "Prior Quarter",
    current_y: "Current Year",
    prev_y: "Prior Year"
}

//  INITIALIZING TABLEAU FUNCTIONALITY or INTERACTION

tableau.extensions.initializeAsync()
    .then(async () => {
        
        console.log(tableau.extensions.worksheetContent)
        let worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;
        let worksheet = worksheets.find(ws => ws.name == data.ws_name);
        console.log(worksheet)
        let params = await worksheet.getParametersAsync();
        let param_q = params.find(p => p.name == data.current_q);
        let param_y = params.find(p => p.name == data.current_y);
        
        // let quarter = `${}`
        worksheet.addEventListener(
            tableau.TableauEventType.MarkSelectionChanged,
            handler
        );
});

const handler = async e => {
    let data = await e.getMarksAsync();
    data = data.data[0];
    console.log("Hello World!")

    const index = data.columns.find(col => col.fieldName === "Main Questions").index;
    const question = data.data[0][index].value;

    const index1 = data.columns.find(col => col.fieldName === "Heading").index;
    const heading = data.data[0][index1].value;
    
    window.localStorage.setItem("data", JSON.stringify({question,heading}));

    const url = window.location.origin + "/api/comments/";

    let closePayload = await tableau.extensions.ui.displayDialogAsync(url, null, {width: 600, height: 450});
    
    if (closePayload) {
        console.log(closePayload)
        let dataSources = await e.worksheet.getDataSourcesAsync();
        dataSources[0].refreshAsync();
      } else {
        alert("Error trying to update request!");
      }
};


