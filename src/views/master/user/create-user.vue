<script>
import axios from 'axios';
import Swal from "sweetalert2";
import $ from "jquery";

// Pinia State Management
import { useNotificationStore } from '@/state/pinia'
const notification = useNotificationStore()

export default {
    name: 'CreateUser',
    data() {
        return {
            name: null,
            username: null,
            password: null,
            password_konfirm: null,
            path_photo: null,
            asal_instansi:null,
            mentor: null,
            periode: null,
            role: [],

            mentorOptions: [],
            periodeOptions:[],
            referenceRole: [],
        }
    },
    async mounted(){
        await this.getReferenceRole()
        this.getMentor()
        this.getPeriode()
    },
    emits: ['closeFormRefreshTable'],
    methods: {
        async getReferenceRole(){
            Swal.fire(notification.swalLoading);

            let config = {
                method: "get",
                url: process.env.VUE_APP_BACKEND_URL_API + 'reference/get-role-option',
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + localStorage.getItem('accessToken'),
                },
            }

            await axios(config).then((response) => {
                Swal.close();
                const responseData = response.data.data;
                this.referenceRole = responseData;
            }).catch((error) => {
                notification.setSwalAlert("error", "Oops...", error.response.data.meta.message);
                Swal.fire(notification.swalAlert);
            });
        },
        getMentor(){
            let config = {
                method: "get",
                url: process.env.VUE_APP_BACKEND_URL_API + 'user/mentor',
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + localStorage.getItem('accessToken'),
                }
            }

            axios(config).then((response) => {
            const mentors = Array.isArray(response.data.data.data) ? response.data.data.data : [];
            this.mentorOptions = mentors.map(mentor => ({
                value: mentor.user_id,
                text: mentor.name
            }));
               console.log(this.mentorOptions);

            }).catch((error) => {
                console.log(error);
            });
        },
        getPeriode(){
            let config = {
                method: "get",
                url: process.env.VUE_APP_BACKEND_URL_API + 'periode/user',
                headers:{
                    Accept: "application/json",
                    Authorization: "Bearer " + localStorage.getItem('accessToken')
                }
            }

            axios(config).then((response)=>{
                this.periodeOptions = response.data.data.map( item => {
                    return {
                        value: item.id,
                        text: item.tanggal_mulai + ' sd ' + item.tanggal_akhir
                    }
                })
                console.log(this.periodeOptions);
            })
        },
        StoreData(){
            Swal.fire(notification.swalLoading)

            let config_store = {
                method: "post",
                url: process.env.VUE_APP_BACKEND_URL_API + 'user',
                data: {
                    name: this.name,
                    username: this.username,
                    password: this.password,
                    password_konfirm: this.password_konfirm,
                    asal_instansi: this.asal_instansi,
                    mentor_id: this.mentor,
                    periode_id: this.periode,
                    path_photo: this.path_photo,
                    role: JSON.stringify(this.role)
                },
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('accessToken')
                }
            }

            axios(config_store).then((response) => {
                let dataReponse = response.data.meta.status;
                if(dataReponse == 'success') {
                    Swal.fire(notification.swalAlertDefaultInputSuccess);
                    this.$emit('closeFormRefreshTable', 'add');
                } else {
                    Swal.fire(notification.swalAlertDefaultInputError);
                }
            }).catch((error) => {
                notification.setSwalAlertForm("error", "Oops...", JSON.stringify(error.response.data.data.error));
                Swal.fire(notification.swalAlertForm);
            });
        },
        inputFilePhoto(){
            let self = this;
            if ($("#formPhoto")[0].files[0]) {
                if ($("#formPhoto")[0].files[0].size < 2242880) {
                    $("#uploadLoading").html(
                        '<span class="badge bg-warning p-1"><i class="bx bx-loader-alt bx-spin"></i> Loading...</span>'
                    );
                    var urlres = process.env.VUE_APP_BACKEND_URL;
                    var FormData = require("form-data");
                    var data = new FormData();
                    data.append("UPLOADED_FILE_REFERENSI", $("#formPhoto")[0].files[0]);
                    var config = {
                        method: "post",
                        url: process.env.VUE_APP_BACKEND_URL_API + "config/referensi-upload",
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem('accessToken'),
                        },
                        data: data,
                    };
                    axios(config).then(function (response) {
                        var path_file = response.data.data;
                        urlres += path_file;
                        $("#uploadLoading").html(
                            '<span class="badge bg-success p-1"><i class="fa fa-check"></i> Berhasil </span> <a href="' + urlres + '" target="_blank" style="padding-left:10px;"><span class="badge bg-success p-1"><i class="fa fa-eye"></i> Lihat File</span></a>'
                        );
                        self.path_photo = path_file;
                    });
                } else {
                    notification.setSwalAlert('warning', 'Oppss...', 'File lebih dari 2Mb');
                    Swal.fire(notification.swalAlert);
                }
            }
        }
    }
}
</script>

