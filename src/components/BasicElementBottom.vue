<template>
  <div class="basic-element-bottom-container">
    <v-icon class="basic-element-icon">{{icon}}</v-icon>
    <span>
      {{text}}
    </span>
  </div>
</template>

<script>
export default {
  name: "BasicElementBottom",
  props: {
    text: {
      type: String,
      default: String
    },
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.basic-element-bottom-container{
  display: flex;
  width: 100%;
  align-content: center;
  justify-self: center;
  cursor: pointer;
}
.basic-element-bottom-container:hover {
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.2);
}
span {
  padding-left: 14px;
  padding-bottom: 14px;
  padding-top: 14px;
  font-size: 16px;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
.basic-element-icon {
  align-self: center;
  width: 22px;
  height: 22px;
  padding-left: 24px;
  padding-right: 14px;
}
</style>