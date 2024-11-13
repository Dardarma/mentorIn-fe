<script>
import Layout from "@/layouts/main";
import PageHeader from "@/components/page-header";
import MentoringAdd from "@/views/mentoring/mentoringAdd";
import TableHeadPagination from "@/components/common/table-head-pagination";
import MentoringDetail from "./modalDetail.vue";

import axios from "axios";
import Swal from "sweetalert2";

import { useNotificationStore } from '@/state/pinia'
const notification = useNotificationStore()

export default {
    components: {
        Layout,
        PageHeader,
        TableHeadPagination,
        MentoringAdd,
        MentoringDetail

    },
    data() {
        const columnData = [
            { width: "50px", label: "No", name: "-" },
            { width: "auto", label: "Nama Mentee", name: "mente" },
            { width: "auto", label: "Tanggal", name: "tanggal_mentoring" },
            { width: "auto", label: "Jam", name: "jam_mentoring" },
            { width: "auto", label: "Materi", name: "materi" },
            { width: "auto", label: "Status", name: "status" },
            { width: "auto", label: "Aksi", name: "-" },
        ]
        const sortOrderData =[];
        columnData.forEach((column) => {
            sortOrderData[column.name] = 1;
        });

        return {
           tableHeadPagination: {
                Column: columnData,
                SortKey: null,
                SortOrder: sortOrderData,
                SortOrderDir: null,
                LimitOrder: 10,
                SearchData: null,

                PageFrom: null,
                PageTo: null,
                PageTotal: null,
                CurrentPage: null,
                PaginationLinks: null
           },
           tableData:{
                UrlDataTable : process.env.VUE_APP_BACKEND_URL_API + 'jadwal',
                DrawTable: 0,
                LoadingTable: false,
                DataTable: [],
                filter_status: true,
                filter_mentee: ''
           },
            showModalAdd: false,
            showModalDetail: false,
            statusOptions: [
                { value: true, text: "Terlaksana" },
                { value: false, text: "Belum Terlaksana" }
            ],
            menteeOptions: []

        }
    },
    mounted(){
        this.getTableData();
        this.getMentee();
    },
    emits: ['dataTableAction','closeFormRefreshTable'],
    methods:{
        async getTableData(){
            this.tableData.DrawTable++;
            this.tableData.LoadingTable = true;
            let config ={
                method: 'get',
                url: this.tableData.UrlDataTable,
                params: {
                    draw: this.tableData.DrawTable,
                    per_page:this.tableHeadPagination.LimitOrder,
                    search: this.tableHeadPagination.SearchData,
                    sort_field: this.tableHeadPagination.SortKey,
                    sort_order: this.tableHeadPagination.SortOrderDir,
                    status: this.tableData.filter_status,
                    mente: this.tableData.filter_mentee
                },
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            }

            console.log('params yang dikirim', config.params);

            await axios(config).then((response)=>{
                const responseData = response.data.data;
                this.tableData.LoadingTable = false;
                this.tableData.DataTable = responseData.data;
                this.tableHeadPagination.PageFrom = responseData.from;
                this.tableHeadPagination.PageTo = responseData.to;
                this.tableHeadPagination.PageTotal = responseData.total;
                this.tableHeadPagination.CurrentPage = responseData.current_page;
                this.tableHeadPagination.PaginationLinks = responseData.links;

                console.log(responseData);
            }).catch(( error) => {
                notification.setSwalAlert("error", "Halah...", error.response.data.meta.message);
                Swal.fire(notification.swalAlert);
            } )
        },
        dataTableAction(tableData){
            let keySort= tableData.SortKey

            this.tableHeadPagination.SortKey = keySort;
            this.tableHeadPagination.SortOrder[keySort] = this.tableHeadPagination.SortOrder[keySort] * -1;
            this.tableHeadPagination.SortOrderDir = this.tableHeadPagination.SortOrder[keySort] === 1 ? 'asc' : "desc";

            this.tableHeadPagination.LimitOrder = tableData.LimitOrder;
            this.tableHeadPagination.SearchData = tableData.SearchData;
            this.tableData.UrlDataTable = tableData.LinkPagination ? tableData.LinkPagination : process.env.VUE_APP_BACKEND_URL_API + 'jadwal/index';
            this.getTableData();
        },
        edit(id){
            this.$router.push({ name: 'mentorring-edit', params: { id: id , mode: 'edit'}});
        },
        showdetail(data){
            this.selectedData = data;
            this.showModalDetail = true;
        },
        async closeFormRefreshTable(){
            this.showModalAdd = false;
            this.getTableData();
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

        },
        async deleteData(id){
            Swal.fire({
                title: "Yakin Dek?",
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
                icon: "warning"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let config = {
                        method: "delete",
                        url: process.env.VUE_APP_BACKEND_URL_API + 'jadwal/delete/' + id,
                        headers:{
                            Accept: "aplication/json",
                            Authorization: "Bearer " + localStorage.getItem("accessToken")
                        }
                    }

                    await axios(config).then((response)=>{
                        let dataResponse = response.data.meta.status;
                        if(dataResponse === 'success'){
                            Swal.fire(notification.swalAlertDefaultDeleteSuccess);
                            this.getTableData();
                        } else {
                            Swal.fire(notification.swalAlertDefaultDeleteError);
                        }
                    }).catch((error)=>{
                        notification.setSwalAlert("error", "Halah...", error.response.data.meta.message);
                        Swal.fire(notification.swalAlert);
                    })
                }
            })
        }

        
    }
}
</script>

