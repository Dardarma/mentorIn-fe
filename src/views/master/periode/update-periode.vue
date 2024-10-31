<script>
import Swal from "sweetalert2";
import axios from "axios";

// Pinia State Management
import { useNotificationStore } from '@/state/pinia'
const notification = useNotificationStore()

export default {
    name: 'UpdateUser',
    props: ['dataEdit'],
    data() {
        
        console.log(this.$props.dataEdit);

        return {
            tanggal_mulai: this.$props.dataEdit.tanggal_mulai,
            tanggal_akhir: this.$props.dataEdit.tanggal_akhir,
            durasi_magang: this.$props.dataEdit.durasi_magang
        }
    },
    emits: ['closeFormRefreshTable'],
    computed:{
        durasi_bulan(){
            if(this.tanggal_mulai && this.tanggal_akhir){
                const mulai = new Date(this.tanggal_mulai);
                const akhir = new Date(this.tanggal_akhir);

                const yearDiff = akhir.getFullYear()-mulai.getFullYear();
                const monthDiff = akhir.getMonth()-mulai.getMonth();

                return yearDiff*12 + monthDiff;
            }
        return 0;
        }
    },
    watch: {
        durasi_bulan(newBulan){
            this.durasi_magang = newBulan;
        },
        tanggal_mulai: 'updateDurasi',
        tanggal_akhir: 'updateDurasi'
    },
    methods:{
        updateData(){
            Swal.fire(notification.swalLoading)

            let config_update = {
                method: "put",
                url: process.env.VUE_APP_BACKEND_URL_API + 'periode/edit/' + this.$props.dataEdit.id,
                data: {
                    tanggal_mulai: this.tanggal_mulai,
                    tanggal_akhir: this.tanggal_akhir,
                    durasi_magang: this.durasi_magang
                },
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('accessToken')
                }
            }

            axios(config_update).then((response) => {
                let dataReponse = response.data.meta.status;
                if(dataReponse == 'success') {
                    Swal.fire(notification.swalAlertDefaultUpdateSuccess);
                    this.$emit('closeFormRefreshTable', 'update');
                } else {
                    Swal.fire(notification.swalAlertDefaultUpdateError);
                }
            }).catch((error) => {
                notification.setSwalAlertForm("error", "Oops...", JSON.stringify(error.response.data.data.error));
                Swal.fire(notification.swalAlertForm);
            });
        },
        updateDurasi(){
            this.durasi_magang = this.durasi_bulan;
        },
        validateTanggalSelesai(){
            if(this.tanggal_mulai && this.tanggal_akhir){
                if(new Date(this.tanggal_mulai) > new Date(this.tanggal_akhir)){
                    this.tanggal_akhir = this.tanggal_mulai;
                    alert('Tanggal Selesai tidak boleh kurang dari Tanggal Mulai');
                }
            }
        }
    },
}
</script>


<template>
    <b-form class="p-0" @submit.prevent="updateData">
        <div class="row">
            <div class="row">
                <div class="col-6">
                    <BFormGroup label="Tanggal Mulai" label-for="form-tanggal-mulai" class="mb-3">
                        <BFormInput 
                            id="form-tanggal-mulai" 
                            type="date"
                            placeholder="Masukkan Tanggal Mulai..."
                            v-model="tanggal_mulai"
                        ></BFormInput>
                    </BFormGroup>
                </div>
                <div class="col-6">
                    <BFormGroup label="Tanggal Selesai" label-for="form-tanggal-mulai" class="mb-3">
                        <BFormInput 
                            id="form-tanggal-mulai" 
                            type="date" 
                            placeholder="Masukkan Tanggal Selesai..."
                            v-model="tanggal_akhir"
                        ></BFormInput>
                    </BFormGroup>
                </div>
                <div class="col-3">
                    <BFormGroup label="Durasi Magang" label-for="form-durasi-magang" class="mb-3">
                        <BFormInput 
                            id="form-durasi-magang" 
                            type="number" 
                            v-model="durasi_magang"
                            disabled
                        ></BFormInput>
                    </BFormGroup>
                </div>
                <div class="col-12">
                    <hr/>
                    <div class="d-flex flex-wrap justify-content-end gap-2">
                        <button type="reset" class="btn btn-danger waves-effect waves-light btn-reset">
                            <i class="bx bx-revision font-size-16 align-middle me-1"></i> Reset
                        </button>
                        <button type="submit" class="btn btn-primary waves-effect waves-light btn-save">
                            <i class="bx bx-save font-size-16 align-middle me-1"></i> Simpan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </b-form>
</template>