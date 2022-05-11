$("h1").addClass("big-title");

$(document).keydown(function (e) {
  $("h1").text(e.key);
});
