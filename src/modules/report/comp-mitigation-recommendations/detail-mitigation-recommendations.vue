<template lang="">
  <section>
    <div v-if="project" class="card card-custom mb-3">
      <div class="card-header border-0 py-5">
        <h3 class="card-title align-items-start flex-column">
          <span class="card-label font-weight-bolder text-dark">{{ project.project_name }} - Tahun {{ project.year | parse('year') }}</span>
          <span class="text-muted mt-3 font-weight-bold font-size-sm">
            {{ project.address }}
            <span v-if="project.rel_province_id">, {{ project.rel_province_id }}</span>
            <span v-if="project.rel_city_id">, {{ project.rel_city_id }}</span>
            <br />
            Supervisor: {{ project.rel_unit_id }}
          </span>
        </h3>
        <div class="card-toolbar">
          <a @click="$emit('back')" class="btn btn-outline-primary btn-icon btn-circle"><i class="ri-arrow-go-back-line p-0"></i></a>
        </div>
      </div>
    </div>
    <div v-if="mainDetail" class="card card-custom mb-3">
      <div class="card-header border-0 pt-5">
        <h3 class="card-title align-items-start flex-column">
          <span class="card-label font-weight-bolder text-dark">Detail Pelaporan Potensi Isu - Level {{ mainDetail.level }}</span>
          <span class="text-primary mt-3 font-weight-bold font-size-sm">{{ mainDetail.created_at | parse('longDateTime') }}</span>
        </h3>
        <div class="card-toolbar">
          <span :class="mainDetail.status_code === 'close' ? 'label-success' : mainDetail.status_code === 'open' ? 'label-info' : 'label-warning'" class="label label-xl font-weight-boldest label-inline">{{ mainDetail.status_code | parse('status_code_form') }}</span>
          <span v-if="mainDetail.status_effective !== null" :class="mainDetail.status_effective === 'effective' ? 'label-success' : 'label-danger'" class="label label-xl font-weight-boldest label-inline ml-2">Mitigasi {{ mainDetail.status_effective === 'effective' ? 'Efektif' : 'Tidak Efektif' }}</span>
        </div>
      </div>
      <div class="card-body pt-3 pb-3">
        <table class="table table-detailX mb-0">
          <tbody>
            <tr>
              <th class="nowrap-table pl-0">Kategori Potensi Isu</th>
              <th class="nowrap-table pl-0">:</th>
              <td>{{ mainDetail.rel_category_id }}</td>
            </tr>
            <tr>
              <th class="nowrap-table pl-0">Risk Register</th>
              <th class="nowrap-table pl-0">:</th>
              <td>{{ mainDetail.rel_issue_id }}</td>
            </tr>
            <tr>
              <th class="nowrap-table pl-0">Sub Risk Register</th>
              <th class="nowrap-table pl-0">:</th>
              <td>{{ mainDetail.rel_sub_issue_id }}</td>
            </tr>
            <tr>
              <th class="nowrap-table pl-0">Penjelasan Potensi Isu</th>
              <th class="nowrap-table pl-0">:</th>
              <td>{{ mainDetail.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <template v-if="mainDetail">
      <div class="row">
        <div class="col-8 pr-0">
          <div v-if="recomendationUnccepted.length" class="card card-custom mb-3">
            <div class="card-header border-0 pt-5">
              <h3 class="card-title align-items-start flex-column">
                <span class="card-label font-weight-bolder text-dark">Rekomendasi Mitigasi belum terverifikasi</span>
              </h3>
            </div>
            <div class="card-body pt-0 pb-2">
              <div v-for="(r, i) in recomendationUnccepted" :key="i + '-recomendationUnccepted'" class="d-flex align-items-center mb-6">
                <label class="checkbox checkbox-lg checkbox-primary align-items-start flex-fill m-0">
                  <input type="checkbox" v-model="r.is_accepted" />
                  <span class="mr-3 mt-1"></span>
                  <div class="flex-fill">
                    <span class="d-block font-weight-bold">{{ r.name }}</span>
                    <span class="d-block font-size-sm">Progres Aktifitas - {{ r.created_at_step | parse('current_step_recomendation') }}</span>
                    <span class="font-size-sm text-muted text-italic">Direkomendasikan oleh {{ r.rel_created_by }}, pada {{ r.created_at | parse('longDateTime') }}</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div v-if="recomendationAccepted.length" class="card card-custom mb-3">
            <div class="card-header border-0 pt-5 min-h-50px">
              <h3 class="card-title align-items-start flex-column">
                <span class="card-label font-weight-bolder text-dark">Rekomendasi Mitigasi terverifikasi</span>
              </h3>
            </div>
            <div class="card-body pt-0 pb-0">
              <ol class="pl-3">
                <li v-for="(r, i) in recomendationAccepted" :key="i + '-recomendationAccepted'" class="mb-3">
                  <div class="flex-fill pointer pl-2">
                    <span class="d-block font-weight-bold">{{ r.name }}</span>
                    <span class="d-block font-size-sm">{{ r.verified_description }}</span>
                    <span class="font-size-sm text-muted text-italic">Direkomendasikan oleh {{ r.rel_created_by }}, pada {{ r.created_at | parse('longDateTime') }}</span>
                    <span class="d-block font-size-sm text-muted text-italic">Diverifikasi oleh {{ r.rel_verified_by }}, pada {{ r.verified_at | parse('longDateTime') }}</span>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card card-custom mb-3">
            <div class="card-header min-h-50px border-0 pt-5">
              <h3 class="card-title align-items-start flex-column">
                <span class="card-label font-weight-bolder text-dark">Verifikasi Rekomendasi</span>
              </h3>
            </div>
            <div v-if="!mainDetail.verified_by && $_sys.isAllowed('validate-mitigation-recommendations')" class="card-body pt-0">
              <p class="font-size-sm">Pilih Rekomendasi belum terverifikasi disamping dan isi Penjelasan / Deskripsi / Alasan untuk memverifikasi rekomendasi mitigasi.</p>
              <ValidationObserver v-slot="{ handleSubmit }">
                <form autocomplete="off" @submit.prevent="handleSubmit(saveStatusMitigation)">
                  <template>
                    <s-input v-model="tempFormStatus.description" :item="{ label: 'Penjelasan / Deskripsi / Alasan', nm: false, inline: false, type: 'textarea', row: 3, validation: ['required'] }" />
                  </template>
                  <button :disabled="!recomendationUnccepted.filter((x) => x.is_accepted).length" class="btn btn-light-success btn-block font-weight-bolder text-capitalize">Verifikasi Mitigasi</button>
                </form>
              </ValidationObserver>
            </div>
            <div v-else class="card-body pt-0">
              <template v-if="mainDetail.verified_by">
                <p class="font-weight-normal font-size-md text-dark-75 pb-2">{{ mainDetail.verified_description }}</p>
                <p class="font-weight-normal font-size-sm text-dark-50 pb-2">Dilakukan oleh {{ mainDetail.rel_verified_by }}, pada {{ mainDetail.verified_at | parse('longDateTime') }}</p>
              </template>
              <p v-else class="font-weight-normal text-dark-50 pb-0 pt-1">Menunggu verifikasi rekomendasi mitigasi</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>
<script>
export default {
  name: 'detail-mitigation-recommendations',
  props: ['id'],
  data () {
    return {
      mainDetail: null,
      project: null,
      recomendationAccepted: [],
      recomendationUnccepted: [],
      tempFormStatus: {}
    }
  },
  mounted () {
    this.getAllData()
  },
  methods: {
    async getAllData (init = true) {
      this.$_api
        .get('potential-issues/' + this.id + '/show', null)
        .then((res) => {
          this.mainDetail = res.data
          if (init) {
            this.loadProject()
            this.loadRecomendationMitigation()
          }
        })
        .catch((err) => {
          this.$_alert.error(err)
        })
    },
    loadProject () {
      this.$_api
        .get('projects/' + this.mainDetail.project_id + '/show', null)
        .then((res) => {
          this.project = res.data
        })
        .catch((err) => {
          this.$_alert.error(err)
        })
    },
    loadRecomendationMitigation () {
      this.$_api
        .get('mitigation-recommendations/dataset', { potency_issue_id: this.id, sort_by: 'id', sort: 'ASC' })
        .then((res) => {
          this.recomendationAccepted = res.data.filter((x) => x.is_accepted)
          this.recomendationUnccepted = res.data.filter((x) => !x.is_accepted)
          if (!this.recomendationUnccepted.length) {
            this.$router.push({
              name: 'mitigation-recommendations',
              query: { view: 'list' }
            })
          }
        })
        .catch((err) => {
          this.$_alert.error(err)
        })
    },
    saveStatusMitigation () {
      let form = Object.assign({}, this.tempFormStatus)
      form.id = this.id
      form.recommendation_accepted = this.recomendationUnccepted.filter((x) => x.is_accepted)
      this.$_api
        .post('custom/mitigation-recommendations/validation', form)
        .then(async (res) => {
          this.loadRecomendationMitigation()
          this.tempFormStatus = {}
          this.$_alert.success('Data Rekomendasi Mitigasi berhasil diperbarui !')
        })
        .catch((err) => {
          this.$_alert.error(err)
        })
    }
  }
}
</script>
