<script>
export default {
    name: "CardItem",
    props: {
        cardItem:{
            type: Array,
            required: true
        }
    },
    data() {
        return {
            gridData1: [],
            searchData: ""
        };
    },
    created() {
        this.gridData1 = this.cardItem;
    }
    ,
    computed: {
      filteredData() {
        return this.gridData1.filter((data) => {
          const search = this.searchData.toLowerCase();
          return(
            data.title.toLowerCase().includes(search) ||
            data.mentee.toLowerCase().includes(search)||
            data.Tanggal.toLowerCase().includes(search)
          );
        });
      }
    },
    methods: {
        dataTableAction() {
            this.$emit("searchData", {
                searchData: this.searchData
            });
        },
        truncateText(text, maxLength) {
            if (typeof text === 'string' && text.length > maxLength) {
                return text.substring(0, maxLength) + "...";
            }
            return text;
        },
        openModal(id) {
            this.$emit("showModal",id);
        }
    }
}
</script>



<template>
    <div>
        <BCard no-body>
            <div class="mt-4">
                <BRow class="justify-content-center">
                    <BCol xl="10">
                        <div>
                            <BRow class="align-items-center">
                                <BCol cols="5">
                                    <div>
                                        <h5 class="mb-0">Report Mentoring</h5>
                                    </div>
                                </BCol>
                                <BCol cols="7">
                                    <div class="d-flex justify-content-end">
                                        <input
                                            type="text"
                                            class="form-control w-70 p-1"
                                            placeholder="Cari Data ..."
                                            v-model="searchData"
                                            @input="dataTableAction"
                                        />
                                    </div>
                                </BCol>
                            </BRow>
                            <hr class="mb-4" />
                            <BRow>
                                <BCol sm="6" v-for="card in filteredData" :key="card.id">
                                    <BCard no-body class="p-1 border shadow-none">
                                        <div class="p-2">
                                            <h5>
                                                <router-link to="/blog/detail" class="text-dark">{{ card.title }}</router-link>
                                            </h5>
                                            <p class="text-muted mb-0">{{ card.Tanggal }}</p>
                                            <ul class="list-inline mt-1">
                                                <li class="list-inline-item me-3">
                                                    <BLink href="javascript:void(0);" class="text-muted">
                                                        <i class='bx bx-user'></i>
                                                        {{ card.mentee }}
                                                    </BLink>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="p-2">
                                            <strong>Materi:</strong>
                                            <p>{{ truncateText(card.materi, 20) }}</p>
                                            <strong>To-Do Past:</strong> 
                                            <p>{{ truncateText(card.todopast, 20) }}</p>
                                            <strong>To-Do Pre:</strong> 
                                            <p>{{ truncateText(card.todopre, 20) }}</p>
                                            <strong>Hasil:</strong> 
                                            <p>{{ truncateText(card.Hasil, 20) }}</p>
                                            <strong>Feedback:</strong>
                                            <p>{{ truncateText(card.feedback, 20) }}</p>
                                            <div>
                                                <BLink @click.prevent="openModal(card.id)" class="text-primary">
                                                  Read more <i class="mdi mdi-arrow-right"></i>
                                                </BLink>
                                            </div>
                                        </div>
                                    </BCard>
                                </BCol>
                            </BRow>
                            <hr class="my-4" />
                            <div class="text-center">
                                <pagination />
                            </div>
                        </div>
                    </BCol>
                </BRow>
            </div>
        </BCard>
    </div>
</template>

