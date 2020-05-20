/*
 * @Description: 奇穴模拟器
 * @Author: iRuxu
 * @Date: 2019-09-08 06:26:22
 * @LastEditors: iRuxu
 * @LastEditTime: 2019-10-16
 */

/* ex. 
    Init :
    let qixue = new JX3_QIXUE([opt])

    Reload :
    qixue.load(opt,[editable])

    Callback:
    qixue.ready(callback(instance))
    qixue.change(callback(instance))
*/

import $ from 'jquery'
const _ = require('lodash');
const { JX3BOX } = require('@jx3box/jx3box-common');

class JX3_QIXUE{

    /**
    * @param {object} opt 初始化参数
    * opt.container     {string}    容器选择器
    * opt.xf            {stirng}    心法
    * opt.sq            {string}    序列
    * opt.editable      {boolean}   是否为可编辑模式
    */
    constructor(opt){

        //构建器参数默认值
        this._default = {
            version : 'v20191128',
            container : '.qx-container',   
            xf : '其它',                        
            sq : '1,1,1,1,1,1,1,1,1,1,1,1',     
            editable:false
        }

        //初始化字段
            this._qixue_url = JX3BOX.__ossMirror +'data/qixue/'
            this._img_path = JX3BOX.__ossMirror + 'icon/'
            this._total_levels = 12     //奇穴共12重
            this._item_attr_list = [
                'icon',    //图标id
                'name',    //奇穴名称
                'desc',    //奇穴描述
                'order',   //奇穴在第几重
                'pos',     //奇穴从上往下数的位置
                'is_skill', //是否为技能
                'meta',    //技能短述
                'extend'   //技能长述
            ]
            this._data = {}//格式化数据对象
            this.txt = new Array(this._total_levels) //文字版

        this._init(opt)
    }

    //设置默认配置信息
    getStdVersion(){//dev184  pro306
        let version = JX3BOX.__Root + 'wp-json/api/acfmeta/?id=306&key=qixue_version'
        return new Promise((resolve,reject)=>{
            $.ajax({
                url: version,
                success: function( data ) {
                    resolve(data)
                },
                error: function( data ) {
                    reject(data)
                }
            })
        })
    }

    //初始化实例
    async _init(opt){

        //重设版本号
        let version = await this.getStdVersion()
        if(version){
            this._default.version = version
        }
        
        //构建基础视图
        this._structureViewBox(opt)

        //获取json源数据
        this._build(opt)
    }

    //获取奇穴数据
    _get_qixue_data(opt){
        return new Promise((resolve,reject)=>{
            $.ajax({
                url: this._qixue_url + opt.version + '.json',
                dataType: 'json',
                success: function( data ) {
                    resolve(data)
                },
                error: function( data ) {
                    reject(data)
                }
            })
        })
    }

    //构建模拟器
    async _build(opt){

        //参数检查
        if(opt == undefined){
            opt = this._default
        }else{
            opt = _.extend(this._default,opt)
            opt = this._checkParam(opt)
        }

        //step.0 加载不同版本json文件
        if(opt.version != this.version){
            this._data = await this._get_qixue_data(opt)
        }

        //step.1 配置参数
        this._setConfig(opt)
        
        //step.2 渲染视图数据
        this._renderViewBox()

        //step.3 是否构建编辑器
        if(this.editable) this._buildEditBox();
        
    }

    //检查参数
    _checkParam(opt){
        let t = this._checkParamType(opt)
        let v = this._checkParamsValue(t)
        return v
    }

    //检查参数类型
    _checkParamType(opt){
        
        let __opt = {}

        if(_.isObject(opt)){
            __opt = opt
        }
        
        if(_.isString(opt)){

            if(opt.includes('{')){
                try{
                    __opt = JSON.parse(opt)
                }catch(e){
                    console.error('[checkParamType]无法解析字符串为合适对象')
                }
            }else if(opt.includes(',')){
                try{
                    let __simplify = opt.split(',')
                    __opt.xf = __simplify[0]
                    __opt.sq = __simplify[1].split('').join(',')

                    let isBool = function (val){
                        if(val == 'true' || val == '1' ) return true
                        if(val == 'false' || val == '0' ) return false
                    }
                    __opt.editable = isBool(__simplify[2])

                }catch(e){
                    console.error('[checkParamType]无法解析字符串参数')
                }
            }else{
                console.error('[checkParamType]无法解析参数')
            }
            
        }
            
        return __opt
    }

