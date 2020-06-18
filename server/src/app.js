const express = require("express")
const app = express()
app.use(express.json());

const bodyparser = require("body-parser")
app.use(bodyparser.json())

const cors = require("cors")
app.use( cors ({ origin:'http://localhost:8080',credentials: true}) )

const morgan = require("morgan")
app.use(morgan("combine"))

const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  password: "jaguar",
  host: "localhost",
  port: "5432",
  database: "shopperx"
})

const uniqueRandom = require('unique-random');
const CustomerID = uniqueRandom(10000,19999);
const MerchantID = uniqueRandom(20000,29999);
const OrderId = uniqueRandom(10000,50000);
const ProductID = uniqueRandom(1000,9999);

var Cookies = require('cookies')
var keys = ['ShopperxSecretKey']

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.mailid,
      pass: process.env.password
    }
  })

const Cryptr = require('cryptr');
const cryptr = new Cryptr('ShopperxSecretKey');

const bcrypt = require('bcrypt');
const saltRounds = 10;

app.listen(8005)

//CONNECT TO THE DATABASE
connect();
async function connect()
{
    try 
    {
      await client.connect();
    } 
    catch (e) 
    {
      console.log(e);
    }
}


//CUSTOMER SIGNUP
app.post("/signup", async (req,res) =>
{
    const reqjson = req.body;
    const firstname = reqjson.firstname;
    const lastname = reqjson.lastname;
    const username = reqjson.username;
    const email_id = reqjson.email_id;
    const password = reqjson.password;
    const phone_number = reqjson.phone_number;
    try 
    {
        const results = await client.query("SELECT * FROM customers WHERE \"User_name\"=$1;",[username]); 
        if(results.rows.length)
            res.send("invalid")
        else
        {
            const customer_id = CustomerID();
            const hashed_pass = bcrypt.hashSync(password, saltRounds);
            await client.query("INSERT INTO customers VALUES($1,$2,$3,$4,$5,$6,$7);",[customer_id,firstname,lastname,username,email_id,hashed_pass,phone_number]); 
            res.send("valid");
        }    
    } catch (e) 
    {
        res.send(false);
        console.log(e);
    }    
})


//MERCHANT SIGNUP 
app.post("/sellersignup", async (req,res) =>
{
    const reqjson = req.body;
    const merchantname = reqjson.merchant_name;
    const email_id = reqjson.email_id;
    const password = reqjson.password;
    const phone_number = reqjson.phone_number;
    try 
    {
        const results = await client.query("SELECT * FROM merchants WHERE \"Merchant_Name\"=$1;",[merchantname]); 
        if(results.rows.length)
            res.send("invalid")        
        else
        {
            const merchant_id = MerchantID();
            const hashed_pass = bcrypt.hashSync(password, saltRounds);
            await client.query("INSERT INTO merchants VALUES($1,$2,$3,$4,$5);",[merchant_id,merchantname,email_id,hashed_pass,phone_number]); 
            res.send("valid");
        }
    } catch (e) 
    {
        console.log(e);
        res.send(false);
    }    
})


//CUSTOMER LOGIN
app.post("/login", async (req,res) =>
{
    const reqjson = req.body;
    const username = reqjson.username;
    const ippass = reqjson.userpass;
    try 
    {
        const results = await client.query("SELECT \"Password\",\"Customer_id\" FROM customers WHERE \"User_name\"=$1;",[username]); 
        if(results.rows.length)
        {
            const dbpass = results.rows[0].Password
            const matches = bcrypt.compareSync(ippass,dbpass)
            if(matches)
            {
                const customer_id = results.rows[0].Customer_id
                var cookies = new Cookies(req, res, { keys: keys })
                var encpt_cid = cryptr.encrypt(customer_id)
                cookies.set('customer', encpt_cid, { signed: true })
                res.send("valid")
            }
            else
                res.send("invalid")
        }
        else
            res.send(false)
    } catch (e) 
    {
        console.log(e)
        res.send(false)
    }    
})


