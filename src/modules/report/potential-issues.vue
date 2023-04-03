<template>
  <tas-base-crud ref="potIssue" :config="config">
    <template v-slot:form-footer>
      <div v-if="treeData" class="card card-custom">
        <div class="card-body">
          <div class="d-flex align-items-center mb-0">
            <i class="ri-folder-info-line text-info ri-2x pr-2"></i>
            <h6 class="font-weight-bolder mb-0">Informasi Kategori Isu, Risk Register, Sub Risk Register dan Mitigasi</h6>
            <!-- <span class="font-weight-bold text-muted"></span> -->
          </div>
          <div class="pl-4">
            <template v-for="(n, i) in treeData">
            <tree-node :last="i + 1 === treeData.length" :key="i + '-nodes'" :node="n" />
          </template>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:detail-body="data">
      <detail-potential-issues @back="$refs.potIssue.getEvent('list')" v-if="data.id" :id="data.id" />
    </template>
  </tas-base-crud>
</template>
<script>
export default {
  name: 'crud-potential-issues',
  components: {
    DetailPotentialIssues: () => import('./comp-potential-issues/detail-potential-issues.vue')
  },
  data () {
    return {
      config: {
        title: 'Pelaporan Potensi Isu',
        model_api: 'potential-issues',
        getter: 'potential-issues',
        setter: 'potential-issues',
        pk_field: null,
        export: true,
        permission: {
          create: 'create-potential-issues',
          read: 'view-potential-issues',
          update: 'update-potential-issues',
          delete: 'delete-potential-issues'
        },
        fields: [
          {
            id: 'project_id',
            label: 'Proyek',
            methods: {
              create: {
                setter: 'projects',
                getter: 'projects',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
                option: {
                  list_pointer: {
                    label: 'project_name',
                    code: 'id',
                    display: ['ruptl_code', 'project_name']
                  }
                }
              },
              update: {
                setter: 'projects',
                getter: 'projects',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
                option: {
                  list_pointer: {
                    label: 'project_name',
                    code: 'id',
                    display: ['ruptl_code', 'project_name']
                  }
                }
              },
              filter: {
                setter: 'projects',
                getter: 'projects',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
                option: {
                  list_pointer: {
                    label: 'project_name',
                    code: 'id',
                    display: ['ruptl_code', 'project_name']
                  }
                }
              }
            }
          },
          {
            id: 'category_id',
            label: 'Kategori Potensi Isu',
            methods: {
              create: {
                setter: 'm-issue-categories',
                getter: 'm-issue-categories',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'name',
                    code: 'id',
                    display: ['code', 'name', 'description']
                  }
                }
              },
              update: {
                setter: 'm-issue-categories',
                getter: 'm-issue-categories',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'name',
                    code: 'id',
                    display: ['code', 'name', 'description']
                  }
                }
              },
              filter: {
                setter: 'm-issue-categories',
                getter: 'm-issue-categories',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
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
            id: 'issue_id',
            label: 'Risk Register',
            methods: {
              create: {
                setter: 'm-issues',
                getter: 'm-issues',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'issue_name',
                    code: 'id',
                    display: ['issue_code', 'issue_name', 'description']
                  },
                  get_param: [{ id: 'category_id' }]
                }
              },
              update: {
                setter: 'm-issues',
                getter: 'm-issues',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'issue_name',
                    code: 'id',
                    display: ['issue_code', 'issue_name', 'description']
                  },
                  get_param: [{ id: 'category_id' }]
                }
              },
              filter: {
                setter: 'm-issues',
                getter: 'm-issues',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
                option: {
                  list_pointer: {
                    label: 'issue_name',
                    code: 'id',
                    display: ['issue_code', 'issue_name', 'description']
                  },
                  get_param: [{ id: 'category_id' }]
                }
              }
            }
          },
          {
            id: 'sub_issue_id',
            label: 'Sub Risk Register',
            methods: {
              create: {
                setter: 'm-sub-issues',
                getter: 'm-sub-issues',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
                option: {
                  list_pointer: {
                    label: 'sub_issue_name',
                    code: 'id',
                    display: ['sub_issue_code', 'sub_issue_name', 'description']
                  },
                  get_param: [{ id: 'issue_id' }]
                }
              },
              update: {
                setter: 'm-sub-issues',
                getter: 'm-sub-issues',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
                option: {
                  list_pointer: {
                    label: 'sub_issue_name',
                    code: 'id',
                    display: ['sub_issue_code', 'sub_issue_name', 'description']
                  },
                  get_param: [{ id: 'issue_id' }]
                }
              },
              filter: {
                setter: 'm-sub-issues',
                getter: 'm-sub-issues',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
                option: {
                  list_pointer: {
                    label: 'sub_issue_name',
                    code: 'id',
                    display: ['sub_issue_code', 'sub_issue_name', 'description']
                  },
                  get_param: [{ id: 'issue_id' }]
                }
              }
            }
          },
          {
            id: 'status_code',
            label: 'Status Mitigasi',
            methods: {
              list: {
                order: true,
                class: { open: 'badge badge-danger', on_going: 'badge badge-warning', close: 'badge badge-success' },
                transform: 'status_code_form'
              },
              detail: {
                order: true,
                class: { open: 'badge badge-danger', on_going: 'badge badge-warning', close: 'badge badge-success' },
                transform: 'status_code_form'
              },
              create: false,
              update: false,
              filter: {
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Belum Dimitigasi', code: 'open' },
                      { label: 'Sedang Dimitigasi', code: 'on_going' },
                      { label: 'Sudah Dimitigasi', code: 'close' }
                    ]
                  }
                }
              }
            }
          },
          {
            id: 'current_step',
            label: 'Progress Aktifitas',
            methods: {
              list: {
                order: true,
                class: {
                  on_mitigation: 'badge badge-danger',
                  on_validation: 'badge badge-primary',
                  on_review: 'badge badge-info',
                  on_verification: 'badge badge-warning',
                  close: 'badge badge-success',
                  reported: 'badge badge-danger'
                },
                transform: 'current_step'
              },
              detail: true,
              create: false,
              update: false,
              filter: false
            }
          },
          {
            id: 'level',
            label: 'Level',
            methods: {
              list: { transform: 'prefix-Level', class: 'min-w-50px' },
              detail: { transform: 'prefix-Level' },
              create: {
                setter: 'm-levels',
                getter: 'm-levels',
                type: 'radio',
                permission: 'bypass-level',
                transform: 'prefix-Level',
                option: {
                  list_pointer: {
                    label: 'id',
                    code: 'id',
                    tooltip: [{ title: 'Penjelasan / Deskripsi', data: 'description' }]
                  }
                }
              },
              update: {
                setter: 'm-levels',
                getter: 'm-levels',
                type: 'radio',
                permission: 'bypass-level',
                transform: 'prefix-Level',
                option: {
                  list_pointer: {
                    label: 'id',
                    code: 'id',
                    tooltip: [{ title: 'Penjelasan / Deskripsi', data: 'description' }]
                  }
                }
              },
              filter: {
                setter: 'm-levels',
                getter: 'm-levels',
                type: 'radio',
                permission: 'bypass-level',
                transform: 'prefix-Level',
                option: {
                  list_pointer: {
                    label: 'id',
                    code: 'id',
                    tooltip: [{ title: 'Penjelasan / Deskripsi', data: 'description' }]
                  }
                }
              }
            }
          },
          { id: 'description', label: 'Penjelasan potensi isu', methods: { create: { type: 'textarea' }, update: { type: 'textarea' } } },
          { id: 'status_recommendation', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'id', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'updated_by', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'created_by', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'created_at', label: 'Dibuat', methods: { list: { transform: 'longDateTime' }, detail: { transform: 'longDateTime' }, create: false, update: false, filter: false } },
          { id: 'updated_at', label: 'Diubah', methods: { list: { transform: 'longDateTime' }, detail: { transform: 'longDateTime' }, create: false, update: false, filter: false } }
        ]
      },
      treeData: null
    }
  },
  watch: {
    '$route.query': {
      deep: true,
      immediate: true,
      handler (e) {
        if (e.view && (e.view === 'create' || e.view === 'update')) this.loadTree()
      }
    }
  },
  methods: {
    loadTree () {
      this.$_api
        .get('custom/master-issue-mitigations/tree')
        .then((res) => {
          this.treeData = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang=""></style>
