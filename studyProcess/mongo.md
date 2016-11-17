### 数据库
* 连接步骤
    1. 安装mongoose `var mongoose = require('mongoose')`
    2. `mongoose.connect('mongodb://localhost/database_name')`
* schema

> schema可以理解为是对一条数据的描述（类比mysql），比如博客这个字段，题目必须是字符串类型，作者名必须是字符串。定义如下：

```
var mongoose = require("mongoose");
var blogSchema = new mongoose.Schema({
  articleName:String,
  articleContent:String,
  authorId:String,
  createAt:{
    type:Date,
    default:Date.now()
  }
});
module.exports = blogSchema;
``` 

       

* schema深入理解
    1. schema可以创建方法
    
    ```
    blogSchema.methods.getName = function(){
        console.log(this.articleName);
    }
    var blog1 = new blog({
        articleName:test
    });
    blog1.getName();
    ```
    
   
  
    
        

* model

> model是由schema发布生成的,也就是必须要先有schema才能生成model

```
var mongoose = require("mongoose");
var blogSchema = require("../schemas/blog.js")
var blog = mongoose.model('blog',blogSchema);
module.exports = blog
```

* model的深入理解
    1.  model可以执行查询

* entity

> 也就是一个实例（实体），由model生成的,比如要存储新的一篇博客

```
var blog = require('./models/blog')
var newBlog = new blog({
articleName:'new blog',
articleContent:'lue',
...
})
```

* entity的深入理解
    1. entity具有数据库操作`CRUD`,C-create,R-retrieve(重新获取),U-update，D-delete
    2. entity可以查询