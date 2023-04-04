<template lang="">
  <div class="container">
    <div class="card">
      <div class="card-body">
        <div class="form-group row mb-0">
          <div class="pr-0 col">
            <div class="form-group mb-0">
              <span class="d-block mb-1 font-weight-bolder font-size-lg" for="">Pilih Unit</span>
              <v-select @input="loadDataset('pst', { unit_id: mainFilter.unit_id.code })" :clearable="false" v-model="mainFilter.unit_id" :appendToBody="true" class="vs-style custom" :options="dataset.units.data" :placeholder="'Pilih Unit'">
                <slot name="no-options">{{ $t('error.no_data') }}</slot>
              </v-select>
            </div>
          </div>
          <div class="pr-0 col">
            <div class="form-group mb-0">
              <span class="d-block mb-1 font-weight-bolder font-size-lg" for="">Pilih PST</span>
              <v-select @input="loadDataset('projects', { pst_id: mainFilter.pst_id.code })" :clearable="false" v-model="mainFilter.pst_id" :appendToBody="true" class="vs-style custom" :options="dataset.pst.data" :placeholder="'Pilih PST'">
                <slot name="no-options">{{ $t('error.no_data') }}</slot>
              </v-select>
            </div>
          </div>
          <div class="pr-0 col">
            <div class="form-group mb-0">
              <span class="d-block mb-1 font-weight-bolder font-size-lg" for="">Pilih Proyek</span>
              <v-select :clearable="false" v-model="mainFilter.project_id" :appendToBody="true" class="vs-style custom" :options="dataset.projects.data" :placeholder="'Pilih Proyek'">
                <slot name="no-options">{{ $t('error.no_data') }}</slot>
              </v-select>
            </div>
          </div>
          <div class="pr-0 col-auto">
            <div class="form-group mb-0">
              <span class="d-block mb-1 font-weight-bolder font-size-lg" for="">Mulai Periode</span>
              <date-picker :disabled-date="disablePeriodAfter" :clearable="false" :input-attr="{ autocomplete: 'off' }" v-model="mainFilter.start_periode" type="month" :input-class="'form-control custom-datepicker datepicker'" class="custom-mx" :value-type="formatDate('month')" :formatter="momentFormat" />
            </div>
          </div>
          <div class="pr-0 col-auto">
            <div class="form-group mb-0">
              <span class="d-block mb-1 font-weight-bolder font-size-lg" for="">Sampai Periode</span>
              <date-picker :disabled-date="disablePeriodBefore" :clearable="false" :input-attr="{ autocomplete: 'off' }" v-model="mainFilter.end_periode" type="month" :input-class="'form-control custom-datepicker datepicker'" class="custom-mx" :value-type="formatDate('month')" :formatter="momentFormat" />
            </div>
          </div>
          <div class="col-auto align-self-end">
            <button v-b-tooltip.hover title="Reload Filter" @click="reloadFilter()" class="btn btn-icon btn-light-danger">
              <i class="ri-refresh-line"></i>
            </button>
          </div>
        </div>
        <div class="position-relative d-flex align-items-end mb-6">
          <ul role="tablist" class="nav nav-tabs nav-tabs-line flex-fill">
            <li v-for="(t, i) in tabList" :key="i + '-tabList'" class="nav-item mr-4 mt-4">
              <a :class="t.id === mainFilter.activeTab ? 'active' : ''" @click="$set(mainFilter, 'activeTab', t.id)" data-toggle="tab" class="nav-link font-size-h5 font-weight-bold border-2 pb-2 pr-10 mx-0 pointer">{{ t.label }}</a>
            </li>
          </ul>
          <div class="pl-3">
            <a @click="exportExcel('download/excel-template/mitigations', 'Data Master Mitigasi')" class="btn btn-sm btn-info font-size-sm font-weight-bolder">
              <i class="ri-file-excel-2-line font-weight-normal "></i>
              Export Mitigasi
            </a>
            <a @click="exportExcel('download/excel-template/potency-issues', 'Data Laporan Potensi Isu')" class="btn btn-sm btn-info font-size-sm font-weight-bolder">
              <i class="ri-file-excel-2-line font-weight-normal "></i>
              Export Potensi Isu
            </a>
          </div>
        </div>
        <template v-if="mainFilter.activeTab === 'report'">
          <div v-if="api.statistic.data" style="background: linear-gradient(180deg, #2F6879 0%, #174350 100%);border-radius: 8px;" class="mb-3 d-flex flex-wrap align-items-center justify-content-between py-4">
            <div style="flex: 1 1 0px; border-right: 1px solid #fff" class="pointer text-white min-w-120px pl-5 mr-5">
              <span @click="redirect('units')" class="d-flex align-items-center font-size-h6 font-weight-bold">
                <span class="min-w-30px pr-3 text-center font-size-h3">{{ api.statistic.data.unit | parse('number') }}</span>
                Unit
              </span>
              <span @click="redirect('pst')" class="d-flex align-items-center font-size-h6 font-weight-bold">
                <span class="min-w-30px pr-3 text-center font-size-h3">{{ api.statistic.data.pst | parse('number') }}</span>
                PST
              </span>
              <span @click="redirect('projects')" class="d-flex align-items-center font-size-h6 font-weight-bold">
                <span class="min-w-30px pr-3 text-center font-size-h3">{{ api.statistic.data.project | parse('number') }}</span>
                Proyek
              </span>
            </div>
            <div style="flex: 1 1 0px" class="text-white min-w-150px px-5">
              <span class="d-block font-size-h6 font-weight-bold">Potensi Isu</span>
              <span class="d-block font-size-h3 font-weight-bolder mb-2">{{ api.statistic.data.potency_issue[0].total | parse('number') }}</span>
              <div @click="redirect('potential-issues')" class="pointer d-flex flex-fill align-items-center">
                <span class="font-size-sm font-weight-light">More Info</span>
                <i class="ri-arrow-right-circle-line font-size-sm pl-3"></i>
              </div>
            </div>
            <div style="flex: 1 1 0px" class="text-white min-w-150px px-5">
              <span class="d-block font-size-h6 font-weight-bold">Kategori Potensi Isu</span>
              <span class="d-block font-size-h3 font-weight-bolder mb-2">{{ api.statistic.data.master.total_kategori_isu | parse('number') }}</span>
              <div @click="redirect('m-issue-categories')" class="pointer d-flex flex-fill align-items-center">
                <span class="font-size-sm font-weight-light">More Info</span>
                <i class="ri-arrow-right-circle-line font-size-sm pl-3"></i>
              </div>
            </div>
            <div style="flex: 1 1 0px" class="text-white min-w-150px px-5">
              <span class="d-block font-size-h6 font-weight-bold">Risk Register</span>
              <span class="d-block font-size-h3 font-weight-bolder mb-2">{{ api.statistic.data.master.total_isu | parse('number') }}</span>
              <div @click="redirect('m-issue-categories')" class="pointer d-flex flex-fill align-items-center">
                <span class="font-size-sm font-weight-light">More Info</span>
                <i class="ri-arrow-right-circle-line font-size-sm pl-3"></i>
              </div>
            </div>
            <div style="flex: 1 1 0px" class="text-white min-w-150px px-5">
              <span class="d-block font-size-h6 font-weight-bold">Sub Risk Register</span>
              <span class="d-block font-size-h3 font-weight-bolder mb-2">{{ api.statistic.data.master.total_sub_isu | parse('number') }}</span>
              <div @click="redirect('m-issue-categories')" class="pointer d-flex flex-fill align-items-center">
                <span class="font-size-sm font-weight-light">More Info</span>
                <i class="ri-arrow-right-circle-line font-size-sm pl-3"></i>
              </div>
            </div>
            <div style="flex: 1 1 0px" class="text-white min-w-150px px-5">
              <span class="d-block font-size-h6 font-weight-bold">Mitigasi</span>
              <span class="d-block font-size-h3 font-weight-bolder mb-2">{{ api.statistic.data.master.total_mitigasi | parse('number') }}</span>
              <div @click="redirect('m-mitigations')" class="pointer d-flex flex-fill align-items-center">
                <span class="font-size-sm font-weight-light">More Info</span>
                <i class="ri-arrow-right-circle-line font-size-sm pl-3"></i>
              </div>
            </div>
          </div>
          <div v-if="api.statistic.data" class="row mb-3">
            <div class="col-4">
              <div class="card card-custom bg-danger card-stretch">
                <!--begin::Body-->
                <div class="card-body px-5 py-4">
                  <span class="font-weight-bold text-white font-size-sm">Laporan Potensi Isu</span>
                  <span class="card-title d-flex font-weight-bolder text-white font-size-h2 mb-0 mt-0 d-block">
                    {{ api.statistic.data.potency_issue[0].total_open | parse('number') }}
                    <span class="font-size-h5 align-self-center pl-2">Belum Dimitigasi</span>
                  </span>
                </div>
                <!--end::Body-->
              </div>
            </div>
            <div class="col-4 pl-0">
              <div class="card card-custom bg-warning card-stretch">
                <!--begin::Body-->
                <div class="card-body px-5 py-4">
                  <span class="font-weight-bold text-white font-size-sm">Laporan Potensi Isu</span>
                  <span class="card-title d-flex font-weight-bolder text-white font-size-h2 mb-0 mt-0 d-block">
                    {{ api.statistic.data.potency_issue[0].total_on_going | parse('number') }}
                    <span class="font-size-h5 align-self-center pl-2">Sedang Dimitigasi</span>
                  </span>
                </div>
                <!--end::Body-->
              </div>
            </div>
            <div class="col-4 pl-0">
              <div class="card card-custom bg-success card-stretch">
                <!--begin::Body-->
                <div class="card-body px-5 py-4">
                  <span class="font-weight-bold text-white font-size-sm">Laporan Potensi Isu</span>
                  <span class="card-title d-flex font-weight-bolder text-white font-size-h2 mb-0 mt-0 d-block">
                    {{ api.statistic.data.potency_issue[0].total_close | parse('number') }}
                    <span class="font-size-h5 align-self-center pl-2">Sudah Dimitigasi</span>
                  </span>
                </div>
                <!--end::Body-->
              </div>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-7">
              <div class="mb-5">
                <h6 class="font-weight-bolder mb-1">Grafik Mitigasi Unit berdasarkan Status</h6>
                <span class="font-weight-bold text-muted">Periode {{ mainFilter.start_periode }} s/d {{ mainFilter.end_periode }}</span>
              </div>
              <apexchart v-if="api.statusChart.data" :height="280" :options="trendOption" :series="api.statusChart.data"></apexchart>
            </div>
            <div class="col-5">
              <div class="border border-statistic py-5 px-4">
                <div class="text-center mb-5">
                  <h6 class="font-weight-bolder mb-1">Grafik Potensi Isu berdasarkan Kategori</h6>
                  <span class="font-weight-bold text-muted">Periode {{ mainFilter.start_periode }} s/d {{ mainFilter.end_periode }}</span>
                </div>
                <apexchart :height="300" :options="pieOption" :series="pieSeries"></apexchart>
              </div>
            </div>
          </div>
          <hr style="border-style: dashed;" />
          <div class="mt-5">
            <div class="d-flex align-items-center mb-5">
              <div class="flex-fill">
                <h6 class="font-weight-bolder mb-1">Peta Persebaran Proyek</h6>
                <span class="font-weight-bold text-muted">Warna pin Proyek {{ activeMapGroup.label }}</span>
              </div>
              <div>
                <v-select @input="buildMapProperty(api.mapData, false)" :clearable="false" v-model="activeMapGroup" :appendToBody="true" class="vs-style custom min-w-250px" :options="mapGroup" :placeholder="'Pilih Group'">
                  <slot name="no-options">{{ $t('error.no_data') }}</slot>
                </v-select>
              </div>
            </div>
          </div>
          <GmapMap ref="mapRefsdashboard" class="h-500px" :options="mapOption" :center="mapCenter" :zoom="zoomNum">
            <GmapInfoWindow v-if="infoContent" :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen = false">
              <div>
                <span class="d-block font-weight-bold text-dark mt-2">{{ infoContent.project_name }} - Tahun {{ infoContent.year | parse('year') }}</span>
                <span class="d-block font-weight-bold text-muted mb-2">Supervisor: {{ infoContent.rel_unit_id }}</span>
                <table class="table-borderless">
                  <tr>
                    <td style="vertical-align:top" class="text-dark nowrap-table">PST</td>
                    <td style="vertical-align:top" class="text-dark nowrap-table px-2">:</td>
                    <td style="vertical-align:top" class="text-dark">{{ infoContent.rel_pst_id || '-' }}</td>
                  </tr>
                  <tr>
                    <td style="vertical-align:top" class="text-dark nowrap-table">Tipe</td>
                    <td style="vertical-align:top" class="text-dark nowrap-table px-2">:</td>
                    <td style="vertical-align:top" class="text-dark">{{ infoContent.rel_type_id || '-' }}</td>
                  </tr>
                  <tr>
                    <td style="vertical-align:top" class="text-dark nowrap-table">Urgensi</td>
                    <td style="vertical-align:top" class="text-dark nowrap-table px-2">:</td>
                    <td style="vertical-align:top" class="text-dark">{{ infoContent.rel_urgency_id || '-' }}</td>
                  </tr>
                  <tr>
                    <td style="vertical-align:top" class="text-dark nowrap-table">Kode Proyek</td>
                    <td style="vertical-align:top" class="text-dark nowrap-table px-2">:</td>
                    <td style="vertical-align:top" class="text-dark">{{ infoContent.project_code || '-' }}</td>
                  </tr>
                  <tr>
                    <td style="vertical-align:top" class="text-dark nowrap-table">Kode RUPTL</td>
                    <td style="vertical-align:top" class="text-dark nowrap-table px-2">:</td>
                    <td style="vertical-align:top" class="text-dark">{{ infoContent.ruptl_code || '-' }}</td>
                  </tr>
                  <tr>
                    <td style="vertical-align:top" class="text-dark nowrap-table">Kode Lokasi</td>
                    <td style="vertical-align:top" class="text-dark nowrap-table px-2">:</td>
                    <td style="vertical-align:top" class="text-dark">{{ infoContent.location_code || '-' }}</td>
                  </tr>
                </table>
              </div>
            </GmapInfoWindow>
            <template v-if="api.mapData.mapData">
              <gmap-custom-marker v-for="(pin, i) in api.mapData.mapData" :key="i" :marker="pin.place" @click.native="toggleInfoWindow(pin, i)">
                <img :src="pin.pin" style="width:15px" />
              </gmap-custom-marker>
            </template>
          </GmapMap>
          <div class="mt-3">
            <span class="d-block mb-2 font-weight-bold">Legend:</span>
            <div class="d-inline-flex align-items-center">
              <div v-for="(l, i) in legendMap" :key="i + '-legendMap'" class="d-flex align-items-center mr-5">
                <img :src="l.pin" class="w-15px mr-2" />
                <span>{{ l.label }}</span>
              </div>
            </div>
          </div>
        </template>
        <template v-if="mainFilter.activeTab === 'monitoring'">
          <div class="position-relative mt-6">
            <b-overlay :show="api.unitTable.isLoading" no-wrap />
            <div class="mb-5">
              <h6 class="font-weight-bolder mb-1">Monitoring Status Penyelesaian Isu Unit</h6>
              <span class="font-weight-bold text-muted">Periode {{ mainFilter.start_periode }} s/d {{ mainFilter.end_periode }}</span>
            </div>
            <div class="table-responsive">
              <table class="table table-hovered table-bordered">
                <thead class="bg-light-primary">
                  <tr>
                    <th class="text-center v-center min-w-250px" rowspan="2">Nama Unit</th>
                    <th class="text-center v-center nowrap-table" rowspan="2">
                      Total
                      <br />
                      Potensi Isu
                    </th>
                    <th class="text-center nowrap-table" colspan="3">Monitoring Status Penyelesaian Isu</th>
                    <th class="text-center nowrap-table" colspan="4">Monitoring Status Mitigasi</th>
                    <th class="text-center nowrap-table" colspan="4">Monitoring Risk</th>
                  </tr>
                  <tr>
                    <th class="text-center nowrap-table">Belum Mitigasi</th>
                    <th class="text-center nowrap-table">Sedang Mitigasi</th>
                    <th class="text-center nowrap-table">Sudah Mitigasi</th>
                    <!-- ================== -->
                    <th class="text-center nowrap-table">Belum Dilakukan</th>
                    <th class="text-center nowrap-table">Sedang Dilakukan</th>
                    <th class="text-center nowrap-table">Mitigasi Selesai</th>
                    <th class="text-center nowrap-table">Mitigasi NA</th>
                    <!-- ================== -->
                    <th class="text-center nowrap-table">Kategori Potensi Isu</th>
                    <th class="text-center nowrap-table">Risk Register</th>
                    <th class="text-center nowrap-table">Sub Risk Register</th>
                    <th class="text-center nowrap-table">Mitigasi</th>
                  </tr>
                </thead>
                <tbody v-if="api.unitTable.data">
                  <template v-for="(d, i) in api.unitTable.data">
                    <tr :key="i + '-api.unitTable.data'">
                      <td>
                        <div class="text-line-2 text-primary font-weight-bolder">{{ d.name }}</div>
                      </td>
                      <td class="nowrap-table text-center v-center">{{ d.total_report | parse('number') }}</td>

                      <td class="nowrap-table text-center v-center">{{ d.report_open | parse('number') }}</td>
                      <td class="nowrap-table text-center v-center">{{ d.report_on_going | parse('number') }}</td>
                      <td class="nowrap-table text-center v-center">{{ d.report_close | parse('number') }}</td>

                      <td class="nowrap-table text-center v-center">{{ d.mitigation_open | parse('number') }}</td>
                      <td class="nowrap-table text-center v-center">{{ d.mitigation_on_going | parse('number') }}</td>
                      <td class="nowrap-table text-center v-center">{{ d.mitigation_close | parse('number') }}</td>
                      <td class="nowrap-table text-center v-center">{{ d.mitigation_na | parse('number') }}</td>

                      <td class="nowrap-table text-center v-center">{{ d.total_category | parse('number') }}</td>
                      <td class="nowrap-table text-center v-center">{{ d.total_issue | parse('number') }}</td>
                      <td class="nowrap-table text-center v-center">{{ d.total_sub_issue | parse('number') }}</td>
                      <td class="nowrap-table text-center v-center">{{ d.total_mitigation | parse('number') }}</td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
          <div class="position-relative mt-6">
            <b-overlay :show="api.pstTable.isLoading" no-wrap />
            <div class="mb-5">
              <h6 class="font-weight-bolder mb-1">
                Monitoring Status Penyelesaian Isu PST
                <template v-if="api.pstTable.params.unit_id">- {{ api.unitTable.data.filter((x) => x.id === api.pstTable.params.unit_id)[0].name }}</template>
              </h6>
              <span class="font-weight-bold text-muted">Periode {{ mainFilter.start_periode }} s/d {{ mainFilter.end_periode }}</span>
            </div>
            <div class="table-responsive">
              <table class="table table-hovered table-bordered">
                <thead class="bg-light-primary">
                  <tr>
                    <th class="text-center v-center min-w-250px" rowspan="2">Nama PST</th>
                    <th class="text-center v-center nowrap-table" rowspan="2">
                      Total
                      <br />
                      Potensi Isu
                    </th>
                    <th class="text-center nowrap-table" colspan="3">Monitoring Status Penyelesaian Isu</th>
                    <th class="text-center nowrap-table" colspan="4">Monitoring Status Mitigasi</th>
                    <th class="text-center nowrap-table" colspan="4">Monitoring Risk</th>
                  </tr>
                  <tr>
                    <th class="text-center nowrap-table">Belum Mitigasi</th>
                    <th class="text-center nowrap-table">Sedang Mitigasi</th>
                    <th class="text-center nowrap-table">Sudah Mitigasi</th>
                    <!-- ================== -->
                    <th class="text-center nowrap-table">Belum Dilakukan</th>
                    <th class="text-center nowrap-table">Sedang Dilakukan</th>
                    <th class="text-center nowrap-table">Mitigasi Selesai</th>
                    <th class="text-center nowrap-table">Mitigasi NA</th>
                    <!-- ================== -->
                    <th class="text-center nowrap-table">Kategori Potensi Isu</th>
                    <th class="text-center nowrap-table">Risk Register</th>
                    <th class="text-center nowrap-table">Sub Risk Register</th>
                    <th class="text-center nowrap-table">Mitigasi</th>
                  </tr>
                </thead>
                <tbody v-if="api.pstTable.data">
                  <template v-for="(d, i) in api.pstTable.data">
                    <tr :key="i + '-api.unitTable.data'">
                      <!-- <td
                        @click="
                          $set(api.projectTable, 'params', { pst_id: d.id })
                          $set(api.potentialTable, 'params', {})
                          loadSingleData(null, 'projectTable')
                        "
                        class="pointer"
                      > -->
                      <td>
                        <div class="text-line-2 text-primary font-weight-bolder">{{ d.name }}</div>
                      </td>
                      <td class="nowrap-table text-center v-center">{{ d.total_report | parse('number') }}</td>

                      <td class="nowrap-table text-center v-center">{{ d.report_open | parse('number') }}</td>
                      <td class="nowrap-table text-center v-center">{{ d.report_on_going | parse('number') }}</td>
                      <td class="nowrap-table text-center v-center">{{ d.report_close | parse('number') }}</td>

                      <td class="nowrap-table text-center v-center">{{ d.mitigation_open | parse('number') }}</td>
                      <td class="nowrap-table text-center v-center">{{ d.mitigation_on_going | parse('number') }}</td>
                      <td class="nowrap-table text-center v-center">{{ d.mitigation_close | parse('number') }}</td>
                      <td class="nowrap-table text-center v-center">{{ d.mitigation_na | parse('number') }}</td>

                      <td class="nowrap-table text-center v-center">{{ d.total_category | parse('number') }}</td>
                      <td class="nowrap-table text-center v-center">{{ d.total_issue | parse('number') }}</td>
                      <td class="nowrap-table text-center v-center">{{ d.total_sub_issue | parse('number') }}</td>
                      <td class="nowrap-table text-center v-center">{{ d.total_mitigation | parse('number') }}</td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
          <div class="position-relative mt-6">
            <b-overlay :show="api.projectTable.isLoading" no-wrap />
            <div class="mb-5">
              <h6 class="font-weight-bolder mb-1">
                Monitoring Status Penyelesaian Isu Proyek
                <template v-if="api.projectTable.params.pst_id">- {{ api.pstTable.data.filter((x) => x.id === api.projectTable.params.pst_id)[0].name }}</template>
              </h6>
              <span class="font-weight-bold text-muted">Periode {{ mainFilter.start_periode }} s/d {{ mainFilter.end_periode }}</span>
            </div>
            <div class="table-responsive">
              <table class="table table-hovered table-bordered">
                <thead class="bg-light-primary">
                  <tr>
                    <th class="text-center v-center min-w-250px" rowspan="2">Nama Proyek</th>
                    <th class="text-center v-center nowrap-table" rowspan="2">
                      Total
                      <br />
                      Potensi Isu
                    </th>
                    <th class="text-center nowrap-table" colspan="3">Monitoring Status Penyelesaian Isu</th>
                    <th class="text-center nowrap-table" colspan="4">Monitoring Status Mitigasi</th>
                    <th class="text-center nowrap-table" colspan="4">Monitoring Risk</th>
                  </tr>
                  <tr>
                    <th class="text-center nowrap-table">Belum Mitigasi</th>
                    <th class="text-center nowrap-table">Sedang Mitigasi</th>
                    <th class="text-center nowrap-table">Sudah Mitigasi</th>
                    <!-- ================== -->
                    <th class="text-center nowrap-table">Belum Dilakukan</th>
                    <th class="text-center nowrap-table">Sedang Dilakukan</th>
                    <th class="text-center nowrap-table">Mitigasi Selesai</th>
                    <th class="text-center nowrap-table">Mitigasi NA</th>
                    <!-- ================== -->
                    <th class="text-center nowrap-table">Kategori Potensi Isu</th>
                    <th class="text-center nowrap-table">Risk Register</th>
                    <th class="text-center nowrap-table">Sub Risk Register</th>
                    <th class="text-center nowrap-table">Mitigasi</th>
                  </tr>
                </thead>
                <tbody v-if="api.projectTable.data">
                  <template v-for="(d, i) in api.projectTable.data">
                    <tr :key="i + '-api.unitTable.data'">
                      <!-- <td
                        @click="
                          $set(api.projectTable, 'params', { pst_id: d.id })
                          loadSingleData(null, 'projectTable')
                        "
                        class="pointer"
                      > -->
                      <td>
                        <div class="text-line-2 text-primary font-weight-bolder">{{ d.name }}</div>
                      </td>
                      <td class="nowrap-table text-center v-center">{{ d.total_report | parse('number') }}</td>

                      <td class="nowrap-table text-center v-center">{{ d.report_open | parse('number') }}</td>
                      <td class="nowrap-table text-center v-center">{{ d.report_on_going | parse('number') }}</td>
                      <td class="nowrap-table text-center v-center">{{ d.report_close | parse('number') }}</td>

                      <td class="nowrap-table text-center v-center">{{ d.mitigation_open | parse('number') }}</td>
                      <td class="nowrap-table text-center v-center">{{ d.mitigation_on_going | parse('number') }}</td>
                      <td class="nowrap-table text-center v-center">{{ d.mitigation_close | parse('number') }}</td>
                      <td class="nowrap-table text-center v-center">{{ d.mitigation_na | parse('number') }}</td>

                      <td class="nowrap-table text-center v-center">{{ d.total_category | parse('number') }}</td>
                      <td class="nowrap-table text-center v-center">{{ d.total_issue | parse('number') }}</td>
                      <td class="nowrap-table text-center v-center">{{ d.total_sub_issue | parse('number') }}</td>
                      <td class="nowrap-table text-center v-center">{{ d.total_mitigation | parse('number') }}</td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </template>
        <template v-if="mainFilter.activeTab === 'tree'">
          <div class="position-relative mt-6">
            <!-- <hr style="border-style: dashed;" /> -->
          <div v-if="api.treeData.data" class="mb-5">
            <h6 class="font-weight-bolder mb-1">Rekap Potensi Isu & Mitigasi Proyek</h6>
            <span class="font-weight-bold text-muted">Periode {{ mainFilter.start_periode }} s/d {{ mainFilter.end_periode }}</span>
            <div class="pl-3 mt-3">
              <template v-for="(t, i) in api.treeData.data">
                <div :key="i + '-treeData'" class="d-flex align-items-start mb-5">
                  <i class="ri-community-line ri-2x text-primary pr-2"></i>
                  <div>
                    <span class="d-block font-weight-bold font-size-lg">{{ t.project_name }} ({{ t.rel_type_id }})</span>
                    <span class="d-block text-muted mb-2">{{ t.rel_pst_id }} - {{ t.rel_unit_id }}</span>
                    <template v-for="(n, i) in t.data">
                      <tree-node :last="i+1 === t.data.length" :key="i + '-nodes'" :node="n" />
                    </template>
                  </div>
                </div>
              </template>
            </div>
          </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<style>
  .custom-mx {
    width: 150px !important;
  }
  .custom-datepicker {
    width: 155px !important;
  }
  .card-statistic {
    padding: 0.25rem 1rem;
    border-radius: 8px;
    position: relative;
  }
  .bg-statistic-1 {
    background: #514d62;
    color: #fff;
  }
  .bg-statistic-2 {
    background: #a8bf17;
    color: #fff;
  }
  .bg-statistic-3 {
    background: #3c5257;
    color: #fff;
  }
  .bg-statistic-4 {
    background: #bf1250;
    color: #fff;
  }
  .bg-statistic-5 {
    background: #2053b4;
    color: #fff;
  }
  .border-statistic {
    border-radius: 18px;
  }
