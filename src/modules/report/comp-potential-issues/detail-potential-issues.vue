<template lang="">
  <section>
    <div v-if="project" class="card card-custom mb-3">
      <div class="card-header border-0 py-5">
        <h3 class="card-title align-items-start flex-column flex-fill">
          <span class="card-label font-weight-bolder text-dark">{{ project.project_name }}</span>
          <span class="text-muted mt-3 font-weight-bold font-size-sm">
            {{ project.address }}
            <span v-if="project.rel_province_id">, {{ project.rel_province_id }}</span>
            <span v-if="project.rel_city_id">, {{ project.rel_city_id }}</span>
            <br />
            Supervisor: {{ project.rel_unit_id }}
            <br />
            Project Site Team: {{ project.rel_pst_id }}
          </span>
        </h3>
        <div class="card-toolbar">
          <a @click="$emit('back')" class="btn btn-outline-primary btn-icon btn-circle"><i class="ri-arrow-go-back-line p-0"></i></a>
        </div>
      </div>
    </div>
    <div v-if="recaptProject" class="mb-3 rounded py-5 px-4 bg-white">
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
            <div class="font-weight-bold text-center text-muted font-size-sm ml-5">
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
            <div class="font-weight-bold text-center text-muted font-size-sm ml-5">
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
    </div>
    <div class="row">
      <div class="col-4 pr-0">
        <div class="card card-custom">
          <div class="card-header border-0 pt-5">
            <h3 class="card-title align-items-start flex-column">
              <span class="card-label font-weight-bolder text-dark">Daftar Laporan Potensi Isu</span>
              <span class="text-muted mt-1 font-weight-bold font-size-sm">
                Klik daftar dibawah ini untuk melihat detail laporan
              </span>
            </h3>
          </div>
          <div class="card-body pt-3">
            <template v-if="reportList && reportList.length">
              <hr class="mt-0" />
              <ul class="list-unstyled mb-0">
                <li v-for="(l, i) in reportList" :key="i + '-reportList'" :class="{ 'bg-light-info': activeReport && activeReport.id === l.id }" @click="setReportActive(l)" class="pointer border-1 py-2 rounded-sm px-4">
                  <div class="d-flex">
                    <div class="pr-2">{{ i + 1 }}.</div>
                    <div class="flex-fill">
                      <span class="d-block">Tanggal {{ l.date | parse('longDate') }}</span>
                      <div>
                        <span class="font-size-sm text-muted text-italic">Level {{ l.level }}</span>
                      </div>
                    </div>
                    <div style="flex-wrap: nowrap" :class="bgMitigationStatus('bg', l.status_code)" class="mr-2 w-20px min-w-20px h-20px rounded-sm align-self-center">
                      &nbsp;
                    </div>
                    <div :class="{ 'rotate-right': activeReport && activeReport.id === l.id }" class="smooth align-self-center">
                      <i class="ri-arrow-down-s-line"></i>
                    </div>
                  </div>
                </li>
                <!-- <template v-for="(l, i) in reportList">
                  <li :key="i + '-reportList'" :class="{ 'bg-light-info': activeReport && activeReport.id === l.id }" @click="setReportActive(l)" class="pointer py-2 rounded-sm px-4">
                    <div class="d-flex">
                      <div class="flex-fill">
                        <span :class="bgMitigationStatus('text', l.status_code)" class="font-size-sm font-weight-bold">{{ l.status_code | parse('status_code_form') }}</span>
                        <span class="d-block font-size-lg font-weight-bold">Report Tanggal {{ l.date | parse('longDate') }} - Level {{ l.level }}</span>
                      </div>
                      <div :class="{ 'rotate-right': activeReport && activeReport.id === l.id }" class="smooth align-self-end">
                        <i class="ri-arrow-down-s-line"></i>
                      </div>
                    </div>
                    <div class="font-size-sm pl-2">
                      <div class="d-flex justify-content-between pt-1" style="border-bottom: 1px solid #e4e6ef">
                        <span class="d-block text-mutedX min-w-175px">Sub Risk Register</span>
                        <span class="font-weight-bold">99</span>
                      </div>
                      <div class="d-flex justify-content-between pt-1" style="border-bottom: 1px solid #e4e6ef">
                        <span class="d-block text-mutedX min-w-175px">Mitigasi</span>
                        <span class="font-weight-bold">99</span>
                      </div>
                      <div class="d-flex justify-content-between pt-1" style="border-bottom: 1px solid #e4e6ef">
                        <span class="d-block text-mutedX min-w-175px">Belum dilakukan</span>
                        <span class="font-weight-bold">99</span>
                      </div>
                      <div class="d-flex justify-content-between pt-1" style="border-bottom: 1px solid #e4e6ef">
                        <span class="d-block text-mutedX min-w-175px">Sedang dilakukan</span>
                        <span class="font-weight-bold">99</span>
                      </div>
                      <div class="d-flex justify-content-between pt-1" style="border-bottom: 1px solid #e4e6ef">
                        <span class="d-block text-mutedX min-w-175px">Sudah Dilakukan</span>
                        <span class="font-weight-bold">99</span>
                      </div>
                      <div class="d-flex justify-content-between pt-1" style="border-bottom: 1px solid #e4e6ef">
                        <span class="d-block text-mutedX min-w-175px">Not Applicable</span>
                        <span class="font-weight-bold">99</span>
                      </div>
                    </div>
                  </li>
                  <li :key="i + '-reportList-hr'">
                    <hr style="border-style:dashed" />
                  </li>
                </template> -->
              </ul>
            </template>
            <template v-else>
              <img src="/static/img/default/no_data_vertical.svg" class="d-block text-center w-50 mx-auto" />
            </template>
            <div v-if="recaptProject" class="text-center">
              <hr />
              <span class="font-weight-lg font-weight-bolder d-block mb-1">Rekapitulasi Laporan</span>
              <div class="d-flex">
                <div class="font-weight-bold text-center text-muted font-size-sm">
                  Belum Dimitigasi
                  <span class="d-block text-primary font-size-h2 font-weight-bolder">
                    {{ recaptProject.report_open || 0 }}
                  </span>
                </div>
                <div class="font-weight-bold text-center text-muted font-size-sm ml-5">
                  Sedang Dimitigasi
                  <span class="d-block text-primary font-size-h2 font-weight-bolder">
                    {{ recaptProject.report_on_going || 0 }}
                  </span>
                </div>
                <div class="font-weight-bold text-center text-muted font-size-sm ml-5">
                  Sudah Dimitigasi
                  <span class="d-block text-primary font-size-h2 font-weight-bolder">
                    {{ recaptProject.report_close || 0 }}
                  </span>
                </div>
              </div>
            </div>
            <template v-if="$_sys.isAllowed(permission.create)">
              <hr />
              <button @click="$set(activeReport, 'id', -1)" class="btn btn-block btn-light-success font-size-sm font-weight-bold">
                <i class="ri-add-circle-fill"></i>
                Tambah Laporan Baru
              </button>
            </template>
          </div>
        </div>
      </div>
      <div v-if="activeReport && activeReport.id !== -1" class="col-8">
        <div v-if="activeReport" class="card card-custom mb-3">
          <div class="card-header align-items-center min-h-20px border-0 pt-5">
            <h3 class="card-title align-items-start flex-column m-0">
              <span class="card-label font-weight-bolder text-dark">Laporan Potensi Isu</span>
            </h3>
            <div class="card-toolbar">
              <template v-if="activeReport.status_code === 'open'">
                <button v-if="$_sys.isAllowed(permission.delete)" @click="deleteReport(activeReport)" class="btn btn-outline-danger font-weight-bold font-size-sm">Hapus Laporan</button>
              </template>
              <button v-else @click="loadHistory(activeReport)" class="btn btn-outline-info font-weight-bold font-size-sm">History Laporan</button>
            </div>
          </div>
          <div class="card-body pt-3 position-relative">
            <table class="table table-detailX mb-0">
              <tbody>
                <tr>
                  <th class="nowrap-table pl-0">Tanggal Dibuat</th>
                  <th class="nowrap-table pl-0">:</th>
                  <td>{{ activeReport.date | parse('longDate') }}</td>
                </tr>
                <tr>
                  <th class="nowrap-table pl-0">Level Mitigasi</th>
                  <th class="nowrap-table pl-0">:</th>
                  <td>Level {{ activeReport.level }}</td>
                </tr>
                <tr>
                  <th class="nowrap-table pl-0 v-center">Status Laporan</th>
                  <th class="nowrap-table pl-0 v-center">:</th>
                  <td>
                    <span :class="bgMitigationStatus('label', activeReport.status_code)" class="label label-xl font-weight-boldest label-inline">{{ activeReport.status_code | parse('status_code_form') }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-if="activeReport" class="card card-custom">
          <div class="card-body pt-3 position-relative">
            <b-overlay :show="loadingRisk" no-wrap rounded="sm" />
            <ul v-if="riskList && activeRisk" class="list-unstyled mb-0">
              <li v-for="(r, i) in riskList" :key="i + '-riskList'" @click="activeRisk = r" class="pointer border-1 py-2 rounded-sm">
                <div class="d-flex">
                  <!-- <div style="flex-wrap: nowrap" :class="bgMitigationStatus('bg', r.status_code)" class="mr-2 mt-1 bg-primary w-20px min-w-20px h-20px rounded-sm">
                    &nbsp;
                  </div> -->
                  <div class="flex-fill">
                    <span class="d-block font-size-lg font-weight-bold">{{ r.rel_sub_issue_id }}</span>
                    <span :class="bgMitigationStatus('label', r.status_code)" class="label label-md font-weight-boldest label-inline mr-2">{{ r.status_code | parse('status_code_form') }}</span>
                    <span class="font-size-sm text-muted">
                      Kode {{ r.sub_issue_code }} -
                      <span class="text-italic">{{ r.rel_category_id }} > {{ r.rel_issue_id }}</span>
                    </span>
                  </div>

                  <div :class="{ 'rotate-bottom': activeRisk.id === r.id }" class="smooth align-self-center">
                    <i class="ri-arrow-right-s-line"></i>
                  </div>
                </div>
                <div class="pl-8 position-relative" v-if="activeRisk.id === r.id">
                  <b-overlay :show="loadingMitigation" no-wrap rounded="sm" />
                  <hr />
                  <span class="font-weight-bold">Daftar Mitigasi</span>
                  <template v-if="mitigationList">
                    <ul class="list-unstyled mb-0">
                      <li style="border-color: #000" v-for="(m, i) in mitigationList" :key="i + '-mitigationList'" class=" border-1 py-2 rounded-sm">
                        <div class="d-flex py-2">
                          <div class="pr-2">{{ i + 1 }}.</div>
                          <div class="flex-fill">
                            <span class="d-block">{{ m.code }} - {{ m.name }}</span>
                            <div>
                              <span v-if="m.reference" class="d-block font-size-sm text-muted text-italic">Referensi : {{ m.reference }}</span>
                              <span :class="bgMitigationStatus('text', m.status_code)" class="font-size-sm font-weight-bold">{{ m.status_code | parse('status_code_mitigation') }}</span>
                            </div>
                          </div>
                          <div class="smooth align-self-center ml-3">
                            <button @click="openModalDetail(m)" class="btn btn-sm btn-outline-primary font-weight-bold">
                              <span style=" white-space: nowrap;" v-if="m.status_code === 'close' || m.status_code === 'na'">Lihat Histori</span>
                              <span style=" white-space: nowrap;" v-else>Update Status</span>
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </template>
                  <hr />
                </div>
              </li>
            </ul>
            <div v-else class="h-250px"></div>
          </div>
        </div>
      </div>
      <div v-if="activeReport && activeReport.id === -1" class="col-8">
        <div v-if="$_sys.isAllowed(permission.create)" class="card card-custom">
          <div class="card-header align-items-center min-h-20px border-0 pt-5">
            <h3 class="card-title align-items-start flex-column m-0">
              <span class="card-label font-weight-bolder text-dark">Tambah Laporan Potensi Isu</span>
            </h3>
          </div>
          <div class="card-body pt-3 position-relative">
            <div v-if="$_sys.isAllowed('bypass-level')" class="form-group">
              <label class="font-size-lg font-weight-bolder text-uppercase mb-3">Pilih level Mitigasi :</label>
              <div class="row ml-3">
                <div v-for="(l, i) in levelData" :key="i + '-levelData'" class="col-lg-4">
                  <label class="option option-plain mb-0">
                    <span class="option-control">
                      <span class="radio">
                        <input v-model="createForm.level" :value="l.id" type="radio" name="m_option_level" />
                        <span></span>
                      </span>
                    </span>
                    <span class="option-label">
                      <span class="option-head">
                        <span class="option-title">Level {{ l.id }}</span>
                      </span>
                      <span class="option-body">
                        {{ l.description }}
                      </span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <span class="font-size-lg font-weight-bolder text-uppercase">Pilih Risk Register :</span>
            <div v-for="(n, i) in treeData" class="pl-0" :key="i + '-nodes'">
              <tree-node :checked="!reportList.length" @selected="wrapSelectedData($event)" :getLevel="2" :level="0" :checklist="true" :last="i + 1 === treeData.length" :node="n" />
            </div>
            <hr />
            <button @click="newReport()" class="btn btn-block btn-success">Simpan & Tambahkan Laporan</button>
          </div>
        </div>
      </div>
      <b-modal id="form-mitigation-status" hide-footer centered size="md">
        <template #modal-header="{ close }">
          <h5 v-if="selectedMitigation" class="card-title d-flex align-items-start flex-column mb-0">
            <span class="card-label font-weight-bolder text-dark text-capitalize">{{ selectedMitigation.code }} - {{ selectedMitigation.name }}</span>
          </h5>
          <button type="button" class="close" aria-label="Close" @click="close()">×</button>
        </template>
        <template v-if="selectedMitigation">
          <div class="timeline timeline-5">
            <div class="timeline-items">
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
                <div class="timeline-desc timeline-desc-light-danger pt-0">
                  <span class="font-weight-bolder text-danger">Mitigasi ditentukan</span>
                  <p class="font-weight-normal font-size-sm text-dark-50 pb-2">Mitigasi proyek dilaporkan oleh {{ selectedMitigation.rel_updated_by }}, pada {{ selectedMitigation.updated_at | parse('longDateTime') }}</p>
                </div>
                <!--end::Info-->
              </div>
              <div class="timeline-item">
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
                <div class="timeline-desc timeline-desc-light-warning pt-0">
                  <div class="d-flex align-items-center justify-content-between mb-1">
                    <span class="font-weight-bolder text-warning">Mitigasi Dilakukan</span>
                  </div>
                  <template v-if="selectedMitigation.on_going_by">
                    <p class="font-weight-normal font-size-sm text-dark-50 pb-2">Dilakukan oleh {{ selectedMitigation.rel_on_going_by }}, pada {{ selectedMitigation.on_going_at | parse('longDateTime') }}</p>
                  </template>
                  <template v-else>
                    <template v-if="$_sys.isAllowed(permission.update)">
                      <p class="font-weight-normal text-dark-50 pb-0 pt-1">
                        Klik
                        <span class="font-weight-bolder text-warning">Lakukan</span>
                        untuk melakukan mitigasi yang dipilih
                      </p>
                      <button @click="updateStatusMitigation('on_going', selectedMitigation.id)" class="btn btn-sm btn-warning mb-5">Lakukan</button>
                    </template>
                    <p v-else class="font-weight-normal text-dark-50 pb-0 pt-1">Menunggu mitigasi proyek dilakukan</p>
                  </template>
                </div>
                <!--end::Info-->
              </div>
              <div v-if="selectedMitigation.on_going_by" class="timeline-item">
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
                <div class="timeline-desc timeline-desc-light-success pt-0">
                  <div class="d-flex align-items-center justify-content-between mb-1">
                    <span class="font-weight-bolder text-success">Mitigasi Sudah Dilakukan</span>
                  </div>
                  <template v-if="selectedMitigation.close_by">
                    <p class="font-weight-normal font-size-sm text-dark-50 pb-2">Dilakukan oleh {{ selectedMitigation.rel_close_by }}, pada {{ selectedMitigation.close_at | parse('longDateTime') }}</p>
                    <span v-if="selectedMitigation.status_code === 'na'" :class="selectedMitigation.status_code === 'close' ? 'label-success' : 'label-danger'" class="label label-pill label-inline">{{ selectedMitigation.status_code === 'close' ? 'Mitigasi Selesai' : 'Not Applicable' }}</span>
                  </template>
                  <template v-else>
                    <template v-if="$_sys.isAllowed(permission.update)">
                      <p class="font-weight-normal text-dark-50 pb-0 pt-1">
                        Klik
                        <span class="font-weight-bolder text-success">Sudah Dilakukan</span>
                        untuk memperbarui status mitigasi menjadi sudah dilakukan
                      </p>
                      <button @click="updateStatusMitigation('close', selectedMitigation.id)" class="btn btn-sm btn-success mb-5">Sudah Dilakukan</button>
                      <button @click="updateStatusMitigation('na', selectedMitigation.id)" class="btn btn-sm btn-danger mb-5">Not Applicable</button>
                    </template>
                    <p v-else class="font-weight-normal text-dark-50 pb-0 pt-1">Menunggu mitigasi dilakukan</p>
                  </template>
                </div>
                <!--end::Info-->
              </div>
            </div>
          </div>
        </template>
      </b-modal>
      <b-modal id="history-report-status" hide-footer centered size="lg">
        <template #modal-header="{ close }">
          <h5 v-if="activeReport" class="card-title d-flex align-items-start flex-column mb-0">
            <span class="card-label font-weight-bolder text-dark text-capitalize">Histori Laporan Tanggal {{ activeReport.date | parse('longDate') }}</span>
          </h5>
          <button type="button" class="close" aria-label="Close" @click="close()">×</button>
        </template>
        <template v-if="historyList">
          <div class="small-scroll pr-3" style="max-height:70vh;overflow-y:auto">
            <div class="timeline timeline-2">
              <div class="timeline-bar"></div>
              <div v-for="(h, i) in historyList" :key="i + '-historyList'" class="timeline-item align-items-start">
                <div class="timeline-badge" style="margin-top:.35em" :class="bgMitigationStatus('bg', h.status_code)"></div>
                <div class="timeline-content d-flex align-items-start justify-content-between">
                  <span class="mr-3">
                    <span class="">{{ h.description }}</span>
                  </span>
                  <div>
                    <span class="nowrap text-muted text-right">{{ h.created_at | parse('longDateTime') }}</span>
                    <span class="d-block text-muted text-right">Oleh {{ h.rel_created_by }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </b-modal>
    </div>
  </section>
</template>
<script>
import moment from 'moment'

export default {
  name: 'detail-potential-issues',
  props: ['id'],
  data () {
    return {
      project: null,
      reportList: null,
      activeReport: null,
      recaptProject: null,
      riskList: null,
      mitigationList: null,
      activeRisk: null,
      selectedMitigation: null,
      loadingCount: 0,
      loadingRisk: false,
      loadingMitigation: false,
      treeData: null,
      levelData: null,
      createForm: {
        level: 3
      },
      selectedTree: [],
      historyList: null,
      permission: {
        create: 'save-potency-issue-mitigations',
        update: 'update-mapping-potency-issues-mitigations',
        delete: 'delete-report-potential-issues'
      }
    }
  },
  watch: {
    activeReport: {
      deep: true,
      immediate: false,
      handler (e) {
        if (e) {
          this.activeRisk = null
          if (e.id === -1) {
            this.loadTree()
          } else {
            this.loadRisk(e.id)
          }
        }
      }
    },
    activeRisk: {
      deep: true,
      immediate: false,
      handler (e) {
        if (e) this.loadMitigation(e.id)
      }
    }
  },
  mounted () {
    this.getAllData()
  },
  methods: {
    loadHistory () {
      this.$_api
        .get('log-activity-potency-issues/dataset', { report_id: this.activeReport.id })
        .then((res) => {
          this.historyList = res.data
          this.$bvModal.show('history-report-status')
        })
        .catch((err) => {
          this.$_alert.error(err)
        })
    },
    getAllData () {
      this.loadProject()
      this.loadReportList()
      this.loadRecaptProject()
    },
    loadProject () {
      this.$_api
        .get('projects/' + this.id + '/show', null)
        .then((res) => {
          this.project = res.data
          this.loadingCount++
        })
        .catch((err) => {
          this.loadingCount++
          this.$_alert.error(err)
        })
    },
    loadReportList () {
      this.$_api
        .get('report-potential-issues/dataset', { project_id: this.id })
        .then((res) => {
          this.reportList = res.data
          if (res.data.length) {
            if (!this.activeReport || this.activeReport.id === -1) this.setReportActive(res.data[0])
          } else this.activeReport = { id: -1 }
          this.loadingCount++
        })
        .catch((err) => {
          this.loadingCount++
          this.$_alert.error(err)
        })
    },
    setReportActive (e) {
      this.activeReport = Object.assign({}, JSON.parse(JSON.stringify(e)))
    },
    loadRecaptProject () {
      this.$_api
        .get('custom/potency-issue/recap-by-project', { project_id: this.id })
        .then((res) => {
          this.recaptProject = res.data
          this.loadingCount++
        })
        .catch((err) => {
          this.loadingCount++
          this.$_alert.error(err)
        })
    },
    loadRisk (id) {
      this.loadingRisk = true
      this.$_api
        .get('potential-issues/dataset', { report_id: id, project_id: this.id })
        .then((res) => {
          this.riskList = res.data
          if (!this.activeRisk) this.activeRisk = res.data[0]
          this.loadingRisk = false
        })
        .catch((err) => {
          this.loadingRisk = false
          this.$_alert.error(err)
        })
    },
    loadMitigation (id) {
      this.loadingMitigation = true
      this.$_api
        .get('mapping-potency-issues-mitigations/dataset', { potency_issue_id: id })
        .then((res) => {
          this.mitigationList = res.data
          this.loadingMitigation = false
        })
        .catch((err) => {
          this.loadingMitigation = false
          this.$_alert.error(err)
        })
    },
    openModalDetail (e) {
      this.selectedMitigation = e
      this.$bvModal.show('form-mitigation-status')
    },
    updateStatusMitigation (status, id) {
      let form = { id: id, status_code: status }
      this.$_api
        .post('custom/potency-issue/mitigation/update-status', form)
        .then((res) => {
          this.getAllData()
          let mitIndex = this.mitigationList.findIndex((x) => x.id === id)
          this.$set(this.mitigationList, mitIndex, res.data)
          this.$set(this.activeRisk, 'status_code', res.potency_issue_status_code)
          this.$set(this.activeReport, 'status_code', res.report_status_code)
          this.$bvModal.hide('form-mitigation-status')
        })
        .catch((err) => {
          this.$_alert.error(err)
        })
    },
    loadTree () {
      this.$_api
        .get('m_levels/dataset')
        .then((res) => {
          this.levelData = res.data
        })
        .catch((err) => {
          console.log(err)
        })
      this.$_api
        .get('custom/master-issue-mitigations/tree')
        .then((res) => {
          this.treeData = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    wrapSelectedData (e) {
      if (e.selected) this.selectedTree.push(e.data)
      else this.selectedTree = this.selectedTree.filter((x) => x.id !== e.data.id)
    },
    newReport () {
      this.$_alert.confirm('Tambah Laporan', 'Laporan Tanggal ' + moment(new Date()).format('DD MMMM YYYY') + ' akan ditambahkan, lanjutkan ?').then((result) => {
        if (result.isConfirmed) {
          let form = Object.assign({}, this.createForm)
          form.project_id = this.id
          form.date = moment(new Date()).format('YYYY-MM-DD')
          form.data = this.selectedTree
          this.$_api
            .post('custom/potency-issue/create', form)
            .then((res) => {
              this.getAllData()
            })
            .catch((err) => {
              this.$_alert.error(err)
            })
        }
      })
    },
    deleteReport (data) {
      this.$_alert.confirm('Hapus Permanen', 'Laporan yang sudah dihapus tidak dapat dikembalikan, lanjutkan ?').then((result) => {
        if (result.isConfirmed) {
          this.$_api
            .delete('report-potential-issues', { data: data })
            .then((res) => {
              this.activeReport = null
              this.getAllData()
              this.$_alert.success(null, res.message)
            })
            .catch((err) => {
              this.$_alert.error(err)
            })
        }
      })
    },
    bgMitigationStatus (prefix, e) {
      if (e === 'on_going') return prefix + '-warning'
      else if (e === 'close') return prefix + '-success'
      else return prefix + '-danger'
    }
  }
}
</script>
<style>
  .rotate-right {
    transform: rotate(-90deg);
  }
  .rotate-bottom {
    transform: rotate(90deg);
  }
</style>
