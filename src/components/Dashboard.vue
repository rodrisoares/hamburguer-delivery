<template>
  <div>
       <Message :msg="msg" v-show="msg" />   
        
    </div>
  <div id="burger-table" v-if="burgers != ''">
    <div>
      <div id="burger-table-heading">
        <div class="order-id">N° Pedido:</div>
        <div>Cliente:</div>
        <div>Pão:</div>
        <div>Carne:</div>
        <div>Opcionais:</div>
        <div>Acompanhamentos:</div>
        <div >Status:</div>
      </div>
    </div>
    <div id="burger-table-rows">
      <div class="burger-table-row" v-for="burger in burgers" :key="burger.id">
        <div class="order-number">{{ burger.id }}</div>
        <div>{{ burger.nome }}</div>
        <div>{{ burger.pao }}</div>
        <div>{{ burger.carne }}</div>
        <div>
          <ul v-for="(opcional, index) in burger.opcionais" :key="index">
            <li>{{ opcional }}</li>
          </ul>
        </div>
         <div>
          <ul v-for="(acompanhamento, index) in burger.acompanhamentos" :key="index">
            <li>{{ acompanhamento }}</li>
          </ul>
        </div>
        <div  >
          <select name="status" class="status" @change="updateBurger($event, burger.id)" >
            <option :value="s.tipo" v-for="s in status" :key="s.id" :selected="burger.status == s.tipo">
              {{ s.tipo }}
            </option>
          </select>
          <button class="delete-btn" @click="deleteBurger(burger.id)">Deletar</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h2>Não há pedidos no momento!</h2>
  </div>
</template>
<script>
import Message from './Message.vue';

  export default {
    name: "Dashboard",
    data() {
      return {
        burgers: null,
        burger_id: null,
        status: [],
        msg: null
      }
    },
    components: {
        Message
    },
    methods: {

      //Função para pegar  os pedidos
      async getPedidos() {
        const req = await fetch('http://localhost:3000/burgers')
        const data = await req.json()
        this.burgers = data

        //Resgata os status dos pedidos
        this.getStatus()
      },

      //Função para pegar os status dos pedidos
      async getStatus() {
        const req = await fetch('http://localhost:3000/status')
        const data = await req.json()
        this.status = data
      }, 

      //Função para deletar os pedidos
      async deleteBurger(id) {
        const req = await fetch(`http://localhost:3000/burgers/${id}`, {
          method: "DELETE"
        });
       
        const res = await req.json()
        this.getPedidos()
        
        this.msg = `Pedido N°${id} deletado com sucesso!`
    
        // limpar msg
        setTimeout(() => this.msg = "", 2000)

        }, 
    
    
      //Função para atualizar os status dos pedidos
      async updateBurger(event, id) {
        const option = event.target.value;
        const dataJson = JSON.stringify({status: option});
        const req = await fetch(`http://localhost:3000/burgers/${id}`, {
          method: "PATCH",
          headers: { "Content-Type" : "application/json" },
          body: dataJson
        });

        const res = await req.json()
        console.log(res)
      }
    },
    mounted () {
    this.getPedidos()
    },
  }
</script>

<style scoped>
  #burger-table {
    max-width: 1200px;
    margin: 0 auto;
  }
  #burger-table-heading,
  #burger-table-rows,
  .burger-table-row {
    display: flex;
    flex-wrap: wrap;
  }
  #burger-table-heading {
    font-weight: bold;
    padding: 12px;
    margin-right: 20px;
    border-bottom: 5px solid #333;
  }
  .burger-table-row {
    width: 100%;
    padding: 12px;
    border-bottom: 1px solid #CCC;
 
  }
 
  .burger-table-row div, #burger-table-heading div  {
    width: 15%;
  }

  
   
  #burger-table-heading .order-id,
  .burger-table-row .order-number {
    width: 10%;
   
  }
  select {
    padding: 12px 6px;
    margin-right: 12px;
  }
  .delete-btn {
    background-color: #222;
    color:#fcba03;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    margin: 10px auto;
    cursor: pointer;
    transition: .5s;
    
  }
  
  .delete-btn:hover {
    background-color: transparent;
    color: #222;
  }

  .message-container {
    color: #721c24;
    background-color: #f8d7da;
    border: 2px solid #f5c6cb;
    border-radius: 5px;
    padding: 10px;
    max-width: 400px;
    margin: 30px auto;
  }

</style>