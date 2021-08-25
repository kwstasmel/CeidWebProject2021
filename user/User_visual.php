<?php
define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__.'/config.php');
header('Content-Type: application/json');
session_start();
$username=$_SESSION["username"];
$sql="SELECT har FROM files inner join user on files.uploaderid=user.User_id Where username=?";
$stmt=$conn->prepare($sql);
$stmt->bind_param("s",$username);
$stmt->execute();
$result=$stmt->get_result()->fetch_all(MYSQLI_ASSOC);
echo json_encode($result);
?>