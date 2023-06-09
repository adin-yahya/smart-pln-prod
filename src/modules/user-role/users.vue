<template>
  <tas-base-crud :config="config">
    <template v-slot:list-table-action="data">
      <a @click="changeUserStatus(data.rowData)" class="btn btn-icon btn-danger btn-sm" v-b-tooltip.viewport="'Klik untuk menonaktifkan pengguna'"> <i class="ri-shut-down-line"></i> </a>
    </template>
    <template v-slot:detail-footer="data">
      <div v-if="data.rowData" class="row">
        <!-- <div class="col-lg-12" v-if="$_sys.isAllowed(mappingUnit.permission)">
          <mapping-input :alert="['Non-Aktifkan Unit','Proyek dibawah Unit juga akan di non-aktifkan']" @change="requestReload(data.rowData.id)" :title="mappingUnit.title" :getter="mappingUnit.getter" :setter="mappingUnit.setter" :params="{ 'user_id': data.rowData.id }" :readonly="mappingUnit.readonly" :display="mappingUnit.display" :setter_id="mappingUnit.setter_id" :key_value="mappingUnit.key_value" />
        </div> -->
        <div class="col-lg-12 mt-5" v-if="$_sys.isAllowed(mappingPST.permission)">
          <mapping-input :refresh="refreshToken" :title="mappingPST.title" :getter="mappingPST.getter" :setter="mappingPST.setter" :params="{ 'user_id': data.rowData.id }" :readonly="mappingPST.readonly" :display="mappingPST.display" :setter_id="mappingPST.setter_id" :key_value="mappingPST.key_value" />
        </div>
        <!-- <div class="col-lg-12 mt-5" v-if="$_sys.isAllowed(mappingProjects.permission)">
          <mapping-input :refresh="refreshToken" :title="mappingProjects.title" :getter="mappingProjects.getter" :setter="mappingProjects.setter" :params="{ 'user_id': data.rowData.id }" :readonly="mappingProjects.readonly" :display="mappingProjects.display" :setter_id="mappingProjects.setter_id" :key_value="mappingProjects.key_value" />
        </div> -->
      </div>
    </template>
  </tas-base-crud>
</template>

<script>
export default {
  name: 'crud-users',
  data () {
    return {
      config: {
        title: 'Daftar Pengguna',
        model_api: 'users',
        getter: 'users',
        setter: 'users',
        pk_field: 'employee_id',
        filter_api: {
          status_code: 'user_active'
        },
        export: true,
        permission: {
          create: 'create-users',
          read: 'view-users',
          update: 'update-users',
          delete: 'delete-users'
        },
        fields: [
          {
            id: 'employee_id',
            label: 'Tenaga Kerja',
            methods: {
              list: { transform: 'nullValue' },
              detail: { transform: 'nullValue' },
              create: {
                setter: 'employees',
                getter: 'employees',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  filterAPI: { is_user: false, sort_by: 'fullname', sort: 'ASC', active: 1, is_employee_active: true },
                  list_pointer: {
                    label: 'fullname', code: 'id', display: ['employee_code', 'fullname']
                  }
                }
              },
              update: {
                setter: 'employees',
                getter: 'employees',
                type: 'lookup-radio',
                validation: [],
                option: {
                  filterAPI: { is_user: false, sort_by: 'fullname', sort: 'ASC', active: 1, is_employee_active: true },
                  list_pointer: {
                    label: 'fullname', code: 'id', display: ['employee_code', 'fullname']
                  }
                }
              },
              filter: {
                setter: 'employees',
                getter: 'employees',
                type: 'lookup-radio',
                option: {
                  filterAPI: { is_user: true, sort_by: 'fullname', sort: 'ASC' },
                  list_pointer: {
                    label: 'fullname', code: 'id', display: ['employee_code', 'fullname']
                  }
                }
              }
            }
          },
          { id: 'fullname', label: 'Nama Lengkap', methods: { list: true, detail: true, create: false, update: false, filter: false } },
          { id: 'username', label: 'Username', methods: { list: true, detail: true, create: true, update: true, filter: false } },
          { id: 'password',
            label: 'Password',
            methods: {
              list: false,
              detail: false,
              create: {
                validation: ['required']
              },
              update: {
                validation: [],
                permission: 'change-password-users'
              },
              filter: false
            }
          },
          {
            id: 'role_id',
            label: 'Role',
            methods: {
              create: {
                setter: 'roles',
                getter: 'roles',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  filterAPI: { active: 1, sort_by: 'role_name', sort: 'ASC' },
                  list_pointer: {
                    label: 'role_name', code: 'id', display: ['role_name']
                  },
                  toggle_field: [
                    { id: 'unit_id', item: 'show', toggle: [false, true], value: 101 }
                  ]
                }
              },
              update: {
                setter: 'roles',
                getter: 'roles',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  filterAPI: { active: 1, sort_by: 'role_name', sort: 'ASC' },
                  list_pointer: {
                    label: 'role_name', code: 'id', display: ['role_name']
                  },
                  toggle_field: [
                    { id: 'unit_id', item: 'show', toggle: [false, true], value: 101 }
                  ]
                }
              },
              filter: {
                setter: 'roles',
                getter: 'roles',
                type: 'select',
                option: {
                  filterAPI: { active: 1, sort_by: 'role_name', sort: 'ASC' },
                  list_pointer: {
                    label: 'role_name', code: 'id', display: ['role_name']
                  }
                },
                class: 'min-w-250px'
              }
            }
          },
          {
            id: 'unit_id',
            label: 'Nama Unit',
            methods: {
              list: { transform: 'nullValue' },
              detail: { transform: 'nullValue' },
              create: {
                setter: 'units',
                getter: 'units',
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
                setter: 'units',
                getter: 'units',
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
          // disabled Temp Field
          { id: 'email', label: 'Email', methods: { list: true, detail: true, create: false, update: false, filter: false } },
          { id: 'img_photo_user', label: 'Foto Pengguna', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          // disabled Field
          { id: 'status_code', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'email_verified_at', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'last_login_at', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'id', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'updated_by', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'created_by', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'created_at', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'updated_at', methods: { list: false, detail: false, create: false, update: false, filter: false } }
        ]
      },
      refreshToken: 0,
      projectFilter: {
        unit_id: null
      },
      mappingPST: {
        title: 'PST Pengguna',
        permission: 'allow-all',
        getter: 'custom/mapping-users-pst',
        setter: 'custom/mapping-users-pst',
        display: ['pst'],
        key_value: 'active',
        setter_id: 'pst_id',
        readonly: false
      },
      mappingProjects: {
        title: 'Proyek Pengguna',
        permission: 'allow-all',
        getter: 'custom/mapping-users-projects',
        setter: 'custom/mapping-users-projects',
        display: ['ruptl_code', 'project_name'],
        key_value: 'active',
        setter_id: 'project_id',
        readonly: false
      },
      mappingUnit: {
        title: 'Unit Pengguna',
        permission: 'allow-all',
        getter: 'custom/mapping-users-units',
        setter: 'custom/mapping-users-units',
        display: ['unit_name'],
        key_value: 'active',
        setter_id: 'unit_id',
        readonly: false
      }
    }
  },
  methods: {
    requestReload (data) {
      this.refreshToken++
    },
    changeUserStatus (data) {
      data.status_code = 'user_nonactive'
      this.$_api.post('users/active-deactive', data).then(res => {
        this.$_alert.success(null, res.message)
        this.$children[0].$children[1].getData(null)
      }, err => {
        this.$_alert.error(err)
      })
    }
  }

}
</script>

<style>
</style>
