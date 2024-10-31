<script>
import Layout from "@/layouts/main";
import PageHeader from "@/components/page-header";
import TableHeadPagination from "@/components/common/table-head-pagination"
import CreatePeriode from "@/views/master/periode/create-periode"
import UpdatePeriode from "@/views/master/periode/update-periode"

import axios from 'axios';
import Swal from "sweetalert2";

// Pinia State Management
import { useNotificationStore } from '@/state/pinia'
const notification = useNotificationStore()

export default {
    components: { Layout, PageHeader, TableHeadPagination, CreatePeriode, UpdatePeriode },
    data() {
        const columnData = [
            { width: "50px", label: "No", name: "-" },
            { width: "auto", label: "Tanggal Mulai", name: "tanggal_mulai" },
            { width: "auto", label: "Tanggal Selesai", name: "tanggal_akhir" },
            { width: "auto", label: "durasi Magang bulan", name: "durasi_magang" },
            { width: "auto", label: "Aksi", name: "-" },
        ]
        const sortOrderData = [];
        columnData.forEach((column) => {
            sortOrderData[column.name] = 1;
        });

        return {
            tableHeadPagination: {
                // sorting, limit dan search
                Column: columnData,
                SortKey: null,
                SortOrder: sortOrderData,
                SortOrderDir: null,
                LimitOrder: 10,
                SearchData: null,

                // pagination
                PageFrom: null,
                PageTo: null,
                PageTotal: null,
                CurrentPage: null,
                PaginationLinks: null,
            },
            tableData: {
                // init table data
                UrlDataTable: process.env.VUE_APP_BACKEND_URL_API + 'periode',
                DrawTable: 0,
                LoadingTable: true,
                DataTable:[],

            },
            modalFormShowAdd: false,
            modalFormShowEdit: false,
            editedData: null
        }
    },
    async mounted(){
        await this.getReferenceRole();
        await this.getTableData();
    },
    emits: ['dataTableAction', 'closeFormRefreshTable'],
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
        async getTableData(){
            this.tableData.DrawTable++;
            this.tableData.LoadingTable = true;
            let config = {
                method: "get",
                url: this.tableData.UrlDataTable,
                params: {
                    draw: this.tableData.DrawTable,
                    per_page: this.tableHeadPagination.LimitOrder,
                    search: this.tableHeadPagination.SearchData,
                    sort_field: this.tableHeadPagination.SortKey,
                    sort_order: this.tableHeadPagination.SortOrderDir,
                    status: this.tableData.filter_status,
                },
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + localStorage.getItem('accessToken'),
                },
            }

            await axios(config).then((response) => {
                const responseData = response.data.data;
                this.tableData.LoadingTable = false;
                this.tableData.DataTable = responseData.data;
                this.tableHeadPagination.PageFrom = responseData.from
                this.tableHeadPagination.PageTo = responseData.to
                this.tableHeadPagination.PageTotal = responseData.total
                this.tableHeadPagination.CurrentPage = responseData.current_page;
                this.tableHeadPagination.PaginationLinks = responseData.links;
            }).catch((error) => {
                notification.setSwalAlert("error", "Oops...", error.response.data.meta.message);
                Swal.fire(notification.swalAlert);
            });
        },
        dataTableAction(tableData){
            let keySort = tableData.SortKey;

            // sorting data
            this.tableHeadPagination.SortKey = keySort;
            this.tableHeadPagination.SortOrder[keySort] = this.tableHeadPagination.SortOrder[keySort] * -1;
            this.tableHeadPagination.SortOrderDir = this.tableHeadPagination.SortOrder[keySort] === 1 ? "asc" : "desc";

            // limit dan search data
            this.tableHeadPagination.LimitOrder = tableData.LimitOrder;
            this.tableHeadPagination.SearchData = tableData.SearchData;
            this.tableData.UrlDataTable = tableData.LinkPagination ? tableData.LinkPagination : process.env.VUE_APP_BACKEND_URL_API + 'periode';
            this.getTableData();
        },
        showFormModal(type, data){
            if(type == 'add'){
                this.$nextTick(() => {
                    this.modalFormShowAdd = true;
                });
            }else{
                this.$nextTick(() => {
                    this.editedData = data
                    this.modalFormShowEdit = true;
                });
            }
        },
        async closeFormRefreshTable(type){
            if(type == 'add') {
                this.modalFormShowAdd = false;
            } else {
                this.modalFormShowEdit = false;
            }
            await this.getTableData();
        },
        deleteData(data){
            notification.setSwalConfirmationAttr('Perhatian!!!', 'Anda yakin ingin menghapus data tersebut?');
            Swal.fire(notification.swalConfirmationAttr).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(notification.swalLoading)

                    let config_delete = {
                        method: "delete",
                        url: process.env.VUE_APP_BACKEND_URL_API + 'periode/delete' + data?.role_id,
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem('accessToken')
                        }
                    }

                    axios(config_delete).then((response) => {
                        let dataReponse = response.data.meta.status;
                        if(dataReponse == 'success') {
                            Swal.fire(notification.swalAlertDefaultDeleteSuccess);
                            this.getTableData();
                        } else {
                            Swal.fire(notification.swalAlertDefaultDeleteError);
                        }
                    }).catch((error) => {
                        notification.setSwalAlertForm("error", "Oops...", JSON.stringify(error.response.data.data.error));
                        Swal.fire(notification.swalAlertForm);
                    });
                } else if (result.isDenied) {
                    Swal.close();
                }
            });
        }
    }
}
</script>