</style>
<script>
import { gmapApi } from 'vue2-google-maps'
import moment from 'moment'
moment.locale('id')
export default {
  name: 'dashboard',
  computed: {
    google: gmapApi
  },
  data () {
    return {
      mainFilter: {
        unit_id: { label: 'Semua Unit', code: null },
        pst_id: { label: 'Semua PST', code: null },
        project_id: { label: 'Semua Proyek', code: null },
        start_periode: moment()
          .set('date', 1)
          .set('month', 0)
          .format('MMMM YYYY'),
        end_periode: moment()
          .set('date', 1)
          .format('MMMM YYYY'),
        activeTab: 'report'
      },
      tabList: [
        { id: 'report', label: 'Statistik Potensi Isu' },
        { id: 'monitoring', label: 'Monitoring Potensi Isu' },
        { id: 'tree', label: 'Rekapitulasi Potensi Isu' }
      ],
      momentFormat: {
        stringify: (date) => {
          return date ? moment(date).format('MMMM YYYY') : ''
        },
        parse: (value) => {
          return value ? moment(value, 'MMMM YYYY').toDate() : null
        }
      },
      dataset: {
        units: { allowAll: true, name: 'Unit', target: 'unit_id', label: 'name', code: 'id', data: [] },
        pst: { allowAll: true, name: 'PST', target: 'pst_id', label: 'name', code: 'id', data: [] },
        projects: { allowAll: true, name: 'Proyek', target: 'project_id', label: 'project_name', code: 'id', data: [] }
      },
      api: {
        statistic: { type: 'report', isLoading: true, data: null, params: {}, endpoint: 'custom/dashboard/statistic', builder: null },
        statusChart: { type: 'report', isLoading: true, data: null, params: {}, endpoint: 'custom/dashboard/monitoring-potency-issue-by-status', builder: null },
        categoryChart: { type: 'report', isLoading: true, data: null, params: {}, endpoint: 'custom/dashboard/monitoring-potency-issue-by-category', builder: 'buildcategoryChart' },
        mapData: { type: 'report', isLoading: true, data: null, params: {}, endpoint: 'projects/dataset', builder: 'buildMapProperty' },
        unitTable: { type: 'monitoring', isLoading: true, data: null, params: {}, endpoint: 'custom/dashboard/monitoring-potency-issue-by-units', builder: null },
        pstTable: { type: 'monitoring', isLoading: true, data: null, params: {}, endpoint: 'custom/dashboard/monitoring-potency-issue-by-pst', builder: null },
        projectTable: { type: 'monitoring', isLoading: true, data: null, params: {}, endpoint: 'custom/dashboard/monitoring-potency-issue-by-projects', builder: null },
        treeData: { type: 'tree', isLoading: true, data: null, params: {}, endpoint: 'custom/potential-issue-by-project/tree', builder: null }
      },
      mapGroup: [
        { label: 'Berdasarkan Unit', code: 'rel_unit_id' },
        { label: 'Berdasarkan PST', code: 'rel_pst_id' },
        { label: 'Berdasarkan Jenis Proyek', code: 'rel_type_id' },
        { label: 'Berdasarkan Urgensi Proyek', code: 'rel_urgency_id' }
      ],
      activeMapGroup: { label: 'Berdasarkan Unit', code: 'rel_unit_id' },
      legendMap: null,
      mapOption: {
        mapId: 'e9b35af2ccbd8ce',
        zoomControl: false,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true,
        disableDefaultUi: false,
        styles: [
          {
            featureType: 'poi',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'administrative',
            stylers: [{ visibility: 'on' }]
          },
          {
            featureType: 'transit',
            stylers: [{ visibility: 'off' }]
          }
        ]
      },
      zoomNum: 5,
      mapCenter: {
        lat: -1.2245542,
        lng: 119.3470253
      },
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -15
        }
      },
      infoWindowPos: null,
      infoContent: null,
      infoWinOpen: false,
      currentMidx: 0,
      mapKey: 0,
      trendOption: {
        chart: {
          type: 'line',
          stacked: false,
          animations: {
            enabled: true
          },
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false,
              customIcons: []
            }
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: false,
            columnWidth: '25%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [0]
        },
        stroke: {
          width: [4, 0, 0, 0, 0]
        },
        legend: {
          horizontalAlign: 'left',
          offsetX: 0
        },
        xaxis: {
          type: 'category'
        },
        yaxis: [
          {
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: '#1b4957'
            },
            labels: {
              style: {
                colors: '#1b4957'
              }
            },
            title: {
              text: 'Total Mitigasi',
              style: {
                color: '#1b4957'
              }
            },
            tooltip: {
              fixed: {
                enabled: true,
                position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                offsetY: 30,
                offsetX: 60
              }
            }
          }
        ],
        noData: {
          text: 'Loading Chart',
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '14px',
            fontFamily: undefined
          }
        }
      },
      pieOption: {
        chart: {
          type: 'donut'
        },
        noData: {
          text: 'Loading Chart',
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '14px',
            fontFamily: undefined
          }
        }
      },
      pieSeries: []
    }
  },
  watch: {
    mainFilter: {
      deep: true,
      immediate: true,
      handler (e) {
        let newFilter = {}
        if (e.unit_id.code) newFilter.unit_id = e.unit_id.code
        if (e.pst_id.code) newFilter.pst_id = e.pst_id.code
        if (e.project_id.code) newFilter.project_id = e.project_id.code
        newFilter.start_periode = moment(e.start_periode, 'MMMM YYYY').format('YYYY-MM-DD')
        newFilter.end_periode = moment(e.end_periode, 'MMMM YYYY').format('YYYY-MM-DD')
        const noFilter = ['mapData']
        for (let i = 0; i < Object.keys(this.api).length; i++) {
          const el = Object.keys(this.api)[i]
          if (!noFilter.includes(el)) this.$set(this.api, el, { ...this.api[el], ...{ params: newFilter } })
        }
        this.$nextTick((nextTick) => {
          this.getAllData()
          if (e.activeTab === 'report') {
            this.$refs.mapRefsdashboard.$mapPromise.then((map) => {
              const featureStyleOptions = {
                strokeColor: '#2d3a50',
                strokeOpacity: 1.0,
                strokeWeight: 2.0,
                fillColor: '#f24b5f',
                fillOpacity: 0
              }
              let featureLayer = map.getFeatureLayer('COUNTRY')
              featureLayer.style = (options) => {
                if (options.feature.placeId === 'ChIJtwRkSdcHTCwRhfStG-dNe-M') {
                  return featureStyleOptions
                }
              }
            })
          }
        })
      }
    }
  },
  mounted () {
    this.loadDataset('units')
  },
  methods: {
    reloadFilter () {
      this.mainFilter = Object.assign({},
        {
          unit_id: { label: 'Semua Unit', code: null },
          pst_id: { label: 'Semua PST', code: null },
          project_id: { label: 'Semua Proyek', code: null },
          start_periode: moment()
            .set('date', 1)
            .set('month', 0)
            .format('MMMM YYYY'),
          end_periode: moment()
            .set('date', 1)
            .format('MMMM YYYY'),
          activeTab: this.mainFilter.activeTab
        }
      )
    },
    disablePeriodBefore (date) {
      let start = moment(moment(this.mainFilter.start_periode, 'MMMM YYYY').toDate())
      return date < start
    },
    disablePeriodAfter (date) {
      let end = moment(moment(this.mainFilter.end_periode, 'MMMM YYYY').toDate())
      return date > end
    },
    formatDate (type) {
      let _format
      switch (type) {
        case 'date':
        case 'date-range':
          _format = 'YYYY-MM-DD'
          break
        case 'datetime':
        case 'datetime-range':
          _format = 'YYYY-MM-DD HH:mm:ss'
          break
        case 'year':
        case 'year-range':
          _format = 'YYYY'
          break
        case 'month':
        case 'month-range':
          _format = 'YYYY-MM-DD'
          break
        case 'time':
        case 'time-range':
          _format = 'HH:mm:ss'
          break
        case 'week':
        case 'week-range':
          _format = 'DD'
          break
      }
      return _format
    },
    loadDataset (api, filter) {
      // this.$set(this.mainFilter, this.dataset[api].target, { label: 'Semua ' + this.dataset[api].name, code: null })
      this.$_api
        .dataset(api, filter)
        .then((res) => {
          let fd = res.data.map((x) => {
            return { label: x[this.dataset[api].label], code: x[this.dataset[api].code] }
          })
          if (this.dataset[api].allowAll) fd.unshift({ label: 'Semua ' + this.dataset[api].name, code: null })
          this.$set(this.dataset[api], 'data', fd)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async getAllData () {
      for (let i = 0; i < Object.keys(this.api).length; i++) {
        const el = Object.keys(this.api)[i]
        if (this.api[el].type === this.mainFilter.activeTab) this.loadSingleData(Boolean(i), el)
      }
    },
    loadSingleData (onErrorAlert, id) {
      this.$set(this.api[id], 'isLoading', true)
      this.$_api
        .get(this.api[id].endpoint, this.api[id].params)
        .then((res) => {
          if (this.api[id].builder) this[this.api[id].builder](res)
          else this.$set(this.api, id, { ...this.api[id], ...{ isLoading: false, data: res.data } })
        })
        .catch((err) => {
          this.$set(this.api[id], 'isLoading', false)
          console.log(err)
          // if(onErrorAlert) this.$_alert.error(err)
        })
    },
    buildcategoryChart (res) {
      const data = res.data
      this.$set(
        this.pieOption,
        'labels',
        data.map((x) => x.name)
      )
      this.pieSeries = data.map((x) => x.total)
      this.$set(this.api, 'categoryChart', { ...this.api['categoryChart'], ...{ isLoading: false, data: data } })
    },
    buildMapProperty (res, init = true) {
      const data = res.data.filter((x) => x.latitude && x.longitude)
      if (init) this.$set(this.api, 'mapData', { ...this.api['mapData'], ...{ isLoading: false, data: data } })
      var groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
          ;(rv[x[key]] = rv[x[key]] || []).push(x)
          return rv
        }, {})
      }
      let groupProject = groupBy(data, this.activeMapGroup.code)
      let final = []
      let pinNumber = 0
      let legend = []
      for (let i = 0; i < Object.keys(groupProject).length; i++) {
        const proj = groupProject[Object.keys(groupProject)[i]]
        for (let j = 0; j < proj.length; j++) {
          const e = proj[j]
          final.push({
            place: { lat: Number(e.latitude), lng: Number(e.longitude) },
            pin: '/static/img/pin-map/path208-' + pinNumber + '.png',
            data: e
          })
        }
        legend.push({
          pin: '/static/img/pin-map/path208-' + pinNumber + '.png',
          label: proj[0][this.activeMapGroup.code]
        })
        if (pinNumber === 11) pinNumber = 0
        pinNumber++
      }
      this.legendMap = legend
      this.$set(this.api['mapData'], 'mapData', final)
      if (!init) this.mapKey++
    },
    toggleInfoWindow: function (marker, idx) {
      this.infoWindowPos = marker.place
      this.infoContent = marker.data
      this.infoID = marker.data.id
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    },
    redirect (to, data = null) {
      let param = {
        view: 'list'
      }
      if (data) param.filters = JSON.stringify(data)
      const routeData = this.$router.resolve({ name: to, query: param })
      window.open(routeData.href, '_blank')
    },
    exportExcel (api, filename) {
      this.$_api.downloadFile(api, null, filename + '.xlsx').then(
        (res) => {
          this.isLoadingExport = false
        },
        (err) => {
          this.isLoadingExport = false
          this.$_alert.error(err)
        }
      )
    }
  }
}
</script>
<style lang=""></style>
