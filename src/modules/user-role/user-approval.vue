<template>
  <tas-base-crud :config="config">
    <template v-slot:detail-footer="data">
      <div v-if="data.rowData" class="row">
        <div class="col-4">
          <div class="card text-left">
            <div class="card-body">
              <h6 class="card-label font-weight-bolder text-dark mb-4">Verifikasi Pengguna</h6>
              <span class="d-block mb-5">Anda akan memberikan persetujuan kepada pengguna dengan username <b>{{data.rowData.username}}</b>. Silahkan tolak pengguna jika data tidak sesuai</span>
              <div class="d-flex mt-3">
                <button @click="setUserStatus(data.rowData.id, 'user_active')" class="col mr-1 btn btn-light-primary">Setujui</button>
                <button @click="setUserStatus(data.rowData.id, 'user_rejected')" class="col ml-1 btn btn-outline-danger">Tolak</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </tas-base-crud>
</template>

<script>
export default {
  name: 'crud-users-approval-list',
  data () {
    return {
      config: {
        title: 'Verifikasi Pengguna',
        getter: 'users',
        setter: 'users',
        filter_api: {
          status_code: 'email_verified'
        },
        custom_api: {
          list: 'custom/users-verification/list'
        },
        pk_field: 'fullname',
        permission: {
          create: false,
          read: 'verify-users',
          update: false,
          delete: false
        },
        fields: [
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
          // disabled Temp Field
          { id: 'email', label: 'Email', methods: { list: true, detail: true, create: false, update: false, filter: false } },
          { id: 'img_photo_user', label: 'Foto Pengguna', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          // disabled Field
          { id: 'status_code', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'email_verified_at', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'last_login_at', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'employee_id', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'id', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'updated_by', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'created_by', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'created_at', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'updated_at', methods: { list: false, detail: false, create: false, update: false, filter: false } },

          {
            id: 'unit_id',
            label: 'Pendaftaran Unit',
            methods: {
              list: { view_data: 'rel_unit_id', transform: 'nullValue' },
              detail: { view_data: 'rel_unit_id', transform: 'nullValue' },
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
          {
            id: 'register_pst_id',
            label: 'Pendaftaran PST',
            methods: { list: { view_data: 'rel_register_pst_id' }, detail: { view_data: 'rel_register_pst_id' }, create: false, update: false, filter: false }
          }
        ]
      }
    }
  },
  methods: {
    setUserStatus (id, code) {
      let form = {
        user_id: id,
        status_code: code
      }
      this.$_api.post('approval-user', form).then(res => {
        this.$_alert.success(null, res.message)
        this.$router.push({ name: 'verifikasi-pengguna', query: { view: 'list' } })
      }, err => {
        this.$_alert.error(err)
      })
    }
  }
}
</script>

<style>
</style>
