### 功能部分
* 游客权限
     * 查看文章 GET /posts
     * 查看作者的个人信息 GET /author/:authorId
* 注册用户权限
     * 发表文章 POST /post/:postId
     * 删除文章 DELETE /remove/:articleId
     * 发表评论 POST /comment/:articleId
     * 拥有个人主页 POST//GET  /homepage/:authorId
* 超级管理员---我啦
     * 删除评论 DELETE /admin/delete/:commentId
     * 删除作者 DELETE /admin/delete/:authorId
     * 删除博客 DELETE /admin/delete/:postId
     
###安全部分
* 密码 -- sha1加密