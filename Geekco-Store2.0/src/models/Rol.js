module.exports=(sequelize,dataTypes)=>{

    const alias="Rol"
    const cols={
         id:{
             type:dataTypes.INTEGER,
             unsigned:true,
             primaryKey:true,
          allowNull:false,
          autoIncrement:true
         },

         name:{type:dataTypes.STRING(50),
         allowNull:false},
 
 
 
     }   
         const config = {
             tableName:"rols",
             timestamps: true
         }
 
         const Rol= sequelize.define(alias,cols,config)
 
    Rol.associate=function(modelos){
     Rol.hasMany(modelos.User,{
         as:"roles",
         foreignKey:"rol_id"
     })
    } 
 
    return Rol
 
 }