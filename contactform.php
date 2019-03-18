<?php

if (isset($_POST['submit'])) {
	$name = $_POST['name'];
	$mail = $_POST['mail'];
	$phone = $_POST['phone'];
	$project = $_POST['project'];
	$message = $_POST['message'];

	$mailTo = "ericnunez95@yahoo.com",
	$headers = "From: ".$mail;
	$txt = "You have received an e-mail from ".$name .$phone.".\n\n".$message;

	mail($mailTo, $phone, $project, $headers, $txt);
	header("Location: index.php?mailsend");
}