<template>
  <div style="min-width: 315px">
    <!-- <h3>商业规则</h3> -->
    <!--<div class="singleRule"style="display: block">-->
    <span style="margin-left: 10px;" v-for="item in rule" class="ruleBolck st" >
      <span contenteditable class="ruleBolck subject">
        {{item.subject}}</span>
      <!--操作符-->

      <select  class="ruleBolck op">
        <option>
        {{item.op}}

      </option>
      </select>
      <!--不可变+属性-->
      <div v-for="(val,key) in item.object" style="display: inline-flex">
        <span contenteditable type = "text"
              class="ruleBolck attr"
              v-if="key=='ob'"
              :value = "val">{{val}}</span>
      </div>
      <!--可变项-->
      <select v-for="(val,key) in item.object"
        v-if="key=='choose'"
        class="ruleBolck value" name ="obj">
          <option
            v-for ="value in val"
            :value="value">
            {{value}}</option>
      </select>
      <div v-for="(val,key) in item.object" style="display: inline-flex">
        <span contenteditable  class="ruleBolck attr"  v-if="key=='attr'" v-for="vv in val" :value = "vv">{{vv}}</span>
      </div>


      <!--一条规则完-->
      </span>


    <button @click="addNewRule" class="botcircle" style="margin-left: 100px">＋</button>
    <button @click="delNewRule" class="botcircle" >－</button>
    <!--&times;-->
  </div>
</template>
<style>
.botcircle{
  display: inline;
  height: 20px;
  width: 20px;
  background-color: rgba(9, 9, 9, 0.17);
  border-radius: 50%;
}
</style>
<script>
  import "./ruleColor.css"
  export default {
    name: 'ruleTable',
  data(){
    return{
      rule:[{
        subject:'当前类目',
        op:'need',
        object:{ob:'申请准入',attr:[]}
      },{
        subject:'当前类目',
        op:'use',
        object:{choose:['时效卡','次卡','普通卡'],attr:[]}
      },
        {
          subject:'交易方式 ',
          op:'use',
          object:{ob:'自动打款',attr:["T+N日内"]},

        },
        {
          subject:'售后方式 ',
          op:'use',
          object:{choose:["售中退款","售后退款"],attr:[]},

        },
        {
          subject:'码商类型 ',
          op:'use',
          object:{choose:["平台","ISA提供"],attr:[]},
        },
        {
          subject:'（平台码商）核销账号 ',
          op:'use',
          object:{ob:'子账号',attr:[]},
        },
        {
          subject:'（平台码商）核销 ',
          op:'use',
          object:{ob:'换码',attr:[]},
        },
        {
          subject:'核销授权类型 ',
          op:'use',
          object:{choose:["门店","账号","实名","码商","自助","无需"],attr:[]},
        },
        {
          subject:'核销校验 ',
          op:'use',
          object:{ob:'身份校验',attr:[]},
        },
        {
          subject:'(KA商家)短信尾部 ',
          op:'use',
          object:{ob:'自定义内容',attr:[]},
        },
        {
          subject:'ISV码商 ',
          op:'use',
          object:{ob:'分账',attr:[]},
        },
        {
          subject:'（ISV码商）订单金额 ',
          op:'openTo',
          object:{ob:'码商',attr:[]},
        },
        {
          subject:'码超时 ',
          op:'use',
          object:{ob:'自动退',attr:[]},
        },
        {
          subject:'过期超时退 ',
          op:'use',
          object:{ob:'百分比',attr:[]},
        },
        {
          subject:'超时退 ',
          op:'use',
          object:{ob:'百分比',attr:[]},
        },
        {
          subject:'供货来源 ',
          op:'use',
          object:{choose:["商家","供货商"],attr:[]},
        },
        {
          subject:'商家供货 ',
          op:'use',
          object:{ob:"码池",choose:["平台码商","外部码商"],attr:[]},
        },
        // {
        //   subject:'供货商 ',
        //   op:'use',
        //   object:{attr:["分账规则","库存策略","码商提供者"]},
        // },
        // {
        //   subject:'门店 ',
        //   op:'use',
        //   object:{attr:["门店核销","门店数据"]},
        // },
        // {
        //   subject:'商品 ',
        //   op:'use',
        //   object:{attr:["身份校验"]},
        // },
        // {
        //   subject:'凭证有效期 ',
        //   op:'use',
        //   object:{choose:["固定时间","付款后N天","截止日"]},
        // },
        // {
        //   subject:'码 ',
        //   op:'has',
        //   object:{attr:["发码时间","一码多刷","有效期"]},
        // },
        // {
        //   subject:'商品下单 ',
        //   op:'set',
        //   object:{attr:["系统发货","生成交付单","发码商","核销码商","凭证有效期"]},
        // },
        // {
        //   subject:'系统发货 ',
        //   op:'set',
        //   object:{attr:["发送短信、二维码给用户","根据预约联系门店","生成数据报表给商家"]},
        // },
        // {
        //   subject:'发码超时未发货 ',
        //   op:'use',
        //   object:{attr:["创建退款"]},
        // },
        // {
        //   subject:'过期超时 ',
        //   op:'set',
        //   object:{ob:"系统作废凭证",choose:['打款','退款'],attr:['同步订单、卡券包、码商']},
        // },
        // {
        //   subject:'核销超时 ',
        //   op:'set',
        //   object:{ob:"超时时间"},
        // },{
        //   subject:'资金结算 ',
        //   op:'set',
        //   object:{ob:"分账金额",attr:['核销换码']},
        // },{
        //   subject:'退款 ',
        //   op:'set',
        //   object:{attr:['退款比例','卖家拒绝',"退款最大金额",'延迟打款','作废凭证']}
        // },

      ]
    }},
    methods:{
//    addAttr:function (obj) {
//
//      if(!obj.object.attr){
//        obj.object.attr=[]
//      }
//
//    },
    addNewChange:function (obj) {
      obj.object.attr.push("实体属性")
    },
      delNewChange:function (obj) {
      obj.object.attr.pop()
    },
      addNewRule:function () {
      this.rule.push({
        subject:'实体(双击可修改)',
        op:"操作符",
        object:{ob:"实体属性"}

      })},
      delNewRule:function (){
      this.rule.pop()
      }

    },

  }

</script>
