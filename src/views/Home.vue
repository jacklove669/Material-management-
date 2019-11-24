<template>
  <div class="q-warp" style="width: 100%;height: 90px !important; background-color: black;text-align: center;line-height: 90px;">
    <qheader></qheader>

    <topindex></topindex>
  </div>
</template>

<script>
// @ is an alias to /src
import qheader from '@/components/qheader.vue'
import topindex from '@/components/topindex.vue'


export default {
  name: 'home',
  components: {
    qheader,
    topindex
    
  }
}
</script>
