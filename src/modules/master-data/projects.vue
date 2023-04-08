<template>
  <tas-base-crud ref="crudProject" :config="config">
    <template v-slot:detail-body-header="data">
      <ProjectsRecapt v-if="data.rowData" :id="data.rowData.id" />
      <div v-if="data.rowData" class="row mb-3">
        <div class="col-auto px-5">
          <span class="d-block font-weight-bolder font-size-lg mb-4">Tahap proyek saat ini</span>
          <span class="label label-outline-primary label-lg label-inline font-size-h6 px-8 py-6 font-weight-bold mb-2" style="border-radius: 23px;">{{ data.rowData.current_status || 'Tidak Diketahui' }}</span>
        </div>
        <div class="col px-5">
          <div class="row h-100">
            <div v-for="(d, i) in dateProject" :key="i + '-dateProject'" class="d-flex flex-column px-6">
              <span class="d-block font-weight-bold font-size-lg">{{ d.label }}</span>
              <div @click="openModalProj('Update', d, data.rowData, data.rowData[d.id])" class="d-flex flex-fill flex-column justify-content-end pointer" v-if="data.rowData[d.id]">
                <span class="font-weight-bold text-info font-size-h6 text-italic">{{ data.rowData[d.id] | parse('longDate') }}</span>
                <div class="d-flex align-items-center font-weight-normal text-info font-size-sm">
                  <span>Edit Tanggal</span>
                  <i class="ri-pencil-line pl-2 text-info"></i>
                </div>
              </div>
              <template v-else>
                <div v-if="i > 0 && data.rowData[dateProject[i - 1].id]" class="d-flex flex-fill flex-column justify-content-center">
                  <button @click="openModalProj('Tambah', d, data.rowData, null)" class="btn btn-light-primary btn-sm px-5">
                    <i class="ri-calendar-line mr-2"></i>
                    <span class="pt-1">Tambah</span>
                  </button>
                </div>
                <div v-else class="d-flex flex-fill flex-column justify-content-end pointer">
                  <span class="font-weight-bold text-info font-size-h6 text-italic">-</span>
                  <div class="d-flex align-items-center font-weight-normal text-danger font-size-sm">
                    <span>Isi tahap {{ dateProject[i - 1].label }}</span>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <hr class="mt-0" style="border-style: dashed;" />
      <b-modal @hide="resetProjectForm" id="modal-projectDates" hide-header hide-footer centered>
        <template v-if="activeDate">
          <span class="font-weight-bold font-size-lg">{{ activeDate.state }} tanggal tahapan Proyek</span>
          <hr />
          <div class="d-flex">
            <div class="col-auto pl-0">
              <!-- <s-input v-model="projectForm[activeDate.id]" :item="{ label: null, nm: true, inline: true, validation: ['required'], type: 'date' }" /> -->
              <date-picker :value-type="'YYYY-MM-DD'" :disabled-date="disabledBeforeStep" inline :input-attr="{ autocomplete: 'off' }" v-model="projectForm[activeDate.id]" :input-class="'form-control'" />
            </div>
            <div class="col px-0">
              <div class="d-flex h-100 justify-content-between flex-column">
                <div>
                  <span class="d-block font-weight-bold font-size-md">Tahap {{ activeDate.label }}</span>
                  <span class="d-block font-weight-bold text-info font-size-h6 text-italic my-3">{{ projectForm[activeDate.id] || '-' | parse('longDate') }}</span>
                  <div>
                    <button @click="saveProjectForm()" :disabled="!projectForm[activeDate.id]" class="btn btn-primary mt-3">Simpan</button>
                  </div>
                </div>
                <p class="mb-2 font-size-sm text-muted text-italic">Pastikan pengisian tanggal tidak kurang dari tahap sebelumnya</p>
              </div>
            </div>
          </div>
        </template>
      </b-modal>
    </template>
  </tas-base-crud>
