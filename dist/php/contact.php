<?php

$response = array();
$response['status'] = "warning";

$name=$_POST['name'];
$email=$_POST['email'];
$subject=$_POST['subject'];
$body=$_POST['body'];

if( (isset($name) && $name != "") && (isset($email) && $email != "") && (isset($subject) && $subject != "") && (isset($body) && $body != "")) {
    
    $email_it_to = "your_own_email_address@some_domain.com"; // Your email
    
    $subject = stripslashes($subject);
    $email_from = $email; 
    
    $message = '
    <html>
    <body>
    <center>	
    <table border=1 cellpadding=6 cellspacing=0 width=80% bordercolor="#E9E9E9">
     <tr><td colspan=2 align=center bgcolor="#E4E4E4"><b>Information</b></td></tr>
     <tr>
      <td><b>Date</b></td>
      <td>'.date("d/m/Y").'</td>
     </tr>
     <tr>
      <td><b>Message submitted by</b></td>
      <td>'.stripslashes($name).'</td>
     </tr>
     <tr>
      <td><b>E-mail from</b></td>
      <td><a href="mailto:'.$email_from.'">'.$email_from.'</a></td>
     </tr>
     <tr>
      <td><b>Subject</b></td>
      <td>'.$subject.'</td>
     </tr>
     <tr>
      <td><b>Message</b></td>
      <td>'.stripslashes($body).'</td>
     </tr>
    </table>
    </center>	
    </body>
    </html>';

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8". "\r\n";
    $headers .= 'From: '.stripslashes($name);

    if(mail($email_it_to, $subject, $message, $headers)) {
        $response['status'] = "success";
    } else {
        $response['status'] = "error";
    }
}

echo json_encode($response);

?>