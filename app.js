let express = require("express");
let mysql = require("mysql");
let bodyparser = require("body-parser");
let habla = bodyparser.urlencoded({extended:false});

let app = express();
/*
***connection
 */
let con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database: "gestion",
    multipleStatements:true
});

con.connect(function(err){
    if(err){
        throw err;
    }
    console.log("connect")
})


//Password and Email
app.get("/", (req,res)=>{
    res.render("login")
})

app.post("/home",habla, function(req,res){
    let login = {email:"admin", password:"admin"}
        if(req.body.email==login.email && req.body.password==login.password){
        res.render("home");
        }else{
            res.render("login");
        }
    })

app.get("/home", function(req,res){
    res.render("home")
})

/* another page home
**********
************
**********
*/

    // Affichage des rayons

    app.get("/rayon", function(req,res){
        con.query("select * from rayon", function(err,result){
            if(err){
                throw err;
            }else{
                res.render("rayon",{table:result})
            }
        })
    })


    // Affichage des details des rayons
    app.get("/details/", function(req,res){
        con.query("select rayon_id,rayon_name,products_id,product_name,quantity,unit_price,name,tel,email from rayon,products,fournisseur where rayon_id=id_rayon and id=id_f and rayon_id ="+req.query.id+"", function(err,result){
            if(err){
                throw err;
            }else{
                res.render("details",{table:result})
            }
        })
    })

    // Affichage de toutes informations
    app.get("/select", function(req,res){
        con.query("select * from products",function(err,result){
            if(err){
                throw err;
            }else{
                res.render("select",{table:result})
            }
        })
    })

    //Add new rayon 
    app.get("/add", function(req,res){
        res.render("add");  
    })
    app.post("/add", habla, function(req,res){
        con.query("insert into rayon(rayon_id,rayon_name) values("+req.body.id+",'"+req.body.name+"')",function(err,result){
            if(err){
                res.send(err)
            }else{
                res.render("add_fsseur")
                

            }
        })
    })

    // Add new fournisseur
    app.get("/add_fsseur", function(req,res){
        res.render("add_fsseur")
    })

    app.post("/add_fsseur", habla, function(req,res){
        con.query("insert into fournisseur values("+req.body.id+",'"+req.body.name+"','"+req.body.tel+"','"+req.body.email+"')", function(err,result){
            if (err){
                throw err;
            }else{
                res.redirect("/add_pdt")
            }
        })
    })

    // Add new products
    app.get("/add_pdt", function(req,res){
        con.query("select * from rayon", function(err,result){
            if(err){
                throw err
            }
            con.query("select * from fournisseur", function(err,resu){
                if(err){
                    throw err
                }else{
                    res.render("add_pdt",{fsseur:resu,table:result})
                }
            })
        })
    })

    app.post("/add_pdt", habla, function(req,res){
        con.query("insert into products values("+req.body.id+","+req.body.quantity+","+req.body.price+",'"+req.body.name+"',"+req.body.rayonId+","+req.body.fsseurId+")", function(err,result){
            if(err){
                throw err
            }else{
                res.redirect("add_pdt")
            }
        })
    })


/* ********************************************************************************************************************* */

//edit products

app.get("/edit_pdt", function(req,res){
    con.query("select * from rayon", function(err,result){
        if (err){
            throw err
        }else{
            res.render("edit_pdt",{table:result, name:req.query.name})
        }
    })
    
})



app.post("/edit_pdt",habla, function(req,res){
    con.query("update products set id_rayon="+req.body.rayonId+",quantity="+req.body.quantity+",unit_price="+req.body.price+" where products_id="+req.query.id+"", function(err,result){
        if (err){
            throw err
        }else{
            res.redirect("select")
        }
    })
})


// delete products
app.get("/delete", function(req,res){
    con.query("delete from products where products_id="+req.query.id+"", function(err,result){
        if(err){
            throw err
        }else{
            res.redirect("/select")
        }
    })
})


/* ********************************************************************************************************************* */

//edit fournisseur

app.get("/fsseur", function(req,res){
    con.query("select * from fournisseur", function(err,result){
        if(err){
            throw err
        }else{
            res.render("fsseur",{table:result})
        }
    })
})

app.get("/edit_fsseur", function(req,res){
    con.query("select * from fournisseur where id="+req.query.id+"", function(err,result){
        if(err){
            throw err
        }else{
            res.render("edit_fsseur",{table:result,name:req.query.name})
        }
    })
})

app.post("/edit_fsseur", habla, function(req,res){
    con.query("update fournisseur set tel="+req.body.tel+",email='"+req.body.email+"' where id="+req.query.id+"", function(err,result){
        if(err){
            throw err
        }else{
            res.redirect("fsseur")
        }
    })
})



// delete fournisseur
app.get("/err", function(req,res){
    res.render("err")
})

app.get("/err_fsseur", function(req,res){
    res.render("err_fsseur")
})

app.get("/delete_F", function(req,res){
    con.query("delete from fournisseur where id="+req.query.id+"", function(err,result){
        if (err){
           res.redirect("err_fsseur")
        }else{
            res.redirect("fsseur")
        }
    })
})

/* ********************************************************************************************************************* */


//edit rayon

app.get("/edit_rayon", function(req,res){
    con.query("select * from rayon where rayon_id="+req.query.id+"",function(err,result){
        if(err){
            throw err
        }else{
            res.render("edit_rayon",{table:result,name:req.query.name})
        }
    })
})

app.post("/edit_rayon", habla, function(req,res){
    con.query("update rayon set rayon_name='"+req.body.name+"' where rayon_id="+req.query.id+"", function(err,result){
        if(err){
            throw err
        }else{
            res.redirect("rayon")
        }
    })
})
// Delete rayon

app.get("/delete_R", function(req,res){
    con.query("delete from rayon where rayon_id="+req.query.id+"", function(err,result){
        if (err){
            res.redirect("err")
        }else{
            res.redirect("rayon")
        }
    })
})




/* ********************************************************************************************************************* */

/*
***linking views
*/
app.set("view engine", "ejs");

/*
***middle ware
*/
app.use("/css",express.static("css"));
/*
*** Import all related javaScript an CSS files to inject in our App
*/

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/tether/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/css'));



app.listen(3000);