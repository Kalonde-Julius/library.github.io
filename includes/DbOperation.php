<?php
 
class DbOperation
{
    //Database connection link
    private $con;
 
    //Class constructor
    function __construct()
    {
        //Getting the DbConnect.php file
        require_once dirname(__FILE__) . '/DbConnect.php';
 
        //Creating a DbConnect object to connect to the database
        $db = new DbConnect();
 
        //Initializing our connection link of this class
        //by calling the method connect of DbConnect class
        $this->con = $db->connect();
    }
	
	/*
	* The create operation
	* When this method is called a new record is created in the database
	*/
	
	
	function createbooks($book_name, $book_type,$book_price, $quantity, $total_price){
		$stmt = $this->con->prepare("INSERT INTO books (book_name,book_type,book_price,quantity,total_price) VALUES ('$fullname','$age','$gender','$course','$company')");
		//$stmt->bind_param("ssis", $book_name, $book_type, $quantity, $total_price);
		
		if($stmt->execute()){
			return true; 
		}else{
		   return false;
		}		
	}

	/*
	* The read operation
	* When this method is called it is returning all the existing record of the database
	*/
	function getBooks(){
		$stmt = $this->con->prepare("SELECT book_id,book_name,book_type,book_price,quantity,total_price FROM books");
		$stmt->execute();
		$stmt->bind_result($book_id,$book_name,$book_type,$book_price,$quantity,$total_price);
		
		$Book = array(); 
		
		while($stmt->fetch()){
			$Book  = array();
			$Book['book_id'] = $book_id; 
			$Book['book_name'] = $book_name; 
			$Book['book_type'] = $book_type; 
			$Book['book_price'] = $book_price; 
			$Book['quantity'] = $quantity;
            $Book['total_price'] = $total_price; 
            			
			
			array_push($books, $Book); 
		}
		
		return $books; 
	}
	
	function getBookById($book_id){
		$stmt = $this->con->prepare("SELECT book_id, book_name,book_type,book_price,quantity,total_price FROM books WHERE book_id='$book_id'");
		$stmt->execute();
		$stmt->bind_result($book_id,$book_name,$book_type,$book_price,$quantity,$total_price);
		
		$Book = array(); 
		
		while($stmt->fetch()){
			$Book  = array();
			$Book['book_id'] = $book_id; 
			$Book['book_name'] = $book_name; 
			$Book['book_type'] = $book_type; 
			$Book['book_price'] = $book_price; 
			$Book['quantity'] = $quantity;
            $Book['total_price'] = $total_price; 
            			
			
			array_push($books, $Book); 
		}
		
		return $books; 
	}
	
	/*
	* The update operation
	* When this method is called the record with the given id is updated with the new given values
	*/
	function updateBook($book_id,$book_name,$book_type,$book_price,$quantity,$total_price){
		$stmt = $this->con->prepare("UPDATE books SET book_name='$book_name',book_type='$book_type',book_price='$book_price',quantity='$quantity',total_price='$total_price' WHERE book_id='$book_id'");
		//$stmt->bind_param("ssisi", $book_name, $book_type, $quantity, $total_price, $book_id);
		if($stmt->execute()){
			return true; 
		}else{
		return false;
        }		
	}
	
	
	/*
	* The delete operation
	* When this method is called record is deleted for the given id 
	*/
	function deleteBook($book_id){
		$stmt = $this->con->prepare("DELETE FROM book WHERE book_id='$book_id' ");
		
		if($stmt->execute()){
			return true; 
		}else{
		
		return false; 
		}
	}
}