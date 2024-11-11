<script>
import Swal from "sweetalert2";
import axios from "axios";
import {useNotificationStore} from '@/state/pinia'
const nottification = useNotificationStore()

import ModalDetail from "./modalDetail.vue"; 



export default {
    name: "CardItem",
    props: ["cardItem"],
    components: {
        ModalDetail
    },
    data() {
        return {
          pagination:{
            current_page:1,
            next_page_url:null,
            prev_page_url:null,
            per_page:10,
            total:0,
            data:[]
          },

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
                url: `${process.env.VUE_APP_BACKEND_URL_API}jadwal?page=${page}`,
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            }
            axios(config).then((response)=>{
                let dataReponse = response.data.data;
                this.pagination = dataReponse
                console.log(this.pagination)
                Swal.close()
            }).catch((error)=>{
                console.log(error)
                Swal.fire(nottification.swalError)  
            })
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
        }
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
                            <BRow class="align-items-center">
                                <BCol cols="5">
                                    <div>
                                        <h5 class="mb-0">Report Mentoring</h5>
                                    </div>
                                </BCol>
                         
                            </BRow>
                            <hr class="mb-4" />
                            <BRow>
                                <BCol sm="6" v-for="card in pagination.data" :key="card.id">
                                    <BCard no-body class="p-1 border shadow-none">
                                        <div class="p-2">
                                            <h5>
                                                <router-link to="/blog/detail" class="text-dark">{{ card.materi.materi }}</router-link>
                                            </h5>
                                            <p class="text-muted mb-0">{{ card.Tanggal }}</p>
                                            <ul class="list-inline mt-1">
                                                <li class="list-inline-item me-3">
                                                    <BLink href="javascript:void(0);" class="text-muted">
                                                        <i class='bx bx-user'></i>
                                                        {{ card.user.name }}
                                                    </BLink>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="p-2">
                                            <strong>Materi:</strong>
                                            <p>{{ truncateText(card.materi.description) }}</p>
                                            <strong>To-Do Past:</strong> 
                                            <p>{{ truncateText(card.todo.todo) }}</p>
                                            <strong>To-Do Pre:</strong> 
                                            <p>{{ truncateText(card?.hasil?.todo?.todo)}}</p>
                                            <strong>Hasil:</strong> 
                                            <p>{{ truncateText(card?.hasil?.hasil) }}</p>
                                            <strong>Feedback:</strong>
                                            <p>{{truncateText(card?.hasil?.feedback )}}</p>
                                            <div>
                                                <BLink  class="text-primary" @click="showModalDetail(card)">
                                                  Read more <i class="mdi mdi-arrow-right"></i>
                                                </BLink>
                                            </div>
                                        </div>
                                    </BCard>
                                </BCol>
                            </BRow>
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

        <BModal 
        v-model="showModal" 
        size="lg" 
        scrollable title="Detail Mentoring" 
        header-class="border-0">
        <ModalDetail :item="selectedItem" /> 

        <template #footer>
            <BButton variant="danger" @click="showModalDetail = false">Close</BButton>
            <BButton @click="toedit('edit')" class="btn btn-primary" v-if="isEdit">Edit</BButton>
            <BButton @click="toedit('feedback')" class="btn btn-primary"  v-if="isFeedBack">Feed Back</BButton>
      
        </template>
    </BModal>
    </div>
</template>

