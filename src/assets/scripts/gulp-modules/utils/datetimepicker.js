@@include('../../libs/datetimepicker-master/build/jquery.datetimepicker.full.js')


console.log($.datetimepicker);

$('[name="time"]').datetimepicker({
  datepicker:false,
  format:'H:i'
});
$('[name="day"]').datetimepicker({
  timepicker:false,
  format:'d.m.Y'
});