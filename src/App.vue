<template>
  <main id="main" class="h-full">
    <section class="container h-full" style="padding: 2rem inherit">
      <label for="numberOfUUID"><b>Number of UUIDs</b>
          <input :data-tooltip="numberOfUUID" type="range" min="1" max="10000" id="numberOfUUID" v-model="numberOfUUID">
          <input type="number" min="1" max="10000" step="1" id="numberOfUUID" v-model="numberOfUUID">
      </label>

      <br>

      <label for="uuids"><b>Output</b></label>
      <div style="position: relative;">
        <button class="outline btn" :data-tooltip="copyText" @click="copy">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
          <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
        </svg>
        </button>

        <pre class="min-h-full" >
          {{ cached }}
        </pre>
      </div>
      </section>
  </main>
</template>


<script setup lang="ts">
import {ref, watch} from 'vue'
import {useDebounceFn} from '@vueuse/core'
import {genUUIDsClient} from '@/utils/clientUUID'

const copyText = ref('copy')
const numberOfUUID = ref(5)
const cached = ref('')

const getUUIDs = useDebounceFn(() => genUUIDsClient(numberOfUUID.value),300)

        
const copy = () => {
  copyText.value = 'copied!'
  navigator.clipboard.writeText(cached.value)
  setTimeout(() => copyText.value = 'copy', 5000)
}

watch(numberOfUUID ,async () => { 
  let ids = await getUUIDs()
  cached.value = ids.join('\n')
}
,{deep: true})


getUUIDs().then((data) => cached.value = data.join('\n'))
</script>


<style scoped>
</style>
