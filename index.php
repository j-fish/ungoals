<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);
?>
<?php include $_SERVER['DOCUMENT_ROOT'].'app/utl/refs.php'; ?>
<!doctype html>
<html lang="*" class="h-100">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="<?=APP_DESC;?>">
    <title><?=APP_TITLE;?></title>
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/css/app/app.css">
    <meta name="theme-color" content="#7952b3">
  </head>
  <body class="d-flex flex-column h-100">
    <?php include $_SERVER['DOCUMENT_ROOT'].'app/view/header.php'; ?>
    <?php include $_SERVER['DOCUMENT_ROOT'].'app/view/main.php'; ?>
    <?php include $_SERVER['DOCUMENT_ROOT'].'app/view/footer.php'; ?>
    <script src="/js/bootstrap.bundle.min.js"></script>
    <script src="/js/jquery-3.5.1.min.js"></script>
    <script src="/js/app/app.js"></script>      
  </body>
</html>
