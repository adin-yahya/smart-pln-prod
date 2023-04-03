<template>
  <div class="containerX">
    <div class="row">
      <div class="col col-5 align-self-start sticky-top">
        <div class="b-overlay-wrap position-relative" :show="loading" no-wrap :opacity="0.9">
          <div class="card card-custom animated">
            <div class="card-header border-0 mt-5" style="min-height: 20px;">
              <div class="card-title m-0">
                <h4 class="m-0">List Risk Register</h4>
              </div>
              <div class="card-toolbar m-0">
                <div class="m-0">
                  <button class="btn btn-sm btn-light-primary" v-if="$_sys.isAllowed(config.permissionMaster.create)" @click="openformMaster('create')">Tambah Risk Register Baru</button>
                </div>
              </div>
            </div>
            <div class="card-header py-3" style="min-height: 20px;">
              <div class="card-toolbar flex-fill">
                <div class="input-icon flex-fill">
                  <input v-model="masterFilter.search" @input="getMasterData()" autocomplete="off" name="search" type="text" placeholder="Cari dalam list Risk Register" class="form-control seach-form" />
                  <span><i class="ri-search-line text-primary"></i></span>
                </div>
              </div>
            </div>
            <div class="card-body p-5 max-height">
              <template v-if="masterData.length">
                <ul class="navi navi-hover">
                  <li v-for="(c, i) in masterData" :key="i + '-category'" class="navi-item pointer" @click="setActiveSlave(c)">
                    <a class="navi-link" :class="activeSlave.issue_code === c.issue_code ? 'active' : ''">
                      <div class="navi-text">
                        <span class="d-block font-size-lg font-weight-bolder navi-hover-title">{{ c.issue_name }}</span>
                        <span class="d-block font-size-sm">Kode : {{ c.issue_code }}</span>
                        <p class="mb-0 text-muted font-size-sm text-line-2">{{ c.description }}</p>
                        <!-- <span class="text-muted font-size-sm">{{ c.description }}</span> -->
                      </div>
                      <span class="symbol symbol-25 ml-3">
                        <span class="symbol-label navi-hover-label bg-light-primary">
                          <i class="text-primary ri-arrow-right-line"></i>
                        </span>
                      </span>
                    </a>
                  </li>
                </ul>
                <div class="d-flex justify-content-between align-item-center mt-3">
                  <label class="mr-5">{{ detailMasterPagination }}</label>
                  <div class="col-auto p-0">
                    <button @click="goPageMaster('prev')" :disabled="masterFilter.page == 1" class="btn btn-icon btn-outline-primary btn-sm"><i class="ri-arrow-left-s-line"></i></button>
                    <button @click="goPageMaster('next')" :disabled="masterFilter.page == maxMasterPage" class="btn btn-icon btn-outline-primary btn-sm"><i class="ri-arrow-right-s-line"></i></button>
                  </div>
                </div>
              </template>
              <template v-else>
                <p v-if="!masterFilter.search" class="text-center text-muted font-weight-bold">Belum ada data yang ditambahkan</p>
                <p v-else class="text-center text-muted font-weight-bold">{{ masterFilter.search }} tidak ditemukan</p>
              </template>
            </div>
          </div>
        </div>
      </div>
      <!-- DETAIL master & slave -->
      <div class="col col-7" :class="!activeSlave.id ? (!masterFormMode.active ? `col-6 align-self-center` : ``) : ``">
        <!-- NO SELECTED -->
        <div v-if="!activeSlave.id" :class="!masterFormMode.active ? `no-data-wrapper` : ``">
          <!-- FORM Master -->
          <b-overlay v-if="masterFormMode.active" :show="loadingForm" rounded="sm" no-fade>
            <div class="card card-custom animated">
              <div class="card-header border-0 pb-0">
                <div class="card-title flex-fill mr-0">
                  <h4>{{ masterFormMode.mode === 'create' ? $t('global.form_add') : $t('global.form_edit') }} Risk Register</h4>
                </div>
                <div class="card-toolbar">
                  <button class="btn btn-sm btn-icon btn-light-primary" @click="setActiveSlave(activeSlave, true)"><i class="ri-arrow-go-back-line"></i></button>
                </div>
              </div>
              <div class="card-body pt-0">
                <ValidationObserver v-slot="{ handleSubmit }">
                  <form autocomplete="off" @submit.prevent="handleSubmit(saveMaster)">
                    <div class="row">
                      <div class="col-12">
                        <s-input v-model="formMaster.issue_name" :item="{ label: 'Nama Risk Register', nm: false, inline: false, validation: ['required'], type: 'text' }" />
                        <s-input v-model="formMaster.issue_code" :item="{ label: 'Kode', nm: false, inline: false, validation: ['required'], type: 'text' }" />
                        <s-input v-model="formMaster.description" :item="{ label: 'Keterangan', nm: false, inline: false, type: 'textarea', row: 3, validation: [] }" />
                        <div class="form-group">
                          <ValidationProvider mode="aggressive" name="Status" rules="required" v-slot="{ errors }">
                            <label>
                              Status
                              <span class="text-danger">*</span>
                            </label>
                            <div class="mt-2 mt-2 radio-inline">
                              <label id="label-active-category-1" class="radio mr-5">
                                <input type="radio" id="active-category-1" name="active-category-1" value="1" v-model="formMaster.active" />
                                <span></span>
                                <a id="text-active-category-1">Aktif</a>
                              </label>

                              <label id="label-active-category-0" class="radio mr-5">
                                <input type="radio" id="active-category-0" name="active-category-0" value="0" v-model="formMaster.active" />
                                <span></span>
                                <a id="text-active-category-0">Tidak Aktif</a>
                              </label>
                            </div>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </ValidationProvider>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-between">
                      <button type="submit" class="btn btn-primary mr-3" v-if="$_sys.isAllowed(config.permissionMaster.create)">
                        <i class="ri-save-line"></i>
                        {{ $t('global.submit') }}
                      </button>
                    </div>
                  </form>
                </ValidationObserver>
              </div>
            </div>
          </b-overlay>
          <template v-else>
            <img src="/static/img/default/no-data.svg" alt="" style="width: fit-content; align-self: center;" />
            <div class="alert alert-custom alert-light-primary mt-3" role="alert">
              <div class="alert-icon">
                <span class="svg-icon svg-icon-primary svg-icon-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <polygon points="0 0 24 0 24 24 0 24"></polygon>
                      <path d="M5.85714286,2 L13.7364114,2 C14.0910962,2 14.4343066,2.12568431 14.7051108,2.35473959 L19.4686994,6.3839416 C19.8056532,6.66894833 20,7.08787823 20,7.52920201 L20,20.0833333 C20,21.8738751 19.9795521,22 18.1428571,22 L5.85714286,22 C4.02044787,22 4,21.8738751 4,20.0833333 L4,3.91666667 C4,2.12612489 4.02044787,2 5.85714286,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path>
                      <path d="M11,14 L9,14 C8.44771525,14 8,13.5522847 8,13 C8,12.4477153 8.44771525,12 9,12 L11,12 L11,10 C11,9.44771525 11.4477153,9 12,9 C12.5522847,9 13,9.44771525 13,10 L13,12 L15,12 C15.5522847,12 16,12.4477153 16,13 C16,13.5522847 15.5522847,14 15,14 L13,14 L13,16 C13,16.5522847 12.5522847,17 12,17 C11.4477153,17 11,16.5522847 11,16 L11,14 Z" fill="#000000"></path>
                    </g>
                  </svg>
                </span>
              </div>
              <div class="alert-text">Pilih salah satu Item untuk melihat Detail Risk Register</div>
            </div>
          </template>
        </div>
        <div v-else>
          <div class="card card-custom animated">
            <div class="card-header border-0 pb-0">
              <div class="card-title flex-fill mr-0"><h4 class="mb-0">Detail Risk Register</h4></div>
              <div class="card-toolbar">
                <button class="btn btn-sm btn-icon mr-2 btn-light-danger" v-if="$_sys.isAllowed(config.permissionMaster.delete)" @click="deleteData(activeSlave, config.apiMaster.delete)">
                  <i class="ri-delete-bin-2-line"></i>
                </button>
                <button class="btn btn-sm btn-icon mr-2 btn-light-warning" v-if="$_sys.isAllowed(config.permissionMaster.update)" @click="openformMaster('update', activeSlave)">
                  <i class="ri-edit-2-line"></i>
                </button>
                <div class="v-separator ml-1 mr-3"></div>
                <button class="btn btn-sm btn-icon btn-light-primary" @click="setActiveSlave({})"><i class="ri-arrow-go-back-line"></i></button>
              </div>
            </div>
            <div class="card-body pt-0 pb-3">
              <table class="table no-border mb-0">
                <tr
                  v-for="(x, index) in [
                    { id: 'issue_name', label: 'Kategori Potensi' },
                    { id: 'issue_code', label: 'Kode Kategori' },
                    { id: 'description', label: 'Keterangan' },
                  ]"
                  :key="index + '-data'"
                >
                  <td class="nowrap-table">{{ x.label }}</td>
                  <td class="nowrap-table">:</td>
                  <td>{{ activeSlave[x.id] || `-` }}</td>
                </tr>
                <tr>
                  <td class="nowrap-table">Status</td>
                  <td class="nowrap-table">:</td>
                  <td>
                    <span class="text-line-2 badge mt-1" :class="activeSlave.active === 1 ? `badge-success` : `badge-danger`">Data {{ activeSlave.active === 1 ? `Aktif` : `Tidak Aktif` }}</span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <b-overlay :show="slaveLoading" rounded="sm" no-fade>
            <div class="card card-custom animated mt-3">
              <div class="card-header border-0 mt-5" style="min-height: 20px;">
                <div class="card-title m-0">
                  <h4 class="m-0">
                    <h5>Sub Risk Register - {{ activeSlave.issue_name }}</h5>
                  </h4>
                </div>
                <div class="card-toolbar m-0">
                  <div class="m-0">
                    <button class="btn btn-sm btn-light-primary" v-if="$_sys.isAllowed(config.permissionSlave.create)" @click="openFormSlave('create')">Tambah Sub Risk Register Baru</button>
                  </div>
                </div>
              </div>
              <div class="card-header py-3" style="min-height: 20px;">
                <div class="card-toolbar flex-fill">
                  <div class="input-icon flex-fill">
                    <input v-model="slaveFilter.search" @input="getSlaveData()" autocomplete="off" name="search" type="text" placeholder="Cari dalam tipe alat" class="form-control seach-form" />
                    <span><i class="ri-search-line text-primary"></i></span>
                  </div>
                </div>
              </div>

              <div class="card-body">
                <div v-if="slaveData.length">
                  <div class="table-responsive">
                    <table class="table table-head-custom table-vertical-center table-borderless table-hover">
                      <thead class="">
                        <tr>
                          <th class="position-relative nowrap" @click="orderField('sub_issue_code')">
                            <span class="d-block nowrap" :class="{ 'text-dark-75 mr-5': slaveFilter.sort_by === 'sub_issue_code' }">Kode</span>
                            <i v-if="slaveFilter.sort_by === 'sub_issue_code'" class="sort-table text-dark-75" :class="'ri-sort-' + slaveFilter.sort.toLowerCase()"></i>
                          </th>
                          <th class="position-relative sticky" @click="orderField('sub_issue_name')" style="min-width: unset !important;">
                            <span class="d-block nowrap" :class="{ 'text-dark-75 mr-5': slaveFilter.sort_by === 'sub_issue_name' }">Sub Risk Register</span>
                            <i v-if="slaveFilter.sort_by === 'sub_issue_name'" class="sort-table text-dark-75" :class="'ri-sort-' + slaveFilter.sort.toLowerCase()"></i>
                          </th>
                          <th class="position-relative" @click="orderField('description')">
                            <span class="d-block nowrap" :class="{ 'text-dark-75 mr-5': slaveFilter.sort_by === 'description' }">Keterangan</span>
                            <i v-if="slaveFilter.sort_by === 'description'" class="sort-table text-dark-75" :class="'ri-sort-' + slaveFilter.sort.toLowerCase()"></i>
                          </th>
                          <th class="action-table"></th>
                        </tr>
                      </thead>
                      <tbody v-if="slaveData.length > 0">
                        <tr v-for="(b, i) in slaveData" :key="i + '-body'">
                          <td class="nowrap">
                            <span class="text-line-2">{{ b.sub_issue_code }}</span>
                          </td>
                          <td class="sticky">
                            <span class="text-line-2">{{ b.sub_issue_name }}</span>
                          </td>
                          <td>
                            <span class="text-line-2">{{ b.description }}</span>
                          </td>
                          <td class="action-table sticky-right">
                            <div class="action-button">
                              <router-link v-if="$_sys.isAllowed(config.permissionSlave.read)" class="btn font-size-sm font-weight-bold btn-info btn-sm" target="_blank" :to="{ name: 'm-sub-issues', query: { view:'detail', id: b.id } }">
                                <i class="ri-information-line p-0"></i>
                                Lihat Detail
                              </router-link>
                              <!-- <a class="btn font-size-sm font-weight-bold btn-info btn-sm" v-if="$_sys.isAllowed(config.permissionSlave.read)" :href="`/#/tools-inspection/m-equipment-types?view=detail&id=` + b.id" target="_blank">
                                <i class="ri-information-line p-0"></i>
                                Lihat Detail
                              </a> -->
                              <a class="btn btn-icon btn-warning btn-sm" v-if="$_sys.isAllowed(config.permissionSlave.update)" @click="openFormSlave('update', b)"><i class="ri-edit-2-line"></i></a>
                              <a class="btn btn-icon btn-danger btn-sm" v-if="$_sys.isAllowed(config.permissionSlave.delete)" @click="deleteData(b, config.apiSlave.delete)"><i class="ri-delete-bin-2-line"></i></a>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="d-flex justify-content-between align-item-center">
                    <label class="mr-5">{{ detailTypePagination }}</label>
                    <div class="col-auto p-0">
                      <button @click="goPageSlave('prev')" :disabled="slaveFilter.page == 1" class="btn btn-icon btn-outline-primary btn-sm"><i class="ri-arrow-left-s-line"></i></button>
                      <button @click="goPageSlave('next')" :disabled="slaveFilter.page == maxSlavePage" class="btn btn-icon btn-outline-primary btn-sm"><i class="ri-arrow-right-s-line"></i></button>
                    </div>
                  </div>
                </div>
                <template v-else>
                  <p v-if="!slaveFilter.search" class="text-center text-muted font-weight-bold">Belum ada data yang ditambahkan</p>
                  <p v-else class="text-center text-muted font-weight-bold">{{ slaveFilter.search }} tidak ditemukan</p>
                </template>
              </div>
            </div>
          </b-overlay>
        </div>
      </div>
    </div>

    <!-- FORM TIPE -->
    <b-modal id="form-tipe" hide-footer centered size="lg">
      <template #modal-header="{ close }">
        <h5 class="card-title d-flex align-items-start flex-column mb-0">
          <span class="card-label font-weight-bolder text-dark">{{ slaveFormMode.mode === 'create' ? $t('global.form_add') : $t('global.form_edit') }} Sub Risk Register</span>
        </h5>
        <button type="button" class="close" aria-label="Close" @click="close()">×</button>
      </template>
      <!-- FORM -->
      <ValidationObserver v-slot="{ handleSubmit }">
        <form autocomplete="off" @submit.prevent="handleSubmit(saveSlave)">
          <div class="row">
            <div class="col-12">
              <s-input v-model="formSlave.sub_issue_name" :item="{ label: 'Nama Sub Risk Register', nm: false, inline: false, validation: ['required'], type: 'text' }" />
              <s-input v-model="formSlave.sub_issue_code" :item="{ label: 'Kode', nm: false, inline: false, validation: ['required'], type: 'text' }" />
              <s-input v-model="formSlave.description" :item="{ label: 'Keterangan', nm: false, inline: false, type: 'textarea', row: 3, validation: [] }" />
              <div class="form-group">
                <ValidationProvider mode="aggressive" name="Kategori Bahaya" rules="required" v-slot="{ errors }">
                  <label>
                    Status
                    <span class="text-danger">*</span>
                  </label>
                  <div class="mt-2 mt-2 radio-inline">
                    <label id="label-active-type-1" class="radio mr-5">
                      <input type="radio" id="active-type-1" name="active-type-1" value="1" v-model="formSlave.active" />
                      <span></span>
                      <a id="text-active-type-1">Aktif</a>
                    </label>

                    <label id="label-active-type-0" class="radio mr-5">
                      <input type="radio" id="active-type-0" name="active-type-0" value="0" v-model="formSlave.active" />
                      <span></span>
                      <a id="text-active-type-0">Tidak Aktif</a>
                    </label>
                  </div>
                  <div class="invalid-feedback">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary mr-3" v-if="$_sys.isAllowed(config.permissionSlave.create)">
              <i class="ri-save-line"></i>
              {{ $t('global.submit') }}
            </button>
          </div>
        </form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'crud-m_issues',
  props: { id: { required: true } },
  data () {
    return {
      title: null,
      loading: false,
      loadingForm: false,
      activeSlave: {},
      masterData: [],
      slaveData: [],
      config: {
        apiMaster: {
          list: 'm-issues',
          create: 'm-issues',
          update: 'm-issues',
          delete: 'm-issues'
        },
        apiSlave: {
          list: 'm-sub-issues',
          create: 'm-sub-issues',
          update: 'm-sub-issues',
          delete: 'm-sub-issues'
        },
        permissionMaster: {
          create: 'create-m-issues',
          read: 'view-m-issues',
          update: 'update-m-issues',
          delete: 'delete-m-issues'
        },
        permissionSlave: {
          create: 'create-m-sub-issues',
          read: 'view-m-sub-issues',
          update: 'update-m-sub-issues',
          delete: 'delete-m-sub-issues'
        }
      },
      masterFilter: { limit: 10, offset: 0, page: 1, search: null, sort: 'DESC' },
      slaveFilter: { limit: 10, offset: 0, page: 1, search: null, sort: 'DESC' },
      slaveTotal: 0,
      masterTotal: 0,
      maxSlavePage: 0,
      maxMasterPage: 0,
      masterFormMode: { active: false, mode: null },
      slaveFormMode: { active: false, mode: null },
      formSlave: {},
      formMaster: {}
    }
  },
  mounted () {
    this.getMasterData()
  },
  computed: {
    detailTypePagination () {
      let _inPage = this.slaveFilter.limit > this.slaveData.length ? this.slaveData.length : this.slaveFilter.limit
      return this.$t('global.display') + ' ' + _inPage + ' ' + this.$t('global.of') + ' ' + this.slaveTotal + ' ' + this.$t('global.record')
    },
    detailMasterPagination () {
      let _inPage = this.masterFilter.limit > this.masterData.length ? this.masterData.length : this.masterFilter.limit
      return this.$t('global.display') + ' ' + _inPage + ' ' + this.$t('global.of') + ' ' + this.masterTotal + ' ' + this.$t('global.record')
    }
  },
  methods: {
    getMasterData () {
      this.loading = true
      this.$_api
        .list(this.config.apiMaster.list, { ...this.masterFilter, ...{ category_id: this.id } })
        .then(async (res) => {
          this.masterData = res.data
          this.masterTotal = res.total
          this.maxMasterPage = res.totalPage
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          this.$_alert.error(err)
        })
    },
    getSlaveData () {
      this.slaveLoading = true
      this.$_api
        .list(this.config.apiSlave.list, this.slaveFilter)
        .then(async (res) => {
          this.slaveData = res.data
          this.slaveTotal = res.total
          this.maxSlavePage = res.totalPage
          this.slaveLoading = false
        })
        .catch((err) => {
          this.slaveLoading = false
          this.$_alert.error(err)
        })
    },
    setActiveSlave (e, doCloseForm = false) {
      this.activeSlave = Object.assign({}, e)
      if (this.activeSlave.id) {
        this.slaveFilter = Object.assign(this.slaveFilter, { issue_id: e.id })
        this.getSlaveData()
      } else {
        this.slaveData = null
      }

      if (doCloseForm) {
        this.masterFormMode = { active: false, mode: null }
      }
    },
    orderField (e) {
      this.slaveFilter = Object.assign(this.slaveFilter, { sort_by: e })
      if (this.slaveFilter.sort === 'ASC') {
        this.slaveFilter = Object.assign(this.slaveFilter, { sort: 'DESC' })
      } else {
        this.slaveFilter = Object.assign(this.slaveFilter, { sort: 'ASC' })
      }
      this.getSlaveData()
    },
    openformMaster (mode, data = {}) {
      this.masterFormMode = { active: true, mode: mode }
      this.setActiveSlave({})

      this.formMaster = mode === 'update' ? data : {}
    },
    openFormSlave (mode, data = {}) {
      this.slaveFormMode = { active: true, mode: mode }
      this.$bvModal.show('form-tipe')

      if (mode === 'create') {
        this.$set(this.formSlave, 'issue_id', this.activeSlave.id)
      } else {
        this.formSlave = data
      }
    },
    saveMaster () {
      if (this.masterFormMode.mode === 'create') {
        let form = {
          category_id: this.id
        }
        this.$_api
          .create(this.config.apiMaster.create, { ...this.formMaster, ...form })
          .then((res) => {
            this.$emit('success', res.data)
            this.setActiveSlave(res.data)
            this.masterFormMode = { active: false, mode: null }
            this.getMasterData()
          })
          .catch((err) => {
            this.$_alert.error(err)
          })
      } else {
        this.$_api
          .update(this.config.apiMaster.update, this.formMaster)
          .then((res) => {
            this.$emit('success', res.data)
            this.setActiveSlave(res.data)
            this.masterFormMode = { active: false, mode: null }
            this.getMasterData()
          })
          .catch((err) => {
            this.$_alert.error(err)
          })
      }
    },
    async saveSlave () {
      if (this.slaveFormMode.mode === 'create') {
        let form = {
          issue_id: this.activeSlave.id
        }
        await this.$_api
          .create(this.config.apiSlave.create, { ...this.formSlave, ...form })
          .then((res) => {
            this.$emit('success', res.data)
            this.slaveFormMode = { active: false, mode: null }
            this.close()
            this.getSlaveData()
          })
          .catch((err) => {
            this.$_alert.error(err)
          })
      } else {
        this.$_api
          .update(this.config.apiSlave.update, this.formSlave)
          .then((res) => {
            this.$emit('success', res.data)
            this.slaveFormMode = { active: false, mode: null }
            this.close()
            this.getSlaveData(res.data.id)
          })
          .catch((err) => {
            this.getSlaveData()
            this.$_alert.error(err)
          })
      }
    },
    close () {
      this.$bvModal.hide('form-tipe')
      this.formSlave = {}
    },
    deleteData (data, endpoint) {
      this.$_alert.confirm('Hapus Permanen', 'Data yang sudah dihapus tidak dapat dikembalikan, lanjutkan ?').then((result) => {
        if (result.isConfirmed) {
          this.$_api
            .delete(endpoint, { data: data })
            .then((res) => {
              this.$_alert.success(null, res.message)
              if (endpoint === this.config.apiSlave.delete) {
                this.getSlaveData()
              } else {
                this.getMasterData()
                this.setActiveSlave({})
              }
            })
            .catch((err) => {
              this.$_alert.error(err)
            })
        }
      })
    },
    goPageSlave (e, event = null) {
      if (event) console.log(event)
      switch (e) {
        case 'next':
          this.$set(this.slaveFilter, 'page', this.slaveFilter.page < this.maxSlavePage ? Number(this.slaveFilter.page) + 1 : this.slaveFilter.page)
          break
        case 'prev':
          this.$set(this.slaveFilter, 'page', this.slaveFilter.page === 1 ? this.slaveFilter.page : Number(this.slaveFilter.page) - 1)
          break
      }
      this.getSlaveData()
    },
    goPageMaster (e, event = null) {
      if (event) console.log(event)
      switch (e) {
        case 'next':
          this.masterFilter.page = this.masterFilter.page < this.maxMasterPage ? Number(this.masterFilter.page) + 1 : this.masterFilter.page
          break
        case 'prev':
          this.masterFilter.page = this.masterFilter.page === 1 ? this.masterFilter.page : Number(this.masterFilter.page) - 1
          break
      }
      this.getMasterData()
    }
  }
}
</script>

