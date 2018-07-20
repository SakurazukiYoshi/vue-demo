<template>
    <div class="select-box relative" :style="`width: ${width}px`" >
        <div class="select-text relative">
            <input type="text" autocomplete="off"   readonly="readonly"
                   :placeholder="[(index||index==0)?items[index][showName]:pretext]"
                   :value="text"
                   @click.stop="click"
                   v-if="arrow_down"
                   :class="disabled?'disabled':''"
            />
            <span class="arrow-down" v-if="arrow_down"></span>
            <div  @click="click"  v-else>
                <slot name="arrow_down"></slot>
            </div>
            <ul :class="[up?'up':'dropdown-list',isShow?'':'none']">
                <li v-for="(item,i) in items" @click="change(item)" :title="item[showName]">{{item[showName]}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Select",
        props:{
            /*
            * width决定整体input的宽度
            * */
            width: {
                //type: Number,
                //default: 200
            },
            /*
            * 传入的数据有两个项目
            *
            * showName：选中显示的内容，默认显示name
            *
            *
            * */
            items:{
                type:Array
            },
            /*
            * 预设的文本,未选中时显示的文本
            * */
            pretext:{
                //type:String
            }
            /*
            * 下拉框向上现实
            * */,
            up:{
                type:Boolean,
                default: false
            },
            /*
            * 预设选项,默认选中的序号数
            * */
            index:{
                default: null
            },
            /*
            * 预设显示内容的key值
            * */
            showName:{
                default: 'name'
            },
            /*
            * 显示内容三角
            * */
            arrow_down:{
                default: true
            },
            /*
            * 显示内容三角
            * */
            disabled:{
                default: false
            },
            /*
            * 编辑文件时清空的默认文字
            * */
            edit:{
                default:false
            }
        },
        data(){
            return {
                isShow:false,
                text:''
            }
        },
        methods:{
            click(e){
                //e.target  触发该事件的节点
                //判断是不是点击的属性
                if(this.disabled){
                    return false;
                }
                this.isShow=!this.isShow;
            },
            change(data){
                this.$data.text=data[this.showName];
                this.isShow=false;
                this.$emit('select',data);
            },
            DocumentClick(e){
                if(!this.$el.contains(e.target)){
                    this.isShow=false;
                }
            }
        },
        mounted(){
            //点击页面就出发click方法
            document.addEventListener('click',this.DocumentClick);
            if(this.index||this.index==0){
                this.$emit('select',this.items[this.index]);
            }
        },
        watch:{
            items(val){
                if(val&&val.length==0){
                    if(this.edit){
                        this.text=this.edit;
                    }else {
                        this.text=this.pretext;
                    }
                }
            }
        }
    }
</script>

<style scoped>
    /* 清除内外边距 */
    body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, /* structural elements 结构元素 */
    dl, dt, dd, ul, ol, li, /* list elements 列表元素 */
    pre, /* text formatting elements 文本格式元素 */
    fieldset, lengend, button, input, textarea, /* form elements 表单元素 */
    th, td { /* table elements 表格元素 */
        margin: 0;
        padding: 0;
    }

    /* 设置默认字体 */
    body,
    button, input, select, textarea { /* for ie */
        /*font: 12px/1 Tahoma, Helvetica, Arial, "宋体", sans-serif;*/
        font: 12px/1 Tahoma, Helvetica, Arial, "\5b8b\4f53", sans-serif; /* 用 ascii 字符表示，使得在任何编码下都无问题 */
    }

    h1 { font-size: 18px; /* 18px / 12px = 1.5 */ }
    h2 { font-size: 16px; }
    h3 { font-size: 14px; }
    h4, h5, h6 { font-size: 100%; }

    address, cite, dfn, em, var { font-style: normal; } /* 将斜体扶正 */
    code, kbd, pre, samp, tt { font-family: "Courier New", Courier, monospace; } /* 统一等宽字体 */
    small { font-size: 12px; } /* 小于 12px 的中文很难阅读，让 small 正常化 */

    /* 重置列表元素 */
    ul, ol { list-style: none; }

    /* 重置文本格式元素 */
    a { text-decoration: none; }
    a:hover { text-decoration: underline; }

    abbr[title], acronym[title] { /* 注：1.ie6 不支持 abbr; 2.这里用了属性选择符，ie6 下无效果 */
        border-bottom: 1px dotted;
        cursor: help;
    }

    q:before, q:after { content: ''; }

    /* 重置表单元素 */
    legend { color: #000; } /* for ie6 */
    fieldset, img { border: none; } /* img 搭车：让链接里的 img 无边框 */
    /* 注：optgroup 无法扶正 */
    button, input, select, textarea {
        font-size: 100%; /* 使得表单元素在 ie 下能继承字体大小 */
    }

    /* 重置表格元素 */
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    /* 重置 hr */
    hr {
        border: none;
        height: 1px;
    }
    .none{
        display: none;
    }
    input[readonly='readonly']{
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 35px;
        line-height: 35px;
        outline: none;
        padding: 0 30px  0 10px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%;
        cursor: pointer;
    }
    .arrow-down{
        content: '';
        width: 10px;
        height: 10px;
        border-right: 1px solid #cbcbcb;
        border-bottom: 1px solid #cbcbcb;
        display: block;
        position: absolute;
        top: 40%;
        -webkit-transform: rotate(45deg) translateY(-50%);
        transform: rotate(45deg) translateY(-50%);
        right: 18px;
    }
    .relative{
        position: relative;
    }
    .dropdown-list{
        width: 100%;
        min-width: 58px;
        position: absolute;
        z-index: 9990;
        bottom: 0;
        left: 0;
        transform: translateY(100%);
        background-color: #fff;
        max-height: 419px;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .dropdown-list li,.up li{
        font-size: 14px;
        padding: 0 10px;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #606266;
        height: 34px;
        line-height: 34px;
        box-sizing: border-box;
        cursor: pointer;
        border: 1px solid #dcdfe6;
        border-bottom: none;
        text-align: left;
    }
    .dropdown-list li:hover,.up li:hover{
        background-color: #409EFF;
        color: #fff;
    }
    .dropdown-list li:last-child,.up li:last-child{
        border: 1px solid #dcdfe6;
    }

    .up{
        width: 100%;
        position: absolute;
        z-index: 100;
        top: -2px;
        left: 0;
        transform: translateY(-100%);
        background-color: #fff;
    }
    .disabled{
        background-color: #eee!important;
    }
</style>