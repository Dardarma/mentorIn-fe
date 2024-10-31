<script>


export default {
  props: ["item"], 
  data(){
    return{
      todopast: "",
      todopre: "",
    }
  },
  mounted() {
  },
  methods:{

  }
};
</script>

<template>
  <div v-if="item">
   <BRow>
    <BCol cols="12" class="mb-4">
      <h4>{{ item?.materi?.materi }}</h4>
      <h6>{{ item?.user?.name }}</h6>
    </BCol>
    <BCol cols="6">
      <p><strong>Tanggal: </strong>
        {{ item?.tanggal_mentoring }}</p>
    </BCol>
    <BCol cols="6">
      <p><strong>Jam:  </strong>
      {{ item?.jam_mentoring }}</p>
    </BCol>
    <BCol cols="12">
     <strong>Materi</strong>
      <p>{{ item?.materi?.materi}}</p>
    </BCol>
    <BCol cols="12">
      <strong>To-Do Past:</strong>
      <div v-if="item?.hasil?.length > 0">
        <div v-for="hasilItem in item?.hasil" :key="hasilItem.id">
          <p>{{ hasilItem.todo_id }}</p>
        </div>
      </div>
      <div v-else>
        <p>Mentoring Belum dilaksanakan</p>
      </div>
    </BCol>
    <BCol cols="12">
      <strong>To-Do Pre:</strong>
      <p> {{ item?.todo?.todo }}</p>
    </BCol>
    <BCol cols="12">
      <strong>Hasil:</strong>
      <div v-if="item?.hasil?.length > 0">
        <div v-for="hasilItem in item?.hasil" :key="hasilItem.id">
          <p>{{ hasilItem.hasil }}</p>
        </div>
      </div>
      <div v-else>
        <p>Belum ada hasil</p>
      </div>
    </BCol>
    <BCol cols="12">
      <strong>Feedback:</strong>
      <div v-if="item?.hasil?.length > 0">
        <div v-for="hasilItem in item?.hasil" :key="hasilItem.id">
          <p>{{ hasilItem.feedback}}</p>
        </div>
      </div>
      <div v-else>
        <p>Belum ada feedback</p>
      </div>
    </BCol>
   </BRow>
  </div>
</template>

