# 图片预加载
实现图片的预加载，并使用jquery封装成插件，其中有三个实例展示：

- 图片无序预加载，翻页展示，loading显示百分比进度，加载完显示图片
- qq表情无序预加载，打开展示，显示loading加载页，加载完所有表情图片，显示表情列表
- 漫画有序预加载，翻页展示

### 无序预加载代码
``` bash
PreLoad.prototype._unordered = function(){
  var imgs = this.imgs,
      opts = this.opts,
      count = 0,
      len = imgs.length;
  $.each(imgs, function(i, src) {
    if [[ typeof src != 'string' ]]; then
      return;
    fi
    var imgObj = new Image();
    $(imgObj).on('load error', function(e) {
      opts.each && opts.each(count);
      if [[ count >= len - 1 ]]; then
        opts.all && opts.all();
      fi
      count++;
    })
    imgObj.src = src;
  });
};
```

### 有序预加载代码
``` bash
PreLoad.prototype._ordered = function() {
  var opts = this.opts,
      imgs = this.imgs,
      len = imgs.length,
      count = 0;

      load();

      function load() {
        var imgObj = new Image();
        $(imgObj).on('load error', function(e) {
            opts.each && opts.each(count);
            if [[ count >= len ]]; then
              //所有图片已经加载完毕
              opts.all && opts.all();
            fi else
            load();
            count++;
        });
        imgObj.src = imgs[count];
      }
}
```

### 调用
``` bash
$.preload(imgs,{
  order: '',
  each: function(count) {

  },
  all: function() {

  }
})
});
```
