<script>
import axios from 'axios';
import Swal from 'sweetalert2';

// Pinia State Management
import { useNotificationStore } from '@/state/pinia'
const notification = useNotificationStore()


export default{
    name: 'MentoringAdd',
    data(){
        return{
            menteeOptions:[],
            jadwal:{
                mentee: "",
                tanggal: "",
                waktu: "",
                judul: "",
                materi: "",
                todoBefore: "",
            }
        }
    },
    mounted(){
        this.getMentee();
    },
    emits: ['closeFormRefreshTable'],
    methods:{
        getMentee() {
            let config = {
                method: 'get',
                url: process.env.VUE_APP_BACKEND_URL_API + 'jadwal/mente',
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

        },
        StoreData(){
            Swal.fire(notification.swalLoading);

            let config_store = {
                method: 'post',
                url: process.env.VUE_APP_BACKEND_URL_API + 'jadwal/add',
                data:{
                    user_id: this.jadwal.mentee,
                    tanggal_mentoring: this.jadwal.tanggal,
                    jam_mentoring: this.jadwal.waktu,
                    materi: this.jadwal.judul,
                    deskripsi: this.jadwal.materi,
                    todo: this.jadwal.todoBefore,
                },
                headers:{
                    Authorization: "Bearer "+localStorage.getItem('accessToken')
                }
            }

            axios(config_store).then((response)=>{ 
                let dataResponse = response.data.meta.status;
                if(dataResponse == 'success'){
                    Swal.fire(notification.swalAlertDefaultInputSuccess);
                    this.$emit('closeFormRefreshTable', 'add');
                }else{
                    Swal.fire(notification.swalAlertDefaultInputError);
                }
            }).catch((error) => {
                let errorMessage = error.response?.data?.data?.error || "Terjadi kesalahan yang tidak diketahui.";
                notification.setSwalAlert("error", "Oops...", errorMessage);

                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi Kesalahan',
                    text: errorMessage,
                });
            });
        },
        ResetData(){
            this.jadwal.mentee = "";
            this.jadwal.tanggal = "";
            this.jadwal.waktu = "";
            this.jadwal.judul = "";
            this.jadwal.materi = "";
            this.jadwal.todoBefore = "";
        }
    }
}
</script>

<template>
      <b-form class="p-0" @submit.prevent="StoreData">
        <div class="row">
            <div class="col-12 ">
                <b-form-group label="Nama Mentee" label-for="namaMentee">
                    <b-form-select id="namaMentee" v-model="jadwal.mentee" :options="menteeOptions" />
                </b-form-group>
            </div>
            <div class="col-6 mt-4">
                <b-form-group label="Tanggal" label-for="tanggal">
                    <b-form-input id="tanggal" type="date" v-model="jadwal.tanggal" />
                </b-form-group>
            </div>
            <div class="col-6 mt-4">
                <b-form-group label="Waktu" label-for="waktu">
                    <b-form-input id="waktu" type="time" v-model="jadwal.waktu" />
                </b-form-group>
            </div>
            <div class="col-12 mt-4">
                <b-form-group label="Judul">
                    <b-form-input id="judul" v-model="jadwal.judul" />
                </b-form-group>
            </div>
            <div class="col-12 mt-4">
                <b-form-group label="Materi" label-for="materi">
                    <b-form-textarea id="materi" v-model="jadwal.materi"  rows="3"/>
                </b-form-group>
            </div>
            <div class="col-12 mt-4">
                <b-form-group label="To Do Sebelum Mentoring" label-for="materi">
                    <b-form-textarea id="todoBefore" v-model="jadwal.todoBefore"  rows="3"/>
                </b-form-group>
            </div>
            <div class="col-12 mt-4">
                <b-button type="submit" variant="primary">Simpan</b-button>
                &nbsp;
                <b-button type="reset" variant="danger" @click="ResetData()">Reset</b-button>
            </div>
        </div>
      </b-form>
</template>