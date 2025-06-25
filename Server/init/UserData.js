<<<<<<< HEAD
=======
const bcrypt = require('bcryptjs')
const hashPassword = async (password)=>{
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    return password;
}


>>>>>>> 8560b1020a198bfd57e8ba4a88d03f1e03b0cf51
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
<<<<<<< HEAD
    // Supplier user
    {
        name: "vaibhav patil supplier",
        email: "patil.supplier@medirural.com",
        password: "123456",
        phone: "1234567890",
        address:{
            street :"Admin Office",
            city :"surat",
            state :"gujarat",
            pincode: "395001"
        },
        role: "supplier"
    },{
        name: "Patel Manav supplier",
        email: "patel.supplier@medirural.com",
        password: "123456",
        phone: "1234567890",
        address:{
            street :"Admin Office",
            city :"surat",
            state :"gujarat",
            pincode: "395001"
        },
        role: "supplier"
    }
=======
>>>>>>> 8560b1020a198bfd57e8ba4a88d03f1e03b0cf51

];

module.exports = userData; 