<script>
import Swal from "sweetalert2";
import axios from "axios";
import {useNotificationStore} from '@/state/pinia'
import draggable from "vuedraggable";
const nottification = useNotificationStore()

import ModalDetail from "./modalDetail.vue"; 



export default {
    name: "CardItem",
    props: ["cardItem"],
    components: {
        ModalDetail,
        draggable
    },
    data() {
        return {
          pagination:{
            current_page:1,
            next_page_url:null,
            prev_page_url:null,
            per_page:10,
            total:0,
            data:[],
          },

        falseData: [],
        trueData: [],

        showModal: false,
        selectedItem: null,

        };
    },
    mounted(){
       this.getData()
    },
    methods:{
        getData(page = 1){
            Swal.fire(nottification.swalLoading)
            let config = {
                method: "get",
                url: `${process.env.VUE_APP_BACKEND_URL_API}mente/dashboard?page=${page}`,
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            }
            axios(config).then((response)=>{
                let dataReponse = response.data.data;
                this.pagination = dataReponse
                this.updateData()
                Swal.close()
            }).catch((error)=>{
                console.log(error)
                Swal.fire(nottification.swalError)  
            })
        },
        async updateStatus() {
            try {
                Swal.fire(nottification.swalLoading);
                
                let config = {
                    method: "put",
                    url: process.env.VUE_APP_BACKEND_URL_API + 'mente/drag',
                    headers: {
                        Accept: "application/json",
                        Authorization: "Bearer " + localStorage.getItem("accessToken")
                    },
                    data: {
                        trueData: this.trueData,
                        falseData: this.falseData
                    }
                };

                const response = await axios(config);
                const dataResponse = response.data.meta.status;

                if (dataResponse === 'success') {
                    await Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Data berhasil diupdate',
                    });
                    // Panggil getData setelah SweetAlert ditampilkan
                    this.getData();
                } else {
                    Swal.fire(nottification.swalAlertDefaultUpdateError);
                }
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! ' + (error.response?.data?.message || "Unknown error"),
                });
            }
        },
        updateData() { 
                this.falseData = this.pagination.data.filter(item => item.status === false);
                this.trueData = this.pagination.data.filter(item => item.status === true);
                console.log("false data"+this.falseData)
                console.log("true data"+this.trueData)

        },
        truncateText(text){
            return text ? (text.length > 20 ? text.substring(0, 20) + "..." : text) : "-";
        },
        openModal(itemId){
            this.selectedItem = this.tabledata.find((item) => item.id === itemId);
            this.showModal = true;
        },
        showModalDetail(item){
            this.selectedItem = item
            this.showModal = true
        },
        toedit(modes){
            this.$router.push({
                name: 'mentorring-edit', 
                params: {id: this.selectedItem.id, mode: modes}
            })
        },
        onDragEnd(){
            this.falseData.objex.forEach(item => (item.status =false));
            this.trueData.array.forEach(item => (item.status =true));
        },
       
    },
    computed:{
        activeRole(){
            const role = localStorage.getItem('activeRole')
            return role ? JSON.parse(role) : null
       
        },
        isEdit(){
            return this.activeRole.role_id == 1 || this.activeRole.role_id == 3
        },
        isFeedBack(){
            return this.activeRole.role_id == 2
        }
    }
};
</script>
<template>
    <div>
        <BCard no-body>
            <div class="mt-4">
                <BRow class="justify-content-center">
                    <BCol xl="10">
                        <div>
                            <BRow class="align-items-center mb-3">
                                <BCol cols="5">
                                    <h5 class="mb-0">Report Mentoring</h5>
                                </BCol>
                                <BCol cols="7" class="text-end">
                                    <BButton @click="updateStatus" class="btn btn-success">simpan</BButton>
                                </BCol>
                            </BRow>

                            <BContainer fluid>
                                <BRow>
                                    <!-- Kolom Kiri untuk trueData -->
                                    <BCol cols="12" md="6">
                                        <BCard class="p-1 border">
                                            <BCardHeader>
                                                <h5 class="mb-0">Sudah Terlaksana</h5>
                                            </BCardHeader>
                                            <BRow class="g-3" style="min-height: 50vh;">
                                                <draggable  v-model="trueData" group="cards" @end="onDragEnd">
                                                    <template #item="{ element: card }" >
                                                        <BCol>
                                                            <BCard class="p-2 border mt-2" style="background-color:#DB0062; color: aliceblue; border-radius: 20px;">
                                                                <div class="p-2">
                                                                    <h5>
                                                                        {{ card.materi.materi }}
                                                                    </h5>
                                                                    <p class="text-muted mb-0">{{ card.Tanggal }}</p>
                                                                        <i class='bx bx-user'></i>
                                                                        {{ card.user.name }}
                                                                </div>
                                                                <div class="p-2">
                                                                    <strong>Materi:</strong>
                                                                    <p>{{ truncateText(card.materi.description) }}</p>
                                                                    <strong>Jam Mentoring</strong>
                                                                    <p>{{  card.jam_mentoring }}</p>
                                                                    <strong>Tanggal Mentoring</strong>
                                                                    <p>{{ card.tanggal_mentoring }}</p>
                                                                    <div>
                                                                        <BLink @click="showModalDetail(card)" style="color: aliceblue;" onmouseover="this.style.color='#55DB4D'" onmouseout="this.style.color='aliceblue'">
                                                                            Read more <i class="mdi mdi-arrow-right"></i>
                                                                        </BLink>
                                                                    </div>
                                                                </div>
                                                            </BCard>
                                                        </BCol>
                                                    </template>
                                                    <template #empty>
                                                        <BCol>
                                                            <p class="text-center">Drop items here....</p>
                                                        </BCol>
                                                    </template>
                                                </draggable>
                                            </BRow>
                                        </BCard>
                                    </BCol>

                                    <BCol cols="12" md="6" >
                                        <BCard class="p-1 border">
                                            <BCardHeader>
                                                <h5 class="mb-0">Belum Terlaksana</h5>
                                            </BCardHeader>
                                            <BRow class="g-3" style="min-height: 50vh;">
                                                <draggable  v-model="falseData" group="cards" @end="onDragEnd">
                                                    <template #item="{ element: card }" >
                                                        <BCol>
                                                            <BCard class="p-2 border mt-2" style="background-color: #27318c; color: aliceblue; border-radius: 20px;">
                                                                <div class="p-2">
                                                                    <h5>
                                                                        {{ card.materi.materi }}
                                                                    </h5>
                                                                    <p class="text-muted mb-0">{{ card.Tanggal }}</p>
                                                                    <ul class="list-inline mt-1">
                                                                        <li class="list-inline-item me-3">
                                                                            <i class='bx bx-user'></i>
                                                                            {{ card.user.name }}
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div class="p-2">
                                                                    <strong>Materi:</strong>
                                                                    <p>{{ truncateText(card.materi.description) }}</p>
                                                                    <strong>Hasil Mentoring</strong>
                                                                    <p>{{ truncateText(card.hasil?.hasil) }}</p>
                                                                    <strong>Feedback</strong>
                                                                    <p>{{ truncateText(card.hasil?.feedback) }}</p>
                                                                    <div>
                                                                        <BLink  @click="showModalDetail(card)" style="color: aliceblue;" onmouseover="this.style.color='#DB820A'" onmouseout="this.style.color='aliceblue'">
                                                                            Read more <i class="mdi mdi-arrow-right"></i>
                                                                        </BLink>
                                                                    </div>
                                                                </div>
                                                            </BCard>
                                                        </BCol>
                                                    </template>
                                                    <template #empty>
                                                        <BCol>
                                                            <p class="text-center">Drop items here....</p>
                                                        </BCol>
                                                    </template>
                                                </draggable>
                                            </BRow>
                                        </BCard>
                                    </BCol>
                                </BRow>
                                </BContainer>

                            <hr class="my-4" />
                            <div class="text-center">
                                <button 
                                    @click="getData(pagination.current_page - 1)"
                                    :disabled="!pagination.prev_page_url"
                                >
                                    &lt;
                                </button>

                                <span> Page {{ pagination.current_page }} of {{ Math.ceil(pagination.total / pagination.per_page) }} </span>

                                <button 
                                    @click="getData(pagination.current_page + 1)"
                                    :disabled="!pagination.next_page_url"
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>
                    </BCol>
                </BRow>
            </div>
        </BCard>

        <!-- Modal for Detail -->
        <BModal 
            v-model="showModal" 
            size="lg" 
            scrollable title="Detail Mentoring" 
            header-class="border-0"
        >
            <ModalDetail :item="selectedItem" /> 
            <template #footer>
                <BButton variant="danger" @click="showModal = false">Close</BButton>
                <BButton @click="toedit('edit')" class="btn btn-primary" v-if="isEdit">Edit</BButton>
                <BButton @click="toedit('feedback')" class="btn btn-primary"  v-if="isFeedBack">Feed Back</BButton>
            </template>
        </BModal>
    </div>
</template>



