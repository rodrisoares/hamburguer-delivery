<template>
  <div>
    <div class="main-container">
      <h1>Monte o seu Hambúrguer:</h1>
        <BurgerForm />
    </div>
  </div>
</template>

<script>

import BurgerForm from '../components/BurgerForm'

export default {
  name: 'fazerPedidos',
  components: {
    BurgerForm
  }
}
</script>