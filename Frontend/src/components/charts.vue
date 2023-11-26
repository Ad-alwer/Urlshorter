<template>
  <div id="parent">
    <div class="container">
      <h2 class="text-center pt-4 fs-1 text-white">Charts</h2>
      <div @click="back" class="d-flex gap-2 back-div pointer ">
        <Icon icon="ep:back" width="25" height="25" />
        <span  class="pointer">Back</span>
        
        
      </div>
      <div class="chartparent d-flex justify-content-center mt-4 w-100 mx-auto">
        <canvas id="linkschart" class="w-100" width="250"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import login from "./Login.vue";
import Data from "../../default";
import axios from "axios";
import { Icon } from "@iconify/vue";


const apiadress = Data.Api_Adress;
const jwt = login.methods.getcookies("jwt");

export default {
  name: "bar",
  components:{
Icon
  },

  beforeMount() {
    if (jwt) {
      this.fetchDatachart();
    } else {
      location.href = "/login";
    }
  },
  data() {
    return {
      data: [],
      label: [],
    };
  },
  methods: {
    fetchDatachart() {
      axios.get(`${apiadress}profile/chart/${jwt}`).then((res) => {
        const requests = res.data.map((e) => {
          return axios.get(`${apiadress}home/link/${e.id}`);
        });
        axios.all(requests).then((responses) => {
          responses.forEach((res) => {
            this.label.push(res.data.fulllink);
            this.data.push(res.data.view);
          });
          this.renderChartmonth();
        });
      });
    },
    renderChartmonth() {
      const ctx = document.getElementById("linkschart").getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: this.label,
          datasets: [
            {
              label: "Link",
              color: "white",
              data: this.data,
              borderWidth: 1,
              borderColor: "white",
              backgroundColor: "#114bc6",
              pointStyle: "circle",
              pointRadius: 10,
              pointHoverRadius: 15,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              display: false,
            },
            y: {
              grid: {
                color: "white",
              },
            },
           
          },
        },
      });
    },
    back:function(){
        location.href='/'
    }
    
  },
};
</script>

<style scoped> 
#parent {
  background-image: url("../assets/img/bakground.png");
  color: aliceblue;
  min-width: 100%;
  min-height: 100vh;
  background-size: 100% 100%;
}
.chartparent {
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
}

</style>
