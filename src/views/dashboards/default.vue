<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import cardItem from "./cardItem.vue";
import Swal from "sweetalert2";

import Profile from "@/components/widgets/profile";
import { dataMentoring } from "../mentoring/data";

import { useNotificationStore } from '@/state/pinia'
import axios from "axios";
const notification = useNotificationStore()

/**
 * Dashboard Component
 */
export default {
  computed:{
    activeRole(){
       const role = localStorage.getItem('activeRole')
       return role ? JSON.parse(role) : null
       
    },

  },
  components: {
    Layout,
    PageHeader,
    Profile,
    cardItem,
 

  },
  data() {
    return {
      statData: [
        {
          icon: "bx bx-calendar",
          title: "Terjadwal",
          value: "1,235",
        },
        {
          icon: "bx bxs-calendar-check",
          title: "Terlaksana",
          value: "$35, 723",
        },
  
      ],
      tabledata:dataMentoring,
      showModal: false,
      isLoading: false,
      fullPage: true,
      canCancel: false,
      useSlot: false,
      loader: "spinner",
      color: "#007bff",
      bgColor: "#ffffff",
      height: 128,
      width: 128,
      timeout: 3000,
      fetchingStats: true,
      selectedItem: null,
      mentoring_bulan:[],
    }
  },

  mounted() {
    this.getNotifikasi();
    this.getBulan();
  },
  methods: {
    openModal(itemId) {
      this.selectedItem = this.tabledata.find((item) => item.id === itemId);
      this.showModal = true;
    },
    toedit() {
      const idAsString = this.selectedItem.id.toString();
      this.$router.push({ name: 'mentorring-edit', params: { id: idAsString } });
    },
   getNotifikasi(){
    Swal.fire(notification.swalLoading);
        let config = {
          method: "get",
          url: process.env.VUE_APP_BACKEND_URL_API + 'mente/notifikasi',
          headers: {
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("accessToken")
          }
        }

        axios(config).then((response)=>{
          let dataResponse = response.data;
          if(dataResponse.meta.status === "success" && dataResponse.data.length > 0){
              let listJadwal = dataResponse.data.map((jadwal) => {
                return `${jadwal.user.name} - ${jadwal.jam_mentoring}`;
              }).join("");
          Swal.fire({
                icon: 'info',
                title: 'Mentoring dalam waktu dekat',
                html: `<ul>${listJadwal}</ul>`, // Menampilkan daftar kegiatan dalam bentuk list
                confirmButtonText: 'OK'
        })
      }else{
        console.log(dataResponse)
      }
      }
   )},
   getBulan(){
    let config ={
      method: "get",
      url: process.env.VUE_APP_BACKEND_URL_API + 'mente/bulan',
      headers:{
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem('accessToken')
      }
    }

    axios (config).then((response)=>{
        this.mentoring_bulan = response.data.data
      console.log(this.mentoring_bulan)
    }).catch((error)=>{
      console.error("mentoring Blan",error)
    })
   },
   getProgerss(jumlahJadwal){
    return (jumlahJadwal/2) *100
   },


  }}

</script>

<template>
  <Layout>
    <PageHeader title="Main" pageTitle="Dashboards" />
    <BRow>
      <BCol xl="4">
        <Profile :updating="fetchingStats" />
        <Bcol>
          <div v-for="(mentoring, index) in mentoring_bulan" :key="index">
              <BCard>
                <h5>Progress Mentoring Bulan ini</h5>
              {{ mentoring.nama_user }}
              <BProgress
              :value="getProgerss(mentoring.jumlah_jadwal)"
              />
              </BCard>
          </div>
        </Bcol>
      </BCol>
      
      <BCol xl="8">
        <BRow>
          <cardItem 
            :cardItem="tabledata" 
            @showModal="openModal" 
          />
        </BRow>
      </BCol>
    </BRow>

  </Layout>
</template>