<template>
    <b-form class="p-0" @submit.prevent="StoreData">
        <div class="row">
            <div class="col-6">
                <BFormGroup label="Nama" label-for="form-name" class="mb-3">
                    <BFormInput 
                        id="form-name" 
                        type="text" 
                        placeholder="Masukkan Nama..."
                        v-model="name"
                    ></BFormInput>
                </BFormGroup>
            </div>
            <div class="col-6">
                <BFormGroup label="Username" label-for="form-username" class="mb-3">
                    <BFormInput 
                        id="form-username" 
                        type="text" 
                        placeholder="Masukkan Username..."
                        v-model="username"
                    ></BFormInput>
                </BFormGroup>
            </div>
            <div class="col-6">
                <BFormGroup label="Password" label-for="form-password" class="mb-3">
                    <BFormInput 
                        id="form-password" 
                        type="password" 
                        placeholder="Masukkan Password..."
                        v-model="password"
                    ></BFormInput>
                </BFormGroup>
            </div>
            <div class="col-6">
                <BFormGroup label="Password Konfirmasi" label-for="form-password-konfirmasi" class="mb-3">
                    <BFormInput 
                        id="form-password-konfirmasi" 
                        type="password" 
                        placeholder="Masukkan Password Konfirmasi..."
                        v-model="password_konfirm"
                    ></BFormInput>
                </BFormGroup>
            </div>
            <div class="col-6">
                <BFormGroup label="Asal Instansi" label-for="form-asal-intansi" class="mb-3">
                    <BFormInput 
                        id="form-asal-intansi" 
                        type="text" 
                        placeholder="Asal Instansi..."
                        v-model="asal_instansi"
                    ></BFormInput>
                </BFormGroup>
            </div>
            <div class="col-6">
                <BFormGroup label="Mentor" label-for="form-Mentor" class="mb-3">
                    <BFormSelect
                        id="form-periode"
                        v-model="mentor"
                        :options="mentorOptions"
                        :empty="{'value': null, 'text': 'Pilih Mentor'}"
                    />
                </BFormGroup>
            </div>
            <div class="col-12">
                <BFormGroup label="Periode" label-for="form-Periode" class="mb-3">
                    <BFormSelect
                        id="form-periode"
                        v-model="periode"
                        :options="periodeOptions"
                        :empty="{'value': null, 'text': 'Pilih periode'}"
                    />
                </BFormGroup>
            </div>
            <div class="col-12">
                <BFormGroup class="mb-3" label="Foto Profil" label-for="formPhoto">
                    <input type="file" class="form-control" id="formPhoto" v-on:change="inputFilePhoto()" />
                    <div class="respond-input-file float-left" id="uploadLoading"></div>
                    <small class="float-right" style="color: red">*) Max File 2 MB</small>
                </BFormGroup>
            </div>
            <div class="col-12">
                <div class="form-group mb-3">
                    <label for="roleUser" class="form-label">Pilih Role User</label>
                    <ul>
                        <li v-for="(data, index) in referenceRole" :key="index">
                            <BFormGroup class="form-check-primary mb-1">
                                <BFormCheckbox 
                                    v-model="role" 
                                    v-bind:value="data.role_id"
                                >{{ data.role_name }}</BFormCheckbox>
                            </BFormGroup>
                        </li>
                    </ul>
                </div>
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
    </b-form>
</template>