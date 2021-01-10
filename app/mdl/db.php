<?php
use PDO; 

/**
 * Connecteur pdo.
 */
class PDOConnector {

  private $DNS;
  private $LOG;
  private $PWD;
  private $DNS_prod;
  private $LOG_prod;
  private $PWD_prod;
  private $production = false;

  function __construct() 
  {
    $this->DNS = 'mysql:host=127.0.0.1;dbname=ungoals;charset=utf8';
    $this->LOG = 'root';
    $this->PWD = 'root';
    $this->DNS_prod = 'mysql:host=localhost;port=3306;dbname=;charset=utf8';
    $this->LOG_prod = '';
    $this->PWD_prod = '';
  }

  function getPdoConnexion() 
  {
    $pdo = NULL;
    try
    {
      //!\ PDO with uft8 encoding is necessary.
      if ($this->production)
      {
        $pdo = new PDO(
          $this->DNS_prod,
          $this->LOG_prod,
          $this->PWD_prod
        );
      }
      else
      {
        $pdo = new PDO(
          $this->DNS,
          $this->LOG,
          $this->PWD
        );
      }

      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $pdo->setAttribute(PDO::ATTR_PERSISTENT, TRUE);
      
      return $pdo;
    }
    catch (PDOException $ex)
    { 
      die("Connection failed critically : ".$ex -> getMessage()); 
    }
  }

}