<style scoped>
  .sticky {
    position: sticky !important;
    left: 0 !important;
    background-color: #ffffff;
    z-index: 2;
    max-width: 350px;
    min-width: 250px;
    /* width: 200px; */
  }
  .sticky-right {
    position: sticky !important;
    right: 0 !important;
    z-index: 2;
  }
  .pagination-text {
    width: 80px;
    text-align: center;
  }
  .seach-form {
    border-radius: 18px;
  }
  .img-table {
    height: 50px;
    width: 50px;
    border-radius: 8px;
    object-fit: cover;
    cursor: pointer;
  }
  .table-hover tbody tr:hover td {
    color: #3f4254;
    background-color: #f5f5f5 !important;
  }
  .action-table {
    width: 1%;
    height: 100%;
    white-space: nowrap;
    text-align: right;
    position: relative;
  }
  .action-table .action-button {
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    right: 5px;
    background-color: transparent;
    transform: translate(0, -50%);
    height: 100%;
    transition: all 0.5s ease;
    opacity: 0;
    padding: 1rem;
  }
  .action-table .action-button a {
    margin-right: 0.25em;
  }
  .table-hover tbody tr:hover td.action-table .action-button {
    opacity: 1;
    background-color: #f5f5f5 !important;
  }
  .sort-table {
    transition: all 0.5s ease;
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translate(0, -50%);
  }
  .table-head-custom th {
    background-color: #f4f4f4 !important;
    color: #000 !important;
  }
  .table-head-custom th span {
    color: #000 !important;
  }
  .navi-link:hover .navi-hover-label,
  .navi-link.active .navi-hover-label {
    background-color: var(--primary) !important;
  }
  .navi-link:hover .navi-hover-label i,
  .navi-link.active .navi-hover-label i {
    color: #fff !important;
  }
  .navi-link:hover .navi-hover-title,
  .navi-link.active .navi-hover-title {
    color: var(--primary);
  }
  .navi-item.pointer > .navi-link.active {
    background-color: var(--primary-light) !important;
  }
  .profile-employee img.img-round {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center center;
  }
  .no-data-wrapper {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-flow: column;
    flex-flow: column;
    padding: 5rem;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    height: 65vh;
  }
</style>
