<script>

  import api from '@/services/api'

  export default {
    name: "OrderCreate",
    components: {

    },
    data(){
      return{
        order: {},
        items_order: []
      }
    },
    async created(){

    },
    methods: {
      add(){
        this.items_order.push(this.order)
        this.order = {}
      },
      remove(index){
        this.items_order.splice(index, 1)
      },
      async save(){
        try{
          let order = (await api.post('/orders', {Order: this.items_order}))
          this.$router.push({name: 'order_list'})
        }
        catch($e){}
      },
      formatMoney(value){
        return value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
      }
    }
  }

</script>

<template>
  <div class="d-flex justify-content-center align-items-center div-form"> 
    <div class="row w-75">
      <div class="col-md-6 p-2 form-group">
        <label>Código</label>
        <input type="text" class="form-control" placeholder="Código do produto" v-model="order.ArticleCode">
      </div>
      <div class="col-md-6 p-2 form-group">
        <label>Nome</label>
        <input type="text" class="form-control" placeholder="Nome do produto" v-model="order.ArticleName">
      </div>
      <div class="col-md-4 p-2 form-group">
        <label>Quantidade</label>
        <input type="number" class="form-control" placeholder="Quantidade" v-model="order.Quantity">
      </div>
      <div class="col-md-4 p-2 form-group">
        <label>Preço da unidade</label>
        <input type="number" class="form-control" placeholder="Preço da unidade" v-model="order.UnitPrice">
      </div>
      <div class="col-md-4 p-2 d-flex justify-content-end align-items-end">
        <button class="btn btn-dark" @click="add">Adicionar</button>
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-center align-items-start div-items"> 
    <div class="row w-75 p-2">
      <div v-for="(item, index) in items_order" :key="index" class="col-md-6 p-4 card-width border rounded">
        <div class="row">
          <div class="col-md-3 p-2">
            <label class="item_info">Código: </label>
            <label>{{item.ArticleCode}}</label>
          </div>
          <div class="col-md-5 p-2">
            <label class="item_info">Nome: </label>
            <label>{{item.ArticleName}}</label>
          </div>
          <div class="col-md-4 p-2">
            <label class="item_info">Quantidade: </label>
            <label>{{item.Quantity}}</label>
          </div>
          <div class="col-md-6 p-2">
            <label class="item_info">Preço da Unidade: </label>
            <label>{{formatMoney(item.UnitPrice)}}</label>
          </div>
          <div class="col-md-6 p-2">
            <label class="item_info">Preço total: </label>
            <label>{{formatMoney(item.UnitPrice * item.Quantity)}}</label>
          </div>
          <div class="col-md-12 d-flex justify-content-end align-items-end">
            <button class="btn btn-danger btn-sm" @click="remove(index)">&times;</button>
          </div>
        </div>
      </div>
      
      <div v-if="items_order.length > 0" class="col-md-12 p-2 d-flex justify-content-end align-items-end">
        <button class="btn btn-success" @click="save">Salvar pedido</button>
      </div>
    </div>
  </div>

</template>

<style scoped>
label{
  float: left;
}
.div-form{
  height: 50vh;
}
.div-items{
  height: 50vh;
}
button{
  float: right;
}
.item_info{
  font-weight: bolder;
  margin-right: 5px;
}
.card-width{
  width: 48%;
  margin: 1%;
}
</style>
