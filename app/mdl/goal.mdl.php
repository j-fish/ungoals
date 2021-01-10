<?php
require_once('mdl.php');
require_once('qlib.php');

/**
 * MODEL class for ungoals.goal{*}.
 */
class GoalModel extends Model 
{

  public function selectGoal($goal)
  {
    $query = $this->getGoalQuery($goal);
    $qLib = $this->getQuerylib();
    $stmt = $this->getCnxdb()->prepare($query);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $data;
  }

  public function selectGoalMaxPK($max_pk)
  {
    $qLib = $this->getQuerylib();
    $stmt = $this->getCnxdb()->prepare($qLib::SELECT_TO_MAXPK_FROM_GOAL);
    $stmt->bindParam(":pId_pk", $max_pk, PDO::PARAM_INT);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $data;
  }

  public function selectByPk($pk, $goal) 
  {
    $qLib = $this->getQuerylib();
    $stmt = $this->getCnxdb()->prepare($qLib::SELECT_GOAL_BY_PK);
    $stmt->bindParam(":pTable", $goal, PDO::PARAM_STR);
    $stmt->bindParam(":pId_pk", $pk, PDO::PARAM_);
    $stmt->execute();
    $data = $stmt->fetch(PDO::FETCH_ASSOC); 
    return $data;
  }

  private function getGoalQuery($goal)
  {
    $qLib = $this->getQuerylib();
    if (strcmp($goal, 'goal13') === 0) return $qLib::SELECT_ALL_FROM_GOAL13;
  }

}