<template>
  <div class="mx-auto  px-4 border-b bg-gradient-to-r from-[#8c52ff] to-[#ff914d] shadow-sm">
    <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-left flex-col">
      <h1 class="text-3xl font-bold text-gray-100 pt-5 drop-shadow-md">Domain Ranking Viewer</h1>
    <p class="text-md font-semibold text-gray-50 pb-5 drop-shadow-md">Ranking of domain over time</p>
    </div>
    
    </div>
    <div class="mx-auto max-w-6xl px-4 py-6 space-y-6 mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <form @submit.prevent="onSubmit" class="form flex-col sm:flex-row">
         <div
         class="flex items-center flex-wrap gap-2 border rounded-lg p-2 w-full cursor-text"
    @click="focusInput"
>
      <div
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center gap-2 px-3 py-3 rounded-lg bg-slate-200 text-black text-sm font-medium"
      >
        {{ item }}

        <!-- Close icon -->
        <span
          @click.stop="removeItem(index)"
          class="w-4 h-4 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 cursor-pointer"
        >
          ×
        </span>
      </div>
       <input 
        class="border-2 rounded-2xl outline-none focus:border-slate-400 overflow-x-auto whitespace-nowrap w-full"
        v-model="input"
        @input="formatAndValidate"
        type="text"
        :placeholder="showPlaceholder?'Enter domain names like google.com or google.com,facebook.com' : ''" 
        required
      />
    </div>
     
      <p v-if="!isValidDomain && input"><button class="text-black border-2 bg-amber-200 rounded-3xl hover:px-6 hover:py-3  duration-300 cursor-pointer" :disabled="!isValidDomain">❌ Invalid domain name</button></p>
      <button v-if="!input || isValidDomain" class="border bg-gradient-to-r from-[#8c52ff] to-[#ff914d] text-gray-50 rounded-3xl font-sans font-semibold cursor-pointer " :disabled="loading || !isValidDomain" >
       <span class="drop-shadow-md">{{ loading ? 'Loading...' : 'Fetch Rankings' }}</span> 
      </button>
      <button @click="input=''" type="button" class="border bg-[#ff914d] text-white rounded-3xl font-sans font-semibold cursor-pointer drop-shadow-sm" ><span class="drop-shadow-md">Clear</span></button>
    </form>
    </div>
    <p v-if="error" class="error max-w-6xl mx-auto my-5">{{"Type domain correctly and check again" }}</p>

   
    <!-- Spinner -->
      <div v-if="loading" class="absolute inset-0 backdrop-blur-sm bg-white/40 z-20 flex flex-col justify-center items-center">
        <div class="flex border border-slate-500 border-opacity-40 shadow-sm bg-slate-200 p-3">
          <div class="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
        <p class="text-center text-slate-500 mt-4 text-sm pl-2">Fetching Domain Rankings...</p>
        </div>
        
      </div>

      
    <div v-if="!results.length" class="border-2 my-6 mx-auto rounded-2xl max-w-6xl border-slate-200 shadow-sm bg-white px-5 py-5">
       <h2 class="text-md font-bold px-5 mb-5">Results</h2>
  
      <div class="flex justify-center items-center border-2  rounded-2xl border-slate-200 shadow-sm h-[60px] w-full px-5">
        <p class="text-lg text-slate-400">Enter the domain names and search to view them in chart</p>
      
</div>
</div>
<DomainRankingChart v-if="results.length" :results="results"/>

 
</template>

<script setup>
import { ref } from 'vue';
import {
  fetchsingledomain,
  fetchmultdomain,
} from '../api/rankingAPI.js';
import DomainRankingChart from '../components/DomainRankingChart.vue';

const input = ref('');
const loading = ref(false);
const error = ref('');
const results = ref([]);
const isValidDomain = ref(false);
const items = ref([]);
const showPlaceholder = ref(true);// added boolean value to show placeholder

const multiDomainRegex =
  /^((?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6})(, (?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6})*$/;
function formatAndValidate() {
  const cleaned = input.value
    .split(',')                // split ONLY on commas
    .map(d => d.trim())        // trim spaces around each domain
    .filter(Boolean)           // remove empty entries
    .join(', ');               // enforce ", " format

  isValidDomain.value = multiDomainRegex.test(cleaned);//checks whether the pattern exists
  const text = input.value;
  if(text.includes(',')){// initiates when the ',' is entered into the logic
  showPlaceholder.value = false;//placeholder is empty
checkComma(text);// initiates the funciton to change the input domain into button with close button
}
}
function checkComma(text){
 
    const names = text.split(',');
    const name = names[0].trim();// tankes in domain name
   

    if(name){
     items.value.push(name);
    }
    //reset the input to whatever comes after the comma
    input.value = text.split(',').slice(1).join(',').trim();
  }
function removeItem(index){// function to remove the input button from the field
items.value.splice(index,1);
showPlaceholder.value = true;

}


async function onSubmit() {
  error.value = '';
  results.value = [];
  loading.value = true;

  try {
    const domains = input.value.split(',').map(d => d.trim());//splits the strings into substrings and return them as array with white spaced removed

    if (domains.length === 1) {//if the domain is single domain input
      const data = await fetchsingledomain(domains[0]);
      results.value = [
        {
          domain: domains[0],//one domain name means only 1 array size
          cached: data.cached,
          count: data.count,
          records: data.records,
        },
      ];
    } else {
      const data = await fetchmultdomain(input.value);//backend does the array conversion so sending the raw data 
      results.value = data.results;
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to fetch rankings';
  } finally {
    loading.value = false;
  
  }


}

</script>

<style scoped>

.page {
  max-width: 900px;
  margin: 2rem auto;
 
}
.form {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
input {
  flex: 1;
  padding: 1.5rem;
  height: 1.5rem;
}
button {
  padding: 0.5rem 1rem;
}
.error {
  color: red;
}
.domain-block {
  margin-bottom: 2rem;
}

</style>