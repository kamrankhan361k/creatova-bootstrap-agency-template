<?php
$my_email = 'your@email.com';

$form_fullname = $_POST['fullname'];
$form_email = $_POST['email'];
$form_subject = $_POST['subject'];
$form_message = $_POST['message'];


$to = $my_email;
$subject = $form_subject.' form '.$form_fullname;
$txt = $form_message;
$headers = "From: $form_email" . "\r\n" .
"Reply-To: $form_email";
$status = mail($to,$subject,$txt,$headers);


if($status){
  $ress = array('status' => 'Thank you we will back to you ASAP!');
}else{
  $ress = array('status' => NULL);
}
header('Content-Type: application/json');
echo json_encode($ress);
