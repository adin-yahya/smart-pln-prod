<template>
  <div class="container">
    <div class="card card-custom">
      <div class="card-header border-0 pt-5">
        <h3 class="card-title align-items-start flex-column">
          <span class="card-label font-weight-bolder text-dark">My Action</span>
          <span class="text-muted mt-3 font-weight-bold font-size-sm">{{ $_config.fullname }}</span>
        </h3>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-3 border-r">
            <ul class="navi navi-link-rounded navi-accent navi-hover navi-active nav flex-column mb-8 mb-lg-0" role="tablist">
              <li v-for="(m, i) in actionModule" :key="i + '-actionModule-ul'" @click="setActiveCode(m.action_code)" class="navi-item mb-2 pointer">
                <a :class="m.action_code === activeModule ? 'active' : ''" class="navi-link" data-toggle="tab">
                  <span :class="m.action_code === activeModule ? 'text-dark' : 'text-dark-50'" class="navi-text font-size-h6 font-weight-bold">{{ m.action_name }}</span>
                  <span v-if="m.total" class="label label-smX label-rounded label-primary">{{ m.total }}</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="col-9 position-relative">
            <b-overlay :show="isLoading" no-wrap :opacity="0.3" />
            <div v-if="actionList.length" class="table-responsive mb-0">
              <template v-if="activeModule === 'potency-issue-approval'">
                <table class="table table-custom-header">
                  <thead>
                    <th class="pt-0 ">Kategori</th>
                    <th class="pt-0">Risk Register</th>
                    <th class="pt-0">Sub Risk Register</th>
                    <th class="pt-0 nowrap-table">Status Mitigasi</th>
                    <th class="pt-0 nowrap-table">Progress Aktifitas</th>
                    <th class="pt-0 nowrap-table"></th>
                  </thead>
                  <tbody>
                    <tr v-for="(d, i) in actionList" :key="i + '-actionList'">
                      <td class="v-center min-w-150px">
                        <div class="text-line-2">
                          {{ d.rel_category_id }}
                        </div>
                      </td>
                      <td class="v-center min-w-150px">
                        <div class="text-line-2">
                          {{ d.rel_issue_id }}
                        </div>
                      </td>
                      <td class="v-center">
                        <div class="text-line-2">
                          {{ d.rel_sub_issue_id }}
                        </div>
                      </td>
                      <td class="nowrap-table v-center">
                        <span :class="{ 'badge badge-danger': d.status_code === 'open', 'badge badge-warning': d.status_code === 'on_going', 'badge badge-success': d.status_code === 'close' }">{{ d.status_code | parse('status_code_form') }}</span>
                      </td>
                      <td class="nowrap-table v-center">
                        <span
                          :class="{
                            'badge badge-primary': d.current_step === 'on_validation',
                            'badge badge-warning': d.current_step === 'on_review',
                            'badge badge-success': d.current_step === 'on_verification',
                            'badge badge-danger': d.current_step === 'reported' || d.current_step === 'on_mitigation',
                          }"
                        >
                          {{ d.current_step | parse('current_step_next') }}
                        </span>
                      </td>
                      <td class="text-right v-center">
                        <a @click="redirect(d)" class="btn btn-icon btn-light btn-sm">
                          <span class="svg-icon svg-icon-md svg-icon-success">
                            <!--begin::Svg Icon | path:/metronic/theme/html/demo3/dist/assets/media/svg/icons/Navigation/Arrow-right.svg-->
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <polygon points="0 0 24 0 24 24 0 24"></polygon>
                                <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)" x="11" y="5" width="2" height="14" rx="1"></rect>
                                <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)"></path>
                              </g>
                            </svg>
                            <!--end::Svg Icon-->
                          </span>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </template>
              <template v-if="activeModule === 'mitigation-recommendation'">
                <table class="table table-custom-header">
                  <thead>
                    <th class="pt-0 ">Kategori</th>
                    <th class="pt-0">Risk Register</th>
                    <th class="pt-0">Sub Risk Register</th>
                    <th class="pt-0 nowrap-table">Progress Verifikasi</th>
                    <th class="pt-0 nowrap-table"></th>
                  </thead>
                  <tbody>
                    <tr v-for="(d, i) in actionList" :key="i + '-actionList'">
                      <td class="v-center min-w-150px">
                        <div class="text-line-2">
                          {{ d.rel_category_id }}
                        </div>
                      </td>
                      <td class="v-center min-w-150px">
                        <div class="text-line-2">
                          {{ d.rel_issue_id }}
                        </div>
                      </td>
                      <td class="v-center">
                        <div class="text-line-2">
                          {{ d.rel_sub_issue_id }}
                        </div>
                      </td>
                      <td class="v-center nowrap-table">
                       {{ d.recommendation_verified }} dari {{ d.total_recommendation }} Mitigasi
                      </td>
                      <td class="text-right v-center">
                        <a @click="redirect(d)" class="btn btn-icon btn-light btn-sm">
                          <span class="svg-icon svg-icon-md svg-icon-success">
                            <!--begin::Svg Icon | path:/metronic/theme/html/demo3/dist/assets/media/svg/icons/Navigation/Arrow-right.svg-->
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <polygon points="0 0 24 0 24 24 0 24"></polygon>
                                <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)" x="11" y="5" width="2" height="14" rx="1"></rect>
                                <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)"></path>
                              </g>
                            </svg>
                            <!--end::Svg Icon-->
                          </span>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-actions-module',
  data () {
    return {
      actionModule: null,
      actionList: [],
      activeModule: null,
      isLoading: false
    }
  },
  mounted () {
    this.getModules()
  },
  methods: {
    getModules () {
      this.$_api.list('m-actions').then(
        (res) => {
          this.actionModule = res.data.filter((x) => this.$_sys.isAllowed(x.permission) && x.action_code !== 'inspection-schedules')
          this.activeModule = this.actionModule[0].action_code
          this.getList(this.actionModule[0].action_code)
        },
        (err) => {
          this.$_alert.error(err)
        }
      )
    },
    getList (actionCode) {
      this.isLoading = true
      this.actionList = []
      this.$_api.get('my-actions', { action_code: actionCode, limit: 10000 }).then(
        (res) => {
          this.actionList = res.data
          this.isLoading = false
        },
        (err) => {
          this.isLoading = false
          this.$_alert.error(err)
        }
      )
    },
    setActiveCode (e) {
      this.activeModule = e
      this.getList(e)
    },
    bgMitigationStatus (prefix, e) {
      if (e === null) return prefix + '-info'
      else if (e === 'on_verification') return prefix + '-success'
      else return prefix + '-warning'
    },
    redirect (data) {
      let param = {
        view: 'detail',
        id: data.id
      }
      // if (this.activeModule === 'potency-issue-approval') {
      //   param.id = data.potency_issue_id
      //   param.mid = data.id
      // }
      let modulesTarget = this.activeModule
      if (this.activeModule === 'potency-issue-approval') modulesTarget = 'potential-issues'
      if (this.activeModule === 'mitigation-recommendation') modulesTarget = 'mitigation-recommendations'
      this.$router.push({
        name: modulesTarget,
        query: param
      })
    }
  }
}
</script>

<style>
  .border-r {
    border-right: 1px solid #ebedf3;
  }
  .border-l {
    border-left: 1px solid #ebedf3;
  }
</style>
