<script>

  import api from '@/services/api'
  import moment from 'moment'

  export default {
    name: "OrderList",
    components: {

    },
    data(){
      return{
        orders: []
      }
    },
    async created(){
      this.orders = await this.getOrders()
    },
    methods: {
      async getOrders(){
        return (await api.get('/orders')).data.data
      },
      formatMoney(value){
        return value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
      },
      formatDate(date){
        return moment(date).format('DD/MM/YYYY')
      }
    }
  }

</script>

<template>

  <button class="btn btn-dark" @click="$router.push({name: 'order_create'})">Adicionar</button>
  
  <table class="table">
    <thead>
      <tr>
        <th class="col">Identificador</th>
        <th class="col">Código</th>
        <th class="col">Data</th>
        <th class="col">Valor sem desconto</th>
        <th class="col">Valor com desconto</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(order, index) in orders" :key="index">
        <th scope="row">{{order.OrderId}}</th>
        <td>{{order.OrderCode}}</td>
        <td>{{formatDate(order.OrderDate)}}</td>
        <td>{{formatMoney(order.TotalAmountWithoutDiscount)}}</td>
        <td>{{formatMoney(order.TotalAmountWithDiscount)}}</td>
      </tr>
    </tbody>
  </table>

</template>

<style scoped>
button{
  float: right;
}
</style>
