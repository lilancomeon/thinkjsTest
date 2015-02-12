module.exports = Controller({
	listAction : function(){
		var self = this;
		var listPromise = D('Post').select();
		this.assign('list',listPromise);
		this.display();
		// return D('Post').select().then(function(data){
		// 	self.json(data);
		// 	self.display();
		// })
	},
	detailAction : function(){
		var id = this.get("id") ||0;
		if(!id){
			return this.error(100,'params error');
		}else{
			var detailPromise = D('Post').where({id:id}).find();
			this.assign('post_info',detailPromise);
			this.display();
		}
	}
})