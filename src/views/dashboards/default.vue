<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import cardItem from "./cardItem.vue";
import ModalDetail from "./modalDetail.vue";
import Profile from "@/components/widgets/profile";
import Stat from "@/components/widgets/stat";
import { dataMentoring } from "../mentoring/data";

/**
 * Dashboard Component
 */
export default {
  components: {
    Layout,
    PageHeader,
    Profile,
    Stat,
    cardItem,
    ModalDetail,

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
      timeout: 3000, //ms
      fetchingStats: true,
      selectedItem: null,

    };
  },
  mounted() {},
  methods: {
    openModal(itemId) {
      this.selectedItem = this.tabledata.find((item) => item.id === itemId);
      this.showModal = true;
    },
    toedit() {
      const idAsString = this.selectedItem.id.toString();
      this.$router.push({ name: 'mentorring-edit', params: { id: idAsString } });
    },
  },
};
</script>

<template>
  <Layout>
    <PageHeader title="Main" pageTitle="Dashboards" />
    <BRow>
      <BCol xl="4">
        <Profile :updating="fetchingStats" />
        <BCol v-for="stat of statData" :key="stat.icon">
          <Stat :icon="stat.icon" :title="stat.title" :value="stat.value" />
        </BCol>
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

    <BModal 
      v-model="showModal" 
      size="lg" 
      scrollable title="Detail Mentoring" 
      header-class="border-0">
      <ModalDetail :item="selectedItem" /> 

      <template #footer>
        <BButton variant="danger" @click="showModal = false">Close</BButton>
        <BButton @click="toedit()" class="btn btn-primary" >Edit</BButton>
      </template>
    </BModal>

  </Layout>
</template>
