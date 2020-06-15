<template>
    <div class="check-button" :class="{check: isChecked}">
        <img src="~assets/img/cart/choose.svg" alt="">

    </div>
</template>
<script>
export default {
    name : "CheckButton",
    props: {
        isChecked: {
            type: Boolean,
            default:false
        }
    }
}
</script>
<style scoped>
 .check-button{
    border-radius: 52%;
    width: 20px;
    /* border: 2px solid #aaa;  */
 }
  .check-button img{
     
    
     height: 20px;
     width: 20px;

 }
 .check{
     border-color: red;
     background-color: #f2270c;
 }
</style>