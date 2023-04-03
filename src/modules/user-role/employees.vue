<template>
  <tas-base-crud :config="config">
    <!-- <template v-slot:detail-footer="data">
      <div v-if="data.rowData" class="row">
        <div class="col-lg-12" v-if="$_sys.isAllowed('update-mapping-employees-divisions')">
          <mapping-input :alert="['Non-Aktifkan Divisi','Proyek dibawah Divisi juga akan di non-aktifkan']" @change="requestReload(data.rowData.id)" :title="mappingDivision.title" :getter="mappingDivision.getter" :setter="mappingDivision.setter" :params="{ 'user_id': data.rowData.id }" :readonly="mappingDivision.readonly" :display="mappingDivision.display" :setter_id="mappingDivision.setter_id" :key_value="mappingDivision.key_value" />
        </div>
      </div>
    </template> -->
  </tas-base-crud>
</template>

<script>
export default {
  name: 'crud-employees',
  data () {
    return {
      config: {
        title: 'Tenaga Kerja',
        model_api: 'employees',
        getter: 'employees',
        setter: 'employees',
        pk_field: 'fullname',
        export: true,
        permission: {
          create: 'create-employees',
          read: 'view-employees',
          update: 'update-employees',
          delete: 'delete-employees'
        },
        slave: [],
        fields: [
          { id: 'fullname', label: 'Nama Lengkap', methods: { list: true, detail: true, create: true, update: true, filter: false } },
          { id: 'nip', label: 'NIP', methods: { list: true, detail: true, create: true, update: true, filter: false } },
          { id: 'telephone', label: 'No. Telp', methods: { list: true, detail: true, create: true, update: true, filter: false } },
          { id: 'email', label: 'Email', methods: { list: true, detail: true, create: { type: 'email' }, update: { type: 'email' }, filter: false } },
          { id: 'address', label: 'Alamat', methods: { create: { type: 'textarea' }, update: { type: 'textarea' } } },
          {
            id: 'img_photo',
            label: 'Foto Pengguna',
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
          { id: 'user_id', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'integration_id', methods: { list: false, detail: false, create: false, update: false, filter: false } },
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
    changeemployeestatus (data, status) {
      data.status_code = status
      this.$_api.post('employees/active-deactive', data).then(
        (res) => {
          this.$_alert.success(null, res.message)
          this.$children[0].$children[1].getData(null)
        },
        (err) => {
          this.$_alert.error(err)
        }
      )
    }
  }
}
</script>

<style>
</style>
