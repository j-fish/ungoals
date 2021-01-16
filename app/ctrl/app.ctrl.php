<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/app/mdl/goal.mdl.php');
require_once($_SERVER['DOCUMENT_ROOT'].'/app/utl/http.data.process.php');
$dataProcessor = new HTTPDataProcessor();
$cli = isset($_GET['c']) ? $dataProcessor->processHttpFormData($_GET['c']) : '';
$goal = isset($_GET['goal']) ? $dataProcessor->processHttpFormData($_GET['goal']) : '';

$indicator = isset($_POST['indicator']) ? $dataProcessor->processHttpFormData($_POST['indicator']) : '';

$goalsmdl = new GoalModel();
$data = $goalsmdl->selectGoalByIndicator('goal13', $indicator);
echo json_encode($data);