<template>
    <Layout>
        <PageHeader title="periode" pageTitle="Master" />
        <BRow>
            <BCol cols="12">
                <BCard no-body>
                    <BCardBody class="p-4">
                        <BRow>
                            <BCol cols="6">
                                <BCardTitle>Semua Data Periode</BCardTitle>
                            </BCol>
                            <BCol cols="6">
                                <div class="d-flex flex-wrap gap-2 justify-content-end">
                                    <button type="button" class="btn btn-success btn-sm" v-on:click="showFormModal('add', null)">
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
                                <tr
                                    v-else
                                    v-for="(data, index) in tableData.DataTable"
                                    :key="index"
                                >
                                    <td class="text-center">
                                        <div v-if="index + 1 == 10">
                                            {{ tableHeadPagination.CurrentPage }}0.
                                        </div>
                                        <div v-else>
                                            {{ tableHeadPagination.CurrentPage - 1 != 0 ? tableHeadPagination.CurrentPage - 1 : "" }}
                                            {{ index + 1 }}.
                                        </div>
                                    </td>
                                    <td>{{ data.tanggal_mulai }}</td>
                                    <td>{{ data.tanggal_akhir }}</td>
                                    <td >{{ data.durasi_magang }}</td>
                                    <td>
                                        <div>
                                            <div class="d-flex flex-wrap justify-content-center gap-2">
                                                <button type="button" class="btn btn-info btn-sm" v-on:click="showFormModal('edit', data)">
                                                    <i class="bx bx-edit font-size-16 align-middle me-1"></i> Edit
                                                </button>
                                                <button type="button" class="btn btn-danger btn-sm" v-on:click="deleteData(data)">
                                                    <i class="bx bx-trash-alt font-size-16 align-middle me-1"></i> Hapus
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </TableHeadPagination>
                    </BCardBody>
                </BCard>
            </BCol>
        </BRow>
    </Layout>

    <!-- Modal Tambah Data -->
    <BModal v-model="modalFormShowAdd" id="modal-add" size="lg" title="Tambah periode" title-class="font-18" hide-footer>
        <CreatePeriode v-if="modalFormShowAdd" @closeFormRefreshTable="closeFormRefreshTable"></CreatePeriode>
    </BModal>

    <!-- Modal Edit Data -->
    <BModal v-model="modalFormShowEdit" id="modal-edit" size="lg" title="Edit periode" title-class="font-18" hide-footer>
        <UpdatePeriode v-if="modalFormShowEdit" :dataEdit="editedData" @closeFormRefreshTable="closeFormRefreshTable"></UpdatePeriode>
    </BModal>
</template>