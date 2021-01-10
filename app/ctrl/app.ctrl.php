<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/app/mdl/goal.mdl.php');
require_once($_SERVER['DOCUMENT_ROOT'].'/app/utl/http.data.process.php');
$dataProcessor = new HTTPDataProcessor();
$cli = isset($_GET['c']) ? $dataProcessor->processHttpFormData($_GET['c']) : '';
$goal = isset($_GET['goal']) ? $dataProcessor->processHttpFormData($_GET['goal']) : '';

$goalsmdl = new GoalModel();
$data = $goalsmdl->selectGoal('goal13');
echo json_encode($data);