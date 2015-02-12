module.exports = Controller('Admin/BaseController',{
	loginAction : function(){
		var self = this;
		if(self.isGet()){
			return self.display();
		}
			var name = self.post('name');
			var pwd = self.post('pwd');
			return D('user').where({
				name : name,
				password : pwd
			}).find().then(function(data){
				if(isEmpty(data)){
					return self.error(403,'用户名或者密码不正确');
				}else{
					return self.session('userInfo',data);
				}
			}).then(function(){
				return self.redirect('home');
			});
	},
	homeAction : function(){
		var userInfo = this.userInfo;
		var self = this;
		if(!isEmpty(userInfo)){
			self.assign({'title':'管理-首页','user':userInfo});
			return self.display();
		}
	},
	logoutAction: function(){
		var self = this;
		self.session('userInfo','');
		self.redirect('login');
	}
});
