import "dotenv/config";

const admin_auth = {
    user_name: process.env.USER_NAME,
    password: process.env.AUTH_PASS,
}

const authentication = (req,res,next)=>{
  const auth = req.cookies.token
  if (auth) {
    if (auth.data.email == admin_auth.user_name && auth.data.password == admin_auth.password) {
      next()
    }else{
      res.redirect('/login') 
    }
  }else{
    res.redirect('/login')
  } 
}



export default authentication