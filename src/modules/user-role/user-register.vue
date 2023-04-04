<template>
  <tas-base-crud :config="config">
    <template v-slot:list-table-action="data">
      <a v-if="data.rowData.status_code === 'user_nonactive'" @click="changeUserStatus(data.rowData)" class="btn btn-icon btn-success btn-sm" v-b-tooltip.viewport="'Klik untuk mengaktifkan pengguna'"> <i class="ri-shut-down-line"></i> </a>
    </template>
  </tas-base-crud>
</template>

<script>
export default {
  name: 'crud-users-register',
  data () {
    return {
      config: {
        title: 'Pengguna Non Aktif',
        model_api: 'users',
        getter: 'users',
        setter: 'users',
        filter_api: {
          status_code: {
            value: ['user_rejected', 'email_unverified', 'user_nonactive'],
            operator: 'in'
          }
        },
        pk_field: 'fullname',
        permission: {
          create: false,
          read: 'verify-users',
          update: false,
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
                validation: ['required'],
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
          { id: 'updated_at', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          {
            id: 'register_department_id',
            label: 'Pendaftaran Departemen',
            methods: { list: { view_data: 'rel_register_department_id' }, detail: { view_data: 'rel_register_department_id' }, create: false, update: false, filter: false }
          },
          {
            id: 'register_pst_id',
            label: 'Pendaftaran Proyek',
            methods: { list: { view_data: 'rel_register_pst_id' }, detail: { view_data: 'rel_register_pst_id' }, create: false, update: false, filter: false }
          }
        ]
      },
      refreshToken: 0,
      projectFilter: {
        department_id: null
      },
      mappingProjects: {
        title: 'Proyek Pengguna',
        getter: 'custom/mapping_users_projects',
        setter: 'custom/mapping_users_projects',
        display: ['project_number', 'project_name'],
        key_value: 'active',
        setter_id: 'project_id',
        readonly: false
      },
      mappingDepartment: {
        title: 'Departemen Pengguna',
        getter: 'custom/mapping_users_departments',
        setter: 'custom/mapping_users_departments',
        display: ['department_name'],
        key_value: 'active',
        setter_id: 'department_id',
        readonly: false
      }
    }
  },
  methods: {
    requestReload (data) {
      this.refreshToken++
    },
    changeUserStatus (data) {
      data.status_code = 'user_active'
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
