<?php
require_once(dirname(__DIR__).'/config/database.php');

class ModelEmployee {
    private $db;

    public function __construct() {
        $dbConnecter = new DatabaseConnector();
        $this->db = $dbConnecter->getConnection();
    }

    public function getUserData($name) {
        $res = new \stdClass;
        $res->message = "";
        $res->isValid = false;
        $escapedName = $this->db->quote("%$name%");

        $searchQuery = "select id, first_name, last_name from employees where first_name like $escapedName or last_name like $escapedName;";

        if (empty($name)) {
            $res->message = "Name cannot be empty";
        } else if (count($name) > 255) {
            $res->message = "Name longer than 255 symbols";
        } else {
            $dbResult = $this->db->query($searchQuery, PDO::FETCH_ASSOC);
            
            $z = '';
            foreach ($dbResult as $row) {
                $resArr[] = $row;
            }

            $res->isValid = true;
            $res->dbResult = isset($resArr) ? $resArr : [];
        }

        return $res;
    }

    public function getUserTaxes($user_id) {
        $res = new \stdClass;
        $res->message = "";
        $res->isValid = false;
        $searchQuery = "select income_tax as income, national_insurance as insurance from payments where employee_id = $user_id;";

        if ($user_id < 1) {
            $res->message = "User id is not valid";
        } else {
            $dbResult = $this->db->query($searchQuery, PDO::FETCH_ASSOC);
            
            $z = '';
            foreach ($dbResult as $row) {
                $resArr[] = $row;
            }

            $res->isValid = true;
            $res->dbResult = isset($resArr) ? $resArr : [];
        }

        return $res;
    }

    public function putUserData() {
        echo 'put';
    }

    public function postUserData() {
        echo 'post';    
    }

    public function deleteUserData() {
        echo 'deleted';
    }
}