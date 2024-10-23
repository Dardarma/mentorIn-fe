<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import cardItem from "./cardItem.vue";
import ModalDetail from "./modalDetail.vue";

import Profile from "@/components/widgets/profile";
// import Earning from "@/components/widgets/earning";
import Stat from "@/components/widgets/stat";
// import ModalDashboard from "./mentorInDashboard/modalDashboard.vue";
// import Transaction from "@/components/widgets/transaction";
// import Emailsent from "@/components/widgets/emailsent";
// import SocialSource from "@/components/widgets/social-source";
// import Activity from "@/components/widgets/activity";
// import SellingProduct from "@/components/widgets/selling-product";

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
    // ModalDashboard
    // Transaction,
    // Earning,
    // Emailsent,
    // SocialSource,
    // Activity,
    // SellingProduct,
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
      // transactions: [
      //   {
      //     id: "#SK2540",
      //     name: "Neal Matthews",
      //     date: "07 Oct, 2019",
      //     total: "$400",
      //     status: "Paid",
      //     payment: ["fa-cc-mastercard", "Mastercard"],
      //     index: 1,
      //   },
      //   {
      //     id: "#SK2541",
      //     name: "Jamal Burnett",
      //     date: "07 Oct, 2019",
      //     total: "$380",
      //     status: "Chargeback",
      //     payment: ["fa-cc-visa", "Visa"],
      //     index: 2,
      //   },
      //   {
      //     id: "#SK2542",
      //     name: "Juan Mitchell",
      //     date: "06 Oct, 2019",
      //     total: "$384",
      //     status: "Paid",
      //     payment: ["fab fa-cc-paypal", "Paypal"],
      //     index: 3,
      //   },
      //   {
      //     id: "#SK2543",
      //     name: "Barry Dick",
      //     date: "05 Oct, 2019",
      //     total: "$412",
      //     status: "Paid",
      //     payment: ["fa-cc-mastercard", "Mastercard"],
      //     index: 4,
      //   },
      //   {
      //     id: "#SK2544",
      //     name: "Ronald Taylor",
      //     date: "04 Oct, 2019",
      //     total: "$404",
      //     status: "Refund",
      //     payment: ["fa-cc-visa", "Visa"],
      //     index: 5,
      //   },
      //   {
      //     id: "#SK2545",
      //     name: "Jacob Hunter",
      //     date: "04 Oct, 2019",
      //     total: "$392",
      //     status: "Paid",
      //     payment: ["fab fa-cc-paypal", "Paypal"],
      //     index: 6,
      //   },
      // ],
      cardItemData: {
        GridData1: [
            { title: "Mentoring 1", date: "2024-10-10", mentee: "Kiki", materi: "Description 1",todoPast:"Mancing", todoPre:"ngopi",hasil:"Iwak Bakar", feedback:"mangan"},
            { title: "Mentoring 2", date: "2024-10-11", mentee: "Kaka", materi: "Description 2",todoPast:"Mancing", todoPre:"ngopi",hasil:"Iwak Bakar", feedback:"mangan"},
        ],
        SearchData: ""
      },
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
      // earningStatus: true,
    };
  },
  mounted() {},
  methods: {
    openModal() {
      this.showModal = true; 
    }
  },
};
</script>

<template>
  <Layout>
    <PageHeader title="Main" pageTitle="Dashboards" />

    <BRow>
      <BCol xl="4">
        <Profile :updating="fetchingStats" />
        <BCol  v-for="stat of statData" :key="stat.icon">
            <Stat :icon="stat.icon" :title="stat.title" :value="stat.value" />
        </BCol>
       
      </BCol>
      
      <BCol xl="8">
        <BRow>
          <cardItem 
          :cardItem="cardItemData" 
          @dataCardItem="handleDataCardItem" 
          @showModal="openModal"
          />
        </BRow>
      </BCol>
    </BRow>

    <!-- <BRow>
      <BCol xl="4">
        <SocialSource :updating="fetchingStats" />
      </BCol>
      <BCol xl="4">
        <Activity :updating="fetchingStats" />
      </BCol>
      <BCol xl="4">
        <SellingProduct :updating="fetchingStats" />
      </BCol>
    </BRow> -->

    <!-- <BRow>
      <BCol lg="12">
        <BCard no-body>
          <BCardBody>
            <BCardTitle class="mb-4">Latest Transaction</BCardTitle>
            <Transaction :transactions="transactions" :updating="fetchingStats" />
          </BCardBody>
        </BCard>
      </BCol>
    </BRow> -->

    <BModal v-model="showModal" hide-footer centered header-class="border-0" @showModal="openModal">
      <ModalDetail />
    </BModal>
  </Layout>
</template>
