<template>
  <Line :data="chartData" :options="chartOptions" />
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
import ChartDataLabels from 'chartjs-plugin-datalabels';


ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels
);

const props = defineProps({
  results: Array, // array of domain ranking results
});

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
  responsive: true,
  interaction:{
    mode: 'nearest',
    intersect: false,
  },
  plugins: {
    tooltip:{
      enabled: true,
      callbacks:{
        title: (context) =>{
          const rawDate = context[0].label;
          return new Date(rawDate).toISOString().split('T')[0];
        },
        label: (context) => `${context.dataset.label}: ${context.raw}`,
      },
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
      radius: 0,
      hoverRadius: 6,
      hitRadius: 20,
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
    },
    x: {
      type: 'category',
      ticks:{
        callback: function(value, index, ticks){
          const rawDate = this.getLabelForValue(value);
          return new Date(rawDate).toISOString().split('T')[0]; // YYYY/MM/DD
        },
        autoSkip: false,
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