<template>
    <Layout>
        <PageHeader title="Mentoring List" pageTitle="Mentoring"/>
        <BRow>
            <BCol cols="12">
                <BCard no-body>
                    <BCardBody class="p-4">
                    <div class="row">
                        <div class="col-12">
                            <BCardTitle>Filter Data Mentoring</BCardTitle>
                            <hr/>
                        </div>
                        <div class="col">
                            <div class="row">
                                <div class="col-3">
                                    <BFormSelect :options="statusOptions" v-model="tableData.filter_status" v-on:change="getTableData()"/>
                                </div>
                                <div class="col-3">
                                    <BFormSelect id="namaMentee" v-model="tableData.filter_mentee" :options="menteeOptions" />
                                </div>
                            </div>
                        </div>
                    </div>
                    </BCardBody>
                </BCard>
            </BCol>
            <BCol cols="12">
                <BCard no-body>
                    <BCardBody class="p-4">
                        <BRow>
                            <BCol cols="6">
                                <BCardTitle>Semua Data User</BCardTitle>
                            </BCol>
                            <BCol cols="6">
                                <div class="d-flex flex-wrap gap-2 justify-content-end">
                                    <button type="button" class="btn btn-primary" @click="showModalAdd = true">
                                        <i class="bx bx-plus font-size-16 align-middle me-1"></i> Tambah
                                    </button>
                                </div>
                            </BCol>
                        </BRow>
                        <TableHeadPagination
                        :TableHeadPagination="tableHeadPagination"
                        @dataTableAction="dataTableAction"
                        >
                        <tbody>
                            <tr v-if="tableData.LoadingTable">
                                <td class="text-center" :colspan="tableHeadPagination.Column.length">
                                    <i class="fas fa-spinner fa-spin"></i> Loading...
                                </td>
                            </tr>
                            <tr v-else-if="tableData.DataTable == ''">
                                <td class="text-center" :colspan="tableHeadPagination.Column.length">Data Tidak Tersedia</td>
                            </tr>
                            <tr v-else v-for="(data, index) in tableData.DataTable" :key="index">
                                <td>{{ index + 1 }}</td>
                                <td>{{ data.user.name || 'N/A'}}</td>
                                <td>{{ data.tanggal_mentoring  }}</td>
                                <td>{{ data.jam_mentoring }}</td>
                                <td>{{ data.materi.materi || 'N/A' }}</td>
                                <td>{{ data.status ? 'Terlaksana' : 'Belum Terlaksana' }}</td>
                                <td>
                                    <button type="button" class="btn btn-warning btn-sm mx-1" @click="(edit(data.id))">
                                        <i class="bx bx-edit-alt font-size-16 align-middle me-1"></i>
                                    </button>
                                    <button type="button" class="btn btn-danger btn-sm">
                                        <i class="bx bx-trash font-size-16 align-middle me-1" @click="(deleteData(data.id))"></i> 
                                    </button>
                                    <button type="button" class="btn btn-primary btn-sm mx-1">
                                        <i class='bx bxs-show font-size-16 align-middle me-1' @click="showdetail(data)"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                        </TableHeadPagination>
                    </BCardBody>
                </BCard>
            </BCol>
        </BRow>
    </Layout>
    <BModal v-model="showModalAdd" id="modal-add" size="lg" title="Tambah Mentoring" title-class="font-18" hide-footer>
        <MentoringAdd v-if="showModalAdd" @closeFormRefreshTable="closeFormRefreshTable"></MentoringAdd>
    </BModal>
    <BModal v-model="showModalDetail" id="modal-detail" size="lg" title="Detail Mentoring" tittle-class="font-18">
        <MentoringDetail :item="selectedData"></MentoringDetail>
    </BModal>
    
</template>