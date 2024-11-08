<script>
import Layout from "@/layouts/main";
import PageHeader from "@/components/page-header";
import axios from "axios";
import Swal from "sweetalert2";
// import { dataMentoring } from "./data";

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
            itemJadwal: {
                todo: '',
                materi: '',
                deskripsi: '',
                tanggal_mentoring: '',
                jam_mentoring: '',
                user_id:'',
            },
            itemHasil: {
                hasil:'',
                feedback:'',
                jadwal:'',
                todo:''
            },
            idHasil:0,
        }
    },
    methods: {
        updateJadwal(){
            Swal.fire(notification.swalLoading);

            let config ={
                method: "put",
                url: `${process.env.VUE_APP_BACKEND_URL_API}jadwal/update/${this.$route.params.id}`,
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                },
                data: {
                    todo: this.itemJadwal.todo,
                    materi: this.itemJadwal.materi,
                    mentor_id: this.itemJadwal.mentor_id,
                    tanggal_mentoring: this.itemJadwal.tanggal_mentoring,
                    jam_mentoring: this.itemJadwal.jam_mentoring,
                    user_id: this.itemJadwal.user_id,
                    deskripsi: this.itemJadwal.deskripsi
                }
            }

            axios(config).then((response)=>{
               let dataResponse = response.data.meta.status;
               if(dataResponse == 'success'){
                   Swal.fire(notification.swalAlertDefaultUpdateSuccess);
                   this.$router.push({name: 'MentoringIndex'});
                }else{
                    Swal.fire(notification.swalAlertDefaultUpdateError);
                }
            })
            },
            getJadwal(){
                let config = {
                    method: "get",
                    url: `${process.env.VUE_APP_BACKEND_URL_API}jadwal/getid/${this.$route.params.id}`,
                    headers:{
                        Accept: "aplication/json",
                        Authorization: "Bearer " + localStorage.getItem("accessToken")
                    }
                }

            axios(config).then((response)=>{
                let dataResponse = response.data.data;
                    console.log(dataResponse);
              
            })
        },
        },
    mounted() {
        // this.isiMentoring();
        this.getJadwal();
    }
}
</script>
<template>
    <Layout>
        <PageHeader title="Tambah Mentoring" pageTitle="Mentoring"/>

       <BCard>
            <BCardHeader>
                <BRow>
                    <BCol cols="1">
                        <BButton @click="(this.$router.go(-1))" class="btn btn-secondary">&lt;</BButton>
                    </BCol>
                        <BCol cols="8">
                            <h2>Form Edit</h2>
                        </BCol>
                    <hr/>
                </BRow>
            </BCardHeader>
            <BCardBody>
                <BCard>
                    <BCardHeader>
                        <BRow>
                            <BCol cols="6">
                                Informasi Jadwal
                            </BCol>
                            <BCol cols="6" class="text-end">
                                <BButton variant="success">simpan</BButton>
                            </BCol>
                        </BRow>
                    </BCardHeader>
                    <BCardBody>
                        <BForm v-if="item">
                            <BRow>
                                <BCol cols="6">
                                    <Label>Mentee</Label>
                                    <BFormInput v-model="item.mentee" />
                                </BCol>
                                <BCol cols="6">
                                    <Label>Status</Label>
                                    <BFormSelect :options="optionsStatus" v-model="item.status"/>
                                </BCol>
                                <BCol cols="6" class="mt-4">
                                    <Label>Tanggal</Label>
                                    <BFormInput type="date" v-model="item.date" />   
                                </BCol>
                                <BCol cols="6" class="mt-4">
                                    <Label>Waktu</Label>
                                    <BFormInput type="time" v-model="item.time" />
                                </BCol>
                                <BCol cols="12" class="mt-4">
                                    <Label>Materi</Label>
                                    <BFormTextarea placeholder="Materi" v-model="item.materi" rows="3" />
                                </BCol>
                                <BCol cols="12" class="mt-4">
                                    <Label>To Do Sebelum Mentoring</Label>
                                    <!-- <BFormTextarea placeholder="Materi" v-model="item.todoBefore" rows="3" /> -->
                                </BCol>
                            </BRow>
                       </BForm>
                    </BCardBody>
                </BCard>
                <BCard>
                    <BCardHeader>
                        <BRow>
                            <BCol cols="6">
                                Informasi Hasil
                            </BCol>
                            <BCol cols="6" class="text-end">
                                <BButton variant="success">simpan</BButton>
                            </BCol>
                        </BRow>
                    </BCardHeader>
                    <BCardBody>
                        <BBRow>
                            <BCol cols="12" class="mt-4">
                                <Label>To Do Setelah Mentoring</Label>
                                <!-- <BFormTextarea placeholder="Materi" v-model="item.todoAfter" rows="3" :disabled="!item.status"/> -->
                            </BCol>
                            <BCol cols="12" class="mt-4">
                                <Label>Hasil Mentoring</Label>
                                <!-- <BFormTextarea placeholder="Hasil Mentoring" v-model="item.hasil" rows="5" :disabled="!item.status"/> -->
                            </BCol>
                            <BCol cols="12" class="mt-4">
                                <Label>Feedback</Label>
                                <!-- <BFormTextarea placeholder="Feedback" v-model="item.feedback" rows="5" disabled/> -->
                            </BCol>
                        </BBRow>
                    </BCardBody>
                </BCard>
            </BCardBody>
        </BCard>
    </Layout>
</template>