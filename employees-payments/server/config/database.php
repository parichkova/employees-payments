<?php
//require_once 'credentials.php';

class DatabaseConnector {
    private $host = 'localhost';
    private $db_name = "employees_payments";
    private $username = 'root';
    private $password = 8404;
    public $conn;
 
    // get the database connection
    public function getConnection(){
 
        $this->conn = null;
 
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }    
}



