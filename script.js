$(document).ready(function () {
  // Display current day at the top of the calendar
  $("#currentDay").text(dayjs().format("dddd"));

  
  function createTimeBlocks() {
    var container = $(".container-fluid");

 
    for (var hour = 9; hour <= 17; hour++) {
      var timeBlock = $("<div>")
        .attr("id", "hour-" + hour)
        .addClass("row time-block");

      // Add past, present, or future class based on the current time
      if (hour < dayjs().hour()) {
        timeBlock.addClass("past");
      } else if (hour === dayjs().hour()) {
        timeBlock.addClass("present");
      } else {
        timeBlock.addClass("future");
      }

      // Added HTML structure for time block
      timeBlock.append(
        $("<div>")
          .addClass("col-2 col-md-1 hour text-center py-3")
          .text(dayjs().hour(hour).format("hA")),
        $("<textarea>")
          .addClass("col-8 col-md-10 description")
          .attr("rows", "3"),
        $("<button>")
          .addClass("btn saveBtn col-2 col-md-1")
          .attr("aria-label", "save")
          .append($("<i>").addClass("fas fa-save").attr("aria-hidden", "true"))
      );

      
      container.append(timeBlock);
    }
  }

  // Function to load events from local storage
  function loadEvents() {
    $(".time-block").each(function () {
      var blockHour = $(this).attr("id");
      var event = localStorage.getItem(blockHour);

      if (event) {
        $(this).find(".description").val(event);
      }
    });
  }


  createTimeBlocks();


  loadEvents();

  // Save button click event
  $(".saveBtn").on("click", function () {
    var blockHour = $(this).parent().attr("id");
    var eventText = $(this).siblings(".description").val();

    localStorage.setItem(blockHour, eventText);
  });
});
