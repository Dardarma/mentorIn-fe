<script>
import Layout from "@/layouts/main";
import PageHeader from "@/components/page-header";



export default{
    components:{
        Layout,
        PageHeader
    },
    data(){

        return{
            optionsStatus:[
            { value:"Selesai", text:"Selesai"},
            { value:"Belum", text:"Belum Selesai"}
            ],
            status: "Belum",
            

        }

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
                        <RouterLink to="/mentoring" class="btn btn-primary">&lt;</RouterLink>
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
              <BForm>
                <BRow>
                    <BCol cols="6">
                        <Label>Mentee</Label>
                        <BFormSelect v-model="ex1Selected" :options="ex1Options" />
                    </BCol>
                    <BCol cols="6">
                        <Label>Status</Label>
                        <BFormSelect :options="optionsStatus" v-model="status"/>
                    </BCol>
                    <BCol cols="6" class="mt-4">
                        <Label>Tanggal</Label>
                        <BFormInput type="date" v-model="date" />   
                    </BCol>
                    <BCol cols="6" class="mt-4">
                        <Label>Waktu</Label>
                        <BFormInput type="time" v-model="time" />
                    </BCol>
                    <BCol cols="12" class="mt-4">
                        <Label>Materi</Label>
                        <BFormTextarea placeholder="Materi" v-model="textarea" rows="2" />
                    </BCol>
                    <BCol cols="6" class="mt-4">
                        <Label>To Do Sebelum Mentoring</Label>
                        <BFormTextarea placeholder="Materi" v-model="textarea" rows="5" />
                    </BCol>
                    <BCol cols="6" class="mt-4">
                        <Label>To Do Setelah Mentoring</Label>
                        <BFormTextarea placeholder="Materi" v-model="textarea" rows="5" :disabled="status === 'Belum'"/>
                    </BCol>
                   <BCol cols="12" class="mt-4">
                        <Label>Hasil Mentoring</Label>
                        <BFormTextarea placeholder="Hasil Mentoring" v-model="textarea" rows="5" :disabled="status === 'Belum'"/>
                   </BCol>
                     <BCol cols="12" class="mt-4">
                            <Label>Feedback</Label>
                            <BFormTextarea placeholder="Feedback" v-model="textarea" rows="5" disabled/>
                    </BCol>
                </BRow>
              </BForm>
            </BCardBody>
        </BCard>
    </Layout>
</template>