    //检查参数值
    _checkParamsValue(opt){
        let __opt = opt
        //opt.xf && (__opt.xf = this._checkParamXF(opt.xf))
        opt.sq && (__opt.sq = this._checkParamSQ(opt.sq))
        opt.editable && (__opt.editable = this._checkParamEditable(opt.editable))
        return __opt
    }

    //检查模式
    _checkParamEditable(editable){
        let __editable = Boolean(editable)
        return __editable
    }

    //检查序列
    _checkParamSQ(sq){
        let __sq = sq.split(',')
        if(__sq.length != this._total_levels){
            throw(`[checkParams]:奇穴应为${this._total_levels}重,请检查`)
        }
        return sq
    }

    //设置私有数据
    _setConfig(opt){
        this.version = opt.version
        this.xf = opt.xf
        this.map = this._data[opt.xf]
        this.sq = opt.sq.split(',')
        this.editable = opt.editable
    }

    //结构化容器
    _structureViewBox(opt){

        //如果未定义容器，使用默认容器
        if(opt.container == undefined){
            this.container = $(this._default.container)
        //如果有定义容器
        }else{
            if($(opt.container).length == 0 ){
                throw(`[checkParams]:指定容器不存在,请检查`)
            }
            this.container = $(opt.container)
        }

        //结构化包裹层
        this.container.append(`
            <div class="w-qixue-box">
                <h4 class="w-qixue-xf">奇穴</h4>
                <ul class="w-qixue-clist"></ul>
                <div class="w-qixue-obox"></div>
            </div>
        `)

        //缓存渲染容器jq对象
        this._box = this.container.children('.w-qixue-box')
        this._xfbox = this._box.children('.w-qixue-xf')
        this._clist = this._box.children('.w-qixue-clist')
        this._obox = this._box.children('.w-qixue-obox')

        //结构化当前list
        let __clist = `
            <li class="w-qixue-clist-item">
                <span class="u-pic"><img src="" alt=""/></span>
                <span class="u-title"></span>
            </li>
        `.repeat(this._total_levels)
        this._clist.append(__clist)
        this._citems = this._clist.children('.w-qixue-clist-item')
    }

    //渲染展示容器
    _renderViewBox(){
    
        let __instance = this
        let __items = this._citems

        //console.log(this)
        
        //心法名称
        this._xfbox.text(this.xf);

        //奇穴单项数据加载
        $.each(__instance.sq,function (i,val){
            let level = __instance.map[i + 1]
            let point = level[val]
            //console.log(`第${i + 1}重：`,level)

            //标签属性
            $.each(__instance._item_attr_list,function (j,key){
                __items.eq(i).attr(`data-${key}`,point[key])
            })

            //图片与文字
            let icon_url = `${__instance._img_path + point['icon']}.png`

            __items.eq(i).find('img').attr('src',`${icon_url}`)
            __items.eq(i).find('img').attr('alt',point['name'])
            __items.eq(i).find('.u-title').text(point['name'])
            
            //是否为特殊技能
            parseInt(point['is_skill']) ?
            __items.eq(i).addClass('w-qixue-is_skill')  :
            __items.eq(i).removeClass('w-qixue-is_skill')

            __instance.txt[i] = point['name']

        })

        this._loadMetaEvent(this._clist)

    }

    //构建编辑容器
    _buildEditBox(){

        //给总容器添加class钩子以控制是否显示展开/折叠图标
        this._box.addClass('w-qixue-editable')
        
        //创建每重奇穴中的列表容器
        let __olist = `
            <ul class="w-qixue-olist"></ul>
        `.repeat(this._total_levels)
        this._obox.html(__olist)
        this._olist = this._obox.children('.w-qixue-olist')
        
        //给每一重创建子列表
        let __instance = this
        $.each(__instance.map,function (i,level){
            $.each(level,function (j,point){

                __instance._olist.eq(i-1).append(`
                    <li class="w-qixue-olist-item" 
                        data-icon="${point['icon']}" 
                        data-name="${point['name']}"
                        data-desc="${point['desc']}"
                        data-order="${point['order']}"
                        data-pos="${point['pos']}"
                        data-is_skill="${point['is_skill']}"
                        data-meta="${point['meta']}"
                        data-extend="${point['extend']}"
                    >
                        <span class="u-pic"><img src="${__instance._img_path + point['icon']}.png" alt="${point['name']}"/></span>
                        <span class="u-title">${point['name']}</span>
                    </li>
                `)

            })
        })

        //给技能类增加样式
        this._olist.find('.w-qixue-olist-item').each(function (i,ele){
            if(parseInt($(this).attr('data-is_skill'))) $(this).addClass('w-qixue-is_skill')
        })

        //绑定事件
        this._bindEvent()

    }

