(function() {
  $('.submit-form').on('click', function() {
    $.ajax({  
      type: 'POST',
      url: "./email.php",
      data: {
        name: $('#name').val(),
        email: $('#email').val(),
        phone: $('#phone').val(),
        message: $('#message').val(),
      },
      success: function(response) {
        //console.log(response);
        $('#message-show').html(response);
        $('#name').val('');
        $('#email').val('');
        $('#phone').val('');
        $('#message').val('');
        $('body').focus();
        setTimeout(function() {
          $('#message-show > div').fadeOut(2000, function() {
            $('#message-show').html('');
          });
        }, 4000);
      }
    });
  });
  const html = `
    <div class="spin">
      <div class="center"></div>
      <div class="inner-spin">
        <div class="inner-arc inner-arc_start-a"></div>
        <div class="inner-arc inner-arc_end-a"></div>
        <div class="inner-arc inner-arc_start-b"></div>
        <div class="inner-arc inner-arc_end-b"></div>
        <div class="inner-moon-a"></div>
      <div class="inner-moon-b"></div>
      </div>
      <div class="outer-spin">
        <div class="outer-arc outer-arc_start-a"></div>
        <div class="outer-arc outer-arc_end-a"></div>
        <div class="outer-arc outer-arc_start-b"></div>
        <div class="outer-arc outer-arc_end-b"></div>
        <div class="outer-moon-a"></div>
        <div class="outer-moon-b"></div>
      </div>
    </div>
  `;
  $('body').append(html);
});