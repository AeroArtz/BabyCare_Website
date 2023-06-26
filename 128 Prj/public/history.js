con.connect( function(err){
    if (err) throw err;
    const query = 'SELECT service_id,service_name FROM user_services s service i WHERE username = ? and s.service_id=i.service_id' ;

    con.query(sql,[username, globalVariable],function(err,result){
        if (err) throw err;
        var text = "";
        for (let i=0;i<result.length;i++){
            text+="<div><tr><td>"+result[i].service_id+"</td><td>"+result[i].service_name+"</td><tr></div>";
        }
        document.getElementById('servicesHistory').innerHTML =text;
    })
})