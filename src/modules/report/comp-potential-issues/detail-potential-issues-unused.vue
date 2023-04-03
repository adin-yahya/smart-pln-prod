<template lang="">
  <section>
    <div v-if="project" class="card card-custom mb-3">
      <div class="card-header border-0 py-5">
        <h3 class="card-title align-items-start flex-column">
          <span class="card-label font-weight-bolder text-dark">{{ project.project_name }} - Tahun {{ project.year }}</span>
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
        </div>
      </div>
      <div class="card-body pt-3 pb-3">
        <table class="table table-detailX mb-0">
          <tbody>
            <tr>
              <th class="nowrap-table pl-0">Deskripsi Potensi Isu</th>
              <th class="nowrap-table pl-0">:</th>
              <td>{{ mainDetail.description }}</td>
            </tr>
            <tr>
              <th class="nowrap-table pl-0">Referensi</th>
              <th class="nowrap-table pl-0">:</th>
              <td>{{ mainDetail.reference }}</td>
            </tr>
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
          </tbody>
        </table>
      </div>
    </div>
    <template v-if="mainDetail && mainDetail.status_code === 'open'">
      <div v-if="mitigation" class="card card-custom mb-3">
        <div class="card-header border-0 pt-5">
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label font-weight-bolder text-dark">Seleksi Daftar Mitigasi</span>
          </h3>
        </div>
        <div class="card-body pt-0">
          <div v-for="(m, i) in mitigation" :key="i + '-mitigation'" class="d-flex align-items-center mb-6">
            <label class="checkbox checkbox-lg checkbox-primary align-items-start flex-fill m-0">
              <input type="checkbox" v-model="m.is_used" />
              <span class="mr-3 mt-1"></span>
              <div class="flex-fill">
                <span class="d-block">{{ m.name }}</span>
                <span class="font-size-sm text-muted text-italic">{{ m.description || 'Belum ada keterangan mitigasi' }}</span>
                <textarea v-if="!m.is_used" v-model="m.not_used_description" placeholder="Deskripsi / Alasan mengapa mitigasi tidak dipilih" class="form-control mt-2" rows="2"></textarea>
              </div>
            </label>
          </div>
          <hr />
          <div v-if="$_sys.isAllowed('save-potency-issue-mitigations')" class="d-flex">
            <div>
              <button @click="selectionSave()" :disabled="!validateSelection()" class="btn btn-primary">Simpan & Lanjutkan</button>
            </div>
            <div v-show="!validateSelection()" class="flex-fill ml-3">
              <div class="alert alert-custom alert-light-danger fade show mb-0 py-1" role="alert">
                <div class="alert-icon"><i class="flaticon-warning" style="font-size: 21px"></i></div>
                <div class="alert-text">Alasan wajib diisi apabila mitigasi tidak dipilih !</div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="alert alert-custom alert-light-danger fade show mb-0 py-1" role="alert">
              <div class="alert-icon"><i class="flaticon-warning" style="font-size: 21px"></i></div>
              <div class="alert-text">Menunggu proses seleksi daftar mitigasi</div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="row">
        <div class="col-8 pr-0">
          <template v-if="mitigation">
            <div class="card card-custom mb-3">
              <div class="card-header border-0 pt-5">
                <h3 class="card-title align-items-start flex-column">
                  <span class="card-label font-weight-bolder text-dark">Daftar Mitigasi Terpilih</span>
                </h3>
              </div>
              <div class="card-body pt-0 pb-0">
                <div v-for="(m, i) in mitigation.filter((x) => x.is_used)" :key="i + '-mitigation'" class="d-flex align-items-start mb-6">
                  <div :class="bgMitigationStatus('symbol', m.status_code)" class="symbol symbol-25 mt-1 mr-4">
                    <span class="symbol-label">
                      <i :class="bgMitigationStatus('text', m.status_code)" class="ri-focus-fill"></i>
                    </span>
                  </div>
                  <div @click="selectedMitigation = m" class="flex-fill pointer">
                    <span :class="{ 'text-primary font-weight-bolder': selectedMitigation.id === m.id }" class="d-block font-weight-bold">{{ m.name }}</span>
                    <span class="font-size-sm text-muted text-italic">{{ m.description || 'Belum ada keterangan mitigasi' }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="card card-custom mb-3">
              <div class="card-header border-0 pt-5">
                <h3 class="card-title align-items-start flex-column">
                  <span class="card-label font-weight-bolder text-dark">Mitigasi Tidak Dipilih</span>
                </h3>
              </div>
              <div class="card-body pt-0 pb-3">
                <div v-for="(m, i) in mitigation.filter((x) => !x.is_used)" :key="i + '-mitigation'" class="d-flex align-items-start mb-6">
                  <div class="pr-3">
                    <hr v-if="i !== 0" class="mt-0" style="border-color: white" />
                    {{ i + 1 }}.
                  </div>
                  <div class="flex-fill">
                    <hr v-if="i !== 0" class="mt-0" />
                    <span class="d-block font-weight-bold">{{ m.name }}</span>
                    <span class="font-size-sm text-muted text-italic">{{ m.description || 'Belum ada keterangan mitigasi' }}</span>
                    <span class="d-block mt-3 font-size-sm font-weight-bold">Alasan tidak dipilih:</span>
                    <textarea disabled v-model="m.not_used_description" placeholder="Deskripsi / Alasan mengapa mitigasi tidak dipilih" class="form-control mt-2" rows="2"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="col-4">
          <div v-if="mitigation" class="card card-custom mb-3">
            <div class="card-header border-0 pt-5">
              <h3 class="card-title align-items-start flex-column">
                <span class="card-label font-weight-bolder text-dark">Verifikasi Mitigasi</span>
              </h3>
            </div>
            <div class="card-body pt-0">
              <div class="timeline timeline-5">
                <div class="timeline-items">
                  <!--begin::Item-->
                  <div class="timeline-item">
                    <!--begin::Icon-->
                    <div class="timeline-media bg-light-danger">
                      <span class="svg-icon svg-icon-danger svg-icon-md">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <rect x="0" y="0" width="24" height="24" />
                            <path d="M4,4 L11.6314229,2.5691082 C11.8750185,2.52343403 12.1249815,2.52343403 12.3685771,2.5691082 L20,4 L20,13.2830094 C20,16.2173861 18.4883464,18.9447835 16,20.5 L12.5299989,22.6687507 C12.2057287,22.8714196 11.7942713,22.8714196 11.4700011,22.6687507 L8,20.5 C5.51165358,18.9447835 4,16.2173861 4,13.2830094 L4,4 Z" fill="#000000" opacity="0.3" />
                            <polygon fill="#000000" opacity="0.3" points="11.3333333 18 16 11.4 13.6666667 11.4 13.6666667 7 9 13.6 11.3333333 13.6" />
                          </g>
                        </svg>
                      </span>
                    </div>
                    <!--end::Icon-->

                    <!--begin::Info-->
                    <div class="timeline-desc timeline-desc-light-danger">
                      <span class="font-weight-bolder text-danger">Mitigasi ditentukan</span>
                      <p class="font-weight-normal font-size-sm text-dark-50 pb-2">Mitigasi proyek dilaporkan oleh {{ mainDetail.rel_updated_by }}, pada {{ mainDetail.updated_at | parse('longDateTime') }}</p>
                    </div>
                    <!--end::Info-->
                  </div>
                  <!--end::Item-->
                  <!--begin::Item-->
                  <div class="timeline-item">
                    <!--begin::Icon-->
                    <div class="timeline-media bg-light-primary">
                      <span class="svg-icon svg-icon-primary svg-icon-md">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <rect x="0" y="0" width="24" height="24" />
                            <path d="M4,4 L11.6314229,2.5691082 C11.8750185,2.52343403 12.1249815,2.52343403 12.3685771,2.5691082 L20,4 L20,13.2830094 C20,16.2173861 18.4883464,18.9447835 16,20.5 L12.5299989,22.6687507 C12.2057287,22.8714196 11.7942713,22.8714196 11.4700011,22.6687507 L8,20.5 C5.51165358,18.9447835 4,16.2173861 4,13.2830094 L4,4 Z" fill="#000000" opacity="0.3" />
                            <polygon fill="#000000" opacity="0.3" points="11.3333333 18 16 11.4 13.6666667 11.4 13.6666667 7 9 13.6 11.3333333 13.6" />
                          </g>
                        </svg>
                      </span>
                    </div>
                    <!--end::Icon-->

                    <!--begin::Info-->
                    <div class="timeline-desc timeline-desc-light-primary">
                      <div class="d-flex align-items-center justify-content-between mb-1">
                        <span class="font-weight-bolder text-primary">Mitigasi divalidasi</span>
                        <span v-if="selectedMitigation.status_effective !== null" :class="selectedMitigation.status_effective === 'effective' ? 'label-success' : 'label-danger'" class="label label-pill label-inline">{{ selectedMitigation.status_effective === 'effective' ? 'Efektif' : 'Tidak Efektif' }}</span>
                      </div>
                      <template v-if="selectedMitigation.rel_validation_by">
                        <p class="font-weight-normal font-size-md text-dark-75 pb-2">{{ selectedMitigation.validation_description }}</p>
                        <p class="font-weight-normal font-size-sm text-dark-50 pb-2">Dilakukan oleh {{ selectedMitigation.rel_validation_by }}, pada {{ selectedMitigation.validation_at | parse('longDateTime') }}</p>
                      </template>
                      <template v-else>
                        <template v-if="$_sys.isAllowed('validation-potency-issue-mitigations')">
                          <p class="font-weight-normal text-dark-50 pb-0 pt-1">
                            Klik
                            <span class="font-weight-bolder text-primary">Validasi</span>
                            untuk mengisi kondisi aktual mitigasi Proyek
                          </p>
                          <button @click="$bvModal.show('form-mitigation-status')" class="btn btn-sm btn-primary mb-5">Validasi</button>
                        </template>
                        <p v-else class="font-weight-normal text-dark-50 pb-0 pt-1">Menunggu validasi mitigasi proyek</p>
                      </template>
                    </div>
                    <!--end::Info-->
                  </div>
                  <!--end::Item-->
                  <!--begin::Item-->
                  <div v-if="selectedMitigation.rel_validation_by" class="timeline-item">
                    <!--begin::Icon-->
                    <div class="timeline-media bg-light-warning">
                      <span class="svg-icon svg-icon-warning svg-icon-md">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <rect x="0" y="0" width="24" height="24" />
                            <path d="M4,4 L11.6314229,2.5691082 C11.8750185,2.52343403 12.1249815,2.52343403 12.3685771,2.5691082 L20,4 L20,13.2830094 C20,16.2173861 18.4883464,18.9447835 16,20.5 L12.5299989,22.6687507 C12.2057287,22.8714196 11.7942713,22.8714196 11.4700011,22.6687507 L8,20.5 C5.51165358,18.9447835 4,16.2173861 4,13.2830094 L4,4 Z" fill="#000000" opacity="0.3" />
                            <polygon fill="#000000" opacity="0.3" points="11.3333333 18 16 11.4 13.6666667 11.4 13.6666667 7 9 13.6 11.3333333 13.6" />
                          </g>
                        </svg>
                      </span>
                    </div>
                    <!--end::Icon-->

                    <!--begin::Info-->
                    <div class="timeline-desc timeline-desc-light-warning">
                      <div class="d-flex align-items-center justify-content-between mb-1">
                        <span class="font-weight-bolder text-warning">Review Mitigasi</span>
                        <span v-if="selectedMitigation.status_review !== null" :class="selectedMitigation.status_review === 'accept' ? 'label-success' : 'label-danger'" class="label label-pill label-inline">{{ selectedMitigation.status_review === 'accept' ? 'Diterima' : 'Diperbaiki' }}</span>
                      </div>
                      <template v-if="selectedMitigation.rel_reviewed_by">
                        <p class="font-weight-normal font-size-md text-dark-75 pb-2">{{ selectedMitigation.review_description }}</p>
                        <p class="font-weight-normal font-size-sm text-dark-50 pb-2">Dilakukan oleh {{ selectedMitigation.rel_reviewed_by }}, pada {{ selectedMitigation.reviewed_at | parse('longDateTime') }}</p>
                      </template>
                      <template v-else>
                        <template v-if="$_sys.isAllowed('review-potency-issue-mitigations')">
                          <p class="font-weight-normal text-dark-50 pb-0 pt-1">
                            Klik
                            <span class="font-weight-bolder text-warning">Review</span>
                            untuk memberi review mitigasi yang dilaporkan
                          </p>
                          <button @click="$bvModal.show('form-mitigation-status')" class="btn btn-sm btn-warning mb-5">Review</button>
                        </template>
                        <p v-else class="font-weight-normal text-dark-50 pb-0 pt-1">Menunggu review mitigasi proyek</p>
                      </template>
                    </div>
                    <!--end::Info-->
                  </div>
                  <!--end::Item-->
                  <!--begin::Item-->
                  <div v-if="selectedMitigation.rel_reviewed_by" class="timeline-item">
                    <!--begin::Icon-->
                    <div class="timeline-media bg-light-success">
                      <span class="svg-icon svg-icon-success svg-icon-md">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <rect x="0" y="0" width="24" height="24" />
                            <path d="M4,4 L11.6314229,2.5691082 C11.8750185,2.52343403 12.1249815,2.52343403 12.3685771,2.5691082 L20,4 L20,13.2830094 C20,16.2173861 18.4883464,18.9447835 16,20.5 L12.5299989,22.6687507 C12.2057287,22.8714196 11.7942713,22.8714196 11.4700011,22.6687507 L8,20.5 C5.51165358,18.9447835 4,16.2173861 4,13.2830094 L4,4 Z" fill="#000000" opacity="0.3" />
                            <polygon fill="#000000" opacity="0.3" points="11.3333333 18 16 11.4 13.6666667 11.4 13.6666667 7 9 13.6 11.3333333 13.6" />
                          </g>
                        </svg>
                      </span>
                    </div>
                    <!--end::Icon-->

                    <!--begin::Info-->
                    <div class="timeline-desc timeline-desc-light-success">
                      <div class="d-flex align-items-center justify-content-between mb-1">
                        <span class="font-weight-bolder text-success">Approve Mitigasi</span>
                        <span v-if="selectedMitigation.status_approve !== null" :class="selectedMitigation.status_approve === 'accept' ? 'label-success' : 'label-danger'" class="label label-pill label-inline">{{ selectedMitigation.status_approve === 'accept' ? 'Diterima' : 'Diperbaiki' }}</span>
                      </div>
                      <template v-if="selectedMitigation.rel_approved_by">
                        <p class="font-weight-normal font-size-md text-dark-75 pb-2">{{ selectedMitigation.approve_description }}</p>
                        <p class="font-weight-normal font-size-sm text-dark-50 pb-2">Dilakukan oleh {{ selectedMitigation.rel_approved_by }}, pada {{ selectedMitigation.approved_at | parse('longDateTime') }}</p>
                      </template>
                      <template v-else>
                        <template v-if="$_sys.isAllowed('approve-potency-issue-mitigations')">
                          <p class="font-weight-normal text-dark-50 pb-0 pt-1">
                            Klik
                            <span class="font-weight-bolder text-success">Approve</span>
                            untuk menyetujui mitigasi yang dilaporkan
                          </p>
                          <button @click="$bvModal.show('form-mitigation-status')" class="btn btn-sm btn-success mb-5">Approve</button>
                        </template>
                        <p v-else class="font-weight-normal text-dark-50 pb-0 pt-1">Menunggu approval mitigasi proyek</p>
                      </template>
                    </div>
                    <!--end::Info-->
                  </div>
                  <!--end::Item-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <b-modal id="form-mitigation-status" hide-footer centered size="md">
        <template #modal-header="{ close }">
          <h5 class="card-title d-flex align-items-start flex-column mb-0">
            <span class="card-label font-weight-bolder text-dark text-capitalize">{{ selectedMitigation.status_code || 'Validasi' | parse('status_code_form') }} Mitigasi</span>
          </h5>
          <button type="button" class="close" aria-label="Close" @click="close()">×</button>
        </template>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form autocomplete="off" @submit.prevent="handleSubmit(saveStatusMitigation)">
            <template v-if="selectedMitigation.status_code === null">
              <div class="form-group">
                <ValidationProvider mode="aggressive" name="Kategori Bahaya" rules="required" v-slot="{ errors }">
                  <label>
                    Kondisi aktual mitigasi proyek
                    <span class="text-danger">*</span>
                  </label>
                  <div class="mt-2 mt-2 checkbox-inline">
                    <label id="label-efektif" class="checkbox mr-5">
                      <input type="radio" id="efektif" name="efektif" value="effective" v-model="tempFormStatus.status_code" />
                      <span class="mr-2"></span>
                      <a id="text-efektif">Efektif</a>
                    </label>
                    <label id="label-tdk-efektif" class="checkbox mr-5">
                      <input type="radio" id="tdk-efektif" name="tdk-efektif" value="not_effective" v-model="tempFormStatus.status_code" />
                      <span class="mr-2"></span>
                      <a id="text-tdk-efektif">Tidak Efektif</a>
                    </label>
                  </div>
                  <div class="invalid-feedback">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>
              <s-input v-if="tempFormStatus.status_code === 'not_effective'" v-model="tempFormStatus.description" :item="{ label: 'Rekomendasi Mitigasi', nm: false, inline: false, type: 'textarea', row: 3, validation: ['required'] }" />
              <s-input v-else v-model="tempFormStatus.description" :item="{ label: 'Deskripsi / Alasan', nm: false, inline: false, type: 'textarea', row: 3, validation: ['required'] }" />
            </template>
            <template v-if="selectedMitigation.status_code === 'on_review'">
              <div class="form-group">
                <ValidationProvider mode="aggressive" name="Kategori Bahaya" rules="required" v-slot="{ errors }">
                  <label>
                    Status Review
                    <span class="text-danger">*</span>
                  </label>
                  <div class="mt-2 mt-2 checkbox-inline">
                    <label id="label-accept" class="checkbox mr-5">
                      <input type="radio" id="accept" name="accept" value="accept" v-model="tempFormStatus.status_code" />
                      <span class="mr-2"></span>
                      <a id="text-accept">Diterima</a>
                    </label>
                    <label id="label-repair" class="checkbox mr-5">
                      <input type="radio" id="repair" name="repair" value="repair" v-model="tempFormStatus.status_code" />
                      <span class="mr-2"></span>
                      <a id="text-repair">Diperbaiki</a>
                    </label>
                  </div>
                  <div class="invalid-feedback">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>
              <s-input v-model="tempFormStatus.description" :item="{ label: 'Deskripsi / Alasan', nm: false, inline: false, type: 'textarea', row: 3, validation: ['required'] }" />
            </template>
            <template v-if="selectedMitigation.status_code === 'on_verification'">
              <div class="form-group">
                <ValidationProvider mode="aggressive" name="Kategori Bahaya" rules="required" v-slot="{ errors }">
                  <label>
                    Status Approval
                    <span class="text-danger">*</span>
                  </label>
                  <div class="mt-2 mt-2 checkbox-inline">
                    <label id="label-accept" class="checkbox mr-5">
                      <input type="radio" id="accept" name="accept" value="accept" v-model="tempFormStatus.status_code" />
                      <span class="mr-2"></span>
                      <a id="text-accept">Diterima</a>
                    </label>
                    <label id="label-repair" class="checkbox mr-5">
                      <input type="radio" id="repair" name="repair" value="repair" v-model="tempFormStatus.status_code" />
                      <span class="mr-2"></span>
                      <a id="text-repair">Diperbaiki</a>
                    </label>
                  </div>
                  <div class="invalid-feedback">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>
              <s-input v-model="tempFormStatus.description" :item="{ label: 'Deskripsi / Alasan', nm: false, inline: false, type: 'textarea', row: 3, validation: ['required'] }" />
            </template>
            <button class="btn btn-light-primary btn-block font-weight-bolder text-capitalize">Simpan {{ selectedMitigation.status_code || 'Validasi' | parse('status_code_form') }} Mitigasi</button>
          </form>
        </ValidationObserver>
      </b-modal>
    </template>
  </section>
</template>
<script>
export default {
  name: 'detail-potential-issues',
  props: ['id'],
  data () {
    return {
      mainDetail: null,
      project: null,
      mitigation: null,
      selectedMitigation: null,
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
            if (res.data.status_code === 'open') this.loadUnselectedMitigation()
            else this.loadSelectedMitigation()
          }
        })
        .catch((err) => {
          this.$_alert.error(err)
        })
    },
    validateSelection () {
      if (!this.mitigation) return false
      else {
        if (this.mitigation.filter((x) => x.is_used).length > 0) {
          return !this.mitigation.filter((x) => !x.is_used && !x.not_used_description).length
        } else return false
      }
    },
    selectionSave () {
      let form = {
        id: this.id,
        data: this.mitigation
      }
      this.$_api
        .post('custom/potential-issue/update-mapping-mitigations', form)
        .then(async (res) => {
          await this.getAllData(false)
          this.loadSelectedMitigation()
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
    loadUnselectedMitigation () {
      this.$_api
        .get('m-mitigations/dataset', { sub_issue_id: this.mainDetail.sub_issue_id, level: this.mainDetail.level })
        .then((res) => {
          res.data.forEach((el) => {
            el.is_used = true
            el.not_used_description = null
          })
          this.mitigation = res.data
        })
        .catch((err) => {
          this.$_alert.error(err)
        })
    },
    loadSelectedMitigation () {
      this.$_api
        .get('mapping-potency-issues-mitigations/list', { potency_issue_id: this.id })
        .then((res) => {
          this.mitigation = res.data
          if (this.$route.query.mid) {
            try {
              this.selectedMitigation = res.data.filter((x) => x.is_used && x.id === this.$route.query.mid)[0]
            } catch (error) {
              console.log(error)
              this.selectedMitigation = res.data.filter((x) => x.is_used)[0]
            }
          } else this.selectedMitigation = res.data.filter((x) => x.is_used)[0]
        })
        .catch((err) => {
          this.$_alert.error(err)
        })
    },
    bgMitigationStatus (prefix, e) {
      if (e === null) return prefix + '-danger'
      else if (e === 'close') return prefix + '-success'
      else return prefix + '-warning'
    },
    saveStatusMitigation () {
      let form = {}
      if (this.selectedMitigation.status_code === null) {
        form.type = 'validation'
      } else if (this.selectedMitigation.status_code === 'on_review') {
        form.type = 'review'
      } else if (this.selectedMitigation.status_code === 'on_verification') {
        form.type = 'approve'
      }
      this.$_api
        .post('custom/potential-issue/mitigation/validation', { ...this.selectedMitigation, ...this.tempFormStatus, ...form })
        .then(async (res) => {
          this.selectedMitigation = res.data
          const mitIndex = this.mitigation.indexOf(this.mitigation.filter((x) => x.id === this.selectedMitigation.id)[0])
          this.$set(this.mitigation, mitIndex, res.data)
          this.$set(this.mainDetail, 'status_code', res.potency_issue_status_code)
          this.tempFormStatus = {}
          this.$_alert.success('Data Mitigasi berhasil diperbarui !')
          this.$bvModal.hide('form-mitigation-status')
        })
        .catch((err) => {
          this.$_alert.error(err)
        })
    }
  }
}
</script>
