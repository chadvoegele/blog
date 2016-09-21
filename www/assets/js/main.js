function email_data() {
  var data =
    [ 693, 679, 826, 777, 707, 721, 707, 756, 707, 448, 721, 763, 679, 735, 756,
      322, 693, 777, 763 ];
  return data;
}

function get_email() {
  var data = email_data();
  var parsed_data = data.map(function(x) { return x / 7; });
  return 'mail' + 'to:' + String.fromCharCode.apply(String, parsed_data);
}

function set_email() {
  var mailto_link = get_email();
  document.getElementById("email-link").href = mailto_link;
}

function assign_email_hover() {
  $("#email-icon").hover(set_email);
}
