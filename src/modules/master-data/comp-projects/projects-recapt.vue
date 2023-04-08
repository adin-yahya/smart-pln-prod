<template lang="">
  <div v-if="recaptProject" class="rounded py-5 bg-white">
    <div class="d-flex">
      <div class="text-center">
        <span class="font-weight-lg font-weight-bolder d-block mb-1">Rekapitulasi Risk Register</span>
        <div class="d-flex align-items-end">
          <div class="font-weight-bold text-center text-muted font-size-sm">
            Kategori Potensi Isu
            <span class="d-block text-primary font-size-h2 font-weight-bolder">
              {{ recaptProject.total_category || 0 }}
            </span>
          </div>
          <div class="font-weight-bold text-center text-muted font-size-sm ml-5">
            Risk Register
            <span class="d-block text-primary font-size-h2 font-weight-bolder">
              {{ recaptProject.total_issue || 0 }}
            </span>
          </div>
          <div class="font-weight-bold text-center text-muted font-size-sm ml-5">
            Sub Risk Register
            <span class="d-block text-primary font-size-h2 font-weight-bolder">
              {{ recaptProject.total_sub_issue || 0 }}
            </span>
          </div>
          <div class="font-weight-bold text-center text-muted font-size-sm ml-5">
            Mitigasi
            <span class="d-block text-primary font-size-h2 font-weight-bolder">
              {{ recaptProject.total_mitigation || 0 }}
            </span>
          </div>
        </div>
      </div>
      <div class="v-separator mx-1 px-2" style="height:79px"></div>
      <div class="text-center">
        <span class="font-weight-lg font-weight-bolder d-block mb-1">Rekapitulasi Status Sub Risk Register</span>
        <div class="d-flex">
          <div class="font-weight-bold text-center text-muted font-size-sm ml-2">
            Belum Dimitigasi
            <span class="d-block text-primary font-size-h2 font-weight-bolder">
              {{ recaptProject.potency_issue_open || 0 }}
            </span>
          </div>
          <div class="font-weight-bold text-center text-muted font-size-sm ml-5">
            Sedang Dimitigasi
            <span class="d-block text-primary font-size-h2 font-weight-bolder">
              {{ recaptProject.potency_issue_on_going || 0 }}
            </span>
          </div>
          <div class="font-weight-bold text-center text-muted font-size-sm ml-5">
            Sudah Dimitigasi
            <span class="d-block text-primary font-size-h2 font-weight-bolder">
              {{ recaptProject.potency_issue_close || 0 }}
            </span>
          </div>
        </div>
      </div>
      <div class="v-separator mx-1 px-2" style="height:79px"></div>
      <div class="text-center">
        <span class="font-weight-lg font-weight-bolder d-block mb-1">Rekapitulasi Status Mitigasi</span>
        <div class="d-flex">
          <div class="font-weight-bold text-center text-muted font-size-sm ml-2">
            Belum Dilakukan
            <span class="d-block text-primary font-size-h2 font-weight-bolder">
              {{ recaptProject.mitigation_open || 0 }}
            </span>
          </div>
          <div class="font-weight-bold text-center text-muted font-size-sm ml-5">
            Sedang Dilakukan
            <span class="d-block text-primary font-size-h2 font-weight-bolder">
              {{ recaptProject.mitigation_on_going || 0 }}
            </span>
          </div>
          <div class="font-weight-bold text-center text-muted font-size-sm ml-5">
            Sudah Dilakukan
            <span class="d-block text-primary font-size-h2 font-weight-bolder">
              {{ recaptProject.mitigation_close || 0 }}
            </span>
          </div>
          <div class="font-weight-bold text-center text-muted font-size-sm ml-5">
            Mitigasi NA
            <span class="d-block text-primary font-size-h2 font-weight-bolder">
              {{ recaptProject.mitigation_na || 0 }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>
<script>
export default {
  name: 'project-recapt',
  props: ['id'],
  data () {
    return {
      recaptProject: null
    }
  },
  watch: {
    id: {
      immediate: true,
      deep: false,
      handler (e) {
        this.loadRecaptProject(e)
      }
    }
  },
  methods: {
    loadRecaptProject (id) {
      this.$_api
        .get('custom/potency-issue/recap-by-project', { project_id: id })
        .then((res) => {
          this.recaptProject = res.data
          this.loadingCount++
        })
        .catch((err) => {
          this.loadingCount++
          this.$_alert.error(err)
        })
    }
  }
}
</script>
<style lang=""></style>
