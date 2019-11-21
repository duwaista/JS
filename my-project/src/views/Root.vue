<template>
  <div>
    <div class="SignIn">
    <router-link to="/in" tag="v-btn">Войти</router-link>
    </div>
    <div class="SignUp">
        <router-link to="/up" tag="v-btn">Регистрация</router-link>
    </div>
    <div class="btn-1">
      
    </div>
  </div>
</template>
<script>
  export default {}
</script>
<style lang="scss">
.btn-1{
  padding: 1em 3em;
  border: 3px solid $primaryColor;
  transition: all 300ms ease;
  box-shadow: 0px 4px 10px 2px rgba(black, 0.2);
  
 
  &:before{
    position: absolute;
    content: '';
    width: 0%; height: 100%;
    background: $primaryColor;
    top: 0; left: 50%;
    z-index: -1;
    transition: all 0ms ease;
  }
  
  &:hover{
    color: white; 
    box-shadow:none;
    &:before{
      position: absolute;
      content: '';
      width: 100%; height: 100%;
      background: $primaryColor;
      top: 0; left: 0%;
      z-index: -1;
      transition: all 300ms ease;
    }
  }
}
</style>