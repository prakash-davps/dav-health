function doGet() {
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Student_Data");
  const data = sheet.getDataRange().getValues();
  const jsonData = data.slice(1).map((row) => ({
    admNo: row[0],
    name: row[1],
    class: row[2],
    section: row[3],
  }));
  return ContentService.createTextOutput(JSON.stringify(jsonData)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function doPost(e) {
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("mediRecord");

  // Parse the data received from the POST request
  const data = JSON.parse(e.postData.contents);

  // Get the current date in 'YYYY-MM-DD' format
  const currentDate = new Date();
  const formattedDate = Utilities.formatDate(
    currentDate,
    Session.getScriptTimeZone(),
    "dd-mm-yyyy HH:mm:ss"
  );

  // Append the data to the sheet, with the date as the first column
  sheet.appendRow([
    formattedDate,
    data.admNo,
    data.name,
    data.class,
    data.section,
    data.problem,
    data.medicines,
    data.remarks,
  ]);

  return ContentService.createTextOutput("Success");
}
