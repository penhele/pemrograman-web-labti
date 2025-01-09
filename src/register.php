<?php
include 'db.php';
if($_SERVER['REQUEST_METHOD'] == 'POST'){

    $username =$_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $stmt = $conn->prepare('INSERT INTO users (username, password) VALUES (?,?)');
    $stmt->bind_param('ss', $username, $password);

    if($stmt->execute()){
        echo "REGISTRASI BERHASIL!";
    }else {
    echo "ERROR: " . $stmt->error;
    }

    $stmt->close();

}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrasi</title>
</head>
<body>
    <h2>Form Registrasi</h2>
    <form method="post" action="">
        Username: <input type="text" name="username" required>
        Password: <input type="password" name="password" required>
        <button type="submit">Daftar</button>
    </form>
</body>
</html>