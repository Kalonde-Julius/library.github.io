// Create database 
  var mywebdb = openDatabase('library_db', '1.0', 'db example', 2 * 1024 * 1024);
   
  createTable();  // It will create tables.
  showSavedBookDetails(); // It will show saved records.

  // Create table
  function createTable() 
  { 
    mywebdb.transaction(function(tx) 
  {
    tx.executeSql("CREATE TABLE IF NOT EXISTS book_details (book_id INTEGER PRIMARY KEY AUTOINCREMENT, book_name TEXT, book_type TEXT, book_price TEXT, quantity TEXT, total_price TEXT)", []);
        });
  }

// Insert book details.
  function saveBookDetails()
  {
  var book_name_val = $.trim($("#book_name").val());
  var book_type_val = $.trim($("#book_type").val());
  var book_price_val = $.trim($("#book_price").val());
  var quantity_val = $.trim($("#quantity").val());
	var total_price_val = $.trim($("#total_price").val());
        
	if(book_name_val == '')
  {
  alert("Please enter the book name."); 
  $("#book_name").focus(); return false; 
  }

  if(book_type_val == '')
  {
  alert("Please enter your book type."); 
  $("#book_type").focus(); return false; 
  }
		
  if(book_price_val == '')
  {
  alert("Please enter the Book price."); 
  $("#book_price").focus(); return false; 
  }

  if(quantity_val == '')
  {
  alert("Please enter the Book quantity."); 
  $("#quantity").focus(); return false; 
  }
  
	if(total_price == '')
  {
  alert("Please enter the Total price"); 
  $("#total_price").focus(); return false; 
  }
  	
  if(book_name_val !=''&&  book_type_val !=''&& book_price_val !=''&& quantity_val !=''&& total_price_val !='')
  {
  mywebdb.transaction(function (tx) 
  {
    tx.executeSql("INSERT INTO book_details (book_name, book_type, book_price, quantity, total_price) VALUES (?, ?, ?, ?, ?);", 
      [book_name_val, book_type_val, book_price_val, quantity_val, total_price_val],showSavedBookDetails(), onError);
     });
  }

  }
  function total_amount()
  {
  var book_name_val = $.trim($("#book_name").val());
  var book_type_val = $.trim($("#book_type").val());
  var book_price_val = $.trim($("#book_price").val());
  var quantity_val = $.trim($("#quantity").val());
	var total_price_val = $.trim($("#total_price").val());
        
	if(book_name_val == '')
  {
  alert("Please enter your book name."); 
  $("#book_name").focus(); return false; 
  }

  if(book_type_val == '')
  {
  alert("Please enter your book type."); 
  $("#book_type").focus(); return false; 
  }
		
  if(book_price_val == '')
  {
  alert("Please enter the Unit price."); 
  $("#book_price").focus(); return false; 
  }

  if(quantity_val == '')
  {
  alert("Please enter the quantity."); 
  $("#quantity").focus(); return false; 
  }
  
	if(total_price == '')
  {
  alert(""); 
  $("#total_price").focus(); return false; 
  }
  	
  if(book_name_val !=''&&  book_type_val !=''&& book_price_val !=''&& quantity_val !=''&& total_price_val !='')
  {
  mywebdb.transaction(function (tx) 
  {
    tx.executeSql("INSERT INTO book_details (book_name, book_type, up, book_price, total_price) VALUES (?, ?, ?, ?, ?);", 
      [book_name_val, book_type_val, book_price_val, quantity_val, total_price_val],show(book_price_val*quantity_val), onError);
     });
  }

  }
 // Select book details.
  function showSavedBookDetails()
  {
  //document.forms['add_form'].reset();
  var show_data_append = '';
	   
  mywebdb.transaction(function (tx) 
  {
    tx.executeSql('SELECT book_id, book_name, book_type, book_price, quantity, total_price FROM book_details', [], function (tx, results) 
  {
  var total_rec = results.rows.length;
  //alert("Total record  =  " +total_rec);
    var header_ui = '<thead><tr style="border: 1px solid black;">'     
                    +'<th style="padding:8px;border: 1px solid black;width:30%;" >book_name</th>'
                    +'<th style="padding:8px;border: 1px solid black;width:30%;" >book_type</th>'
                    +'<th style="padding:8px;border: 1px solid black;width:30%;" >book_price</th>'
                    +'<th style="padding:8px;border: 1px solid black;width:30%;"  >quantity</th>'
    							 +'<th style="padding:8px;border: 1px solid black;width:30%;"  >total_price</th>'
                   +'<th style="padding:8px;border: 1px solid black;width:40%;" >Action&nbsp;&nbsp;<button type="button" class="btn btn-danger" onclick="dropTables();" style="cursor:pointer;"><span class="glyphicon glyphicon-remove"></span>&nbsp;&nbsp;Drop Table</button></th>'
                   +'</tr></thead>';

     if(total_rec >= 1)             
      {
     for (i = 0; i < total_rec; i++)
      {
      var record_data =  results.rows.item(i);
      show_data_append += '<tr style="border: 1px solid black;" >' 
                          + '<td style="padding:8px;border: 1px solid black;" >' + record_data.book_name + '</td>' 
                            + '<td style="padding:8px;border: 1px solid black;" >' + record_data.book_type + '</td>'
                            + '<td style="padding:8px;border: 1px solid black;" >' + record_data.book_price + '</td>' 
                            + '<td style="padding:8px;border: 1px solid black;" >' + record_data.quantity + '</td>' 
						              	+ '<td style="padding:8px;border: 1px solid black;" >' + record_data.total_price + '</td>'
                            + '<td style="padding:8px;border: 1px solid black;" >'

                            + '<button type="button" class="btn btn-danger" onclick="deleteBookRecord('+ record_data.book_id + ');"  id="save_record_div" style="cursor:pointer;"><span class="glyphicon glyphicon-remove"></span>&nbsp;&nbsp;Delete</button>'
                            + '&nbsp;&nbsp;<button type="button" class="btn btn-info" onclick="editBookRecord('+ record_data.book_id + ');"  id="save_record_div" style="cursor:pointer;"><span class="glyphicon glyphicon-pencil"></span>&nbsp;&nbsp;Edit</button>'
                            + '</tr>';
                       }
                   }
                   else
                   {
                        show_data_append += '<tr style="border: 1px solid black;" ><td style="padding:8px;border: 1px solid black; text-align:center;" colspan="5"> No record found !</td></tr>';
                   }

                   var footer_ui = '</table>';
                   var complete_ui = header_ui+show_data_append+footer_ui;
                   $("#save_record_div").show();
                   $("#update_record_div").hide();
                   $("#show_edit_part").html(complete_ui);
             }, null);

      });

    }

    // Edit user details.
    function editBookRecord(book_id)
    {
        mywebdb.transaction(function (tx) 
        {
              tx.executeSql('SELECT book_id, book_name, book_type, book_price, quantity, total_price FROM book_details WHERE book_id = "'+ book_id+ '"', [], function (tx, results) 
              {
                    var record_data =  results.rows.item(0);
                    $("#save_record_div").hide();
                    $("#update_record_div").show();
                    $("#edit_user_id").val(record_data.book_id);
                    $("#pn").val(record_data.book_name);
                    $("#pt").val(record_data.book_type);
                    $("#up").val(record_data.book_price);
                    $("#pq").val(record_data.quantity);
					          $("#tp").val(record_data.total_price);
              }, null);
        });
    }

    // Update book details.
    function updateUserDetails() 
    {

        var book_name_val = $.trim($("#book_name").val());
        var book_type_val = $.trim($("#book_type").val());
        var book_price_val = $.trim($("#book_price").val());
        var quantity_val = $.trim($("#quantity").val());
		    var total_price_val = $.trim($("#total_price").val());
        var update_book_id = $.trim($("#edit_book_id").val());

        if(book_name_val == '')
        {
          alert("Please enter the book name."); 
          $("#book_name").focus(); return false; 
        }
        if(book_type_val == '')
        {
          alert("Please enter the book type."); 
          $("#book_type").focus(); return false; 
        }
        if(book_price_val == '')
        {
          alert("Please enter the book price."); 
          $("#book_price").focus(); return false; 
        }
        if(quantity_val == '')
        {
          alert("Please enter the book quantity."); 
          $("quantity").focus(); return false; 
        }
		   if(total_price_val == '')
        {
          alert("Please enter the total price."); 
          $("#total_price").focus(); return false; 
        }

        if(book_name_val !='' && book_type_val !='' && book_price_val !='' && quantity_val!='' && total_price_val!='')
        {
            mywebdb.transaction(function(tx) 
            {
                tx.executeSql("UPDATE book_details SET book_name = ?, book_type = ?, book_price = ?, quantity = ?, total_price = ? WHERE book_id = ?", 
                [book_name_val, book_type_val, book_price_val, quantity_val, total_price_val, update_book_id],showSavedBookDetails(), onError);
            }); 
        }
    }

    // Delete user details.
    function deleteUserRecord(delete_book_id) 
    { 
        var do_it = confirm("Do you really want to delete this record ? ");
        if (do_it) 
        {
            mywebdb.transaction(function(tx) 
            {
                 tx.executeSql('DELETE FROM book_details WHERE book_id = "'+delete_book_id+'" ');
            });

            showSavedBookDetails();
        }
    }

    // It will show query error if something is wrong with query.
    function onError(tx, error) 
    {
      alert(error.message);
      //$('#SyncProgress').html(error.message).css("color","red");
    }

    // drop tables.
    function dropTables() 
    {
       mywebdb.transaction(function(tx) 
       {
          tx.executeSql("DROP TABLE book_details", []); 
       });

    }
    //total
    function totalBookDetails(){
      var book_price_val = $.trim($("#book_price").val());
      var quantity_val = $.trim($("#quantity").val());

      var total=book_price_val*quantity_val
      $("#total_price").val(total);
    }