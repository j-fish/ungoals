<?php
/**
 * Abstract MODEL class.
 */
class Model 
{

  /**
   * Connection returned by PDO.
   */
  private $cnxdb;

  /**
   * SQL query library.
   */
  private $querylib;
  
  function __construct() 
  {
    $this->setConnection();
    require_once('qlib.php');
    $this->querylib = new QueryLibrary();
  }

  private function setConnection() 
  {
    require_once('db.php');
    $pdo = new PDOConnector();
    $this->cnxdb = $pdo->getPdoConnexion();
  }

  public function closeCnxdb()
  {
    $this->cnxdb = null;
  }

  public function getCnxdb() 
  {
    return $this->cnxdb;
  }

  public function getQueryLib()
  {
    return $this->querylib;
  }

}