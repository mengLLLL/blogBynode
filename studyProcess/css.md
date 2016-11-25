#### 一直被忽略的outline
input获得焦点时，外面边框的样式，去掉`outline:none`

#### 第n+n次复习动画
- transition（过渡）
    - 理解什么叫过渡
    
    ```
    img{
        height:100px;
        width:100px;
    }
    img:hover{
        height:200px;
        width:200px;
    }
    //这个时候鼠标移到图片上面图片瞬间变大
    
   
    img{
        height:100px;
        width:100px;
        transition:1s;
    }
    img:hover{
         height:200px;
         width:200px;
    }
    //加入过渡属性（注意是加载谁上面的）,这个时候鼠标移到图片上面就会在1秒内慢慢变大
    ```
    
    - 属性：transition-property\transition-duration\transition-delay\transition-timing-function
    - 局限性：需要触发，不能在网页加载时自动发生，并且是一次性的，不能重复发生，只有两个状态（开始和结束），不能定义中间状态
- animation（动画）
    - 如何使用
    
    ```
    img:hover{
        animation:1s bigger;
    }
    //鼠标悬停时，会产生bigger的动画效果，持续时间为1s
    
    //定义一个动画效果
    @keyframes bigger{
        0% {
            width:100px;
            height:100px;
        }
        50%{
            width:200px;
            height:200px;
        }
        100%{
            width:500px;
            height:500px
        }
    }
    //bigger的动画效果一共有三个状态，分别为起始、中点、结束
    ```
    
    - 属性
        - animation-name,动画名称
        - animation-duration,持续时间
        - animation-timing-funciton,时间函数
        - animation-delay,延迟时间
        - animation-fill-mode，动画解释以后的状态，默认动画结束以后会立即从结束状态跳到起始状态。none,默认状态；backwards，让动画会到第一帧的状态；both，与animation-direction轮流应用forwards和backwards规则
        - animation-direction，指定了动画播放的方向
- transform（变形，在动画中应用的多）
    - 用法
    
    ```
    img{
        transform:scale(),translate(),rotate(),skew()
    }
    ```