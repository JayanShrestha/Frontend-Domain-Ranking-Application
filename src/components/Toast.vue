<template>
          <div v-if="visible"
      class="absolute inset-0 bg-black/40 backdrop-blur-sm z-50"
      @click="close"
    ></div>
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-x-6"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-6"
    >   
    <div v-if="visible" class="absolute w-fit text-white top-48 flex justify-center z-50">

<span class=" bg-gradient-to-r from-[#8c52ff] to-[#ff914d] flex w-3/6 py-4 px-4 rounded-md">  <p class="font-bold" >{{ message }}</p>
<button @click="close" class=" text-white font-bold px-2 mb-16 border-slate-200 text-xl hover:scale-125">X</button></span>
 
      </div>
      </transition>
    </template>

 <script setup>
    import {ref} from  "vue";
    const props = defineProps({
        message:{type:String, required:true}
    });
    const visible = ref(true);
    function close(){
        visible.value = false;
    }
</script>