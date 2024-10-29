<script>
import Layout from "@/layouts/main";
import PageHeader from "@/components/page-header";
import { dataMentoring } from "./data";

export default {
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
            status: "Belum",
            item: {
                mentee: "",
                status: "",
                date: "",
                time: "",
                materi: "",
                todoBefore: "",
                todoAfter: "",
                hasil: "",
                feedback: ""
            }
        }
    },
    methods: {
        isiMentoring() {
            const mentoringId = parseInt(this.$route.params.id); // Ambil id dari route params
            console.log("ID yang diterima dari route params:", mentoringId); // Debugging ID

            const mentoringData = dataMentoring.find((entry) => entry.id === mentoringId);

            if (mentoringData) {
                console.log("Data ditemukan:", mentoringData); // Debugging data
                this.item.mentee = mentoringData.mentee;
                this.item.status = mentoringData.status;
                this.item.date = mentoringData.Tanggal;
                this.item.time = mentoringData.jam;
                this.item.materi = mentoringData.materi;
                this.item.todoBefore = mentoringData.todopre;
                this.item.todoAfter = mentoringData.todopast;
                this.item.hasil = mentoringData.Hasil;
                this.item.feedback = mentoringData.feedback;
            } else {
                console.error("Data dengan ID tersebut tidak ditemukan");
            }
        }
    },
    mounted() {
        this.isiMentoring();
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
                    <BCol cols="3" class="text-end">
                        <button class="btn btn-success">Simpan</button>
                    </BCol>
                    <hr/>
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
                        <BFormTextarea placeholder="Materi" v-model="item.materi" rows="2" />
                    </BCol>
                    <BCol cols="6" class="mt-4">
                        <Label>To Do Sebelum Mentoring</Label>
                        <BFormTextarea placeholder="Materi" v-model="item.todoBefore" rows="5" />
                    </BCol>
                    <BCol cols="6" class="mt-4">
                        <Label>To Do Setelah Mentoring</Label>
                        <BFormTextarea placeholder="Materi" v-model="item.todoAfter" rows="5" :disabled="!item.status"/>
                    </BCol>
                   <BCol cols="12" class="mt-4">
                        <Label>Hasil Mentoring</Label>
                        <BFormTextarea placeholder="Hasil Mentoring" v-model="item.hasil" rows="5" :disabled="!item.status"/>
                   </BCol>
                     <BCol cols="12" class="mt-4">
                            <Label>Feedback</Label>
                            <BFormTextarea placeholder="Feedback" v-model="item.feedback" rows="5" disabled/>
                    </BCol>
                </BRow>
              </BForm>
            </BCardBody>
        </BCard>
    </Layout>
</template>