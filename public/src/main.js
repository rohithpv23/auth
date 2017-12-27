import $ from 'jquery';
import 'public/scss/main.scss';

window.$ = $;
window.jQuery = $;

$('input.username').keyup(function() {
  var $th = $(this);
  $th.val( $th.val().replace(/[^a-zA-Z0-9]/g, function(str) {
    alert('You typed " ' + str + ' ".\n\nPlease use only letters and numbers.');
    return '';
    }));
});
