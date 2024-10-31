<script>
import Layout from "@/layouts/main";
import PageHeader from "@/components/page-header";
import MentoringAdd from "@/views/mentoring/mentoringAdd";
import TableHeadPagination from "@/components/common/table-head-pagination";
import MentoringDetail from "./modalDetail.vue";
import axios from "axios";


export default {
    components: {
        Layout,
        PageHeader,
        TableHeadPagination,
        MentoringAdd,
        MentoringDetail

    },
    data() {
        return {
            showModal: false,
            showModalDetail:false,
            selectedData: [],
            tableHeadPagination: {
                Column: [
                    { width: "50px", label: "No", name: "-" },
                    { width: "auto", label: "Nama Mentee", name: "name" },
                    { width: "auto", label: "Tanggal", name: "tanggal_mentoring" },
                    { width: "auto", label: "Jam", name: "jam_mentoring" },
                    { width: "auto", label: "Materi", name: "materi" },
                    { width: "auto", label: "Status", name: "status" },
                    { width: "auto", label: "Aksi", name: "-" },
                ],
                SortKey: 'id',
                LimitOrder: 10,
                SearchData: '',
                LinkPagination: 1,
                LoadingTable: false,
                tableData: [],
                displayedData: [],
            }
        };
    },
    mounted(){
        this.getJadwal();
    },
    methods: {
        dataTableAction() {
            let dataTableAction = {
                SortKey: this.tableHeadPagination.SortKey,
                LimitOrder: this.tableHeadPagination.LimitOrder,
                SearchData: this.tableHeadPagination.SearchData,
                LinkPagination: this.tableHeadPagination.LinkPagination
            };
            // Emit event jika diperlukan
            this.$emit('dataTableAction', dataTableAction);
        },
        toggleModal() {
            this.showModal = !this.showModal;  
        },
        edit(id) {
            this.$router.push({ name: 'mentorring-edit', params: { id: id } });
        },
        showdetail(data){
            this.selectedData = data;
            this.showModalDetail = true;
            console.log(this.selectedData);
        },
        closeFormRefreshTable() {
            this.showModal = false;
        },
        getJadwal(){
            this.tableHeadPagination.LoadingTable = true
            let config ={
                mentod: 'get',
                url: process.env.VUE_APP_BACKEND_URL_API + 'jadwal/index',
                headers:{
                    Accept: 'application/json',
                    Authorization: "Bearer" + localStorage.getItem('accessToken')
                }
            }

            axios(config)
            .then((response) =>{
                this.tableHeadPagination.tableData = response.data.data.jadwal
                this.tableHeadPagination.LoadingTable = false
                
            })
            .catch((error) => {
                console.log(error);
                this.tableHeadPagination.LoadingTable = false
            })
        }

    },
    created() {
        // Initialize displayedData on load
        this.dataTableAction();
    }
};
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
                                    <BFormGroup class="mb-3" label="Status" label-for="filter-status">
                                        <select class="form-select" id="filter-status">
                                            <option value="TERLAKSANA">TERLAKSANA</option>
                                            <option value="BELUM DILAKSANAKAN">BELUM DILAKSANAKAN</option>
                                        </select>
                                    </BFormGroup>
                                </div>
                                <div class="col-3">
                                    <BFormGroup class="mb-3" label="Mentee" label-for="filter-mentee">
                                        <select class="form-select" id="filter-status">
                                            <option value="TERLAKSANA">TERLAKSANA</option>
                                            <option value="BELUM DILAKSANAKAN">BELUM DILAKSANAKAN</option>
                                        </select>
                                    </BFormGroup>
                                </div>
                                <div class="col-3">
                                    <BFormGroup class="mb-3" label="Tanggal" label-for="filter-tanggal">
                                        <select class="form-select" id="filter-status">
                                            <option value="TERLAKSANA">TERLAKSANA</option>
                                            <option value="BELUM DILAKSANAKAN">BELUM DILAKSANAKAN</option>
                                        </select>
                                    </BFormGroup>
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
                                    <button type="button" class="btn btn-primary" @click="showModal = true">
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
                            <tr v-if="tableHeadPagination.LoadingTable">
                                <td class="text-center" :colspan="tableHeadPagination.Column.length">
                                    <i class="fas fa-spinner fa-spin"></i> Loading...
                                </td>
                            </tr>
                            <tr v-else-if="tableHeadPagination.tableData.length === 0">
                                <td class="text-center" :colspan="tableHeadPagination.Column.length">Data Tidak Tersedia</td>
                            </tr>
                            <tr v-else v-for="(data, index) in tableHeadPagination.tableData" :key="data.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ data.user.name || 'N/A'}}</td>
                                <td>{{ data.tanggal_mentoring  }}</td>
                                <td>{{ data.jam_mentoring }}</td>
                                <td>{{ data.materi.materi || 'N/A' }}</td>
                                <td>{{ data.materi.status ? 'Terlaksana' : 'Belum Terlaksana' }}</td>
                                <td>
                                    <button type="button" class="btn btn-warning btn-sm mx-1" @click="edit(data.id)">
                                        <i class="bx bx-edit-alt font-size-16 align-middle me-1"></i>
                                    </button>
                                    <button type="button" class="btn btn-danger btn-sm">
                                        <i class="bx bx-trash font-size-16 align-middle me-1"></i> 
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
    <BModal v-model="showModal" id="modal-add" size="lg" title="Tambah Mentoring" title-class="font-18" hide-footer>
        <MentoringAdd v-if="showModal" @closeFormRefreshTable="closeFormRefreshTable"></MentoringAdd>
    </BModal>
    <BModal v-model="showModalDetail" id="modal-detail" size="lg" title="Detail Mentoring" tittle-class="font-18">
        <MentoringDetail :item="selectedData"></MentoringDetail>
    </BModal>
    
</template>