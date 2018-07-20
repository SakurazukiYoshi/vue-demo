// 定义一个名为 button-counter 的新组件
/*    Vue.component('my-select', {
        name: "Select",
        props:{
            /!*
            * width决定整体input的宽度
            * *!/
            width: {
                //type: Number,
                default: 200
            },
            /!*
            * 传入的数据有两个项目
            *
            * showName：选中显示的内容，默认显示name
            *
            *
            * *!/
            items:{
                type:Array
            },
            /!*
            * 预设的文本,未选中时显示的文本
            * *!/
            pretext:{
                //type:String
            }
            /!*
            * 下拉框向上现实
            * *!/,
            up:{
                type:Boolean,
                default: false
            },
            /!*
            * 预设选项,默认选中的序号数
            * *!/
            index:{
                default: null
            },
            /!*
            * 预设显示内容的key值
            * *!/
            showName:{
                default: 'name'
            },
            /!*
            * 显示内容三角
            * *!/
            arrow_down:{
                default: true
            },
            /!*
            * 显示内容三角
            * *!/
            disabled:{
                default: false
            },
            /!*
            * 编辑文件时清空的默认文字
            * *!/
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
            console.log(this.width);
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
        },
        template: `
                <div class="select-box relative" :style="'width:'+width+'px'">
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
        `
    });*/
Vue.component('my-select', {
    name: "Select",
    props: {
        /*
        * width决定整体input的宽度
        * */
        width: {
            //type: Number,
            default: 200
        },
        /*
        * 传入的数据有两个项目
        *
        * showName：选中显示的内容，默认显示name
        *
        *
        * */
        items: {
            type: Array
        },
        /*
        * 预设的文本,未选中时显示的文本
        * */
        pretext: {}
        //type:String

        /*
        * 下拉框向上现实
        * */
        , up: {
            type: Boolean,
            default: false
        },
        /*
        * 预设选项,默认选中的序号数
        * */
        index: {
            default: null
        },
        /*
        * 预设显示内容的key值
        * */
        showName: {
            default: 'name'
        },
        /*
        * 显示内容三角
        * */
        arrow_down: {
            default: true
        },
        /*
        * 显示内容三角
        * */
        disabled: {
            default: false
        },
        /*
        * 编辑文件时清空的默认文字
        * */
        edit: {
            default: false
        }
    },
    data: function data() {
        return {
            isShow: false,
            text: ''
        };
    },

    methods: {
        click: function click(e) {
            //e.target  触发该事件的节点
            //判断是不是点击的属性
            if (this.disabled) {
                return false;
            }
            this.isShow = !this.isShow;
        },
        change: function change(data) {
            this.$data.text = data[this.showName];
            this.isShow = false;
            this.$emit('select', data);
        },
        DocumentClick: function DocumentClick(e) {
            if (!this.$el.contains(e.target)) {
                this.isShow = false;
            }
        }
    },
    mounted: function mounted() {
        //点击页面就出发click方法
        document.addEventListener('click', this.DocumentClick);
        if (this.index || this.index == 0) {
            this.$emit('select', this.items[this.index]);
        }
    },

    watch: {
        items: function items(val) {
            if (val && val.length == 0) {
                if (this.edit) {
                    this.text = this.edit;
                } else {
                    this.text = this.pretext;
                }
            }
        }
    },
    template: '\n                <div class="select-box relative" :style="\'width:\'+width+\'px\'">\n            <div class="select-text relative">\n                <input type="text" autocomplete="off"   readonly="readonly"\n                       :placeholder="[(index||index==0)?items[index][showName]:pretext]"\n                       :value="text"\n                       @click.stop="click"\n                       v-if="arrow_down"\n                       :class="disabled?\'disabled\':\'\'"\n                />\n                <span class="arrow-down" v-if="arrow_down"></span>\n                <div  @click="click"  v-else>\n                    <slot name="arrow_down"></slot>\n                </div>\n                <ul :class="[up?\'up\':\'dropdown-list\',isShow?\'\':\'none\']">\n                    <li v-for="(item,i) in items" @click="change(item)" :title="item[showName]">{{item[showName]}}</li>\n                </ul>\n            </div>\n        </div>\n        '
});