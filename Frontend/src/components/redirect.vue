<template>
 <div class="parent">
    <div class="load"></div>
 </div>
</template>

<script>
import Data from "../../default";
import axios from "axios";


const apiadress = Data.Api_Adress;
export default{
    name:"redirect",
    beforeMount(){
        this.shorturl = location.pathname.split("/link/")[1];
        
        axios.get(`${apiadress}link/${this.shorturl}`).then(res=>{
            
            if(res.data){
               location.href=res.data
            }else{
                location.href='/notfound'
            }
        })

    },
    data(){
        return{
            shorturl:null
        }
    }
    

}



</script>
<style scoped>
.parent {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0E131E;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
.load {
  width: 100px;
  height: 100px;
  margin: 110px auto 0;
  border: solid 10px #01442F;
  border-radius: 50%;
  border-right-color: transparent;
  border-bottom-color: transparent;
  -webkit-transition: all 0.5s ease-in;
  -webkit-animation-name: rotate;
  -webkit-animation-duration: 1.0s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  transition: all 0.5s ease-in;
  animation-name: rotate;
  animation-duration: 1.0s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
</style>