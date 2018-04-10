<?php
if(!defined('ISITSAFETORUN')) {
//http_response_code(404);
   die(''); // and issue a 404 page not found
}
?>
<div class="report">Delete one row of data:   <?php echo $webdata['editid'] ?>  from the table <?php echo $mytable ?> . In script b_deletedata.php</div>
<?php
if (!empty($_POST))
{
	
	if (isset($webdata['editid'] )){
		$sql = "DELETE FROM  $mytable  WHERE id = ? ";
		
		$stmt = mysqli_prepare($dbhandle, $sql );
		mysqli_stmt_bind_param($stmt,'s',$webdata['editid']);
		
	
	/* execute prepared statement */
	mysqli_stmt_execute($stmt);
	printf("%d Row deleted.\n", mysqli_stmt_affected_rows($stmt));
	/* close statement and connection */
	mysqli_stmt_close($stmt);
}}
?>
<div class="report">One row of data has been deleted from the table. In script b_deletedata.php</div>
