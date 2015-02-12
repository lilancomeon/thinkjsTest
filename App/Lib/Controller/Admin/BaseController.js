module.exports = Controller(function(){
	'use strict';
	return {
		init : function(http){
			this.super('init',http);
			if(this.http.action === 'login'){
				return;
			}
			var self = this;
			return self.session('userInfo').then(function(userInfo){
				if(isEmpty(userInfo)){
					if(self.isAjax()){
						return self.error(403,'not Login');
					}else{
						return self.redirect('admin/index/login');
					}
				}else{
					self.userInfo = userInfo;
					self.assign('userInfo',userInfo);
				}
			});
		}
	}
});