<?php
define('ISITSAFETORUN', TRUE); //each required file needs code to prevent it running if it cannot detect this.
$webdata = array();
$mytable = "zy620265"; //set a variable for the database table
$mytitle = 'Erehwon Guest House';
$mycss   = "b_.css"; //set a variable for the css file
$myjs    = "b_.js"; //set a variable for the js file
$valid   = TRUE; //set flag for errors in form
require 'b_head.php'; //the header information
echo "<h1>$mytitle</h1>"; //insert the h1 titile
echo "<h2>F3020350 - Remi Kik - zy620265</h2>";
?>
<!-- <label for="reporta" class="showhide">Show Hide: Report on script actions</label>
<input type="checkbox" id="reporta" value="button" style="display:none;" />
<div class="report">b_coreadmin.php is running</div> -->
<?php
require "mydatabase.php"; // database name, user, password
require "b_dbconnect.php"; // script to conect to database
require "b_setuparray.php"; // set up empty array to match the database table
require 'b_formdata.php'; //add the script to process form input
$testfordata = array_filter($webdata);
if (!empty($testfordata))
  {
  if (!empty($webdata['action']))
    {
?>
		<div class="report">In script b_coreadmin.php $webdata['action']  holds the value: <?php
    echo $webdata['action'];
?>
		</div>
<?php
    if ($webdata['action'] == 'save')
      {
      require "b_validatedata.php";
?>
			<div class="report">In script b_coreadmin.php $valid  holds the value: <?php
      echo $valid;
?>			</div>
<?php
      if ($valid)
        {
        require "b_savedata.php"; //script to save new data to the form
        } //$valid
      } //$webdata['action'] == 'save'
    if ($webdata['action'] == 'confirmdelete')
      {
      require "b_deletedata.php"; //script to delete data from the form
      } //$webdata['action'] == 'confirmdelete'
    } //!empty($webdata['action'])
  require "b_form.php"; //add the input form
  require "b_displayalldata.php"; //script to display all data from the form
  require "b_searchandsort.php";
  if (!empty($webdata['action']))
    {
    if ($webdata['action'] == "search")
      {
      require "b_selectrowtoedit.php";
      } // we only need to display search results if data has been submitted from the search form.
    } //!empty($webdata['action'])
  } //!empty($testfordata)
echo '<div class="report">b_coreadmin.php has completed all actions</div>';
require 'b_foot.php'; //footer to end html document
?>
