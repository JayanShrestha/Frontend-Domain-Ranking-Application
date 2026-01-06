<template>
  <div class="mx-auto  px-4 border-b bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-200 shadow-sm">
    <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-left flex-col">
      <h1 class="text-3xl font-bold text-slate-50 pt-5">Domain Ranking Viewer</h1>
    <p class="text-md text-slate-50 pb-5">Ranking of domain over time</p>
    </div>
    
    </div>
    <div class="mx-auto max-w-6xl px-4 py-6 space-y-6 mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ">
    <form @submit.prevent="onSubmit" class="form">
      <input
        class="border-2 rounded-2xl outline-none"
        v-model="input"
        @input="formatAndValidate"
        type="text"
        placeholder="google.com or google.com,facebook.com"
        required
      />
      <p v-if="!isValidDomain && input"><button class="text-black border-2 bg-amber-200 rounded-3xl hover:px-6 hover:py-3  duration-300 disabled" :disabled="!isValidDomain">❌ Invalid domain name</button></p>
      <button class="border bg-cyan-500 text-white rounded-3xl" :disabled="loading || !isValidDomain">
        {{ loading ? 'Loading...' : 'Fetch Rankings' }}
      </button>
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

<DomainRankingChart v-if="results.length" :results="results"/>
 
</template>

<script setup>
import { ref } from 'vue';
import {
  fetchsingledomain,
  fetchmultdomain,
} from '../api/rankingApi';
import DomainRankingChart from '../components/DomainRankingChart.vue';

const input = ref('');
const loading = ref(false);
const error = ref('');
const results = ref([]);
const isValidDomain = ref(false);

const multiDomainRegex =
  /^((?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6})(, (?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6})*$/;
function formatAndValidate() {
  const cleaned = input.value
    .split(',')                // split ONLY on commas
    .map(d => d.trim())        // trim spaces around each domain
    .filter(Boolean)           // remove empty entries
    .join(', ');               // enforce ", " format

  isValidDomain.value = multiDomainRegex.test(cleaned);//checks whether the pattern exists
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
  font-family: calibri;
}
.form {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
input {
  flex: 1;
  padding: 0.5rem;
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