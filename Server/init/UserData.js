const bcrypt = require('bcryptjs')
const hashPassword = async (password)=>{
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    return password;
}


const userData = [
    {
        name: "vaibhav patil",
        email: "patil@medirural.com",
        password: "123456",
        phone: "6355383255",
        address: {
            street: "Admin Office",
            city: "surat",
            state: "gujarat",
            pincode: "395001"
        },
        role: "admin"
    },
    {
        name :"Manav Patel",
        email :"manav@medirural.com",
        password : "123456",
        phone :"1234567890",
        address :{
            street : "Admin office",
            city: "bardoli",
            state: "gujarat",
            pincode: "394355"
        },
        role:"admin"
    },

];

module.exports = userData; 