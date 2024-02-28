module.exports=(sequelize,dataTypes)=>{

    const alias="User"
    const cols={
         id:{
             type:dataTypes.INTEGER,
             unsigned:true,
             primaryKey:true,
          allowNull:false,
          autoIncrement:true
         },
         rol_id:{
             type:dataTypes.INTEGER,
             unsigned:true,
             allowNull:false
         },
         first_name:{type:dataTypes.STRING(45),
         allowNull:false},
         last_name:{type: dataTypes.STRING(200),
         allowNull:false},
         email:{type:dataTypes.STRING(200),
         allowNull:false},
         birthday:{
             type:dataTypes.DATE,
             allowNull:false
         },
         password:{type:dataTypes.STRING(300),
         allowNull:false}
 
 
 
     }   
         const config = {
             tableName:"users",
             timestamps: true
         }
 
         const User= sequelize.define(alias,cols,config)
 
    User.associate=function(modelos){
     User.belongsTo(modelos.Rol,{
         as:"roles",
         foreignKey:"rol_id"
     })
    } 
 
    return User
 
 }