//MERCHANT LOGIN
app.post("/sellerlogin", async (req,res) =>
{
    const reqjson = req.body;
    const name = reqjson.username;
    const ippass = reqjson.userpass;
    try 
    {
        const results = await client.query("SELECT \"Password\",\"Merchant_id\" FROM merchants WHERE \"Merchant_Name\"=$1;",[name]); 
        if(results.rows.length)
            {
                const dbpass = results.rows[0].Password
                const matches = bcrypt.compareSync(ippass, dbpass);;
                if(matches)                   
                {
                    const mid = results.rows[0].Merchant_id
                    var cookies = new Cookies(req, res, { keys: keys })
                    encpt_mid = cryptr.encrypt(mid)
                    cookies.set('merchant', encpt_mid , { signed: true })
                    res.send("valid")
                }
                else
                    res.send("invalid")
            }
        else
            res.send(false);
    } catch (e) 
    {
        console.log(e)
        res.send(false)
    }    
})


//CHECK FOR COOKIES
app.get("/checkuser", (req,res) =>
{
    var cookies = new Cookies(req, res, { keys: keys })
    var encpt_customer = cookies.get('customer', { signed: true })
    if(encpt_customer)
        res.send("customer")
    else
    {
        var encpt_merchant = cookies.get('merchant', { signed: true})
        if(encpt_merchant)
            res.send("merchant")
        else
            res.send(false)
    }    
})


//CLEARING ALL COOKIES 
app.get("/logout", (req,res) =>
{
    res.clearCookie('customer');
    res.clearCookie('merchant');
    res.clearCookie('customer.sig');
    res.clearCookie('merchant.sig');
    res.send(true);
})


//CUSTOMER PROFILE PAGE , GETTING DETAILS AND UPDATING
app.get("/getcustomerdetails", async (req,res) =>
{
    var cookies = new Cookies(req, res, { keys: keys })
    var encpt_customer = cookies.get('customer', { signed: true })
    var cid = cryptr.decrypt(encpt_customer)
    try 
    {
        const results = await client.query("SELECT * FROM customers WHERE \"Customer_id\"=$1;",[cid]);
        res.send(results.rows);
    } catch (e) 
    {
        console.log(e);
        res.send(false);
    }    
})


app.post("/updatecustomerdetails", async (req,res) =>
{
    const reqjson = req.body;
    const fn = reqjson.fn;
    const ln = reqjson.ln;
    const un = reqjson.un;
    const email = reqjson.email;
    const mobile = reqjson.mobile;
    var cookies = new Cookies(req, res, { keys: keys })
    var encpt_customer = cookies.get('customer', { signed: true })
    var cid = cryptr.decrypt(encpt_customer)
    try 
    {
        await client.query("UPDATE customers SET \"Firstname\"=$1 , \"Lastname\"=$2 , \"User_name\"=$3 , \"Email_id\"=$4 , \"Phone_Number\"=$5  WHERE \"Customer_id\"=$6 ;",[fn,ln,un,email,mobile,cid]);
        res.send(true);
    } catch (e) 
    {
        console.log(e);
        res.send(false);
    }    
})


app.post("/updatecustomerpassword", async (req,res) =>
{
    const reqjson = req.body;
    const newPass = reqjson.new;
    const oldPass = reqjson.old;
    var cookies = new Cookies(req, res, { keys: keys })
    var encpt_customer = cookies.get('customer', { signed: true })
    var cid = cryptr.decrypt(encpt_customer)
    try 
    {
        const results = await client.query("SELECT \"Password\" FROM customers WHERE \"Customer_id\"=$1 ;",[cid]);
        const dbpass = results.rows[0].Password
        const matches = bcrypt.compareSync(oldPass, dbpass)
        if(matches)
        {
            const hashed_pass = bcrypt.hashSync( newPass, saltRounds );
            await client.query("UPDATE customers SET \"Password\"=$1 WHERE \"Customer_id\"=$2;",[hashed_pass,cid]);
            res.clearCookie('customer');
            res.clearCookie('customer.sig');
            res.send("valid")
        }   
        else
            res.send("invalid");
    }
    catch (e) 
    {
        console.log(e);
        res.send(false);
    }    
})//CUSTOMER PROFILE END


