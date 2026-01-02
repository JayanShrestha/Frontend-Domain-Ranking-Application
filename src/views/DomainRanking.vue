<template>
  <div class="page">
    <h1>Domain Ranking Viewer</h1>

    <form @submit.prevent="onSubmit" class="form">
      <input
        v-model="input"
        @input="formatAndValidate"
        type="text"
        placeholder="google.com or google.com,facebook.com"
        required
      />
      <p v-if="!isValidDomain && input">❌ Invalid domain name</p>
      <button :disabled="loading || !isValidDomain">
        {{ loading ? 'Loading...' : 'Fetch Rankings' }}
      </button>
    </form>

    <p v-if="error" class="error">{{"Type domain correctly and check again" }}</p>

   
  </div>
  <div class="chart">
    
<DomainRankingChart v-if="results.length" :results="results"/>
  
  </div>
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

const multiDomainRegex =
  /^((?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6})(, (?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6})*$/;
function formatAndValidate() {
  const cleaned = input.value
    .split(',')                // split ONLY on commas
    .map(d => d.trim())        // trim spaces around each domain
    .filter(Boolean)           // remove empty entries
    .join(', ');               // enforce ", " format

  isValidDomain.value = multiDomainRegex.test(cleaned);
}


function formatDate(date) {
  return new Date(date).toLocaleDateString();
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
  font-family: system-ui;
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