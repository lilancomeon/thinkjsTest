var moment = require('moment');
module.exports = Controller('Admin/BaseController',{
	addAction : function(){
		if(this.isGet()){
			return this.display();
		}
		var title = this.post('title'),
		    content = this.post('content'),
		    self = this;
		if(title && content){
			return D('Post').add({
				title : title,
				content :content,
				create_time : moment().format('YYYY-MM-DD HH:mm:ss'),
				update_time : moment().format('YYYY-MM-DD HH:mm:ss'),
			}).then(function(insertId){
				//return self.success(insertId);
				//alert("恭喜你，添加成功！")
				self.redirect('manageList');
			}).catch(function(err){
				return self.error(500,err.message);
			})
		};
		return this.error(102,'params error');
	},
	manageListAction : function(){
		var self = this;
		var listPromise = D('post').select();
		self.assign('list',listPromise);
		self.display();
	},
	deleteAction : function(){
		var id = this.get('id') || 0;
		if(!id){
			return this.error(102,'params error');
		}
		var self = this;
		var result = D('Post').where({id:id}).delete().then(function(){
			self.redirect('manageList');
		}).catch(function(err){
			return self.error(500,err.message);
		});
	}
})