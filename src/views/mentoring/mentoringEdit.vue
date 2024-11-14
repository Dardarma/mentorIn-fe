<script>
import Layout from "@/layouts/main";
import PageHeader from "@/components/page-header";
import axios from "axios";
import Swal from "sweetalert2";

import { useNotificationStore } from "@/state/pinia";
const notification = useNotificationStore();

export default {
    name: "MentoringEdit",
    components: {
        Layout,
        PageHeader
    },
    data() {
        return {
            optionsStatus: [
                { value: true, text: "Selesai" },
                { value: false, text: "Belum Selesai" }
            ],
            
           item: {
             tanggal_mentoring: "",
             jam_mentoring: "",
             user_id: "",
             todo: "",
             materi: "",
             deskripsi: "",
             hasil: "",
             feedback: "",
             todo_pst: "",
             status: false,
            },
            mode: this.$route.params.mode,
            user_name: "",
            menteeOptions: [],
            role : localStorage.getItem('activeRole.role_id')
        }
    },
    methods: {
        async updateJadwal() {
        try {
            Swal.fire(notification.swalLoading);

            let configUpdate = {
                method: "put",
                url: process.env.VUE_APP_BACKEND_URL_API + 'mente/update/' + this.$route.params.id,
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                },
                data: {
                    todo: this.item.todo,
                    materi: this.item.materi,
                    mentor_id: this.item.mentor_id,
                    tanggal_mentoring: this.item.tanggal_mentoring,
                    jam_mentoring: this.item.jam_mentoring,
                    user_id: this.item.user_id,
                    deskripsi: this.item.deskripsi,
                    hasil: this.item.hasil,
                    feedback: this.item.feedback,
                    todo_pst: this.item.todo_pst,
                    status: this.item.status,
                }
            };

            const responseUpdate = await axios(configUpdate);
            if (responseUpdate.data.meta.status === 'success') {
                Swal.fire(notification.swalAlertDefaultUpdateSuccess);
            } else {
                Swal.fire(notification.swalAlertDefaultUpdateError);
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire("Terjadi kesalahan", "Silakan coba lagi nanti", "error");
        }
    },
    getJadwal(){
        Swal.fire(notification.swalLoading);
        let config = {
            method: "get",
            url: process.env.VUE_APP_BACKEND_URL_API + 'mente/getid/' + this.$route.params.id,
            headers:{
                Accept:'aplication/json',
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        }

        axios(config).then((response)=>{
        const data = response.data
            if( data.meta.status === 'success'){
            this.item = {
                    tanggal_mentoring: data.data.tanggal_mentoring,
                    jam_mentoring: data.data.jam_mentoring,
                    user_id: data.data.user_id,
                    todo: data?.data?.todo?.todo,
                    materi: data?.data?.materi?.materi,
                    deskripsi: data?.data?.materi?.description,
                    hasil: data?.data?.hasil?.hasil,  
                    feedback: data?.data?.hasil?.feedback,
                    todo_pst: data?.data?.hasil?.todo?.todo,
                    status: data.data.status
            }
            this.user_name = data.data.user.name;
            Swal.close();
            console.log(this.item);
            }
            else{
                Swal.fire(notification.swalAlertDefaultError);
            }  
    });
    },
    getMentee() {
        let config = {
            method: 'get',
            url: process.env.VUE_APP_BACKEND_URL_API + 'mente/mente',
            headers: {
                Accept: 'application/json',
                Authorization: "Bearer " + localStorage.getItem('accessToken')
            }
        };

        axios(config)
        .then((response) => {
            this.menteeOptions = response.data.map((mentee) => ({
                value: mentee.user_id,
                text: mentee.name  
            }));
            console.log(this.menteeOptions);
        })
        .catch((error) => {
            console.log(error);
        });

    }

    },
    mounted() {
        this.getJadwal();
        this.getMentee();
    },
    computed: {
        isEdit() {
            return this.$route.params.mode === "edit";
        },
        isFeedback() {
            return this.$route.params.mode === 'feedback';
        },
        activeRole(){
            const role = localStorage.getItem('activeRole')
            return role ? JSON.parse(role) : null
       
        },
        isMentor(){
            return this.activeRole.role_id == 3
        }
    }
    
}
</script>
<template>
    <Layout>
        <PageHeader :title="mode" pageTitle="Mentoring"/>

       <BCard>
            <BCardHeader>
                <BRow>
                    <BCol cols="1">
                        <BButton @click="(this.$router.go(-1))" class="btn btn-secondary">&lt;</BButton>
                    </BCol>
                        <BCol cols="6">
                            <h2>Form {{ mode }}</h2>
                        </BCol>
                        <BCol cols="4" class="text-end">
                                <BButton variant="success" @click="updateJadwal()">simpan</BButton>
                        </BCol>
                </BRow>
            </BCardHeader>
            <BCardBody>
                        <BForm v-if="item">
                            <BRow>
                                <BCol cols="6" class="mt-4" v-if="isMentor">
                                    <Label>Mentee </Label>
                                    <BFormSelect id="namaMentee" v-model="item.user_id" :options="menteeOptions" />
                                </BCol>
                                <BCol cols="6" class="mt-4" v-else>
                                    <Label>Mentee </Label>
                                    <h4>{{  user_name }}</h4>
                                    <BFormInput  v-model="item.user_id" hidden/>
                                </BCol>
                                <BCol cols="6" class="mt-4">
                                    <Label>Status</Label>
                                    <BFormSelect :options="optionsStatus" v-model="item.status" :disabled="isFeedback"/>
                                </BCol>
                                <BCol cols="6" class="mt-4" >
                                    <Label>Tanggal</Label>
                                    <BFormInput type="date" v-model="item.tanggal_mentoring" :disabled="isFeedback"/>   
                                </BCol>
                                <BCol cols="6" class="mt-4">
                                    <Label>Waktu</Label>
                                    <BFormInput type="time" v-model="item.jam_mentoring" :disabled="isFeedback"/>
                                </BCol>
                                <BCol cols="12" class="mt-4">
                                    <Label>Materi</Label>
                                    <BFormInput placeholder="Materi" v-model="item.materi" rows="3" :disabled="isFeedback"/>
                                </BCol>
                                <BCol cols="12" class="mt-4">
                                    <Label>Materi</Label>
                                    <BFormTextarea placeholder="Materi" v-model="item.deskripsi" rows="3" :disabled="isFeedback"/>
                                </BCol>
                                <BCol cols="12" class="mt-4">
                                    <Label>To Do Sebelum Mentoring</Label>
                                    <BFormTextarea placeholder="Materi" v-model="item.todo" rows="3" :disabled="isFeedback"/>
                                </BCol>
                                <BCol cols="12" class="mt-4">
                                <Label>To Do Setelah Mentoring</Label>
                                <BFormTextarea placeholder="Materi" v-model="item.todo_pst" rows="3" :disabled="!item.status || isFeedback"/>
                            </BCol>
                            <BCol cols="12" class="mt-4">
                                <Label>Hasil Mentoring</Label>
                                <BFormTextarea placeholder="Hasil Mentoring" v-model="item.hasil" rows="5" :disabled="!item.status || isFeedback"/>
                            </BCol>
                            <BCol cols="12" class="mt-4">
                                <Label>Feedback</Label>
                                <BFormTextarea placeholder="Feedback" v-model="item.feedback" rows="5" :disabled="!item.status || isEdit"/>
                            </BCol>
                            </BRow>
                       </BForm>
            </BCardBody>
        </BCard>
    </Layout>
</template>