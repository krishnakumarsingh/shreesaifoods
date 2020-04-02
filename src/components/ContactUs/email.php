<?php
  if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['phone']) && isset($_POST['message'])) {
    if(!empty($_POST['name']) && !empty($_POST['email']) && !empty($_POST['phone']) && !empty($_POST['message'])) {
      $name = $_POST['name'];
      $email = $_POST['email'];
      $phone = $_POST['phone'];
      $message = $_POST['message'];
      $to = 'sawan.raj@2formatics.com';
      $subject = 'Contact us';
      $toname = '2formatics';
      $headers  = 'MIME-Version: 1.0' . "\r\n";
      $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
      
      // Create email headers
      $headers .= 'From: '.$email."\r\n".
          'Reply-To: '.$email."\r\n" .
          'X-Mailer: PHP/' . phpversion();
      if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo 'Kindly validate!!';
      } else {
        $body = '<html><body>';
        $body .= '<h4 style="color: #383838;font-family: fantasy;">Hi '.$toname.'!</h4>';
        $body .= '<p style="color: #0000009e;font-size: 20px;">'.$message.'</p><br/>';
        $body .= '<h4 style="color: #383838;font-family: fantasy;">Thanks,</br>'.$name.'</br>Ph.'.$phone.'</h4>';
        $body .= '</body></html>';
        if(mail($to, $subject, $body, $headers)) {
          echo '<div data-form-alert-success="true" class="alert alert-form alert-success text-xs-center">Your message has been delivered, Thanks for contacting us!!</div>';
        } else {
          echo '<div data-form-alert-success="true" class="alert alert-form alert-danger text-xs-center">Error: Sorry, This message was not successfully delivered!!</div>';
        }
      }
    } else {
      echo '<div data-form-alert-success="true" class="alert alert-form alert-danger text-xs-center">Please fill in all required fields, Also, please be sure to use a valid email address!!</div>';
    }
  }
?>