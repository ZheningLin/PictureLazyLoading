// 图片预加载
(function($){
		function PreLoad(imgs,options) {
			this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
			this.opts = $.extend({}, PreLoad.DEFAULTS, options);
			if(this.opts.order == 'ordered') {
				this._ordered();
			} else {
				this._unordered();
			}
			
		}
		PreLoad.DEFAULTS = {
			order: 'unordered',//默认无序
			each: null, //每一张图片加载完毕后执行
			all: null   //所有图片加载完毕后执行
		};
		PreLoad.prototype._ordered = function() { //有序加载
			var opts = this.opts,
				image = this.imges,
				len = imges.length,
				count = 0;
				load();
				function load() {
			    	var imgObj = new Image();
			    	$(imgObj).on('load error',function() {
			    		opts.each && opts.each(count);
			    		if (count >= len) {
			    			opts.all && opts.all();
			    		} else {
			    			load();
			    		}
			    		count++;
			    	});
			    	imgObj.src = imgs[count];
			    }

		},
		PreLoad.prototype._unordered = function() { //无序加载
			var imges = this.imges,
				opts = this.opts,
				count = 0,
				len = imgs.length;
			$.each(imgs, function(i,src) {
				if (typeof src != 'string') return;
				var imgObj = new Image();
				$(imgObj).on('load error',function() {
					opts.each && opts.each(count);
					if(count >= len-1){
						opts.all && opts.all();
					}
					count++;
				});
				imgObj.src = src;
			});
		};
		$.extend({
			preload: function(imgs,opts){
				new PreLoad(imgs,opts);
			}
		});
})(jQuery);