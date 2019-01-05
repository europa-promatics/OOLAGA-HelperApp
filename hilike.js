// var env       		= 'dev'; // for localhost
var env       		= 'server';    // for aws server
var config    		= require('./config.json')[env];
var request   		= require('request');
var password  		= config.password ? config.password : null;
var Sequelize 		= require('sequelize');
var passwordHash    = require('password-hash');
var mailer			= require('express-mailer');
var express 		= require('express');
var app 			= express();
var request 		= require('request');
var _ = require("underscore");
var async = require('async');

const Op = Sequelize.Op;

var c = require('./constants.json')['website'];
const img_url = config.image_url;
const WEBSITE_URL = config.website_url;

mailer.extend(app, {
  from: 'promatics.tajinder@gmail.com',
  host: 'smtp.gmail.com', // hostname 
  secureConnection: true, // use SSL 
  port: 465, // port for secure SMTP 
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
  auth: {
    user: 'promatics.tajinder@gmail.com',
    pass: 'protjmsingh'
  }
});
app.engine('jade', require('jade').__express);
app.set('view engine','jade');

var sequelize = new Sequelize(
	config.database,
	config.user,
	config.password, {
		logging: console.log,
		dialect: "mysql",
		define: {
			timestamps:false
		}
	}
);

//use the .authenticate() function like this to test the connection.
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//////////////////// MODELS ///////////////////////////
const Country = sequelize.define('country',
					{
						id: {type:Sequelize.INTEGER, primaryKey:true},
						c_name:{type:Sequelize.STRING},
						flag:{type:Sequelize.STRING},
						search_parallelity:{type:Sequelize.STRING},
						status:{type:Sequelize.BOOLEAN}
					},
					{
						tableName: 'country'
					}
				)
const Residence = sequelize.define('residence',
					{
						id: {type:Sequelize.INTEGER, primaryKey:true},
						r_name:{type:Sequelize.STRING},
						flag:{type:Sequelize.STRING},
						search_parallelity:{type:Sequelize.STRING},
						status:{type:Sequelize.BOOLEAN}
					},
					{
						tableName: 'residence'
					}
				)
					

const User = sequelize.define('user',
				{
					id: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
					username: {type: Sequelize.STRING},
					name: {type: Sequelize.STRING},
					facebook_id:{type: Sequelize.STRING},
					user_type:{type: Sequelize.STRING},
					email:{type: Sequelize.STRING},
					image:{type: Sequelize.STRING},
					password:{type: Sequelize.STRING},
					country_id:{type:Sequelize.STRING},
					age: {type:Sequelize.STRING},
					gender: {type:Sequelize.STRING},
					decoded_password: {type:Sequelize.STRING},
					residence: {type:Sequelize.STRING},
					region: {type:Sequelize.STRING},
					social_status:{type:Sequelize.STRING},
					marriage_type: {type:Sequelize.STRING},
					children:{type:Sequelize.STRING},
					smoking:{type:Sequelize.STRING},
					Height:{type:Sequelize.STRING},
					weight:{type:Sequelize.STRING},
					skin_color:{type:Sequelize.STRING},
					hair_color:{type:Sequelize.STRING},
					body_type:{type:Sequelize.STRING},
					fb_status:{type:Sequelize.INTEGER},
					logged_status:{type:Sequelize.ENUM,values:[0,1]},
					logged_time:{type:Sequelize.STRING},
					latitude:{type:Sequelize.STRING},
					longitude:{type:Sequelize.STRING},
					created_at:{type:Sequelize.STRING},
					status:{type:Sequelize.STRING},
					distance:{type:Sequelize.VIRTUAL},
					free_trial:{type:Sequelize.ENUM,values:[0,1]},
					free_trial_enable_time:{type:Sequelize.STRING},
					free_trial_status:{type:Sequelize.STRING},
					last_login:{type:Sequelize.STRING},
					is_deleted:{type:Sequelize.INTEGER}
				},
				{
					tableName: 'user',
				}
			)

const ContactUs = sequelize.define('contact_us',
					{
						id: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
						name: {type: Sequelize.STRING},
						email:{type: Sequelize.STRING},
						subject:{type: Sequelize.STRING},
						message:{type: Sequelize.STRING},
					},
					{
						tableName: 'contact_us',
					}
				)

const AboutMe   = sequelize.define('about_me', 
					{
						id: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
						user_id: {type: Sequelize.INTEGER},
						introduction: {type: Sequelize.STRING},
						looking_for:{type: Sequelize.STRING},
					},
					{
						tableName: 'about_me',
					}
				)
const ProfilePics   = sequelize.define('profile_pics', 
					{
						id: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
						user_id: {type: Sequelize.INTEGER},
						pic_name: {type: Sequelize.STRING}
					},
					{
						tableName: 'profile_pics',
					}
				)
const BlockedUsers = sequelize.define('blocked_user',
					{
						id: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
						user_id: {type: Sequelize.INTEGER},
						block_by: {type: Sequelize.INTEGER},
						status: {type: Sequelize.ENUM,values:[0,1]},
						created_at:{type:Sequelize.DATE},
						updated_at:{type:Sequelize.DATE}
					},
					{
						tableName: 'blocked_user',
					}
				)
const LikedUsers = sequelize.define('liked_user',
					{
						id: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
						user_id: {type: Sequelize.INTEGER},
						liked_by: {type: Sequelize.INTEGER},
						status: {type: Sequelize.ENUM,values:[0,1]},
						created_at:{type:Sequelize.DATE},
						updated_at:{type:Sequelize.DATE}
					},
					{
						tableName: 'liked_user',
					}
				)
const FavouriteUsers = sequelize.define('favourite_user',
					{
						id: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
						user_id: {type: Sequelize.INTEGER},
						favourite_by: {type: Sequelize.INTEGER},
						status: {type: Sequelize.ENUM,values:[0,1]},
						created_at:{type:Sequelize.DATE},
						updated_at:{type:Sequelize.DATE}
					},
					{
						tableName: 'favourite_user',
					}
				)
const SubscriptionPlan =sequelize.define('subscription_plan',
					{
						id: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
						user_type: {type: Sequelize.ENUM,values:['N','V','G']},
						service_type_arabic: {type: Sequelize.STRING},
						service_type_english: {type: Sequelize.STRING},
						day_count: {type: Sequelize.INTEGER},
						plan_price: {type: Sequelize.INTEGER},
						status: {type: Sequelize.ENUM,values:[0,1]},
						created_at:{type:Sequelize.DATE},
						updated_at:{type:Sequelize.DATE}
					},
					{
						tableName: 'subscription_plan',
					}
				)
const SubscriptionAdvantages =sequelize.define('subscription_advantages',
					{
						id: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
						plan_type: {type: Sequelize.ENUM,values:['vip','gold']},
						advantages: {type: Sequelize.STRING},
					},
					{
						tableName: 'subscription_advantages',
					}
				)
const Discount = sequelize.define('discount',
					{
						id: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
						user_name: {type: Sequelize.INTEGER},
						discount_code: {type: Sequelize.STRING},
						percent: {type: Sequelize.STRING},
						user_type: {type: Sequelize.ENUM,values:['A','G','V']},
						start_date: {type: Sequelize.STRING},
						end_date: {type: Sequelize.STRING},
						status: {type: Sequelize.ENUM,values:[0,1]},
					},
					{
						tableName: 'discount',
					}
				)
const GcmUsers = sequelize.define('gcm_users',
					{
						id: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
						user_id: {type: Sequelize.INTEGER},
						device_id: {type: Sequelize.STRING},
						token: {type: Sequelize.STRING},
						device_type: {type: Sequelize.ENUM,values:[0,1]},
						status: {type: Sequelize.ENUM,values:[0,1]}
					},
					{
						tableName:'gcm_users'
					}
				)
const Search = sequelize.define('search',
					{
						id: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
						type:{type: Sequelize.STRING},
						difference:{type: Sequelize.STRING},
						start:{type: Sequelize.STRING},
						end:{type: Sequelize.STRING}
					},
					{
						tableName:'search'
					}
				)
const Social_status = sequelize.define('social_status',
					{
						id: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
						name:{type: Sequelize.STRING},
						status:{type: Sequelize.STRING}
					},
					{
						tableName:'social_status'
					}
				)
const Religion = sequelize.define('religion',
					{
						id: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
						name:{type: Sequelize.STRING},
						status:{type: Sequelize.STRING}
					},
					{
						tableName:'religion'
					}
				)
const Marriage_type = sequelize.define('marriage_type',
					{
						id: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
						name:{type: Sequelize.STRING},
						status:{type: Sequelize.STRING}
					},
					{
						tableName:'marriage_type'
					}
				)
User.belongsTo(Social_status, {foreignKey:'social_status',as:'social_status_detail'});
User.belongsTo(Religion, {foreignKey:'region',as:'religion_detail'});
User.belongsTo(Marriage_type, {foreignKey:'marriage_type',as:'marriage_type_detail'});

User.hasMany(ProfilePics, {foreignKey:'user_id',targetKey: 'id',as:'profilePics'});
User.belongsTo(AboutMe, {foreignKey:'id',targetKey: 'user_id',as:'aboutMe'});
User.belongsTo(Country, {foreignKey:'country_id',as:'country'});
User.belongsTo(Residence, {foreignKey:'residence',as:'residence_detail'});

BlockedUsers.belongsTo(User, 	{foreignKey:'user_id',as:'user_detail'});
LikedUsers.belongsTo(User, 		{foreignKey:'liked_by',as:'user_detail'});
FavouriteUsers.belongsTo(User, 	{foreignKey:'user_id',as:'user_detail'});

User.hasMany(BlockedUsers, 		{foreignKey:'user_id',targetKey: 'id',as:'block'});
User.hasMany(LikedUsers, 		{foreignKey:'user_id',targetKey: 'id',as:'like'});
User.hasMany(FavouriteUsers, 	{foreignKey:'user_id',targetKey: 'id',as:'favourite'});

