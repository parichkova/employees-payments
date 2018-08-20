<?php
require(dirname(__DIR__).'/models/model_employee.php');

class Employee {
    private $model;
    
    
    public function __construct() {
        $this->model = new ModelEmployee();
    }

    public function get() {
        if (!$this->isInputValid($_GET)) {
            exit('Wrong input');
        }

        if (isset($_GET['searched_name'])) {
            echo json_encode($this->model->getUserData($_GET['searched_name']));
        }
        
        if (isset($_GET['show_taxes']) && isset($_GET['id'])) {
            if ($this->isValidId($_GET['id'])) {
                echo json_encode($this->model->getUserTaxes($_GET['id']));
            } else {
                echo 'not valid id';
            }
        }
    }

    public function delete() {

    }

    
    public function put() {

    }

    
    public function post() {

    }

    private function isInputValid($getArr) {
        if (!empty($getArr['searched_name']) || !empty($getArr['show_taxes'])) {
            return true;
        }

        return false;
    }

    private function isValidId($id) {
        if (is_numeric($id)) {
            return true;
        }

        return false;
    }
}