    //绑定事件
    _bindEvent(){

        //step.1 点击展开/折叠事件
        this._foldListEvent()

        //step.2 加载奇穴信息
        this._loadMetaEvent(this._olist)

        //step.3 切换奇穴
        this._changeEvent()
    }

    //展开折叠事件
    _foldListEvent(){

        let __instance = this

        //防止切换心法后多次绑定,需要先解绑
        this._clist.off('click','li').on('click','li',function (e){

            e.stopPropagation()

            let i = $(this).index()
            
            //折叠按钮变化
            $(this).siblings('li').removeClass('on')
            $(this).toggleClass('on')

            //任意一个展开
            __instance._clist.find('.on').length ? __instance._obox.addClass('on') : __instance._obox.removeClass('on')

            //展开可选菜单
            __instance._olist.removeClass('on')
            if($(this).hasClass('on')){
                __instance._olist.eq(i).addClass('on')
            }
            
        })

        //点击任意空白处
        $('body').on('click',function (){
            __instance._clist.children('li').removeClass('on')
            __instance._obox.removeClass('on')
            __instance._olist.removeClass('on')
        })

    }

    //加载奇穴信息
    _loadMetaEvent(list){
        //加载描述
        $(list).on('mouseenter','li',function (){
            let name = $(this).attr('data-name')
            let meta = $(this).attr('data-meta')
            let is_skill = Boolean(parseInt($(this).attr('data-is_skill')))
            let skill_type = is_skill ? '主动招式' : '被动招式'
            let desc = $(this).attr('data-desc')
            let extend = $(this).attr('data-extend')

            let isNotExist = $(this).children('.w-qixue-item-pop').length == 0
            
            if(isNotExist){
                let __html = `<span class="w-qixue-item-pop">`
                __html += `<b class="u-name">${name}</b>`
                __html += `<b class="u-skill">${skill_type}</b>`
                if(is_skill && meta != 'null' && meta != undefined) __html += `<em class="u-meta">${meta}</em>`
                __html += `<span class="u-desc">${desc}</span>`
                if(is_skill && extend != 'null' && meta != undefined) __html += `<em class="u-extend">${extend}</em>`
                __html += `</span>`
                $(this).append(__html)
            }
        })
        //控制显示隐藏显示
        $(list).on('mouseenter','li',function (){
            $(this).children('.w-qixue-item-pop').addClass('on')
        })
        $(list).on('mouseleave','li',function (){
            $(this).children('.w-qixue-item-pop').removeClass('on')
        })
    }

    //切换奇穴
    _changeEvent(){

        let __instance = this
        this._olist.on('click','li',function (e){

            //缓存选择
            let $from = $(this)
            let __order = $from.parent('ul').index()
            let $to = __instance._citems.eq(__order)

            //更改li属性
            $.each(__instance._item_attr_list,function (i,val){
                $to.attr(`data-${val}`,$from.attr(`data-${val}`))
            })

            //更改图片&标题
            $to.find('img').attr('src',`${__instance._img_path + $from.attr('data-icon')}.png`)
            $to.find('img').attr('alt',$from.attr('data-name'))
            $to.find('.u-title').text($from.attr('data-name'))

            //添加特殊技能样式
            parseInt($from.attr('data-is_skill')) ? $to.addClass('w-qixue-is_skill') : $to.removeClass('w-qixue-is_skill')

            //更新内部数据
            __instance.sq[__order] = $from.attr('data-pos')
            __instance.txt[__order] = $from.attr('data-name')

            //触发自定义事件
            $(document).trigger('JX3_QIXUE_Change',__instance)

        })
    }

    /* 公开方法 
    ------------------------------------------
    */

    //传入实例回调
    ready(callback){
        callback && callback(this)
    }

    //重加载渲染数据
    load(opt){

        if(opt == undefined) return

        let __opt = {}
        __opt = this._checkParam(opt)

        this._build(__opt)
        $(document).trigger('JX3_QIXUE_Change',this)
    }

}

export default JX3_QIXUE;

//测试用例
/* let test = new JX3_QIXUE({
    "xf":"冰心诀",
    "sq":"1,2,4,1,2,3,1,2,3,4,4,4",
    "editable":true
});
console.log(test)
test.load(`{
    "xf":"冰心诀",
    "sq":"1,2,4,1,2,3,1,2,3,4,4,4",
    "editable":true
}`)
test.load('冰心诀,111111222222,true')
test.ready(function (o){
    console.log(o)
}) */