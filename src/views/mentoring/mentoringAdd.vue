<script>

export default{
    name: 'MentoringAdd',
}
</script>

<template>
      <b-form class="p-0" >
        <div class="row">
            <div class="col-12 ">
                <b-form-group label="Nama Mentee" label-for="namaMentee">
                    <b-form-select id="namaMentee" v-model="mentee" :options="optionsMentee" />
                </b-form-group>
            </div>
            <div class="col-6 mt-4">
                <b-form-group label="Tanggal" label-for="tanggal">
                    <b-form-input id="tanggal" type="date" v-model="tanggal" />
                </b-form-group>
            </div>
            <div class="col-6 mt-4">
                <b-form-group label="Waktu" label-for="waktu">
                    <b-form-input id="waktu" type="time" v-model="waktu" />
                </b-form-group>
            </div>
            <div class="col-12 mt-4">
                <b-form-group label="Materi" label-for="materi">
                    <b-form-textarea id="materi" v-model="materi"  rows="3"/>
                </b-form-group>
            </div>
            <div class="col-12 mt-4">
                <b-form-group label="To Do Sebelum Mentoring" label-for="materi">
                    <b-form-textarea id="materi" v-model="materi"  rows="3"/>
                </b-form-group>
            </div>
        </div>
      </b-form>
</template>