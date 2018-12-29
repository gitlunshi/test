<?php
 header('Content-type: text/json; charset=utf-8');

switch ($_POST['path']) {
    case "apiLoginAction":
        if ($_POST['method']  == 'glogin'){
            glogin();
        }else if($_POST['method']  == 'register'){
             $data=array(
                        "success"=> false,
                        "result"=> "login"
                );
            echo json_encode($data,JSON_UNESCAPED_UNICODE);
        }

        break;
    case "apiShipmentTemplateAction":
          $data=array(
                      "success"=> false,
                      "result"=> "login"
              );
           echo json_encode($data,JSON_UNESCAPED_UNICODE);
           break;
    default:
        echo "error";
}

function glogin(){
        $userName=$_POST['username'];
        $passWord=$_POST['password'];
        if($userName=="test" &&  $passWord=="test"){
                $data=array(
                              "success" => true,
                              "result" => "login",
                              "token" => "78D0929*****",
                              "user" => array("ApiUserVo" => $userName),
                            );
                echo json_encode($data,JSON_UNESCAPED_UNICODE);
            }else{
                 $data=array(
                            "success"=> false,
                            "result"=> "login"
                    );
                echo json_encode($data,JSON_UNESCAPED_UNICODE);
            }
}
?>