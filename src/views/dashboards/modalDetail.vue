<script>


export default {
  props: ["item"], 
  mounted() {
    this.item
    console.log(this.item)
  },
  
};
</script>

<template>
  <div v-if="item">
   <BRow>
    <BCol cols="12" class="mb-4">
      <h4> {{ item.materi.description }} </h4>
      <h6>{{ item.user.name }}</h6>
    </BCol>
    <BCol cols="6">
      <p><strong>Tanggal: </strong>
      {{ item.tanggal_mentoring }}</p>
    </BCol>
    <BCol cols="6">
      <p><strong>Jam:  </strong>
      {{ item.jam_mentoring }}</p>
    </BCol>
    <BCol cols="12">
     <strong>Materi</strong>
      <p>{{ item.materi.materi }}</p>
    </BCol>
    <BCol cols="12">
      <strong>To-Do Past:</strong>
      <p>{{ item.todo.todo || "-" }}</p>
    </BCol>
    <BCol cols="12">
      <strong>To-Do Pre:</strong>
      <p>{{ item?.hasil?.todo?.todo || "-" }}</p>
    </BCol>
    <BCol cols="12">
      <strong>Hasil:</strong>
      <p>{{ item?.hasil?.hasil || "-" }}</p>
    </BCol>
    <BCol cols="12">
      <strong>Feedback:</strong>
      <p>{{ item?.hasil?.feedback || "-"}}</p>
    </BCol>
   </BRow>
  </div>
</template>

