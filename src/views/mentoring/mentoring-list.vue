<script>
import Layout from "@/layouts/main";
import PageHeader from "@/components/page-header";
import MentoringAdd from "@/views/mentoring/mentoringAdd";
import TableHeadPagination from "@/components/common/table-head-pagination"


export default {
    components: {
        Layout,
        PageHeader,
        TableHeadPagination,
        MentoringAdd
        },
    data() {
        return {
            showModal: false,
            tableHeadPagination: {
                Column: [
                    { width: "50px", label: "No", name: "-" },
                    { width: "auto", label: "Nama Mentee", name: "name" },
                    { width: "auto", label: "Tanggal", name: "Tanggal" },
                    { width: "auto", label: "Jam", name: "jam" },
                    { width: "auto", label: "Materi", name: "materi" },
                    { width: "auto", label: "Hasil", name: "Hasil" },
                    { width: "auto", label: "Todo Past", name: "todopast" },
                    { width: "auto", label: "Todo Pre", name: "todopre" },
                    { width: "auto", label: "Feed Back", name: "feedback" },
                    { width: "auto", label: "Status", name: "status" },
                    { width: "auto", label: "Aksi", name: "-" },
                ],
                SortKey: null,
                SortOrder: [],
                LimitOrder: 10,
                SearchData: null,
                LinkPagination: null,
                
                tableData:[
                    {
                        "name": "Ali Ahmad",
                        "Tanggal": "2024-10-21",
                        "jam": "09:00 - 10:00",
                        "materi": "Intro to Programming",
                        "Hasil": "Menyelesaikan latihan dasar",
                        "todopast": "Menyelesaikan tugas 1",
                        "todopre": "Membaca bab 2",
                        "feedback": "Butuh pendampingan lebih pada konsep variabel",
                        "status": "Selesai",
                    },
                    {
                        "name": "Budi Setiawan",
                        "Tanggal": "2024-10-21",
                        "jam": "10:30 - 11:30",
                        "materi": "Web Development",
                        "Hasil": "Mengerti dasar HTML",
                        "todopast": "Menyusun struktur halaman",
                        "todopre": "Mempelajari CSS",
                        "feedback": "Perlu latihan lebih pada tag HTML",
                        "status": "Pending",
                    },
                    {
                        "name": "Citra Rahma",
                        "Tanggal": "2024-10-21",
                        "jam": "13:00 - 14:00",
                        "materi": "Database Design",
                        "Hasil": "Membuat ERD",
                        "todopast": "Menyelesaikan draft ERD",
                        "todopre": "Mempelajari relasi antar tabel",
                        "feedback": "Sudah cukup baik, lanjutkan ke tahap selanjutnya",
                        "status": "Selesai",
                    },
                    {
                        "name": "Dewi Putri",
                        "Tanggal": "2024-10-21",
                        "jam": "14:30 - 15:30",
                        "materi": "Networking Basics",
                        "Hasil": "Memahami topologi jaringan",
                        "todopast": "Membaca teori dasar jaringan",
                        "todopre": "Membuat simulasi jaringan",
                        "feedback": "Perlu pemahaman lebih pada subnetting",
                        "status": "Pending",
                    }
                ]
            }
        }
    },
    props: ["TableHeadPagination"],
    emits: ['dataTableAction'],
    methods: {
                dataTableAction(){
                let dataTableAction = {
                    SortKey: this.tableHeadPagination.SortKey,
                    LimitOrder: this.tableHeadPagination.LimitOrder,
                    SearchData: this.tableHeadPagination.SearchData,
                    LinkPagination: this.tableHeadPagination.LinkPagination
                };
                this.$emit('dataTableAction', dataTableAction);
            },
            toggleModal() {
            this.showModal = !this.showModal;  // Function to toggle the modal
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
                    <BcardBody class="p-4">
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
                    </BcardBody>
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
                            <tr v-else v-for="(data, index) in tableHeadPagination.tableData" :key="index">
                                <td>{{ index + 1 }}</td>
                                <td>{{ data.name }}</td>
                                <td>{{ data.Tanggal }}</td>
                                <td>{{ data.jam }}</td>
                                <td>{{ data.materi }}</td>
                                <td>{{ data.Hasil }}</td>
                                <td>{{ data.todopast }}</td>
                                <td>{{ data.todopre }}</td>
                                <td>{{ data.feedback }}</td>
                                <td>{{ data.status }}</td>
                                <td>
                                    <button type="button" class="btn btn-primary btn-sm">
                                        <i class="bx bx-edit-alt font-size-16 align-middle me-1"></i> Edit
                                    </button>
                                    <button type="button" class="btn btn-danger btn-sm">
                                        <i class="bx bx-trash font-size-16 align-middle me-1"></i> Hapus
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
        <MentoringAdd v-if="showModal"></MentoringAdd>
    </BModal>
</template>