//MERCHANT PROFILE PAGE , GETTING DETAILS AND UPDATING
app.get("/getmerchantdetails", async (req,res) =>
{
    var cookies = new Cookies(req, res, { keys: keys })
    var encpt_merchant = cookies.get('merchant', { signed: true })
    var mid = cryptr.decrypt(encpt_merchant)
    try 
    {
        const results = await client.query("SELECT * FROM merchants WHERE \"Merchant_id\"=$1;",[mid]);
        res.send(results.rows)
    } catch (e) 
    {
        console.log(e);
        res.send(false);
    }    
})

app.post("/updatemerchantdetails", async (req,res) =>
{
    const reqjson = req.body;
    const name = reqjson.name;
    const email = reqjson.email;
    const mobile = reqjson.mobile;
    var cookies = new Cookies(req, res, { keys: keys })
    var encpt_merchant = cookies.get('merchant', { signed: true })
    var mid = cryptr.decrypt(encpt_merchant)
    try 
    {
        await client.query("UPDATE merchants SET \"Merchant_Name\"=$1 , \"Email_id\"=$2 , \"Phone_Number\"=$3 WHERE \"Merchant_id\"=$4;",[name,email,mobile,mid]);
        res.send(true);
    } catch (e) 
    {
        console.log(e);
        res.send(false);
    }    
})

app.post("/updatemerchantpassword", async (req,res) =>
{
    const reqjson = req.body;
    const newPass = reqjson.new;
    const oldPass = reqjson.old;
    var cookies = new Cookies(req, res, { keys: keys })
    var encpt_merchant = cookies.get('merchant', { signed: true })
    var mid = cryptr.decrypt(encpt_merchant)
    try 
    {
        const results = await client.query("SELECT \"Password\" FROM merchants WHERE \"Merchant_id\"=$1 ;",[mid]);
        const dbpass = results.rows[0].Password
        const matches = bcrypt.compareSync(oldPass, dbpass)
        if(matches)
        {
            const hashed_pass = bcrypt.hashSync( newPass, saltRounds );
            await client.query("UPDATE merchants SET \"Password\"=$1 WHERE \"Merchant_id\"=$2;",[hashed_pass,mid]);
            res.clearCookie('merchant');
            res.clearCookie('merchant.sig');
            res.send("valid")
        }   
        else
            res.send("invalid");
    }
    catch (e) 
    {
        console.log(e);
        res.send(false);
    }    
})//MERCHANT PROFILE END


//RETRIEVE ALL PRODUCTS FROM THE DATABASE
app.get("/getproducts", async (req,res) =>
{
    try 
    {
       const results = await client.query(`SELECT * FROM products ORDER BY "Brand";`); 
       res.send(results.rows); 
    } catch (e) 
    {
        console.log(e);
        res.send(false);
    }
})


//RETRIEVE DEATILS , SPECS  OF ALL PRODUCTS FROM THE DATABASE
app.post("/getproductspecs", async (req,res) =>
{
    const reqjson = req.body
    const pid = reqjson.id
    try 
    {
        const results1 = await client.query(`SELECT * FROM smartphones where "Product_id"=$1;`,[pid]); 
        const results2 = await client.query(`SELECT * FROM products where "Product_id"=$1;`,[pid]); 
        const mid = results2.rows[0].Merchant_id
        const results3 = await client.query(`SELECT * FROM merchants where "Merchant_id"=$1;`,[mid]); 
        const results = [...results1.rows,...results2.rows,...results3.rows]
        res.send(results); 
    } catch (e) 
    {
        console.log(e);
        res.send(false);
    }
})


