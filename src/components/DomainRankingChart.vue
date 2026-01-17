<template>
  <div class="border-2 my-6 mx-auto rounded-2xl max-w-6xl border-slate-200 shadow-sm bg-white px-5">
    
    <div class="flex justify-center items-center w-full h-[400px] sm:h-[500px]">

   
      <!-- Chart -->
   
        <Line :data="chartData" :options="chartOptions" />
      

    </div>
  <DomainRankingRank :results="results"/>
  </div>
</template>


<script setup>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import DomainRankingRank from './DomainRankingRank.vue';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
);

const props = defineProps({
  results: Array, // array of domain ranking results
});
const results = props.results;
const chartData = {
  labels: props.results[0]?.records.map(r => r.checkedAt).sort(), // assumes all domains share same dates
  datasets: props.results.map((item, index) => ({
    label: item.domain,
    data: item.records.sort((a,b)=>new Date(a.checkedAt)-new Date(b.checkedAt)).map(r => r.rank),
    borderColor: `hsl(${index * 90}, 70%, 50%)`,
    fill: false,
  })),
};

const chartOptions = {
  animation:{
    duration: 1000,
    easing: 'easeOutQuart',// animation for dropping the chart
  },
  responsive: true,
  maintainAspectRatio: false,
  interaction:{
    mode: 'index',
    intersect: false,
  },
  plugins: {
   tooltip: {
  callbacks: {
    title: (context) => {
      const rawDate = context[0].label
      return new Date(rawDate).toISOString().split('T')[0]
    },

    label: (context) => {
      const domain = context.dataset.label
      const rank = context.raw
      return `${domain}: ${rank}`
    }
  }
},
    legend:{
      display:true,
    },
    
    title: {
      display: true,
      text: 'Domain Rankings Over Time',
    },
  },
  elements: {
    point: {
      radius: 6,
      hoverRadius: 9,
      hitRadius: 20,
      // Use dataset borderColor for point color
    backgroundColor: (ctx) => ctx.dataset.borderColor,//chartjs passes context object to callbacks
    borderColor: (ctx) => ctx.dataset.borderColor,

      
    },
    line: {
      tension: 0.3,
      borderWidth: 2,
    },
  },
  scales: {
    y: {
      reverse: true, // rank 1 at top
      title: {
        display: true,
        text: 'Rank',
      },
      ticks:{
        maxTickLimit:6,
        autoSkip:true,// resize the column according to responsiveness
      }
    },
    x: {
      type: 'category',
      ticks:{
        
        maxTickLimit: 7,
        callback: function(value){
          const rawDate = this.getLabelForValue(value);
          return new Date(rawDate).toISOString().split('T')[0]; // YYYY/MM/DD
        },
        autoSkip: true,// resize the row according to responsiveness
        maxRotation: 45,
        minRotation: 45,
      },
      title: {
        display: true,
        text: 'Date',
      },
    },
  },
};
</script>