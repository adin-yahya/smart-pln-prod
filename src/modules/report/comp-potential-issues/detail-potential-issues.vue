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
          <span :class="mainDetail.status_code === 'close' ? 'label-success' : mainDetail.status_code === 'open' ? 'label-danger' : 'label-warning'" class="label label-xl font-weight-boldest label-inline">{{ mainDetail.status_code | parse('status_code_form') }}</span>
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
    <div class="row">
      <div class="col-8 pr-0">
        <template v-if="mainDetail && mainDetail.current_step === 'reported'">
          <div v-if="mitigation" class="card card-custom mb-3">
            <div class="card-header border-0 pt-5">
              <h3 class="card-title align-items-start flex-column">
                <span class="card-label font-weight-bolder text-dark">Pilih Mitigasi</span>
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
          <template v-if="mitigation">
            <div class="card card-custom mb-3">
              <div class="card-header border-0 pt-5 min-h-50px">
                <h3 class="card-title align-items-start flex-column">
                  <span class="card-label font-weight-bolder text-dark">Daftar Mitigasi Terpilih</span>
                </h3>
              </div>
              <div class="card-body pt-0 pb-0">
                <ol class="pl-3">
                  <li v-for="(m, i) in mitigation.filter((x) => x.is_used)" :key="i + '-mitigation'" class="mb-3">
                    <div class="flex-fill pointer pl-2">
                      <span class="d-block font-weight-bold">{{ m.name }}</span>
                      <span class="font-size-sm text-muted text-italic">{{ m.description || 'Belum ada keterangan mitigasi' }}</span>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
            <div v-if="mitigation.filter((x) => !x.is_used).length" class="card card-custom mb-3">
              <div class="card-header border-0 pt-5 min-h-50px">
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
            <div class="card card-custom mb-3">
              <div class="card-header border-0 pt-5 min-h-50px">
                <h3 class="card-title align-items-start flex-column">
                  <span class="card-label font-weight-bolder text-dark">Daftar Rekomendasi Mitigasi</span>
                </h3>
              </div>
              <div class="card-body pt-0 pb-0">
                <ol class="pl-3">
                  <li v-for="(r, i) in recomendation" :key="i + '-recomendation'" class="mb-3">
                    <div class="flex-fill pointer pl-2">
                      <span class="d-block font-weight-bold">{{ r.name }}</span>
                      <span class="d-block font-size-sm">Progres Aktifitas - {{ r.created_at_step | parse('current_step_recomendation') }}</span>
                      <span class="font-size-sm text-muted text-italic">Direkomendasikan oleh {{ r.rel_created_by }}, pada {{ r.created_at | parse('longDateTime')}}</span>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </template>
        </template>
      </div>
      <div class="col-4">
        <div v-if="mainDetail && mitigation" class="card card-custom mb-3">
          <div class="card-header border-0 pt-5">
            <h3 class="card-title align-items-start flex-column">
              <span class="card-label font-weight-bolder text-dark">Progres Aktifitas Mitigasi</span>
            </h3>
          </div>
          <div class="card-body pt-0">
            <div class="timeline timeline-5">
              <div class="timeline-items">
                <!-- dilaporkan -->
                <div v-if="mainDetail.created_at" class="timeline-item">
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
                  <div class="timeline-desc pt-0 timeline-desc-light-danger">
                    <span class="font-weight-bolder text-danger">Potensi Isu Dilaporkan</span>
                    <p class="font-weight-normal font-size-sm text-dark-50 pb-2">Potensi Isu dilaporkan oleh {{ mainDetail.rel_created_by }}, pada {{ mainDetail.created_at | parse('longDateTime') }}</p>
                  </div>
                </div>
                <!-- dipilih 0 -->
                <div v-if="mainDetail.created_at && selectedMitigation" class="timeline-item">
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
                  <div class="timeline-desc pt-0 timeline-desc-light-danger">
                    <span class="font-weight-bolder text-danger">Mitigasi Terpilih</span>
                    <template v-if="selectedMitigation.created_at">
                      <p class="font-weight-normal font-size-sm text-dark-50 pb-2">Mitigasi Dipilih oleh {{ selectedMitigation.rel_created_by }}, pada {{ selectedMitigation.created_at | parse('longDateTime') }}</p>
                    </template>
                    <template v-else>
                      <template v-if="$_sys.isAllowed(progressPermission[0])">
                        <p class="font-weight-normal font-size-sm text-dark-50 pb-2">Checklist Mitigasi disamping untuk memilih mitigasi yang akan dilakukan</p>
                      </template>
                      <template v-else>
                        <p class="font-weight-normal font-size-sm text-dark-50 pb-2">Menunggu mitigasi dipilih</p>
                      </template>
                    </template>
                  </div>
                </div>
                <!-- dilakukan 1 -->
                <div v-if="mainDetail.created_at && selectedMitigation" class="timeline-item">
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
                  <div class="timeline-desc pt-0 timeline-desc-light-primary">
                    <span class="font-weight-bolder text-primary">Mitigasi Dilakukan</span>
                    <template v-if="mainDetail.mitigation_at">
                      <p>
                        <b>{{ mainDetail.mitigation_date | parse('longDate') }}</b>
                        , {{ mainDetail.mitigation_description }}
                      </p>
                      <p class="font-weight-normal font-size-sm text-dark-50 pb-2">Mitigasi Dilakukan oleh {{ mainDetail.rel_mitigation_by }}, pada {{ mainDetail.created_at | parse('longDateTime') }}</p>
                    </template>
                    <template v-else>
                      <template v-if="$_sys.isAllowed(progressPermission[1])">
                        <p class="font-weight-normal font-size-sm text-dark-50 pb-2">
                          Klik
                          <span class="text-primary font-weight-bold">Mitigasi Dilakukan</span>
                          untuk mengisi tanggal dilakukannya mitigasi
                        </p>
                        <button v-b-modal.form-mitigation-status @click="$set(tempFormStatus, 'type', 'mitigation')" class="btn btn-sm btn-primary font-weight-bolder font-size-sm">Mitigasi Dilakukan</button>
                      </template>
                      <template v-else>
                        <p class="font-weight-normal font-size-sm text-dark-50 pb-2">Menunggu mitigasi dilakukan</p>
                      </template>
                    </template>
                  </div>
                </div>
                <!-- efektifitas 2 -->
                <div v-if="mainDetail.mitigation_at" class="timeline-item">
                  <div class="timeline-media bg-light-info">
                    <span class="svg-icon svg-icon-info svg-icon-md">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect x="0" y="0" width="24" height="24" />
                          <path d="M4,4 L11.6314229,2.5691082 C11.8750185,2.52343403 12.1249815,2.52343403 12.3685771,2.5691082 L20,4 L20,13.2830094 C20,16.2173861 18.4883464,18.9447835 16,20.5 L12.5299989,22.6687507 C12.2057287,22.8714196 11.7942713,22.8714196 11.4700011,22.6687507 L8,20.5 C5.51165358,18.9447835 4,16.2173861 4,13.2830094 L4,4 Z" fill="#000000" opacity="0.3" />
                          <polygon fill="#000000" opacity="0.3" points="11.3333333 18 16 11.4 13.6666667 11.4 13.6666667 7 9 13.6 11.3333333 13.6" />
                        </g>
                      </svg>
                    </span>
                  </div>
                  <div class="timeline-desc pt-0 timeline-desc-light-info">
                    <span class="font-weight-bolder text-info">Efektifitas Mitigasi</span>
                    <template v-if="mainDetail.validation_at">
                      <p>
                        <b>{{ mainDetail.status_effective === 'effective' ? 'Efektif' : 'Tidak Efektif' }}</b>
                        , {{ mainDetail.validation_description }}
                      </p>
                      <p class="font-weight-normal font-size-sm text-dark-50 pb-2">Efektifitas Mitigasi diisi oleh {{ mainDetail.rel_validation_by }}, pada {{ mainDetail.validation_at | parse('longDateTime') }}</p>
                    </template>
                    <template v-else>
                      <template v-if="$_sys.isAllowed(progressPermission[2])">
                        <p class="font-weight-normal font-size-sm text-dark-50 pb-2">
                          Klik
                          <span class="text-info font-weight-bold">Efektifitas Mitigasi</span>
                          untuk mengisi efektifitas mitigasi yang dilakukan
                        </p>
                        <button v-b-modal.form-mitigation-status @click="tempFormStatus = tempFormStatus.data_recommendations ? tempFormStatus : Object.assign({}, { type: 'validation', data_recommendations: [] })" class="btn btn-sm btn-info font-weight-bolder font-size-sm">Efektifitas Mitigasi</button>
                      </template>
                      <template v-else>
                        <p class="font-weight-normal font-size-sm text-dark-50 pb-2">Menunggu Efektifitas Mitigasi diisi oleh PTL</p>
                      </template>
                    </template>
                  </div>
                </div>
                <!-- review asman 3 -->
                <div v-if="mainDetail.validation_at" class="timeline-item">
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
                  <div class="timeline-desc pt-0 timeline-desc-light-warning">
                    <span class="font-weight-bolder text-warning">Review Mitigasi Assistant Manager</span>
                    <template v-if="mainDetail.reviewed_at">
                      <p>{{ mainDetail.review_description }}</p>
                      <p class="font-weight-normal font-size-sm text-dark-50 pb-2">Review Mitigasi diisi oleh {{ mainDetail.rel_reviewed_by }}, pada {{ mainDetail.reviewed_at | parse('longDateTime') }}</p>
                    </template>
                    <template v-else>
                      <template v-if="$_sys.isAllowed(progressPermission[3])">
                        <p class="font-weight-normal font-size-sm text-dark-50 pb-2">
                          Klik
                          <span class="text-warning font-weight-bold">Review Mitigasi</span>
                          untuk mengisi review mitigasi yang dilakukan
                        </p>
                        <button v-b-modal.form-mitigation-status @click="tempFormStatus = tempFormStatus.data_recommendations ? tempFormStatus : Object.assign({}, { type: 'review', data_recommendations: [] })" class="btn btn-sm btn-warning font-weight-bolder font-size-sm">Review Mitigasi</button>
                      </template>
                      <template v-else>
                        <p class="font-weight-normal font-size-sm text-dark-50 pb-2">Menunggu Review Mitigasi diisi oleh Assistant Manager</p>
                      </template>
                    </template>
                  </div>
                </div>
                <!-- aprrove man 4 -->
                <div v-if="mainDetail.reviewed_at" class="timeline-item">
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
                  <div class="timeline-desc pt-0 timeline-desc-light-success">
                    <span class="font-weight-bolder text-success">Approve Mitigasi Manager</span>
                    <template v-if="mainDetail.approved_at">
                      <p>{{ mainDetail.approve_description }}</p>
                      <p class="font-weight-normal font-size-sm text-dark-50 pb-2">Approve Mitigasi diisi oleh {{ mainDetail.rel_approved_by }}, pada {{ mainDetail.approved_at | parse('longDateTime') }}</p>
                    </template>
                    <template v-else>
                      <template v-if="$_sys.isAllowed(progressPermission[4])">
                        <p class="font-weight-normal font-size-sm text-dark-50 pb-2">
                          Klik
                          <span class="text-success font-weight-bold">Approve Mitigasi</span>
                          untuk mengisi approval mitigasi yang dilakukan
                        </p>
                        <button v-b-modal.form-mitigation-status @click="tempFormStatus = tempFormStatus.data_recommendations ? tempFormStatus : Object.assign({}, { type: 'approve', data_recommendations: [] })" class="btn btn-sm btn-success font-weight-bolder font-size-sm">Approve Mitigasi</button>
                      </template>
                      <template v-else>
                        <p class="font-weight-normal font-size-sm text-dark-50 pb-2">Menunggu Approve Mitigasi diisi oleh Manager</p>
                      </template>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template>
      <b-modal id="form-mitigation-status" hide-footer centered size="md">
        <template #modal-header="{ close }">
          <h5 class="card-title d-flex align-items-start flex-column mb-0">
            <span class="card-label font-weight-bolder text-dark text-capitalize">{{ mainDetail.current_step | parse('current_step_next') }}</span>
          </h5>
          <button type="button" class="close" aria-label="Close" @click="close()">×</button>
        </template>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form autocomplete="off" @submit.prevent="handleSubmit(saveStatusMitigation)">
            <template v-if="mainDetail.current_step === 'on_mitigation'">
              <s-input v-model="tempFormStatus.mitigation_date" :item="{ label: 'Tanggal dilakukan mitigasi', nm: false, inline: false, type: 'date', validation: ['required'] }" />
              <s-input v-model="tempFormStatus.mitigation_description" :item="{ label: 'Penjelasan / Deskripsi / Alasan', nm: false, inline: false, type: 'textarea', rows: 3, validation: ['required'] }" />
            </template>
            <template v-if="mainDetail.current_step === 'on_validation'">
              <div class="form-group">
                <ValidationProvider mode="aggressive" name="Kategori Bahaya" rules="required" v-slot="{ errors }">
                  <label>
                    Kondisi aktual mitigasi proyek
                    <span class="text-danger">*</span>
                  </label>
                  <div class="mt-2 mt-2 checkbox-inline">
                    <label id="label-efektif" class="checkbox mr-5">
                      <input type="radio" id="efektif" name="efektif" value="effective" v-model="tempFormStatus.status_effective" />
                      <span class="mr-2"></span>
                      <a id="text-efektif">Efektif</a>
                    </label>
                    <label id="label-tdk-efektif" class="checkbox mr-5">
                      <input type="radio" id="tdk-efektif" name="tdk-efektif" value="not_effective" v-model="tempFormStatus.status_effective" />
                      <span class="mr-2"></span>
                      <a id="text-tdk-efektif">Tidak Efektif</a>
                    </label>
                  </div>
                  <div class="invalid-feedback">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>
              <s-input v-model="tempFormStatus.validation_description" :item="{ label: 'Penjelasan / Deskripsi / Alasan', nm: false, inline: false, type: 'textarea', rows: 2, validation: ['required'] }" />
              <div v-if="tempFormStatus.status_effective === 'not_effective'" class="form-group">
                <label>
                  Rekomendasi Mitigasi
                  <span v-if="tempFormStatus.status_effective === 'not_effective'" class="text-danger">*</span>
                </label>
                <div class="row mb-2">
                  <div class="col pr-0">
                    <input ref="tmpRecomendation" v-model.trim="tmpRecomendation" type="text" class="form-control" />
                  </div>
                  <div class="col-auto">
                    <a
                      @click="
                      if(tmpRecomendation){
                        tempFormStatus.data_recommendations.push(tmpRecomendation)
                        tmpRecomendation = ''
                        $refs.tmpRecomendation.focus()}
                      "
                      class="btn btn-icon btn-light-primary"
                    >
                      <i class="ri-add-line"></i>
                    </a>
                  </div>
                </div>
                <template v-if="tempFormStatus.data_recommendations.length">
                  <ul class="list-unstyled">
                    <li style="border-bottom:1px dotted #ccc" class="d-flex py-2" v-for="(r, i) in tempFormStatus.data_recommendations" :key="i + '-tempFormStatus.data_recommendations'">
                      <span class="">{{ i + 1 }}.</span>
                      <span class="flex-fill px-2">{{ r }}</span>
                      <div>
                        <a @click="tempFormStatus.data_recommendations.splice(i, 1)" class="btn btn-sm btn-clean btn-hover-danger btn-icon">
                          <i class="ri-delete-bin-2-line text-danger ri-sm"></i>
                        </a>
                      </div>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <span class="text-sm text-muted text-italic">Belum ada rekomendasi mitigasi yang ditambahkan</span>
                </template>
              </div>
            </template>
            <template v-if="mainDetail.current_step === 'on_review'">
              <s-input v-model="tempFormStatus.review_description" :item="{ label: 'Penjelasan / Deskripsi / Alasan', nm: false, inline: false, type: 'textarea', rows: 2, validation: ['required'] }" />
              <div class="form-group">
                <label>
                  Rekomendasi Mitigasi
                </label>
                <div class="row mb-2">
                  <div class="col pr-0">
                    <input ref="tmpRecomendation" v-model.trim="tmpRecomendation" type="text" class="form-control" />
                  </div>
                  <div class="col-auto">
                    <a
                      @click="
                      if(tmpRecomendation){
                        tempFormStatus.data_recommendations.push(tmpRecomendation)
                        tmpRecomendation = ''
                        $refs.tmpRecomendation.focus()}
                      "
                      class="btn btn-icon btn-light-primary"
                    >
                      <i class="ri-add-line"></i>
                    </a>
                  </div>
                </div>
                <template v-if="tempFormStatus.data_recommendations.length">
                  <ul class="list-unstyled">
                    <li style="border-bottom:1px dotted #ccc" class="d-flex py-2" v-for="(r, i) in tempFormStatus.data_recommendations" :key="i + '-tempFormStatus.data_recommendations'">
                      <span class="">{{ i + 1 }}.</span>
                      <span class="flex-fill px-2">{{ r }}</span>
                      <div>
                        <a @click="tempFormStatus.data_recommendations.splice(i, 1)" class="btn btn-sm btn-clean btn-hover-danger btn-icon">
                          <i class="ri-delete-bin-2-line text-danger ri-sm"></i>
                        </a>
                      </div>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <span class="text-sm text-muted text-italic">Belum ada rekomendasi mitigasi yang ditambahkan</span>
                </template>
              </div>
            </template>
            <template v-if="mainDetail.current_step === 'on_verification'">
              <s-input v-model="tempFormStatus.approve_description" :item="{ label: 'Penjelasan / Deskripsi / Alasan', nm: false, inline: false, type: 'textarea', rows: 2, validation: ['required'] }" />
              <div class="form-group">
                <label>
                  Rekomendasi Mitigasi
                </label>
                <div class="row mb-2">
                  <div class="col pr-0">
                    <input ref="tmpRecomendation" v-model.trim="tmpRecomendation" type="text" class="form-control" />
                  </div>
                  <div class="col-auto">
                    <a
                      @click="
                      if(tmpRecomendation){
                        tempFormStatus.data_recommendations.push(tmpRecomendation)
                        tmpRecomendation = ''
                        $refs.tmpRecomendation.focus()}
                      "
                      class="btn btn-icon btn-light-primary"
                    >
                      <i class="ri-add-line"></i>
                    </a>
                  </div>
                </div>
                <template v-if="tempFormStatus.data_recommendations.length">
                  <ul class="list-unstyled">
                    <li style="border-bottom:1px dotted #ccc" class="d-flex py-2" v-for="(r, i) in tempFormStatus.data_recommendations" :key="i + '-tempFormStatus.data_recommendations'">
                      <span class="">{{ i + 1 }}.</span>
                      <span class="flex-fill px-2">{{ r }}</span>
                      <div>
                        <a @click="tempFormStatus.data_recommendations.splice(i, 1)" class="btn btn-sm btn-clean btn-hover-danger btn-icon">
                          <i class="ri-delete-bin-2-line text-danger ri-sm"></i>
                        </a>
                      </div>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <span class="text-sm text-muted text-italic">Belum ada rekomendasi mitigasi yang ditambahkan</span>
                </template>
              </div>
            </template>
            <button class="btn btn-light-primary btn-block font-weight-bolder text-capitalize">Simpan & Update Progres Mitigasi</button>
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
      recomendation: null,
      selectedMitigation: null,
      tempFormStatus: {},
      tmpRecomendation: '',
      progressPermission: ['save-potency-issue-mitigations', 'mitigation-potency-issue', 'validation-potency-issue', 'review-potency-issue', 'approve-potency-issue']
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
            if (res.data.current_step === 'reported') this.loadUnselectedMitigation()
            else {
              this.loadSelectedMitigation()
              if (res.data.current_step !== 'on_mitigation') this.loadRecomendationMitigation()
            }
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
        .get('mapping-potency-issues-mitigations/dataset', { potency_issue_id: this.id })
        .then((res) => {
          this.mitigation = res.data
          this.selectedMitigation = res.data[0]
        })
        .catch((err) => {
          this.$_alert.error(err)
        })
    },
    loadRecomendationMitigation () {
      this.$_api
        .get('mitigation-recommendations/dataset', { potency_issue_id: this.id, sort_by: 'id', sort: 'ASC' })
        .then((res) => {
          this.recomendation = res.data
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
      this.$_api
        .post('custom/potential-issue/validation', { ...this.tempFormStatus, ...{ id: this.mainDetail.id } })
        .then(async (res) => {
          console.log(res)
          this.mainDetail = Object.assign({}, res.data)
          if (this.tempFormStatus.type !== 'on_mitigation') this.loadRecomendationMitigation()
          this.$_alert.success('Data Mitigasi berhasil diperbarui !')
          this.$bvModal.hide('form-mitigation-status')
          this.tempFormStatus = {}
        })
        .catch((err) => {
          this.$_alert.error(err)
        })
    }
  }
}
</script>
