<template>

    
        <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row" >
            <div v-for="result in results" :key="result.domain">
                <div class="card border-2 rounded-2xl max-w-xs mx-auto border-slate-200 shadow-sm my-6 ">
                    <h2 class="text-lg font-bold text-slate-600 text-center pt-4">
                        {{ result.domain }}
                    </h2>
                    <div class="flex flex-col items-center py-5">
                    <p class="text-sm text-slate-500">Latest Rank: <span class="text-sm font-semibold">{{ result.records.at(-1).rank }}</span> </p>
                     <p class="text-sm text-slate-500">Last Date Checked:</p> <span class="text-sm font-semibold">{{ new Date(result.records.at(-1).checkedAt).toLocaleString() }}
                     </span>
                    </div>
                    

                </div>

            </div>
        </div>
  
    </template>


    <script setup>
import { ref } from 'vue';

        const props = defineProps({
            results:{
                type: Array,
                required: true,
            }        
            
        });   
        function getMinRank(result){
             if (!result || !Array.isArray(result.records) || result.records.length === 0) {
    return null; // no records available
  }
const ranks = result.records.map(r => Number(r.rank)).filter(r => !isNaN(r));

  if (ranks.length === 0) {
    return null; // all ranks invalid
  }
return Math.min(ranks);
        }
    
        
    </script>