</template>
<script>
import ProjectsRecapt from './comp-projects/projects-recapt.vue'
export default {
  name: 'crud-projects',
  components: {
    ProjectsRecapt
  },
  data () {
    return {
      dateProject: [
        { id: 'start_date', label: 'Inisiasi' },
        { id: 'planning_date', label: 'Perencanaan' },
        { id: 'pre_implementation_date', label: 'Pra-Pelaksanaan' },
        { id: 'implementation_date', label: 'Pelaksanaan' },
        { id: 'end_date', label: 'Selesai' }
      ],
      activeDate: null,
      projectForm: {},
      projectDetail: null,
      config: {
        title: 'Proyek',
        model_api: 'projects',
        getter: 'projects',
        setter: 'projects',
        pk_field: null,
        export: true,
        import: {
          templateURL: 'download/excel-template/projects',
          uploadURL: 'custom/project/import-excel-template'
        },
        permission: {
          create: 'create-projects',
          read: 'view-projects',
          update: 'update-projects',
          delete: 'delete-projects'
        },
        fields: [
          { id: 'project_name', label: 'Nama Proyek', methods: { list: true, detail: true, create: { validation: ['required'] }, update: { validation: ['required'] }, filter: false } },
          { id: 'assignment_date', label: 'Tanggal Penugasan', methods: { list: { transform: 'longDate' }, detail: { transform: 'longDate' }, create: { type: 'date', class: 'col-auto' }, update: { type: 'date', class: 'col-auto' } } },
          // { id: 'year', label: 'Tahun', methods: { list: true, detail: true, create: { type: 'year', class: 'col-auto' }, update: { type: 'year', class: 'col-auto' }, filter: false } },
          { id: 'ruptl_code', label: 'Kode RUPTL', methods: { list: true, detail: true, create: { class: 'col-3' }, update: { class: 'col-3' }, filter: false } },
          { id: 'project_code', label: 'Kode Proyek', methods: { list: true, detail: true, create: { class: 'col-3' }, update: { class: 'col-3' }, filter: false } },
          {
            id: 'unit_id',
            label: 'Unit Supervisor',
            methods: {
              list: { view_data: 'rel_unit_id' },
              detail: { view_data: 'rel_unit_id' },
              create: false,
              update: false,
              filter: {
                setter: 'units',
                getter: 'units',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'name',
                    code: 'id',
                    display: ['code', 'name', 'description']
                  }
                }
              }
            }
          },
          {
            id: 'pst_id',
            label: 'Nama PST',
            methods: {
              create: {
                setter: 'pst',
                getter: 'pst',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
                option: {
                  list_pointer: {
                    label: 'name',
                    code: 'id',
                    display: ['code', 'name', 'description']
                  }
                }
              },
              update: {
                setter: 'pst',
                getter: 'pst',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
                option: {
                  list_pointer: {
                    label: 'name',
                    code: 'id',
                    display: ['code', 'name', 'description']
                  }
                }
              },
              filter: {
                setter: 'pst',
                getter: 'pst',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'name',
                    code: 'id',
                    display: ['code', 'name', 'description']
                  }
                }
              }
            }
          },
          {
            id: 'type_id',
            label: 'Tipe Proyek',
            methods: {
              create: {
                setter: 'm-project-types',
                getter: 'm-project-types',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
                option: {
                  list_pointer: {
                    label: 'name',
                    code: 'id',
                    display: ['name', 'description']
                  }
                }
              },
              update: {
                setter: 'm-project-types',
                getter: 'm-project-types',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
                option: {
                  list_pointer: {
                    label: 'name',
                    code: 'id',
                    display: ['name', 'description']
                  }
                }
              },
              filter: {
                setter: 'm-project-types',
                getter: 'm-project-types',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'name',
                    code: 'id',
                    display: ['name', 'description']
                  }
                }
              }
            }
          },
          {
            id: 'urgency_id',
            label: 'Urgensi Proyek',
            methods: {
              create: {
                setter: 'm-project-urgency',
                getter: 'm-project-urgency',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
                option: {
                  list_pointer: {
                    label: 'name',
                    code: 'id',
                    display: ['name', 'description']
                  }
                }
              },
              update: {
                setter: 'm-project-urgency',
                getter: 'm-project-urgency',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
                option: {
                  list_pointer: {
                    label: 'name',
                    code: 'id',
                    display: ['name', 'description']
                  }
                }
              },
              filter: {
                setter: 'm-project-urgency',
                getter: 'm-project-urgency',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'name',
                    code: 'id',
                    display: ['name', 'description']
                  }
                }
              }
            }
          },
          { id: 'marker', label: 'Lokasi Proyek', methods: { list: false, detail: { type: 'map' }, create: { type: 'map' }, update: { type: 'map' } } },
          {
            id: 'province_id',
            label: 'Provinsi',
            methods: {
              list: { view_data: 'rel_province_id' },
              detail: { view_data: 'rel_province_id' },
              create: {
                setter: 'provinces',
                getter: 'provinces',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'province_name',
                    code: 'id',
                    display: ['province_name']
                  }
                }
              },
              update: {
                setter: 'provinces',
                getter: 'provinces',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'province_name',
                    code: 'id',
                    display: ['province_name']
                  }
                }
              },
              filter: {
                setter: 'provinces',
                getter: 'provinces',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'province_name',
                    code: 'id',
                    display: ['province_name']
                  }
                }
              }
            }
          },
          {
            id: 'city_id',
            label: 'Kota',
            methods: {
              create: {
                setter: 'cities',
                getter: 'cities',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'city_name',
                    code: 'id',
                    display: ['city_name']
                  },
                  get_param: [{ id: 'province_id' }]
                }
              },
              update: {
                setter: 'cities',
                getter: 'cities',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'city_name',
                    code: 'id',
                    display: ['city_name']
                  },
                  get_param: [{ id: 'province_id' }]
                }
              },
              filter: {
                setter: 'cities',
                getter: 'cities',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'city_name',
                    code: 'id',
                    display: ['city_name']
                  },
                  get_param: [{ id: 'province_id' }]
                }
              }
            }
          },
          { id: 'address', label: 'Alamat', methods: { create: { type: 'textarea', attr: { rows: 1 }, class: 'col' }, update: { type: 'textarea', attr: { rows: 1 }, class: 'col' } } },
          { id: 'location_code', label: 'Kode Lokasi', methods: { list: true, detail: true, create: { validation: ['required'] }, update: { validation: ['required'] }, filter: false } },
          { id: 'description', label: 'Keterangan', methods: { create: { type: 'textarea' }, update: { type: 'textarea' } } },
          {
            id: 'img_photo',
            label: 'Foto Proyek',
            methods: {
              list: false,
              detail: { type: 'file' },
              create: {
                type: 'file',
                attr: [{ accept: 'image/*' }, { limit: 5 }],
                validation: []
              },
              update: {
                type: 'file',
                attr: [{ accept: 'image/*' }, { limit: 5 }],
                validation: [],
                view_data: 'img_photo'
              }
            }
          },
          {
            id: 'active',
            label: 'Status',
            methods: {
              list: {
                order: true,
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'active'
              },
              detail: {
                order: true,
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'active'
              },
              create: {
                type: 'radio',
                value: '1',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Aktif', code: '1' },
                      { label: 'Non Aktif', code: '0' }
                    ]
                  }
                }
              },
              update: {
                type: 'radio',
                value: '1',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Aktif', code: '1' },
                      { label: 'Non Aktif', code: '0' }
                    ]
                  }
                }
              },
              filter: {
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Aktif', code: '1' },
                      { label: 'Non Aktif', code: '0' }
                    ]
                  }
                }
              }
            }
          },
          { id: 'latitude', methods: { list: false, detail: true, create: false, update: false, filter: false } },
          { id: 'longitude', methods: { list: false, detail: true, create: false, update: false, filter: false } },

          { id: 'start_date', label: 'Inisiasi', methods: { list: { show: false, transform: 'longDate' }, detail: false, create: false, update: false, filter: false } },
          { id: 'planning_date', label: 'Perencanaan', methods: { list: { show: false, transform: 'longDate' }, detail: false, create: false, update: false, filter: false } },
          { id: 'pre_implementation_date', label: 'Pra-Pelaksanaan', methods: { list: { show: false, transform: 'longDate' }, detail: false, create: false, update: false, filter: false } },
          { id: 'implementation_date', label: 'Pelaksanaan', methods: { list: { show: false, transform: 'longDate' }, detail: false, create: false, update: false, filter: false } },
          { id: 'end_date', label: 'Selesai', methods: { list: { show: false, transform: 'longDate' }, detail: false, create: false, update: false, filter: false } },

          { id: 'map_id', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'id', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'updated_by', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'created_by', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'created_at', label: 'Dibuat', methods: { list: { transform: 'longDateTime' }, detail: { transform: 'longDateTime' }, create: false, update: false, filter: false } },
          { id: 'updated_at', label: 'Diubah', methods: { list: { transform: 'longDateTime' }, detail: { transform: 'longDateTime' }, create: false, update: false, filter: false } }
        ]
      }
    }
  },
  methods: {
    disabledBeforeStep (date) {
      let index = this.dateProject.findIndex((x) => x.id === this.activeDate.id)
      if (index > 0) {
        let target = new Date(this.projectDetail[this.dateProject[index - 1].id])
        return date < target
      } else return false
    },
    openModalProj (state, config, project, datalist = null) {
      this.activeDate = { ...config, ...{ state: state } }
      this.$set(this.projectForm, config.id, datalist)
      this.projectDetail = project
      this.$nextTick().then((e) => {
        this.$bvModal.show('modal-projectDates')
      })
    },
    resetProjectForm () {
      this.projectForm = Object.assign({}, {})
    },
    saveProjectForm () {
      this.$_api
        .update(this.config.setter, { ...this.projectDetail, ...this.projectForm })
        .then((res) => {
          this.$_alert.success('Tanggal Tahapan proyek berhasil diperbarui')
          this.$refs['crudProject'].$children[1].getData(null, false)
          this.$bvModal.hide('modal-projectDates')
        })
        .catch((err) => {
          this.$_alert.error(err)
        })
    }
  }
}
</script>
<style lang=""></style>
