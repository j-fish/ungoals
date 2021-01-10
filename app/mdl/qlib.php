<?php
/**
 * Sql query's.
 */
class QueryLibrary
{

	const SELECT_ALL_FROM_GOAL13 = "SELECT * FROM ungoals.goal13;";

  const SELECT_TO_MAXPK_FROM_GOAL = "SELECT * FROM ungoals.goal13 WHERE Id_pk < :pId_pk;";
  const SELECT_GOAL_BY_PK = "SELECT * FROM ungoals.:pTable where Id_pk=:pId_pk;";

}