//ADD A NEW PRODUCT TO THE DATABASE
app.post("/addproduct", async (req,res) =>
{
    const reqjson = req.body;
    const category = reqjson.category;
    var cookies = new Cookies(req, res, { keys: keys })
    var encpt_merchant = cookies.get('merchant', { signed: true })
    var mid = cryptr.decrypt(encpt_merchant)
    let net = ""
    let flag = false
    for(i=0;i<reqjson.net.length;i++)
     {
        if(flag)
        {
            net += ","
        }
        net += reqjson.net[i]
        flag=true 
     }
    try 
    {
        const pid = ProductID();
        await client.query(`INSERT INTO products VALUES(${pid},${mid},$1,$2,$3,$4,$5,$6)`,[reqjson.brand,reqjson.model,reqjson.price,reqjson.stock,category,reqjson.image]); 
        if(category=="smartphone")
        {
            await client.query(`INSERT INTO smartphones VALUES(${pid},$1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,[reqjson.ram,reqjson.internal,reqjson.cam1,reqjson.cam2,reqjson.sim,reqjson.display,reqjson.os,net,reqjson.rmbt,reqjson.btcp]); 
        }
        res.send(true);
    } catch (e) 
    {
        console.log(e);
        res.send(false);
    }
})


//CART 
app.post("/setcartitems", async (req,res) =>
{
    const reqjson = req.body;
    const pid = reqjson.id;
    var cookies = new Cookies(req, res, { keys: keys })
    var encpt_customer = cookies.get('customer', { signed: true })
    var cid = cryptr.decrypt(encpt_customer)
    try 
    {
        const results = await client.query(`SELECT "Product_id" FROM cart WHERE "Product_id"=$1 and "Customer_id"=$2;`,[pid,cid])
        await client.query(`UPDATE products set "Stock" = "Stock"-1 WHERE "Product_id"=$1`,[pid]);
        if(results.rows.length)
            await client.query(`UPDATE cart set "Quantity" = "Quantity"+1 WHERE "Product_id"=$1 and "Customer_id"=$2;`,[pid,cid])
        else
            await client.query(`INSERT INTO cart VALUES($1,$2,$3);`,[pid,cid,1]);
        res.send(true);
    }catch (e) 
    {
        console.log(e);
        res.send(false);
    }    
})


app.get("/getcartitems", async (req,res) =>
{
    var cookies = new Cookies(req, res, { keys: keys })
    var encpt_customer = cookies.get('customer', { signed: true })
    var cid = cryptr.decrypt(encpt_customer)
    try 
    {
        var results = await client.query(`SELECT * FROM cart WHERE "Customer_id"=$1 ORDER BY "Product_id";`,[cid]) 
        res.send(results.rows)
    }catch(e)
    {
        console.log(e)
        res.send(false)
    }    
})


app.post("/getcartitemsdetails", async (req,res) =>
{
    const reqjson = req.body
    const items =  reqjson.items
    var store = []
    try 
    {
        for(i=0;i<items.length;i++)
        {
            var temp = await client.query(`SELECT * FROM products WHERE "Product_id"=$1 ORDER BY "Product_id";`,[items[i].Product_id])
            store = [...store,...temp.rows]
        }
    res.send(store)
    }catch(e)
    {
        console.log(e)
        res.send(false)
    }   
})


app.post("/removeitemfromcart", async (req,res) =>
{
    const reqjson = req.body;
    var cookies = new Cookies(req, res, { keys: keys })
    var encpt_customer = cookies.get('customer', { signed: true })
    var cid = cryptr.decrypt(encpt_customer)
    try 
    {
        await client.query(`UPDATE products set "Stock" = "Stock"+${reqjson.qty} where "Product_id"=${reqjson.id}`); 
        await client.query(`DELETE FROM cart WHERE "Product_id"=${reqjson.id} AND "Customer_id"=${cid};`); 
        res.send(true);
    } catch (e) 
    {
        console.log(e);
        res.send(false);
    }    
})
//CART ENDS

//CHECK OUT 
app.post("/checkout", async (req,res) =>
{
    const reqjson = req.body;
    const orderid = OrderId();
    var cookies = new Cookies(req, res, { keys: keys })
    var encpt_customer = cookies.get('customer', { signed: true })
    var cid = cryptr.decrypt(encpt_customer)
    try 
    {
        //INSERT THE DELIVERY DETAILS INTO DELIVERY_DETAILS TABLE OF DB
        await client.query("INSERT INTO delivery_details VALUES($1,$2,$3,$4,$5,$6);",[orderid,reqjson.firstname +" "+ reqjson.lastname,reqjson.mail,reqjson.Line1,reqjson.Line2,reqjson.mobile]);
        
        //GET THE CUSTOMER DETAILS USING CUSTOMER ID 
        let customer = await client.query(`SELECT * FROM customers WHERE "Customer_id"=${cid};`)
        customer = customer.rows[0]

        //GET THE ARRAY OF PRODUCTS ORDERED BY OUR CUSTOMER
        let carts = await client.query(`SELECT * FROM cart WHERE "Customer_id"=${cid};`) 
        carts = carts.rows
        for(i = 0; i < carts.length; i++)
        {
            //GET EACH PRODUCT DETAILS USING PRODUCT ID
            products = await client.query(`SELECT * FROM products WHERE "Product_id"=${carts[i].Product_id};`)
            products = products.rows[0]

            //INSERT EACH PRODUCT DETAILS IN ORDERS TABLE OF DB
            await client.query(`INSERT INTO orders VALUES(${orderid},${products.Product_id},${cid},${products.Merchant_id},${carts[i].Quantity});`)
            
            //GET THE MERCHANT DETAILS USING CUSTOMER ID 
            merchants = await client.query(`SELECT * FROM merchants WHERE "Merchant_id"=${products.Merchant_id};`)
            merchants = merchants.rows[0]
        
            //SENDING MAIL TO THE CUSTOMER   
            var CustomerMailBody = {
                from: 'shopperx.info@gmail.com',
                to: reqjson.mail,
                subject: 'Order Placed',
                html: `
                        <html><head><style>
                        *
                        { 
                            font-family: "Trebuchet MS";
                            font-weight:bold;
                        }
                        h3{
                            width: 79%;
                            text-align:center;
                            padding: 8px;
                            background-color: #42b983;
                        }
                        table
                        {
                            border-collapse: collapse;
                            width: 80%;
                            text-align:center;
                        }
                        table td
                        {
                            padding: 8px;
                            width: 40%;
                            border: 3px solid black;
                            background-color: #f2f2f2;
                        }
                        </style></head><body>
                        <h1>Thanks for Shopping with us!</h1><p>Your Order is placed with the Order ID ${orderid}</p>
                        <p>You have ordered ${products.Brand} ${products.Model}</p>
                        <p>Cost of a ${products.Brand} ${products.Model} is Rs.${products.Price}/-</p>
                        <p>You have ordered ${carts[i].Quantity} piece(s)</p>
                        <p>Total Price for this product is ${carts[i].Quantity * products.Price}</p>
                        
                        <p>The Product will be delivered by the Merchant to the below details.</p>
                        
                        <h3>DELIVERY DETAILS</h3>
                        <table>
                        <tr><td>Name</td><td>${req.body.firstname} ${req.body.lastname}</td></tr> <tr><td>Email id</td><td>${req.body.mail}</td></tr>
                        <tr><td>Address</td><td>${req.body.Line1} ${req.body.Line2}</td></tr> <tr><td>Mobile No</td><td>${req.body.mobile}</td></tr>
                        </table>
                        </body></html>

                        <h3>DETAILS OF THE MERCHANT</h3>
                        <table>
                        <tr><td>Merchant Id</td><td>${merchants.Merchant_id}</td></tr> <tr><td>Name</td><td>${merchants.Merchant_Name}</td></tr>
                        <tr><td>Email id</td><td>${merchants.Email_id}</td></tr> <tr><td>Mobile No</td><td>${merchants.Phone_Number}</td></tr>
                        </table>
                        </body></html>
                        
                        <p>Account Email id & Mobile No wil be considered as a backup details for delivering the product ,
                         if the delivery email and mobile no doesn't respond!.</p>
                        <h3>Shopper X Account Details</h3>
                        <table>
                        <tr><td>Customer Id</td><td>${customer.Customer_id}</td></tr> <tr><td>First Name</td><td>${customer.Firstname}</td></tr>
                        <tr><td>Last Name</td><td>${customer.Lastname}</td></tr> <tr><td>User Name</td><td>${customer.User_name}</td></tr>
                        <tr><td>Email id</td><td>${customer.Email_id}</td></tr> <tr><td>Mobile No</td><td>${customer.Phone_Number}</td></tr>
                        </table>
                        `
                };
                transporter.sendMail(CustomerMailBody , (error, info) => {
                if(error)
                    console.log(error)
                else
                    console.log('Customer Email sent to ' + reqjson.mail);
                })

                //SENDING MAIL TO THE MERCHANT   
                var MerchantMailBody = {
                    from: 'shopperx.info@gmail.com',
                    to: merchants.Email_id,
                    subject: 'Order Recieved',
                    html: `
                    <html><head><style>
                    *
                    { 
                        font-family: "Trebuchet MS";
                        font-weight:bold;
                    }
                    h3{
                        width: 79%;
                        text-align:center;
                        padding: 8px;
                        background-color: #42b983;
                    }
                    table
                    {
                        border-collapse: collapse;
                        width: 80%;
                        text-align:center;
                    }
                    table td
                    {
                        padding: 8px;
                        width: 40%;
                        border: 3px solid black;
                        background-color: #f2f2f2;
                    }
                    </style></head><body>
                    <h1>Hurray! ShopperX has placed a order for you!</h1><p>Note the Order ID ${orderid}</p>
                    <p>${customer.User_name} has ordered ${products.Brand} ${products.Model}</p>
                    <p>Quantity ${carts[i].Quantity}</p>
                    <p>Total Price for this product is ${carts[i].Quantity * products.Price}</p>
                    
                    <p>Deliver the Product to the below details.</p>
                    
                    <h3>DELIVERY DETAILS</h3>
                    <table>
                    <tr><td>Name</td><td>${req.body.firstname} ${req.body.lastname}</td></tr> <tr><td>Email id</td><td>${req.body.mail}</td></tr>
                    <tr><td>Address</td><td>${req.body.Line1} ${req.body.Line2}</td></tr> <tr><td>Mobile No</td><td>${req.body.mobile}</td></tr>
                    </table>
                    </body></html>
      
                    <p>if the delivery email and mobile no didn't respond!.
                    Consider the Account Email id & Mobile No for delivering the product </p>
                    <h3>Shopper X Account Details</h3>
                    <table>
                    <tr><td>Customer Id</td><td>${customer.Customer_id}</td></tr> <tr><td>First Name</td><td>${customer.Firstname}</td></tr>
                    <tr><td>Last Name</td><td>${customer.Lastname}</td></tr> <tr><td>User Name</td><td>${customer.User_name}</td></tr>
                    <tr><td>Email id</td><td>${customer.Email_id}</td></tr> <tr><td>Mobile No</td><td>${customer.Phone_Number}</td></tr>
                    </table>
                    `       
                };
                transporter.sendMail( MerchantMailBody , (error, info) =>{
                if(error) 
                    console.log(error);
                else 
                    console.log('Merchant Email sent to ' + merchants.Email_id);
                })
                await client.query(`DELETE FROM cart WHERE "Customer_id"=$1;`,[cid]);
            }//for loop ends here
        res.send(JSON.stringify(orderid));     
    } catch (e) 
    {
        console.log(e);
        res.send(false);
    }    
})

//ORDERS PAGE
app.get("/getorderid", async (req,res) =>
{
    var cookies = new Cookies(req, res, { keys: keys })
    var encpt_customer = cookies.get('customer', { signed: true })
    var cid = cryptr.decrypt(encpt_customer)
    try 
    {
        const results = await client.query(`SELECT DISTINCT "Order_id" FROM orders where "Customer_id"=${cid};`); 
        if(results.rows)
            res.send(results.rows); 
    } catch (e) 
    {
        console.log(e);
        res.send(false);
    }    
})

app.get("/getmerchantorders", async (req,res) =>
{
    var cookies = new Cookies(req, res, { keys: keys })
    var encpt_merchant = cookies.get('merchant', { signed: true })
    var mid = cryptr.decrypt(encpt_merchant)
    try 
    {
        const results = await client.query(`SELECT DISTINCT "Order_id" FROM orders where "Merchant_id"=${mid};`); 
        if(results.rows)
            res.send(results.rows); 
    } catch (e) 
    {
        console.log(e);
        res.send(false);
    }    
})

app.post("/getorderitems", async (req,res) =>
{
    try 
    {
        const results = await client.query(`SELECT * FROM orders where "Order_id"=${req.body.id} ORDER BY "Product_id";`); 
        if(results.rows)
            res.send(results.rows);
    } catch (e) 
    {
        console.log(e);
        res.send(false);
    }    
})

app.post("/getmerchantorderitems", async (req,res) =>
{
    var cookies = new Cookies(req, res, { keys: keys })
    var encpt_merchant = cookies.get('merchant', { signed: true })
    var mid = cryptr.decrypt(encpt_merchant)
    try 
    {
        const results = await client.query(`SELECT * FROM orders where "Order_id"=${req.body.id} AND "Merchant_id"=${mid} ORDER BY "Product_id";`); 
        if(results.rows)
            res.send(results.rows);
    } catch (e) 
    {
        console.log(e);
        res.send(false);
    }    
})

app.post("/getorderscustomerdetails", async (req,res) =>
{
    try 
    {
        const results = await client.query(`SELECT "Customer_id" FROM orders where "Order_id"=${req.body.id};`); 
        var customer = await client.query(`SELECT * FROM customers where "Customer_id"=${results.rows[0].Customer_id};`);
        var delivery = await client.query(`SELECT * FROM "delivery_details" where "Order_id"=${req.body.id};`); 
        customer = [...customer.rows,...delivery.rows];
        res.send(customer);
    } catch (e) 
    {
        console.log(e);
        res.send(false);
    }    
})

//MERCHANT PRODUCTS 
app.get("/getproductsbymerchant", async (req,res) =>
{
    var cookies = new Cookies(req, res, { keys: keys })
    var encpt_merchant = cookies.get('merchant', { signed: true })
    var mid = cryptr.decrypt(encpt_merchant)
    try 
    {
        const results = await client.query(`SELECT * FROM products where "Merchant_id"=$1;`,[mid]); 
        res.send(results.rows); 
    } catch (e) 
    {
        console.log(e);
        res.send("error");
    }    
})

app.post("/removeproduct", async (req,res) =>
{
    const reqjson = req.body;
    const id = reqjson.id;
    try 
    {
        await client.query(`DELETE FROM products WHERE "Product_id"=$1;`,[id])
        res.send(true)
    }catch (e) 
    {
        console.log(e)
        res.send(false)
    }    
})

app.post("/updateproduct", async (req,res) =>
{
    const reqjson = req.body;
    const id = reqjson.id;
    const price = reqjson.price;
    const stock = reqjson.stock;
    const image = reqjson.image;
    try 
    {
        await client.query(`UPDATE products SET "Price"=$1 , "Stock"=$2 , "Image_url"=$3 WHERE "Product_id"=$4 ;`,[price,stock,image,id]);
        res.send(true);
    }catch (e) 
    {
        console.log(e);
        res.send(false);
    }    
})


app.post("/search", async (req,res) =>
{
    const reqjson = req.body;
    const key = reqjson.key;
    try 
    {
        const results = await client.query(`SELECT * FROM products WHERE UPPER("Brand") LIKE UPPER('%${key}%') OR UPPER("Model") LIKE UPPER('%${key}%') OR UPPER("Category") LIKE UPPER('%${key}%');`);
        if(results.rows.length)
            res.send(results.rows);
        else
            res.send(false);
    }catch (e) 
    {
        console.log(e);
        res.send(false);
    }    
})