// User.belongsTo(LikedUsers, 		{foreignKey:'user_id',as:'like'});
// User.belongsTo(FavouriteUsers, 	{foreignKey:'user_id',as:'favourite'});
//////////////////// END MODELS ///////////////////////
exports.countries = function(req, res) {

	Country.findAll({
		attributes: ['id','c_name','flag','search_parallelity'],
		where:{ status : 0 , is_deleted : 0}
	}).then(function(resl){
		if(resl.length === 0) {
			var response = false;
			var message  = 'No country is available';
		} else {
			var response = true;
			var message  = 'country list';
		}
		res.end(JSON.stringify({ response:response, message:message, data:resl }));
	});
}
exports.residence = function(req, res) {

	Residence.findAll({
		attributes: ['id','r_name','flag','search_parallelity'],
		where:{ status : 0 , is_deleted : 0}
	}).then(function(resl){
		if(resl.length === 0) {
			var response = false;
			var message  = 'No country is available';
		} else {
			var response = true;
			var message  = 'country list';
		}
		res.end(JSON.stringify({ response:response, message:message, data:resl }));
	});
} 
exports.signup = function(req, res) {
	data = {
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		//password: req.body.password,
		country_id: req.body.country_id,
		age : req.body.age,
		gender : req.body.gender,
		latitude : req.body.latitude,
		longitude: req.body.longitude
	}
	var hashedPassword = passwordHash.generate(req.body.password);
	if( (data.longitude == '') || (data.longitude == undefined) ||(data.latitude == '') || (data.latitude == undefined) ||(data.username == '') || (data.username == undefined) || (data.name == '') || (data.name == undefined) || (data.email == '') || (data.email == undefined) || (req.body.password == '') || (req.body.password == undefined) || (data.age == '') || (data.age == undefined) || (data.gender == '') || (data.gender == undefined) || (data.country_id == '') || (data.country_id == undefined) ){
		res.json({ response:false, message:'Please fill the required fields: name, username, email, password, age , gender, country_id' });
	}else{
	User.findOne({
		where: {email :data.email}
	}).then(function(resl) {
			if(resl == null) {
				User.findOne({
					where: {username :data.username}
				}).then(function(resl) {
					var date=new Date().toString();
					if(resl == null) {
						User.create({
							name: data.name,
							username: data.username,
							email: data.email,
							password: hashedPassword,
							decoded_password: req.body.password,
							age: data.age,
							gender : data.gender,
							country_id : data.country_id,
							latitude : req.body.latitude,
							longitude: req.body.longitude,
							last_login:date
						}).then(function(result){
							// var final_res = result.dataValues;
							var user_id   = result.id;
							var fileName  = '';
							// upload image
							if(req.files) { //if we have file in the data
								var img_name = req.files.image.name;
								var img_arr  = img_name.split('.');
					            var ext 	 = img_arr.pop();
					            ext     	 = ext.toLowerCase();
					            if(ext =="jpg" || ext =="jpeg" || ext =="gif" || ext =="png")
						        {
						        	var fileName = Date.now()+user_id+'.'+ext; //req.files.image.name
						        	let sampleFile = req.files.image;
									var targetPath = c.userImageBasePath;
									sampleFile.mv('../'+c.WEBSITE_FOLDER+'/'+targetPath+'/'+fileName, function(err){
										if(err){
											//res.json({ response: false, message:'image could not be uploaded',error:err });
										} else{
											User.update({image:img_url+fileName},{where: {id:user_id}}).then((updateddata)=>{
												ProfilePics.create({user_id:user_id,pic_name:img_url+fileName}).then((data)=>{},err=>{})
												//res.json({ response: true, message:'You have registered successfully.', data:updateddata });
												User.findOne({where:{id:user_id},include:[{
										              model: ProfilePics,
										              as:'profilePics'
										            },{
										              model: AboutMe,
										              as:'aboutMe'
										            },{
										              model: Country,
										              as:'country'
										            },{
										              model: Residence,
										              as:'residence_detail'
										            },{
										              model: Social_status,
										              as:'social_status_detail'
										            },{
										              model: Religion,
										              as:'religion_detail'
										            },{
										              model: Marriage_type,
										              as:'marriage_type_detail'
										            }]}).then(data=>{
													res.send(JSON.stringify({ response:true, message:'You have registered successfully.', data:data }));
												},err=>{
													res.send({ response:false, message:'Wrong Data' });
												})
											},err=>{
												res.send({ response:false});
											})
										}
									});
						        }
							}else{
								User.findOne({where:{id:user_id},include:[{
										              model: ProfilePics,
										              as:'profilePics'
										            },{
										              model: AboutMe,
										              as:'aboutMe'
										            },{
										              model: Country,
										              as:'country'
										            },{
										              model: Residence,
										              as:'residence_detail'
										            },{
										              model: Social_status,
										              as:'social_status_detail'
										            },{
										              model: Religion,
										              as:'religion_detail'
										            },{
										              model: Marriage_type,
										              as:'marriage_type_detail'
										            }]}).then(data=>{
									res.send(JSON.stringify({ response:true, message:'You have registered successfully.', data:data }));
								},err=>{
									res.send({ response:false, message:'Wrong Data' });
								})
							}
						});
					}else{
						res.json({ response:false, message:'This Username is already registered.' });
					}
				})
			} else {
				res.json({ response:false, message:'This Email id is already registered.' });
			}
		},
		function(err){
			res.end(JSON.stringify({ response:false, message:c.COMMON_ERROR }))
		}
	)
		
	} 
}
exports.login = function(req, res) {
	data = {
		email: req.body.email,
		password: req.body.password
	}
	if( (data.email == '') || (data.email == undefined) || (data.password == '') || (data.password == undefined) ){
		res.json({ response:false, message:'Please fill the required fields: email, password' });
	}
	User.findOne({
		where:[{email:data.email},{decoded_password:data.password},{is_deleted:0}],
		include:[{
              model: ProfilePics,
              as:'profilePics'
            },{
              model: AboutMe,
              as:'aboutMe'
            },{
              model: Country,
              as:'country'
            },{
              model: Residence,
              as:'residence_detail'
            },{
              model: Social_status,
              as:'social_status_detail'
            },{
              model: Religion,
              as:'religion_detail'
            },{
              model: Marriage_type,
              as:'marriage_type_detail'
            }]
        }).then((result)=>{
		if(result==null){
			User.findOne({
				where:[{username:data.email},{decoded_password:data.password},{is_deleted:0}],
				include:[{
		              model: ProfilePics,
		              as:'profilePics'
		            },{
		              model: AboutMe,
		              as:'aboutMe'
		            },{
		              model: Country,
		              as:'country'
		            },{
		              model: Residence,
		              as:'residence_detail'
		            },{
		              model: Social_status,
		              as:'social_status_detail'
		            },{
		              model: Religion,
		              as:'religion_detail'
		            },{
		              model: Marriage_type,
		              as:'marriage_type_detail'
		            }]
		        }).then((result1)=>{
		        	if(result1==null){
						res.send({response:false,message:'Invalid Credentials or account deleted'})				
		        	}else{
		        		var date=new Date().toString();
		        		result1.update({last_login:date}).then(result1=>{
		        		},err=>{
		        		})
						res.send({response:true,message:'Login successfully.',data:result1})				
		        	}
		        },err=>{
					res.send({response:false,data:err})				
		        })
		}else {
			// var image_url = 
			var targetPath = c.userImageBasePath;
			console.log(targetPath);
			var image_name = result.image;

			//var img_src      = '';
			//var data.img_src = img_src;
			//console.log(data.img_src);

			var res_data 	 =  result.dataValues;
			var img_src      = '../'+c.WEBSITE_FOLDER+'/'+targetPath;
			res_data.img_src = img_src;
			var date=new Date().toString();
		        		result.update({last_login:date}).then(result=>{
		        		},err=>{
		        		})
			res.send({response:true,message:'Login successfully.',data:res_data })				
		}
	},err=>{
		res.send({response:false,data:err})				
	});
}
exports.fb_login = function(req, res) {
	var date=new Date().toString();
	data={
		facebook_id:req.body.facebook_id,
		name:req.body.name,
		gender:req.body.gender,
		latitude : req.body.latitude,
		longitude: req.body.longitude,
		last_login:date
	}
	if(req.body.email){
		data.email=req.body.email
	}
	if(req.body.image){
		data.image=req.body.image	
	}
	if(data.latitude!=null && data.latitude!='' &&
		data.longitude!=null && data.longitude!='' &&
		data.facebook_id!=null && data.facebook_id!='' &&
		data.name!=null && data.name!='' &&
		data.gender!=null && data.gender!=''){
		User.findOne({where:[{facebook_id:data.facebook_id},{is_deleted:0}],include:[{
								              model: ProfilePics,
								              as:'profilePics'
								            },{
								              model: AboutMe,
								              as:'aboutMe'
								            },{
								              model: Country,
								              as:'country'
								            },{
								              model: Residence,
								              as:'residence_detail'
								            },{
								              model: Social_status,
								              as:'social_status_detail'
								            },{
								              model: Religion,
								              as:'religion_detail'
								            },{
								              model: Marriage_type,
								              as:'marriage_type_detail'
								            }]}).then((result)=>{
			if(result!=null && result!=''){
				var date=new Date().toString();
		        		result.update(data).then(result=>{
		        		},err=>{
		        		})
				res.send({response:true,message:'Login successfully.',data:result})
				// result.update(data).then(data=>{
				// 	User.findOne({where:[{facebook_id:data.facebook_id}]}).then((result)=>{
				// 	})
				// },err=>{
				// 	res.send({response:false})
				// })
			}else{
				User.create(data).then((result)=>{
					User.findOne({where:[{facebook_id:data.facebook_id}]}).then((result)=>{
						if(req.body.image){
							ProfilePics.create({user_id:result.id,pic_name:data.image}).then((data)=>{},err=>{})
						}
						res.send({response:true,message:'You have registered successfully.',data:result})
					})
						//res.send({response:true,message:'You have registered successfully.',data:result})
				},err=>{
					res.send({response:err})
				})
			}
		},err=>{
			res.send({ response:false, message:'Something Wrong'});
		})
	}else{
		res.send({ response:false, message:'Please fill all the required fields'});
	}
}
exports.contact_us = function(req, res) {
	data = {
			name : req.body.name,
			email: req.body.email,
			subject: req.body.subject,
			message: req.body.message
		}	
		if( (data.name == '') || (data.name == undefined) || (data.email == '') || (data.email == undefined) || (data.subject == '') || (data.subject == undefined) || (data.message == '') || (data.message == undefined)  ) {
			// res.json({ response:false, message:'Please fill the required fields.' });
			res.end(JSON.stringify({ response:false, message:'Please fill the required fields.', data:data }));
		} else {
			ContactUs.create({
				name: data.name,
				email: data.email,
				subject: req.body.subject,
				message: data.message,
			}).then(function(result){
				res.end(JSON.stringify({ response:true, message:'ContactUs form submit successfully.', data:data }));
			});
		}
}
exports.about_me = function(req, res) {
	data = {
			user_id : req.body.user_id,
			introduction: req.body.introduction,
			looking_for: req.body.looking_for
		}	
		if( (data.user_id == '') || (data.user_id == undefined) || (data.introduction == '') || (data.introduction == undefined) || (data.looking_for == '') || (data.looking_for == undefined)  ) {
			res.end(JSON.stringify({ response:false, message:'Please fill the required fields.', data:data }));
		} else {
			AboutMe.findOne({where:{user_id:data.user_id}}).then((result)=>{
				if(result!=null && result!=''){
					result.update({
						user_id: data.user_id,
						introduction: data.introduction,
						looking_for: req.body.looking_for
					}).then((result)=>{
						res.end(JSON.stringify({ response:true, message:'About me update successfully.', data:result }));
					})
				}else{
					AboutMe.create({
						user_id: data.user_id,
						introduction: data.introduction,
						looking_for: req.body.looking_for,
					}).then(function(result){
						res.end(JSON.stringify({ response:true, message:'About me submit successfully.', data:data }));
					});
				}
			},(err)=>{
				res.end({response:false});	
			})
		}
}	
exports.forgot_password = function(req,res){
	var email = req.body.email;
	if(email != "" && email != null){
		User.findOne({where:{email:email}}).then((result)=>{
			if(result != "" && result != null){
				var randomstring = Math.random().toString(36).slice(-8);
				result.update({password:passwordHash.generate(randomstring),decoded_password:randomstring}).then((reslt)=>{
					
					var mailOptions = {
					    to: reslt.email,
					    subject: 'HiLike Password',
					    user: {
					    	name:reslt.name,
              				password:reslt.decoded_password
					    }
					}
					app.mailer.send('forgot',mailOptions, function (err,message) {
		                if (err) {
		                  // handle error 
		                  // console.log(err);
		                  res.send('There was an error sending the email');
		                  return;
		                }
		                res.send({response: true,message: 'Your Account password has been sent to registered email account'});
	            	});

				},err=>{
					res.end({response:false});	
				})
			}else{
				res.end({response:false,message:"Email not found in database",result:result});
			}
		},err=>{
			res.end({response:false});	
		})
	}else{
		res.end({response:false,message:"Email is empty"});
	}
}
exports.reset_password = function(req,res){
	if(req.method=='POST'){
		var id = req.body.id;
		var old_password = req.body.old_password;
		var new_password = req.body.new_password;
		if(id!=null && id!='' && old_password!=null && old_password!='' && new_password!=null && new_password!=''){
			User.findById(id).then((result)=>{
				if(result != "" && result != null){
					if(passwordHash.verify(old_password,result.password)){
						result.update({password:passwordHash.generate(new_password),decoded_password:new_password}).then((result)=>{
							// console.log('data',result);
							res.send({response:true,message:'Password Updated',data:result})				
						},(err)=>{
							res.send({response:false,data:err})
						})
					}else{
						res.send({response:false,message:"Current password is wrong"});
					}
				}else{
					res.end({response:false,message:"User not found in database",result:result});
				}
			},err=>{
				res.end({response:false});	
			})
		}else{
			res.end({response:false,message:"Wrong Data"});
		}
	}
}
exports.get_about_me = function(req,res){
	if(req.method=='POST'){
		var user_id = req.body.user_id;
		if(user_id!=null && user_id!=''){
			AboutMe.findOne({where:{user_id:user_id}}).then((result)=>{
				if(result!=null && result!=''){
					res.send({response:true,message:'Success',data:result})
				}else{
					res.send({response:false,message:'Data not found'});					
				}
			},(err)=>{
				res.end({response:false,message:'Data not found'});
			})
		}else{
			res.end({response:false,message:"Wrong Data"});
		}
	}
}
exports.updateProfile = function(req,res){
	if(req.body.user_id!=null && req.body.user_id!=''){
		var user_id=req.body.user_id;
		var fileName  = '';
		// console.log(req);
		// res.send({response:req.files})
		if(req.files) { //if we have file in the data
			var img_name = req.files.image.name;
			var img_arr  = img_name.split('.');
            var ext 	 = img_arr.pop();
            ext     	 = ext.toLowerCase();
            // console.log(ext)
        	var fileName = Date.now()+user_id+'.'+ext; //req.files.image.name
        	let sampleFile = req.files.image;
			var targetPath = c.userImageBasePath;
			sampleFile.mv('../'+c.WEBSITE_FOLDER+'/'+targetPath+'/'+fileName, function(err){
				if(err){
					res.json({ response: false, message:'image could not be uploaded',error:err });
				} else{
					User.update({image:img_url+fileName},{where: {id:user_id}}).then((updateddata)=>{
						ProfilePics.create({user_id:user_id,pic_name:img_url+fileName}).then((data)=>{
							User.findOne({where:{id:user_id},include:[{
						              model: ProfilePics,
						              as:'profilePics'
						            },{
						              model: AboutMe,
						              as:'aboutMe'
						            },{
						              model: Country,
						              as:'country'
						            },{
						              model: Residence,
						              as:'residence_detail'
						            },{
						              model: Social_status,
						              as:'social_status_detail'
						            },{
						              model: Religion,
						              as:'religion_detail'
						            },{
						              model: Marriage_type,
						              as:'marriage_type_detail'
						            }]}).then(result=>{
										res.send({ response: true, message:'Image updated', data:result});
						            },err=>{
										res.send({response:false,message:err});
						            });
							// ProfilePics.findAll({where:{user_id:user_id},order:[['id','DESC']]}).then(data=>{
							// },err=>{
							// 	res.send({response:false,message:"Wrong Data",error:err});
							// })
						},err=>{
        					res.send({response:false,message:"Wrong Data",error:err});
						})
					},err=>{
        				res.send({response:false,message:"Wrong Data",error:err});
					})
				}
			});
		}else if(req.body.name && req.body.name!='' && req.body.name!=null){
			User.update({name:req.body.name},{where: {id:user_id}}).then((result)=>{
				User.findOne({where:{id:user_id},include:[{
		              model: ProfilePics,
		              as:'profilePics'
		            },{
		              model: AboutMe,
		              as:'aboutMe'
		            },{
		              model: Country,
		              as:'country'
		            },{
		              model: Residence,
		              as:'residence_detail'
		            },{
		              model: Social_status,
		              as:'social_status_detail'
		            },{
		              model: Religion,
		              as:'religion_detail'
		            },{
		              model: Marriage_type,
		              as:'marriage_type_detail'
		            }]}).then(result=>{
						res.send({ response: true, message:'Name updated', data:result});
		            },err=>{
						res.send({response:false,message:err});
		            });
			})
		}
		else{
			res.send({response:false,message:"Wrong Data"});
		}
	}else{
		res.send({response:false,message:"user_id not found"});
	}
}
exports.updateBasicInfo = function(req,res){
	if(req.body.user_id!=null && req.body.user_id!=''){
		var data = {
			age:req.body.age,
			gender:req.body.gender,
			country_id:req.body.country,
			residence:req.body.residence,
			region:req.body.region,
			social_status:req.body.social_status,
			marriage_type:req.body.marriage_type,
			children:req.body.children,
			smoking:req.body.smoking
		}
		// console.log(data);
		User.findOne({where:{id:req.body.user_id},include:[{
								              model: ProfilePics,
								              as:'profilePics'
								            },{
								              model: AboutMe,
								              as:'aboutMe'
								            },{
								              model: Country,
								              as:'country'
								            },{
								              model: Residence,
								              as:'residence_detail'
								            },{
								              model: Social_status,
								              as:'social_status_detail'
								            },{
								              model: Religion,
								              as:'religion_detail'
								            },{
								              model: Marriage_type,
								              as:'marriage_type_detail'
								            }]}).then(result=>{
			result.update(data).then(reslt=>{
				res.send({response:true,message:'Data Updated',data:reslt})
			},err=>{
				res.send({response:false,message:'Wrong Data',err:err});
			})
		},err=>{
			res.send({response:false,message:"Wrong Data",err:err});
		})
	}else{
		res.send({response:false,message:"Id not found"});
	}
};
exports.updateAppearance = function(req,res){
	if(req.body.user_id!=null && req.body.user_id!=''){
		var data = {
			Height:req.body.Height,
			weight:req.body.weight,
			skin_color:req.body.skin_color,
			hair_color:req.body.hair_color,
			body_type:req.body.body_type,
			fb_status:1
		}
		User.findOne({where:{id:req.body.user_id},include:[{
								              model: ProfilePics,
								              as:'profilePics'
								            },{
								              model: AboutMe,
								              as:'aboutMe'
								            },{
								              model: Country,
								              as:'country'
								            },{
								              model: Residence,
								              as:'residence_detail'
								            },{
								              model: Social_status,
								              as:'social_status_detail'
								            },{
								              model: Religion,
								              as:'religion_detail'
								            },{
								              model: Marriage_type,
								              as:'marriage_type_detail'
								            }]}).then(result=>{
			result.update(data).then(reslt=>{
				res.send({response:true,message:'Data Updated',data:reslt})
			},err=>{
				res.send({response:false,message:'Wrong Data',err:err});
			})
		},err=>{
			res.send({response:false,message:"Wrong Data",err:err});
		})
	}else{
		res.send({response:false,message:"Id not found"});
	}
};
exports.updateStatusLatLong = function(req,res){
	if(req.body.user_id!=null && req.body.user_id!=''){
		if(req.body.logged_status!=null && req.body.logged_status!='' && req.body.latitude!=null && req.body.latitude!='' && req.body.longitude!=null && req.body.longitude!='')
		{
			User.findOne({where:{id:req.body.user_id},include:[{
									              model: ProfilePics,
									              as:'profilePics'
									            },{
									              model: AboutMe,
									              as:'aboutMe'
									            },{
									              model: Country,
									              as:'country'
									            },{
									              model: Residence,
									              as:'residence_detail'
									            },{
									              model: Social_status,
									              as:'social_status_detail'
									            },{
									              model: Religion,
									              as:'religion_detail'
									            },{
									              model: Marriage_type,
									              as:'marriage_type_detail'
									            }]}).then(result=>{
				var a={
						logged_status:req.body.logged_status,
						latitude:req.body.latitude,
						longitude:req.body.longitude,
						logged_time:new Date().toISOString()
				}
				result.update(a).then(reslt=>{
					res.send({response:true,message:'Status Updated',data:reslt})
				},err=>{
					res.send({response:false,message:'Wrong Data',err:err});
				})
			},err=>{
				res.send({response:false,message:"Wrong Data",err:err});
			})
		}else{
			res.send({response:false,message:"Logged_status, Latitude or Longitude not found"});
		}
	}else{
		res.send({response:false,message:"Id not found"});
	}
};
function distance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist
}
exports.get_users_details = function(req,res,cb){
	if(req.body.user_id!=null && req.body.user_id!='' && req.body.device_id!='' && req.body.device_id!=null){
		var userData;
		User.findOne({where:{id:req.body.user_id}}).then(data=>{
			if(data==null||data==''){
				res.send({response:false,message:"no users found"});
			}else{
				userData=data;
				if(req.body.latitude==null ||req.body.latitude=='' || req.body.longitude==null ||req.body.longitude==''){
					res.send({response:false,message:"latitude or longitude not found"});
				}
				else{
					if(req.body.type=='all'){//normal get all users
						data.update({latitude:req.body.latitude,longitude:req.body.longitude}).then(data=>{},err=>{})
						User.findAll({where:{
							status:1,
							id:{[Op.ne]:req.body.user_id},
							gender:{[Op.ne]:userData.gender},
							user_type:{[Op.ne]:'V'}
						},order:[['logged_status','DESC']],
						attributes: ['id', 'username','name','user_type','residence','age','image','logged_status','logged_time','gender','latitude','longitude','region','social_status','marriage_type'],
						include:[
								{model: AboutMe,as:'aboutMe'},
								{model: Country,as:'country'},
								{model: Residence,as:'residence_detail'},
								{
					              model: Social_status,
					              as:'social_status_detail'
					            },{
					              model: Religion,
					              as:'religion_detail'
					            },{
					              model: Marriage_type,
					              as:'marriage_type_detail'
					            }
								]
						}).then(data=>{
							if(data==null || data == ''){
								res.send({response:false,message:"no users found"});
							}else{
								GcmUsers.findOne({where:{user_id:req.body.user_id}}).then(result=>{
									if(result==null||result==''){
										res.send({response:false,message:"Device_id not saved"});
									}else{
										if(result.device_id==req.body.device_id){
											async.forEachOf(data, (value, key, callback) => {
												var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+
															req.body.latitude+','+req.body.longitude+
															'&destinations='+value.latitude+','+value.longitude+
															'&mode=driving&language=pl-PL&key=AIzaSyC0GbCWPZepORdOoAjZDpADFrL0-uksTOk';
												request(url, function (error, response, body) {
													if (!error && response.statusCode == 200 && body) {
											            if(JSON.parse(body).rows[0].elements[0].status=='OK'){
											            	data[key].distance = Math.round(JSON.parse(body).rows[0].elements[0].distance.value/1000*100)/100;
											            }
											            else{
															data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											            }
											        }else{
														data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											        }
											        callback();
												});
											}, err => {
											    if (err) console.error(err.message);
												res.send({response:true,message:"Success",data:data});
											});
										}else{res.send({response:false,message:"You have to login again"});}
									}
								},err=>{res.send({response:false,message:"err",err:err});})
							}
						},err=>{res.send({response:false,message:"err",err:err});})
					}else if(req.body.type=='search'){//searching users
						switch (req.body.search_type) {
							case 'photo':
								if(req.body.search_value==null||req.body.search_value==''){
									res.send({response:false,message:"search_value not found"});
								}else{
									var search={
										status:1,
										id:{[Op.ne]:req.body.user_id},
										gender:{[Op.ne]:userData.gender},
										user_type:{[Op.ne]:'V'}
									}
									if(req.body.search_value==0){
										search.image=''
									}else if(req.body.search_value==1){
										search.image={[Op.ne]:''}
									}else{}
									User.findAll({where:search,
									attributes: ['id', 'username','name','user_type','residence','age','image','logged_status','logged_time','gender','latitude','longitude','region','social_status','marriage_type'],
									include:[{model: AboutMe,as:'aboutMe'},
											{model: Country,as:'country'},
											{model: Residence,as:'residence_detail'},{
										              model: Social_status,
										              as:'social_status_detail'
										            },{
										              model: Religion,
										              as:'religion_detail'
										            },{
										              model: Marriage_type,
										              as:'marriage_type_detail'
										            }]
									}).then(data=>{
										if(data==null || data == ''){
											res.send({response:false,message:"no vip users"});
										}else{
											async.forEachOf(data, (value, key, callback) => {
												var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+
															req.body.latitude+','+req.body.longitude+
															'&destinations='+value.latitude+','+value.longitude+
															'&mode=driving&language=pl-PL&key=AIzaSyC0GbCWPZepORdOoAjZDpADFrL0-uksTOk';
												request(url, function (error, response, body) {
													if (!error && response.statusCode == 200 && body) {
											            if(JSON.parse(body).rows[0].elements[0].status=='OK'){
											            	data[key].distance = Math.round(JSON.parse(body).rows[0].elements[0].distance.value/1000*100)/100;
											            }
											            else{
															data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											            }
											        }else{
														data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											        }
											        callback();
												});
											}, err => {
											    if (err) console.error(err.message);
												res.send({response:true,message:"Success",data:data});
											});
										}
									},err=>{
										res.send({response:false,message:"err",err:err});
									})
								}
								break;
							case 'nearby'://search by distance
								if(req.body.search_value==null||req.body.search_value==''){
									res.send({response:false,message:"search_value not found"});
								}else{
									User.findAll({where:{
										status:1,
										id:{[Op.ne]:req.body.user_id},
										gender:{[Op.ne]:userData.gender},
										user_type:{[Op.ne]:'V'}
									},order:[['logged_status','DESC']],
									attributes: ['id', 'username','name','user_type','residence','age','image','logged_status','logged_time','gender','latitude','longitude','region','social_status','marriage_type'],
									include:[{model: AboutMe,as:'aboutMe'},
											{model: Country,as:'country'},
											{model: Residence,as:'residence_detail'},{
										              model: Social_status,
										              as:'social_status_detail'
										            },{
										              model: Religion,
										              as:'religion_detail'
										            },{
										              model: Marriage_type,
										              as:'marriage_type_detail'
										            }]
									}).then(data=>{
										if(data==null || data == ''){
											res.send({response:false,message:"no users found"});
										}else{
											var a=[];
											async.forEachOf(data, (value, key, callback) => {
												var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+
															req.body.latitude+','+req.body.longitude+
															'&destinations='+value.latitude+','+value.longitude+
															'&mode=driving&language=pl-PL&key=AIzaSyC0GbCWPZepORdOoAjZDpADFrL0-uksTOk';
												request(url, function (error, response, body) {
													if (!error && response.statusCode == 200 && body) {
											            if(JSON.parse(body).rows[0].elements[0].status=='OK'){
											                data[key].distance = Math.round(JSON.parse(body).rows[0].elements[0].distance.value/1000*100)/100;
											                if(data[key].distance<=parseInt(req.body.search_value)){
											                	a.push(data[key])
											                }
											            }
											            else{
											                data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											                if(data[key].distance<=parseInt(req.body.search_value)){
											                	a.push(data[key])
											                }
											            }
											        }else{
											            data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											            if(data[key].distance<=parseInt(req.body.search_value)){
											            	a.push(data[key])
											            }
											        }
											        callback();
												});
											}, err => {
											    if (err) console.error(err.message);
												res.send({response:true,message:"Success",data:a});
											});
										}
									},err=>{res.send({response:false,message:"err",err:err});})
								}
								break;
							case 'last_seen'://search by last seen
								if(req.body.search_value==null||req.body.search_value==''){
									res.send({response:false,message:"search_value not found"});
								}else{
									User.findAll({where:{
										status:1,
										id:{[Op.ne]:req.body.user_id},
										gender:{[Op.ne]:userData.gender},
										user_type:{[Op.ne]:'V'}
									},order:[['logged_status','DESC']],
									attributes: ['id', 'username','name','user_type','residence','age','image','logged_status','logged_time','gender','latitude','longitude','region','social_status','marriage_type'],
									include:[{model: AboutMe,as:'aboutMe'},
											{model: Country,as:'country'},
											{model: Residence,as:'residence_detail'},{
										              model: Social_status,
										              as:'social_status_detail'
										            },{
										              model: Religion,
										              as:'religion_detail'
										            },{
										              model: Marriage_type,
										              as:'marriage_type_detail'
										            }]
									}).then(data=>{
										if(data==null || data == ''){
											res.send({response:false,message:"no users found"});
										}else{
											var a=[];
											async.forEachOf(data, (value, key, callback) => {
												var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+
															req.body.latitude+','+req.body.longitude+
															'&destinations='+value.latitude+','+value.longitude+
															'&mode=driving&language=pl-PL&key=AIzaSyC0GbCWPZepORdOoAjZDpADFrL0-uksTOk';
												request(url, function (error, response, body) {
													if (!error && response.statusCode == 200 && body) {
											            if(JSON.parse(body).rows[0].elements[0].status=='OK'){
											                data[key].distance = Math.round(JSON.parse(body).rows[0].elements[0].distance.value/1000*100)/100;
											                let newd=new Date();
											                	newd=Date.parse(newd);
											                let oldd=Date.parse(data[key].logged_time)
											                let difference=req.body.search_value.split('-');
											                if(newd-oldd>=difference[0]*60*1000&&newd-oldd<=difference[1]*60*1000&&data[key].logged_status=='0'){
											                	a.push(data[key]);
											                }else{
											                	// a.push({date:new Date(),datee:newd,daate:oldd})	
											                }
											            }
											            else{
											                data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											                let newd=new Date();
											                	newd=Date.parse(newd);
											                let oldd=Date.parse(data[key].logged_time)
											                let difference=req.body.search_value.split('-');
											                if(newd-oldd>=difference[0]*60*1000&&newd-oldd<=difference[1]*60*1000&&data[key].logged_status=='0'){
											                	a.push(data[key]);
											                }else{
											                	// a.push({date:new Date(),datee:newd,daate:oldd})	
											                }
											            }
											        }else{
											            data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											            let newd=new Date();
											                	newd=Date.parse(newd);
											                let oldd=Date.parse(data[key].logged_time)
											                let difference=req.body.search_value.split('-');
											                if(newd-oldd>=difference[0]*60*1000&&newd-oldd<=difference[1]*60*1000&&data[key].logged_status=='0'){
											                	a.push(data[key]);
											                }else{
											                	// a.push({date:new Date(),datee:newd,daate:oldd})	
											                }
											        }
											        callback();
												});
											}, err => {
											    if (err) console.error(err.message);
												res.send({response:true,message:"Success",data:a});
											});
										}
									},err=>{res.send({response:false,message:"err",err:err});})
								}
								break;
							case 'age'://search by age
								if(req.body.search_value==null||req.body.search_value==''){
									res.send({response:false,message:"search_value not found"});
								}else{
									let age=req.body.search_value.split('-');
									User.findAll({where:{
										status:1,
										id:{[Op.ne]:req.body.user_id},
										gender:{[Op.ne]:userData.gender},
										age:{[Op.between]: age},
										user_type:{[Op.ne]:'V'}
									},
									attributes: ['id', 'username','name','user_type','residence','age','image','logged_status','logged_time','gender','latitude','longitude','region','social_status','marriage_type'],
									include:[{model: AboutMe,as:'aboutMe'},
											{model: Country,as:'country'},
											{model: Residence,as:'residence_detail'},{
										              model: Social_status,
										              as:'social_status_detail'
										            },{
										              model: Religion,
										              as:'religion_detail'
										            },{
										              model: Marriage_type,
										              as:'marriage_type_detail'
										            }]
									}).then(data=>{
										if(data==null || data == ''){
											res.send({response:false,message:"no users found"});
										}else{
											async.forEachOf(data, (value, key, callback) => {
												var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+
															req.body.latitude+','+req.body.longitude+
															'&destinations='+value.latitude+','+value.longitude+
															'&mode=driving&language=pl-PL&key=AIzaSyC0GbCWPZepORdOoAjZDpADFrL0-uksTOk';
												request(url, function (error, response, body) {
													if (!error && response.statusCode == 200 && body) {
											            if(JSON.parse(body).rows[0].elements[0].status=='OK'){
											            	data[key].distance = Math.round(JSON.parse(body).rows[0].elements[0].distance.value/1000*100)/100;
											            }
											            else{
															data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											            }
											        }else{
														data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											        }
											        callback();
												});
											}, err => {
											    if (err) console.error(err.message);
												res.send({response:true,message:"Success",data:data});
											});
										}
									},err=>{
										res.send({response:false,message:"err",err:err});
									})
								}
								break;	
							case 'country'://search by country
								if(req.body.search_value==null||req.body.search_value==''){
									res.send({response:false,message:"search_value not found"});
								}else{
									User.findAll({where:{
										status:1,
										id:{[Op.ne]:req.body.user_id},
										gender:{[Op.ne]:userData.gender},
										country_id:req.body.search_value,
										user_type:{[Op.ne]:'V'}
									},
									attributes: ['id', 'username','name','user_type','residence','age','image','logged_status','logged_time','gender','latitude','longitude','region','social_status','marriage_type'],
									include:[{model: AboutMe,as:'aboutMe'},
											{model: Country,as:'country'},
											{model: Residence,as:'residence_detail'},{
										              model: Social_status,
										              as:'social_status_detail'
										            },{
										              model: Religion,
										              as:'religion_detail'
										            },{
										              model: Marriage_type,
										              as:'marriage_type_detail'
										            }]
									}).then(data=>{
										if(data==null || data == ''){
											res.send({response:false,message:"no users found"});
										}else{
											async.forEachOf(data, (value, key, callback) => {
												var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+
															req.body.latitude+','+req.body.longitude+
															'&destinations='+value.latitude+','+value.longitude+
															'&mode=driving&language=pl-PL&key=AIzaSyC0GbCWPZepORdOoAjZDpADFrL0-uksTOk';
												request(url, function (error, response, body) {
													if (!error && response.statusCode == 200 && body) {
											            if(JSON.parse(body).rows[0].elements[0].status=='OK'){
											            	data[key].distance = Math.round(JSON.parse(body).rows[0].elements[0].distance.value/1000*100)/100;
											            }
											            else{
															data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											            }
											        }else{
														data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											        }
											        callback();
												});
											}, err => {
											    if (err) console.error(err.message);
												res.send({response:true,message:"Success",data:data});
											});
										}
									},err=>{
										res.send({response:false,message:"err",err:err});
									})
								}
								break;
							case 'residence'://search by residence
								if(req.body.search_value==null||req.body.search_value==''){
									res.send({response:false,message:"search_value not found"});
								}else{
									User.findAll({where:{
										status:1,
										id:{[Op.ne]:req.body.user_id},
										gender:{[Op.ne]:userData.gender},
										residence:req.body.search_value,
										user_type:{[Op.ne]:'V'}
									},
									attributes: ['id', 'username','name','user_type','residence','age','image','logged_status','logged_time','gender','latitude','longitude','region','social_status','marriage_type'],
									include:[{model: AboutMe,as:'aboutMe'},
											{model: Country,as:'country'},
											{model: Residence,as:'residence_detail'},{
										              model: Social_status,
										              as:'social_status_detail'
										            },{
										              model: Religion,
										              as:'religion_detail'
										            },{
										              model: Marriage_type,
										              as:'marriage_type_detail'
										            }]
									}).then(data=>{
										if(data==null || data == ''){
											res.send({response:false,message:"no users found"});
										}else{
											async.forEachOf(data, (value, key, callback) => {
												var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+
															req.body.latitude+','+req.body.longitude+
															'&destinations='+value.latitude+','+value.longitude+
															'&mode=driving&language=pl-PL&key=AIzaSyC0GbCWPZepORdOoAjZDpADFrL0-uksTOk';
												request(url, function (error, response, body) {
													if (!error && response.statusCode == 200 && body) {
											            if(JSON.parse(body).rows[0].elements[0].status=='OK'){
											            	data[key].distance = Math.round(JSON.parse(body).rows[0].elements[0].distance.value/1000*100)/100;
											            }
											            else{
															data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											            }
											        }else{
														data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											        }
											        callback();
												});
											}, err => {
											    if (err) console.error(err.message);
												res.send({response:true,message:"Success",data:data});
											});
										}
									},err=>{
										res.send({response:false,message:"err",err:err});
									})
								}
								break;
							case 'religion'://search by religion
								if(req.body.search_value==null||req.body.search_value==''){
									res.send({response:false,message:"search_value not found"});
								}else{
									User.findAll({where:{
										status:1,
										id:{[Op.ne]:req.body.user_id},
										gender:{[Op.ne]:userData.gender},
										region:req.body.search_value,
										user_type:{[Op.ne]:'V'}
									},
									attributes: ['id', 'username','name','user_type','residence','age','image','logged_status','logged_time','gender','latitude','longitude','region','social_status','marriage_type'],
									include:[{model: AboutMe,as:'aboutMe'},
											{model: Country,as:'country'},
											{model: Residence,as:'residence_detail'},{
										              model: Social_status,
										              as:'social_status_detail'
										            },{
										              model: Religion,
										              as:'religion_detail'
										            },{
										              model: Marriage_type,
										              as:'marriage_type_detail'
										            }]
									}).then(data=>{
										if(data==null || data == ''){
											res.send({response:false,message:"no users found"});
										}else{
											async.forEachOf(data, (value, key, callback) => {
												var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+
															req.body.latitude+','+req.body.longitude+
															'&destinations='+value.latitude+','+value.longitude+
															'&mode=driving&language=pl-PL&key=AIzaSyC0GbCWPZepORdOoAjZDpADFrL0-uksTOk';
												request(url, function (error, response, body) {
													if (!error && response.statusCode == 200 && body) {
											            if(JSON.parse(body).rows[0].elements[0].status=='OK'){
											            	data[key].distance = Math.round(JSON.parse(body).rows[0].elements[0].distance.value/1000*100)/100;
											            }
											            else{
															data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											            }
											        }else{
														data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											        }
											        callback();
												});
											}, err => {
											    if (err) console.error(err.message);
												res.send({response:true,message:"Success",data:data});
											});
										}
									},err=>{
										res.send({response:false,message:"err",err:err});
									})
								}
								break;
							case 'social_status'://search by social_status
								if(req.body.search_value==null||req.body.search_value==''){
									res.send({response:false,message:"search_value not found"});
								}else{
									User.findAll({where:{
										status:1,
										id:{[Op.ne]:req.body.user_id},
										gender:{[Op.ne]:userData.gender},
										social_status:req.body.search_value,
										user_type:{[Op.ne]:'V'}
									},
									attributes: ['id', 'username','name','user_type','residence','age','image','logged_status','logged_time','gender','latitude','longitude','region','social_status','marriage_type'],
									include:[{model: AboutMe,as:'aboutMe'},
											{model: Country,as:'country'},
											{model: Residence,as:'residence_detail'},{
										              model: Social_status,
										              as:'social_status_detail'
										            },{
										              model: Religion,
										              as:'religion_detail'
										            },{
										              model: Marriage_type,
										              as:'marriage_type_detail'
										            }]
									}).then(data=>{
										if(data==null || data == ''){
											res.send({response:false,message:"no users found"});
										}else{
											async.forEachOf(data, (value, key, callback) => {
												var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+
															req.body.latitude+','+req.body.longitude+
															'&destinations='+value.latitude+','+value.longitude+
															'&mode=driving&language=pl-PL&key=AIzaSyC0GbCWPZepORdOoAjZDpADFrL0-uksTOk';
												request(url, function (error, response, body) {
													if (!error && response.statusCode == 200 && body) {
											            if(JSON.parse(body).rows[0].elements[0].status=='OK'){
											            	data[key].distance = Math.round(JSON.parse(body).rows[0].elements[0].distance.value/1000*100)/100;
											            }
											            else{
															data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											            }
											        }else{
														data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											        }
											        callback();
												});
											}, err => {
											    if (err) console.error(err.message);
												res.send({response:true,message:"Success",data:data});
											});
										}
									},err=>{
										res.send({response:false,message:"err",err:err});
									})
								}
								break;
							case 'type_of_marriage'://search by type_of_marriage
								if(req.body.search_value==null||req.body.search_value==''){
									res.send({response:false,message:"search_value not found"});
								}else{
									User.findAll({where:{
										status:1,
										id:{[Op.ne]:req.body.user_id},
										gender:{[Op.ne]:userData.gender},
										marriage_type:req.body.search_value,
										user_type:{[Op.ne]:'V'}
									},
									attributes: ['id', 'username','name','user_type','residence','age','image','logged_status','logged_time','gender','latitude','longitude','region','social_status','marriage_type'],
									include:[{model: AboutMe,as:'aboutMe'},
											{model: Country,as:'country'},
											{model: Residence,as:'residence_detail'},{
										              model: Social_status,
										              as:'social_status_detail'
										            },{
										              model: Religion,
										              as:'religion_detail'
										            },{
										              model: Marriage_type,
										              as:'marriage_type_detail'
										            }]
									}).then(data=>{
										if(data==null || data == ''){
											res.send({response:false,message:"no users found"});
										}else{
											async.forEachOf(data, (value, key, callback) => {
												var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+
															req.body.latitude+','+req.body.longitude+
															'&destinations='+value.latitude+','+value.longitude+
															'&mode=driving&language=pl-PL&key=AIzaSyC0GbCWPZepORdOoAjZDpADFrL0-uksTOk';
												request(url, function (error, response, body) {
													if (!error && response.statusCode == 200 && body) {
											            if(JSON.parse(body).rows[0].elements[0].status=='OK'){
											            	data[key].distance = Math.round(JSON.parse(body).rows[0].elements[0].distance.value/1000*100)/100;
											            }
											            else{
															data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											            }
											        }else{
														data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											        }
											        callback();
												});
											}, err => {
											    if (err) console.error(err.message);
												res.send({response:true,message:"Success",data:data});
											});
										}
									},err=>{
										res.send({response:false,message:"err",err:err});
									})
								}
								break;		
							default:
								res.send({response:false,message:"Wrong input"});
								break;
						}
					}else{
						res.send({response:false,message:"type not found"});
					}
				}
			}
		},err=>{res.send({response:false,message:"err",err:err});})
	}else{res.send({response:false,message:"Id or device_id not found"});}
};
exports.get_vip_users_details = function(req,res){
	if(req.body.user_id!=null && req.body.user_id!=''){
		var userData;
		User.findOne({where:{id:req.body.user_id}}).then(data=>{
			if(data==null||data==''){
				res.send({response:false,message:"no users found"});
			}else{
				userData=data;
				if(req.body.latitude==null ||req.body.latitude=='' || req.body.longitude==null ||req.body.longitude==''){
					res.send({response:false,message:"latitude or longitude not found"});
				}else{
					if(req.body.type=='all'){
						data.update({latitude:req.body.latitude,longitude:req.body.longitude}).then(data=>{},err=>{})
						User.findAll({where:{
							status:1,
							id:{[Op.ne]:req.body.user_id},
							gender:{[Op.ne]:userData.gender},
							user_type:'V'
						},
						attributes: ['id', 'username','name','user_type','residence','age','image','logged_status','logged_time','gender','latitude','longitude','region','social_status','marriage_type'],
						include:[{model: AboutMe,as:'aboutMe'},
								{model: Country,as:'country'},
								{model: Residence,as:'residence_detail'},{
										              model: Social_status,
										              as:'social_status_detail'
										            },{
										              model: Religion,
										              as:'religion_detail'
										            },{
										              model: Marriage_type,
										              as:'marriage_type_detail'
										            }]
						}).then(data=>{
							if(data==null || data == ''){
								res.send({response:false,message:"no vip users"});
							}else{
								async.forEachOf(data, (value, key, callback) => {
									var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+
												req.body.latitude+','+req.body.longitude+
												'&destinations='+value.latitude+','+value.longitude+
												'&mode=driving&language=pl-PL&key=AIzaSyC0GbCWPZepORdOoAjZDpADFrL0-uksTOk';
									request(url, function (error, response, body) {
										if (!error && response.statusCode == 200 && body) {
								            if(JSON.parse(body).rows[0].elements[0].status=='OK'){
								            	data[key].distance = Math.round(JSON.parse(body).rows[0].elements[0].distance.value/1000*100)/100;
								            }
								            else{
												data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
								            }
								        }else{
											data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
								        }
								        callback();
									});
								}, err => {
								    if (err) console.error(err.message);
									res.send({response:true,message:"Success",data:data});
								});
							}
						},err=>{
							res.send({response:false,message:"err",err:err});
						})
					}else if(req.body.type=='search'){
						switch (req.body.search_type) {
							case 'photo':
								if(req.body.search_value==null||req.body.search_value==''){
									res.send({response:false,message:"search_value not found"});
								}else{
									var search={
										status:1,
										id:{[Op.ne]:req.body.user_id},
										gender:{[Op.ne]:userData.gender},
										user_type:'V'
									}
									if(req.body.search_value==0){
										search.image=''
									}else if(req.body.search_value==1){
										search.image={[Op.ne]:''}
									}else{}
									User.findAll({where:search,
									attributes: ['id', 'username','name','user_type','residence','age','image','logged_status','logged_time','gender','latitude','longitude','region','social_status','marriage_type'],
									include:[{model: AboutMe,as:'aboutMe'},
											{model: Country,as:'country'},
											{model: Residence,as:'residence_detail'},{
										              model: Social_status,
										              as:'social_status_detail'
										            },{
										              model: Religion,
										              as:'religion_detail'
										            },{
										              model: Marriage_type,
										              as:'marriage_type_detail'
										            }]
									}).then(data=>{
										if(data==null || data == ''){
											res.send({response:false,message:"no vip users"});
										}else{
											async.forEachOf(data, (value, key, callback) => {
												var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+
															req.body.latitude+','+req.body.longitude+
															'&destinations='+value.latitude+','+value.longitude+
															'&mode=driving&language=pl-PL&key=AIzaSyC0GbCWPZepORdOoAjZDpADFrL0-uksTOk';
												request(url, function (error, response, body) {
													if (!error && response.statusCode == 200 && body) {
											            if(JSON.parse(body).rows[0].elements[0].status=='OK'){
											            	data[key].distance = Math.round(JSON.parse(body).rows[0].elements[0].distance.value/1000*100)/100;
											            }
											            else{
															data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											            }
											        }else{
														data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											        }
											        callback();
												});
											}, err => {
											    if (err) console.error(err.message);
												res.send({response:true,message:"Success",data:data});
											});
										}
									},err=>{
										res.send({response:false,message:"err",err:err});
									})
								}
								break;
							case 'nearby':
								if(req.body.search_value==null||req.body.search_value==''){
									res.send({response:false,message:"search_value not found"});
								}else{
									User.findAll({where:{
										status:1,
										id:{[Op.ne]:req.body.user_id},
										gender:{[Op.ne]:userData.gender},
										user_type:'V'
									},order:[['logged_status','DESC']],
									attributes: ['id', 'username','name','user_type','residence','age','image','logged_status','logged_time','gender','latitude','longitude','region','social_status','marriage_type'],
									include:[{model: AboutMe,as:'aboutMe'},
											{model: Country,as:'country'},
											{model: Residence,as:'residence_detail'},{
										              model: Social_status,
										              as:'social_status_detail'
										            },{
										              model: Religion,
										              as:'religion_detail'
										            },{
										              model: Marriage_type,
										              as:'marriage_type_detail'
										            }]
									}).then(data=>{
										if(data==null || data == ''){
											res.send({response:false,message:"no users found"});
										}else{
											var a=[];
											async.forEachOf(data, (value, key, callback) => {
												var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+
															req.body.latitude+','+req.body.longitude+
															'&destinations='+value.latitude+','+value.longitude+
															'&mode=driving&language=pl-PL&key=AIzaSyC0GbCWPZepORdOoAjZDpADFrL0-uksTOk';
												request(url, function (error, response, body) {
													if (!error && response.statusCode == 200 && body) {
											            if(JSON.parse(body).rows[0].elements[0].status=='OK'){
											                data[key].distance = Math.round(JSON.parse(body).rows[0].elements[0].distance.value/1000*100)/100;
											                if(data[key].distance<=parseInt(req.body.search_value)){
											                	a.push(data[key])
											                }
											            }
											            else{
											                data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											                if(data[key].distance<=parseInt(req.body.search_value)){
											                	a.push(data[key])
											                }
											            }
											        }else{
											            data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											            if(data[key].distance<=parseInt(req.body.search_value)){
											            	a.push(data[key])
											            }
											        }
											        callback();
												});
											}, err => {
											    if (err) console.error(err.message);
												res.send({response:true,message:"Success",data:a});
											});
										}
									},err=>{res.send({response:false,message:"err",err:err});})
								}

								break;
							case 'last_seen':
								if(req.body.search_value==null||req.body.search_value==''){
									res.send({response:false,message:"search_value not found"});
								}else{
									User.findAll({where:{
										status:1,
										id:{[Op.ne]:req.body.user_id},
										gender:{[Op.ne]:userData.gender},
										user_type:'V'
									},order:[['logged_status','DESC']],
									attributes: ['id', 'username','name','user_type','residence','age','image','logged_status','logged_time','gender','latitude','longitude','region','social_status','marriage_type'],
									include:[{model: AboutMe,as:'aboutMe'},
											{model: Country,as:'country'},
											{model: Residence,as:'residence_detail'},{
										              model: Social_status,
										              as:'social_status_detail'
										            },{
										              model: Religion,
										              as:'religion_detail'
										            },{
										              model: Marriage_type,
										              as:'marriage_type_detail'
										            }]
									}).then(data=>{
										if(data==null || data == ''){
											res.send({response:false,message:"no users found"});
										}else{
											var a=[];
											async.forEachOf(data, (value, key, callback) => {
												var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+
															req.body.latitude+','+req.body.longitude+
															'&destinations='+value.latitude+','+value.longitude+
															'&mode=driving&language=pl-PL&key=AIzaSyC0GbCWPZepORdOoAjZDpADFrL0-uksTOk';
												request(url, function (error, response, body) {
													if (!error && response.statusCode == 200 && body) {
											            if(JSON.parse(body).rows[0].elements[0].status=='OK'){
											                data[key].distance = Math.round(JSON.parse(body).rows[0].elements[0].distance.value/1000*100)/100;
											                let newd=new Date();
											                	newd=Date.parse(newd);
											                let oldd=Date.parse(data[key].logged_time)
											                let difference=req.body.search_value.split('-');
											                if(newd-oldd>=difference[0]*60*1000&&newd-oldd<=difference[1]*60*1000&&data[key].logged_status=='0'){
											                	a.push(data[key]);
											                }else{
											                	// a.push({date:new Date(),datee:newd,daate:oldd})	
											                }
											            }
											            else{
											                data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											                let newd=new Date();
											                	newd=Date.parse(newd);
											                let oldd=Date.parse(data[key].logged_time)
											                let difference=req.body.search_value.split('-');
											                if(newd-oldd>=difference[0]*60*1000&&newd-oldd<=difference[1]*60*1000&&data[key].logged_status=='0'){
											                	a.push(data[key]);
											                }else{
											                	// a.push({date:new Date(),datee:newd,daate:oldd})	
											                }
											            }
											        }else{
											            data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											            let newd=new Date();
											                	newd=Date.parse(newd);
											                let oldd=Date.parse(data[key].logged_time)
											                let difference=req.body.search_value.split('-');
											                if(newd-oldd>=difference[0]*60*1000&&newd-oldd<=difference[1]*60*1000&&data[key].logged_status=='0'){
											                	a.push(data[key]);
											                }else{
											                	// a.push({date:new Date(),datee:newd,daate:oldd})	
											                }
											        }
											        callback();
												});
											}, err => {
											    if (err) console.error(err.message);
												res.send({response:true,message:"Success",data:a});
											});
										}
									},err=>{res.send({response:false,message:"err",err:err});})
								}
								break;
							case 'age':
								if(req.body.search_value==null||req.body.search_value==''){
									res.send({response:false,message:"search_value not found"});
								}else{
									let age=req.body.search_value.split('-');
									User.findAll({where:{
										status:1,
										id:{[Op.ne]:req.body.user_id},
										gender:{[Op.ne]:userData.gender},
										age:{[Op.between]: age},
										user_type:'V'
									},
									attributes: ['id', 'username','name','user_type','residence','age','image','logged_status','logged_time','gender','latitude','longitude','region','social_status','marriage_type'],
									include:[{model: AboutMe,as:'aboutMe'},
											{model: Country,as:'country'},
											{model: Residence,as:'residence_detail'},{
										              model: Social_status,
										              as:'social_status_detail'
										            },{
										              model: Religion,
										              as:'religion_detail'
										            },{
										              model: Marriage_type,
										              as:'marriage_type_detail'
										            }]
									}).then(data=>{
										if(data==null || data == ''){
											res.send({response:false,message:"no vip users"});
										}else{
											async.forEachOf(data, (value, key, callback) => {
												var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+
															req.body.latitude+','+req.body.longitude+
															'&destinations='+value.latitude+','+value.longitude+
															'&mode=driving&language=pl-PL&key=AIzaSyC0GbCWPZepORdOoAjZDpADFrL0-uksTOk';
												request(url, function (error, response, body) {
													if (!error && response.statusCode == 200 && body) {
											            if(JSON.parse(body).rows[0].elements[0].status=='OK'){
											            	data[key].distance = Math.round(JSON.parse(body).rows[0].elements[0].distance.value/1000*100)/100;
											            }
											            else{
															data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											            }
											        }else{
														data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											        }
											        callback();
												});
											}, err => {
											    if (err) console.error(err.message);
												res.send({response:true,message:"Success",data:data});
											});
										}
									},err=>{
										res.send({response:false,message:"err",err:err});
									})
								}
								break;	
							case 'country':
								if(req.body.search_value==null||req.body.search_value==''){
									res.send({response:false,message:"search_value not found"});
								}else{
									User.findAll({where:{
										status:1,
										id:{[Op.ne]:req.body.user_id},
										gender:{[Op.ne]:userData.gender},
										country_id:req.body.search_value,
										user_type:'V'
									},
									attributes: ['id', 'username','name','user_type','residence','age','image','logged_status','logged_time','gender','latitude','longitude','region','social_status','marriage_type'],
									include:[{model: AboutMe,as:'aboutMe'},
											{model: Country,as:'country'},
											{model: Residence,as:'residence_detail'},{
										              model: Social_status,
										              as:'social_status_detail'
										            },{
										              model: Religion,
										              as:'religion_detail'
										            },{
										              model: Marriage_type,
										              as:'marriage_type_detail'
										            }]
									}).then(data=>{
										if(data==null || data == ''){
											res.send({response:false,message:"no vip users"});
										}else{
											async.forEachOf(data, (value, key, callback) => {
												var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+
															req.body.latitude+','+req.body.longitude+
															'&destinations='+value.latitude+','+value.longitude+
															'&mode=driving&language=pl-PL&key=AIzaSyC0GbCWPZepORdOoAjZDpADFrL0-uksTOk';
												request(url, function (error, response, body) {
													if (!error && response.statusCode == 200 && body) {
											            if(JSON.parse(body).rows[0].elements[0].status=='OK'){
											            	data[key].distance = Math.round(JSON.parse(body).rows[0].elements[0].distance.value/1000*100)/100;
											            }
											            else{
															data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											            }
											        }else{
														data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											        }
											        callback();
												});
											}, err => {
											    if (err) console.error(err.message);
												res.send({response:true,message:"Success",data:data});
											});
										}
									},err=>{
										res.send({response:false,message:"err",err:err});
									})
								}
								break;
							case 'residence':
								if(req.body.search_value==null||req.body.search_value==''){
									res.send({response:false,message:"search_value not found"});
								}else{
									User.findAll({where:{
										status:1,
										id:{[Op.ne]:req.body.user_id},
										gender:{[Op.ne]:userData.gender},
										residence:req.body.search_value,
										user_type:'V'
									},
									attributes: ['id', 'username','name','user_type','residence','age','image','logged_status','logged_time','gender','latitude','longitude','region','social_status','marriage_type'],
									include:[{model: AboutMe,as:'aboutMe'},
											{model: Country,as:'country'},
											{model: Residence,as:'residence_detail'},{
										              model: Social_status,
										              as:'social_status_detail'
										            },{
										              model: Religion,
										              as:'religion_detail'
										            },{
										              model: Marriage_type,
										              as:'marriage_type_detail'
										            }]
									}).then(data=>{
										if(data==null || data == ''){
											res.send({response:false,message:"no vip users"});
										}else{
											async.forEachOf(data, (value, key, callback) => {
												var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+
															req.body.latitude+','+req.body.longitude+
															'&destinations='+value.latitude+','+value.longitude+
															'&mode=driving&language=pl-PL&key=AIzaSyC0GbCWPZepORdOoAjZDpADFrL0-uksTOk';
												request(url, function (error, response, body) {
													if (!error && response.statusCode == 200 && body) {
											            if(JSON.parse(body).rows[0].elements[0].status=='OK'){
											            	data[key].distance = Math.round(JSON.parse(body).rows[0].elements[0].distance.value/1000*100)/100;
											            }
											            else{
															data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											            }
											        }else{
														data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											        }
											        callback();
												});
											}, err => {
											    if (err) console.error(err.message);
												res.send({response:true,message:"Success",data:data});
											});
										}
									},err=>{
										res.send({response:false,message:"err",err:err});
									})
								}
								break;
							case 'religion':
								if(req.body.search_value==null||req.body.search_value==''){
									res.send({response:false,message:"search_value not found"});
								}else{
									User.findAll({where:{
										status:1,
										id:{[Op.ne]:req.body.user_id},
										gender:{[Op.ne]:userData.gender},
										region:req.body.search_value,
										user_type:'V'
									},
									attributes: ['id', 'username','name','user_type','residence','age','image','logged_status','logged_time','gender','latitude','longitude','region','social_status','marriage_type'],
									include:[{model: AboutMe,as:'aboutMe'},
											{model: Country,as:'country'},
											{model: Residence,as:'residence_detail'},{
										              model: Social_status,
										              as:'social_status_detail'
										            },{
										              model: Religion,
										              as:'religion_detail'
										            },{
										              model: Marriage_type,
										              as:'marriage_type_detail'
										            }]
									}).then(data=>{
										if(data==null || data == ''){
											res.send({response:false,message:"no vip users"});
										}else{
											async.forEachOf(data, (value, key, callback) => {
												var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+
															req.body.latitude+','+req.body.longitude+
															'&destinations='+value.latitude+','+value.longitude+
															'&mode=driving&language=pl-PL&key=AIzaSyC0GbCWPZepORdOoAjZDpADFrL0-uksTOk';
												request(url, function (error, response, body) {
													if (!error && response.statusCode == 200 && body) {
											            if(JSON.parse(body).rows[0].elements[0].status=='OK'){
											            	data[key].distance = Math.round(JSON.parse(body).rows[0].elements[0].distance.value/1000*100)/100;
											            }
											            else{
															data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											            }
											        }else{
														data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											        }
											        callback();
												});
											}, err => {
											    if (err) console.error(err.message);
												res.send({response:true,message:"Success",data:data});
											});
										}
									},err=>{
										res.send({response:false,message:"err",err:err});
									})
								}
								break;
							case 'social_status':
								if(req.body.search_value==null||req.body.search_value==''){
									res.send({response:false,message:"search_value not found"});
								}else{
									User.findAll({where:{
										status:1,
										id:{[Op.ne]:req.body.user_id},
										gender:{[Op.ne]:userData.gender},
										social_status:req.body.search_value,
										user_type:'V'
									},
									attributes: ['id', 'username','name','user_type','residence','age','image','logged_status','logged_time','gender','latitude','longitude','region','social_status','marriage_type'],
									include:[{model: AboutMe,as:'aboutMe'},
											{model: Country,as:'country'},
											{model: Residence,as:'residence_detail'},{
										              model: Social_status,
										              as:'social_status_detail'
										            },{
										              model: Religion,
										              as:'religion_detail'
										            },{
										              model: Marriage_type,
										              as:'marriage_type_detail'
										            }]
									}).then(data=>{
										if(data==null || data == ''){
											res.send({response:false,message:"no vip users"});
										}else{
											async.forEachOf(data, (value, key, callback) => {
												var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+
															req.body.latitude+','+req.body.longitude+
															'&destinations='+value.latitude+','+value.longitude+
															'&mode=driving&language=pl-PL&key=AIzaSyC0GbCWPZepORdOoAjZDpADFrL0-uksTOk';
												request(url, function (error, response, body) {
													if (!error && response.statusCode == 200 && body) {
											            if(JSON.parse(body).rows[0].elements[0].status=='OK'){
											            	data[key].distance = Math.round(JSON.parse(body).rows[0].elements[0].distance.value/1000*100)/100;
											            }
											            else{
															data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											            }
											        }else{
														data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											        }
											        callback();
												});
											}, err => {
											    if (err) console.error(err.message);
												res.send({response:true,message:"Success",data:data});
											});
										}
									},err=>{
										res.send({response:false,message:"err",err:err});
									})
								}
								break;
							case 'type_of_marriage':
								if(req.body.search_value==null||req.body.search_value==''){
									res.send({response:false,message:"search_value not found"});
								}else{
									User.findAll({where:{
										status:1,
										id:{[Op.ne]:req.body.user_id},
										gender:{[Op.ne]:userData.gender},
										marriage_type:req.body.search_value,
										user_type:'V'
									},
									attributes: ['id', 'username','name','user_type','residence','age','image','logged_status','logged_time','gender','latitude','longitude','region','social_status','marriage_type'],
									include:[{model: AboutMe,as:'aboutMe'},
											{model: Country,as:'country'},
											{model: Residence,as:'residence_detail'},{
										              model: Social_status,
										              as:'social_status_detail'
										            },{
										              model: Religion,
										              as:'religion_detail'
										            },{
										              model: Marriage_type,
										              as:'marriage_type_detail'
										            }]
									}).then(data=>{
										if(data==null || data == ''){
											res.send({response:false,message:"no vip users"});
										}else{
											async.forEachOf(data, (value, key, callback) => {
												var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+
															req.body.latitude+','+req.body.longitude+
															'&destinations='+value.latitude+','+value.longitude+
															'&mode=driving&language=pl-PL&key=AIzaSyC0GbCWPZepORdOoAjZDpADFrL0-uksTOk';
												request(url, function (error, response, body) {
													if (!error && response.statusCode == 200 && body) {
											            if(JSON.parse(body).rows[0].elements[0].status=='OK'){
											            	data[key].distance = Math.round(JSON.parse(body).rows[0].elements[0].distance.value/1000*100)/100;
											            }
											            else{
															data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											            }
											        }else{
														data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
											        }
											        callback();
												});
											}, err => {
											    if (err) console.error(err.message);
												res.send({response:true,message:"Success",data:data});
											});
										}
									},err=>{
										res.send({response:false,message:"err",err:err});
									})
								}
								break;			
							default:
								res.send({response:false,message:"Wrong input"});
								break;
						}
					}else{
						res.send({response:false,message:"type not found"});
					}
				}
			}
		},err=>{
			res.send({response:false,message:"err",err:err});
		})
	}else{
		res.send({response:false,message:"Id not found"});
	}
};
exports.block_user = function(req,res){
	var data={
		block_by:req.body.user_id,
		user_id:req.body.block_user_id
	}
	if(req.body.status==null || req.body.status=='' ||req.body.user_id==null || req.body.user_id=='' || req.body.block_user_id==null || req.body.block_user_id==''){
		res.send({response:false,message:"Ids or status not found"});
	}else{
		BlockedUsers.findOne({where:data}).then(result=>{
			data.status=req.body.status;
			if(result==null || result==''){
				BlockedUsers.create(data).then(result=>{
					res.send({response:true,message:data.status==1?"User Blocked":"User Unblocked",data:result});
				},err=>{
					res.send({response:false,message:"err",err:err});
				})
			}else{
				result.update(data).then(result=>{
					res.send({response:true,message:data.status==1?"User Blocked":"User Unblocked",data:result});
				},err=>{
					res.send({response:false,message:"err",err:err});
				})
			}
		},err=>{
			res.send({response:false,message:"err",err:err});
		})
	}
};
exports.block_user_list = function(req,res){
	var data={
		block_by:req.body.user_id,
	}
	if(req.body.user_id==null || req.body.user_id==''){
		res.send({response:false,message:"Id not found"});
	}else{
		BlockedUsers.findAll({
			where:[data,{status:'1'}],
			include:[{
              model: User,
              as:'user_detail',
              attributes:['id', 'username','name','user_type','age','image','logged_status','logged_time','gender','latitude','longitude']
            }]}).then(result=>{
			if(result==null || result==''){
				res.send({response:false,message:"no blocked users",err:err});
			}else{
				res.send({response:true,message:"Success",data:result});
			}
		},err=>{
			res.send({response:false,message:"err",err:err});
		})
	}
};
exports.get_gold_plan = function function_name(req,res) {
	SubscriptionPlan.findAll({where:{user_type:'G',is_deleted:'0'}}).then(data=>{
			res.send({response:true,message:"Success",data:data});
	},err=>{
			res.send({response:false,message:"err",err:err});
	})
}
exports.get_vip_plan = function function_name(req,res) {
	SubscriptionPlan.findAll({where:{user_type:'V',is_deleted:'0'}}).then(data=>{
			res.send({response:true,message:"Success",data:data});
	},err=>{
			res.send({response:false,message:"err",err:err});
	})
}
exports.like_user = function(req,res){
	var data={
		liked_by:req.body.user_id,
		user_id:req.body.liked_user_id
	}
	if(req.body.status==null || req.body.status=='' ||req.body.user_id==null || req.body.user_id=='' || req.body.liked_user_id==null || req.body.liked_user_id==''){
		res.send({response:false,message:"Ids or status not found"});
	}else{
		LikedUsers.findOne({where:data}).then(result=>{
			data.status=req.body.status;
			if(result==null || result==''){
				LikedUsers.create(data).then(result=>{
					res.send({response:true,message:data.status==1?"User Liked":"User Unliked",data:result});
				},err=>{
					res.send({response:false,message:"err",err:err});
				})
			}else{
				result.update(data).then(result=>{
					res.send({response:true,message:data.status==1?"User Liked":"User Unliked",data:result});
				},err=>{
					res.send({response:false,message:"err",err:err});
				})
			}
		},err=>{
			res.send({response:false,message:"err",err:err});
		})
	}
};
exports.liked_user_list = function(req,res){
	if(req.body.user_id==null || req.body.user_id==''){
		res.send({response:false,message:"Id not found"});
	}else{
		LikedUsers.findAll({
			where:[{user_id:req.body.user_id},{status:'1'}],
			include:[{
              model: User,
              as:'user_detail',
              attributes:['id', 'username','name','user_type','age','image','logged_status','logged_time','gender','latitude','longitude']
            }]}).then(result=>{
			if(result==null || result==''){
				res.send({response:false,message:"no liked users"});
			}else{
				res.send({response:true,message:"Success",data:result});
			}
		},err=>{
			res.send({response:false,message:"err",err:err});
		})
	}
};
exports.favourite_user = function(req,res){
	var data={
		favourite_by:req.body.user_id,
		user_id:req.body.favourite_user_id
	}
	if(req.body.status==null || req.body.status=='' ||req.body.user_id==null || req.body.user_id=='' || req.body.favourite_user_id==null || req.body.favourite_user_id==''){
		res.send({response:false,message:"Ids or status not found"});
	}else{
		FavouriteUsers.findOne({where:data}).then(result=>{
			data.status=req.body.status;
			if(result==null || result==''){
				FavouriteUsers.create(data).then(result=>{
					res.send({response:true,message:data.status==1?"User Favourite":"User Unfavourite",data:result});
				},err=>{
					res.send({response:false,message:"err",err:err});
				})
			}else{
				result.update(data).then(result=>{
					res.send({response:true,message:data.status==1?"User Favourite":"User Unfavourite",data:result});
				},err=>{
					res.send({response:false,message:"err",err:err});
				})
			}
		},err=>{
			res.send({response:false,message:"err",err:err});
		})
	}
};
exports.favourite_user_list = function(req,res){
	if(req.body.user_id==null || req.body.user_id==''){
		res.send({response:false,message:"Id not found"});
	}else{
		FavouriteUsers.findAll({
			where:[{favourite_by:req.body.user_id},{status:'1'}],

			include:[{
              model: User,
              as:'user_detail',
              attributes:['id', 'username','name','user_type','age','image','logged_status','logged_time','gender','latitude','longitude']
            }]}).then(result=>{
			if(result==null || result==''){
				res.send({response:false,message:"No Favourite users"});
			}else{
				res.send({response:true,message:"Success",data:result});
			}
		},err=>{
			res.send({response:false,message:"err",err:err});
		})
	}
};
exports.calculate_discount = function(req,res){
	if(req.body.discount_code==null || req.body.discount_code==''){
		res.send({response:false,message:"discount code not found"});
	} else {

		var date  = new Date().getDate();
		var month = new Date().getMonth()+1;
		var year  = new Date().getFullYear();
		var today = date+'/'+month+'/'+'/'+year;
		console.log(today);
		var now_date = year+'-'+month+'-'+date;
		console.log(now_date);
		Discount.findOne({where:{
						discount_code:req.body.discount_code,
						status:0,
						start_date:{[Op.lte]:now_date},
						end_date:{[Op.gte]:now_date},
						is_deleted:0,						
						}
					}).then(data=>{
			if(data==null || data=='') {
				res.send({response:false,message:"data not found"});
			}else{
				res.send({response:true,message:"data found",data:data});
			}
		},err=>{
			res.send({response:false,message:"err",err:err});
		})
	}
};
exports.get_other_user_detail = function(req,res){
	if(req.body.user_id==null || req.body.user_id=='' || req.body.other_user_id==null || req.body.other_user_id==''){
		res.send({response:false,message:"Id not found"});
	}else{
		User.findOne({
						where:{id:req.body.other_user_id},
						include:[{
							model:BlockedUsers,
							as:'block',
							attributes:['status',['block_by','user_id']]
						},{
							model:LikedUsers,
							as:'like',
							attributes:['status',['liked_by','user_id']]
						},{
							model:FavouriteUsers,
							as:'favourite',
							attributes:['status',['favourite_by','user_id']]
						},{
				            model: AboutMe,
				            as:'aboutMe'
			            },{
				            model: ProfilePics,
				            as:'profilePics'
			            },{
			                model: Country,
			                as:'country'
			            },{model: Residence,as:'residence_detail'},{
			              model: Social_status,
			              as:'social_status_detail'
			            },{
			              model: Religion,
			              as:'religion_detail'
			            },{
			              model: Marriage_type,
			              as:'marriage_type_detail'
			            }]
					}).then(data=>{
			if(data==null || data==''){
				res.send({response:false,message:"data not found"});
			}else{
				var block=0,like=0,favourite=0;
				if(data.block!=null){
					if(_.where(data.block, {user_id: +req.body.user_id}).length!=0){
						block=_.where(data.block, {user_id: +req.body.user_id})[0].status;
					}
				}
				if(data.favourite!=null){
					if(_.where(data.favourite, {user_id: +req.body.user_id}).length!=0){
						favourite=_.where(data.favourite, {user_id: +req.body.user_id})[0].status;
					}
				}
				if(data.like!=null){
					if(_.where(data.like, {user_id: +req.body.user_id}).length!=0){
						like=_.where(data.like, {user_id: +req.body.user_id})[0].status;
					}
				}
				var details={
					id:data.id,
					username:data.username,
					name:data.name,
					facebook_id:data.facebook_id,
					user_type:data.user_type,
					email:data.email,
					image:data.image,
					password:data.password,
					country_id:data.country_id,
					age:data.age,
					gender:data.gender,
					decoded_password:data.decoded_password,
					residence:data.residence,
					region:data.region,
					social_status:data.social_status,
					marriage_type:data.marriage_type,
					children:data.children,
					smoking:data.smoking,
					Height:data.Height,
					weight:data.weight,
					skin_color:data.skin_color,
					hair_color:data.hair_color,
					body_type:data.body_type,
					fb_status:data.fb_status,
					logged_status:data.logged_status,
					logged_time:data.logged_time,
					latitude:data.latitude,
					longitude:data.longitude,
					created_at:data.created_at,
					status:data.status,
					free_trial:data.free_trial,
					block:block,
					like:like,
					favourite:favourite,
					aboutMe:data.aboutMe,
					profilePics:data.profilePics,
					country:data.country,
					residence_detail:data.residence_detail,
					social_status_detail:data.social_status_detail,
					religion_detail:data.religion_detail,
					marriage_type_detail:data.marriage_type_detail
				}
				res.send({response:true,message:"success",data:details});
			}
		},err=>{
			res.send({response:false,message:"err",err:err});
		})
	}
}
exports.save_device = function(req,res){
	if(req.body.device_id==null || req.body.device_id=='' || req.body.device_type==null || req.body.device_type=='' || req.body.user_id==null || req.body.user_id=='' || req.body.token==null || req.body.token==''){
		res.send({response:false,message:"data not found"});
	}else{
		data={
			user_id:req.body.user_id,
			device_id:req.body.device_id,
			token:req.body.token,
			device_type:req.body.device_type,
			status:'1',
		}
		GcmUsers.findOne({where:{user_id:data.user_id}}).then(result=>{
			if(result==null||result==''){
				GcmUsers.create(data).then(result=>{
					res.send({response:true,message:"Device added",data:result});
				},err=>{
					res.send({response:false,message:"err",err:err});
				})
			}else{
				result.update(data).then(result1=>{
					res.send({response:true,message:"Device added",data:result1});
				},err=>{
					res.send({response:false,message:"err",err:err});
				})
			}
		},err=>{
			res.send({response:false,message:"err",err:err});
		})
	}
}
exports.logout =function(req,res){
	if(req.body.user_id==null || req.body.user_id==''){
		res.send({response:false,message:"Id not found"});
	}else{
		GcmUsers.findOne({where:{user_id:req.body.user_id}}).then(data=>{
			if(data==null||data==''){
				res.send({response:false,message:"data not found"});
			}else{
				data.update({status:'0'}).then(data=>{
					res.send({response:true,message:'logout successfully',data:data})
				},err=>{
					res.send({response:false,message:"err",err:err});
				})
			}
		},err=>{
			res.send({response:false,message:"err",err:err});
		})
	}
}
exports.free_trial = function(req,res){
	if(req.body.user_id==null || req.body.user_id==''){
		res.send({response:false,message:"Id not found"});
	}else{
		User.findOne({
			where:{id:req.body.user_id},
			include:[{
              model: ProfilePics,
              as:'profilePics'
            },{
              model: AboutMe,
              as:'aboutMe'
            },{
              model: Country,
              as:'country'
            },{
              model: Residence,
              as:'residence_detail'
            },{
              model: Social_status,
              as:'social_status_detail'
            },{
              model: Religion,
              as:'religion_detail'
            },{
              model: Marriage_type,
              as:'marriage_type_detail'
            }]
		}).then(data=>{
			if(data==null||data==''){
				res.send({response:false,message:"Id not found in database"});
			}else{
				if(data.free_trial=='1'){
					res.send({response:false,message:'Already used'});
				}else if(data.user_type=='G'){
					res.send({response:false,message:'Already Gold user'});
				}else if(data.user_type=='V'){
					res.send({response:false,message:'Already Vip user'});
				}else{
		        	var date=new Date().toISOString();
					data.update({free_trial:'1',user_type:'G',free_trial_enable_time:date}).then(data=>{
						res.send({response:true,message:'success',data:data});
					},err=>{
						res.send({response:false,message:"err",err:err});
					})
				}
			}
		},err=>{
			res.send({response:false,message:"err",err:err});
		})
	}
}
exports.search=function(req,res){
	var response={response:true,message:'success'};
	Search.findAll().then(data=>{
		response.data=data;
		Social_status.findAll().then(data=>{
			response.social_status=data;
			Religion.findAll().then(data=>{
				response.religion=data;
				Marriage_type.findAll().then(data=>{
					response.marriage_type=data;
					res.send(response);
				},err=>{
					res.send({response:false,message:"err",err:err});
				})
			},err=>{
				res.send({response:false,message:"err",err:err});
			})
		},err=>{
			res.send({response:false,message:"err",err:err});	
		})
	},err=>{
		res.send({response:false,message:"err",err:err});
	})
}
exports.check_free_trial = function(req,res){
	User.findAll({
		where:{user_type:'G',free_trial:'1',free_trial_status:'1'}
	}).then(data=>{
		if(data==null||data==''){
			res.send({response:false,message:"data not found"});
		}else{
			async.forEachOf(data, (value, key, callback) => {
				var date=new Date().toISOString();
				var currentDate=Date.parse(date);
				var activeDate=Date.parse(value.free_trial_enable_time)+24*60*60*1000;
				if(activeDate <= currentDate){
					value.update({user_type:'N',free_trial_status:'0'}).then(result=>{
						console.log(result);
						callback();
					},err=>{
						console.log(err);
						callback();
					})
				}else{
			    	callback();
				}
			}, err => {
			    if (err) console.error(err.message);
				res.send({response:true,message:"Success"});
			});
		}
	},err=>{console.log(err);})
}
exports.search_nearby = function(req,res){
	if(req.body.user_id!=null && req.body.user_id!=''){
		var userData;
		User.findOne({where:{id:req.body.user_id}}).then(data=>{
			if(data==null||data==''){
				res.send({response:false,message:"no users found"});
			}else{
			userData=data;
			if(req.body.latitude==null ||req.body.latitude=='' || req.body.longitude==null ||req.body.longitude==''){
				res.send({response:false,message:"latitude or longitude not found"});
			}
			User.findAll({where:{
				status:1,
				id:{[Op.ne]:req.body.user_id},
				gender:{[Op.ne]:userData.gender},
				user_type:{[Op.ne]:'V'}
			},order:[['logged_status','DESC']],
			attributes: ['id', 'username','name','user_type','residence','age','image','logged_status','logged_time','gender','latitude','longitude','region','social_status','marriage_type'],
			include:[
					{model: AboutMe,as:'aboutMe'},
					{model: Country,as:'country'},
					{model: Residence,as:'residence_detail'},{
			              model: Social_status,
			              as:'social_status_detail'
			            },{
			              model: Religion,
			              as:'religion_detail'
			            },{
			              model: Marriage_type,
			              as:'marriage_type_detail'
			            }
					]
			}).then(data=>{
				if(data==null || data == ''){
					res.send({response:false,message:"no users found"});
				}else{
					GcmUsers.findOne({where:{user_id:req.body.user_id}}).then(result=>{
						if(result==null||result==''){
							res.send({response:false,message:"id not found"});
						}else{
								//distance code
								var a=[];
									async.forEachOf(data, (value, key, callback) => {
										var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+
													req.body.latitude+','+req.body.longitude+
													'&destinations='+value.latitude+','+value.longitude+
													'&mode=driving&language=pl-PL&key=AIzaSyC0GbCWPZepORdOoAjZDpADFrL0-uksTOk';
										request(url, function (error, response, body) {
											if (!error && response.statusCode == 200 && body) {
									            if(JSON.parse(body).rows[0].elements[0].status=='OK'){
									                data[key].distance = Math.round(JSON.parse(body).rows[0].elements[0].distance.value/1000*100)/100;
									                if(data[key].distance<=parseInt(req.body.distance)){
									                	a.push(data[key])
									                }
									            }
									            else{
									                data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
									                if(data[key].distance<=parseInt(req.body.distance)){
									                	a.push(data[key])
									                }
									            }
									        }else{
									            data[key].distance = Math.round(distance(req.body.latitude,req.body.longitude,value.latitude,value.longitude,"K")*100)/100;
									            if(data[key].distance<=parseInt(req.body.distance)){
									            	a.push(data[key])
									            }
									        }
									        callback();
										});
									}, err => {
									    if (err) console.error(err.message);
										res.send({response:true,message:"Success",data:a});
									});
								//distance code
						}
					},err=>{res.send({response:false,message:"err",err:err});})
				}
			},err=>{res.send({response:false,message:"err",err:err});})
		}
		},err=>{res.send({response:false,message:"err",err:err});})
	}else{res.send({response:false,message:"Id not found"});}
}
exports.test=function(req,res){
	// data = '<?xml version="1.0" encoding="utf-8"?>'+
	// 		'<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSche ma" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">'+
	// 		'<soap12:Body>'+
	// 		'<PaymentRequest xmlns="http://tempuri.org/">'+
	// 		'<req>'+
	// 		'<CustomerDC>'+
	// 		'<Name>string</Name>'+
	// 		'<Email>string</Email>'+
	// 		'<Mobile>string</Mobile>'+
	// 		'<Gender>string</Gender>'+
	// 		'<DOB>string</DOB>'+
	// 		'<civil_id>string</civil_id>'+
	// 		'<Area>string</Area>'+
	// 		'<Block>string</Block>'+
	// 		'<Street>string</Street>'+
	// 		'<Avenue>string</Avenue>'+
	// 		'<Building>string</Building>'+
	// 		'<Floor>string</Floor>'+
	// 		'<Apartment>string</Apartment>'+
	// 		'</CustomerDC>'+
	// 		'<MerchantDC>'+
	// 		'<merchant_code>999999</merchant_code>'+
	// 		'<merchant_username>testapi@myfatoorah.com</merchant_username>'+
	// 		'<merchant_password>E55D0</merchant_password>'+
	// 		'<merchant_ReferenceID>201454542102</merchant_ReferenceID>'+
	// 		'<ReturnURL>http://example.com</ReturnURL>'+
	// 		'<merchant_error_url>string</merchant_error_url>'+
	// 		'<udf1>string</udf1>'+
	// 		'<udf2>string</udf2>'+
	// 		'<udf3>string</udf3>'+
	// 		'<udf4>string</udf4>'+
	// 		'<udf5>string</udf5>'+
	// 		'</MerchantDC>'+
	// 		'<lstProductDC>'+
	// 		'<ProductDC>'+
	// 		'<product_name>example_product_name</product_name>'+
	// 		'<unitPrice>100.2</unitPrice>'+
	// 		'<qty>3</qty>'+
	// 		'</ProductDC>'+
	// 		'<ProductDC>'+
	// 		'<product_name>example_product_name_2</product_name>'+
	// 		'<unitPrice>200.50</unitPrice>'+
	// 		'<qty>4</qty>'+
	// 		'</ProductDC>'+
	// 		'</lstProductDC>'+
	// 		'</req>'+
	// 		'</PaymentRequest>'+
	// 		'</soap12:Body>'+
	// 		'</soap12:Envelope>';
	// request.post({
	//     url:"https://test.myfatoorah.com/pg/PayGatewayService.asmx?op=PaymentRequest",
	//     port: 9000,
	//     method:"POST",
	//     headers:{
	//         'Content-Type': 'application/soap+xml; charset=utf-8',
	//     },
	//     body: data
	// },
	// function(error, response, body){
		var date=new Date().toISOString()
	    res.send(date);
	// });
}


