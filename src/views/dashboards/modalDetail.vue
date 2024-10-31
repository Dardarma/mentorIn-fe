<script>


export default {
  props: ["item"], 
  mounted() {
    this.item
  },
  
};
</script>

<template>
  <div v-if="item">
   <BRow>
    <BCol cols="12" class="mb-4">
      <h4>{{ item.title }}</h4>
      <h6>{{ item.user.name }}</h6>
    </BCol>
    <BCol cols="6">
      <p><strong>Tanggal: </strong>
      {{ item.Tanggal }}</p>
    </BCol>
    <BCol cols="6">
      <p><strong>Jam:  </strong>
      {{ item.jam }}</p>
    </BCol>
    <BCol cols="12">
     <strong>Materi</strong>
      <p>{{ item.materi.materi }}</p>
    </BCol>
    <BCol cols="12">
      <strong>To-Do Past:</strong>
      <p>{{ item.todopast }}</p>
    </BCol>
    <BCol cols="12">
      <strong>To-Do Pre:</strong>
      <p>{{ item.todopre }}</p>
    </BCol>
    <BCol cols="12">
      <strong>Hasil:</strong>
      <p>{{ item.Hasil }}</p>
    </BCol>
    <BCol cols="12">
      <strong>Feedback:</strong>
      <p>{{ item.feedback }}</p>
    </BCol>
   </BRow>
  </div>
</template>

