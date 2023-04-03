<template>
  <tas-base-crud :config="config"></tas-base-crud>
</template>
<script>
export default {
  name: 'crud-m-mitigations',
  data () {
    return {
      config: {
        title: 'Mitigasi',
        model_api: 'm-mitigations',
        getter: 'm-mitigations',
        setter: 'm-mitigations',
        pk_field: null,
        export: true,
        permission: {
          create: 'create-m-mitigations',
          read: 'view-m-mitigations',
          update: 'update-m-mitigations',
          delete: 'delete-m-mitigations'
        },
        fields: [
          { id: 'code', label: 'Kode Mitigasi', methods: { list: true, detail: true, create: false, update: false, filter: false } },
          {
            id: 'category_id',
            label: 'Kategori Potensi Isu',
            methods: {
              create: {
                setter: 'm-issue-categories',
                getter: 'm-issue-categories',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'name', code: 'id', display: ['code', 'name', 'description']
                  }
                }
              },
              update: {
                setter: 'm-issue-categories',
                getter: 'm-issue-categories',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'name', code: 'id', display: ['code', 'name', 'description']
                  }
                }
              },
              filter: {
                setter: 'm-issue-categories',
                getter: 'm-issue-categories',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'name', code: 'id', display: ['code', 'name', 'description']
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
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'issue_name', code: 'id', display: ['issue_code', 'issue_name', 'description']
                  },
                  get_param: [{ id: 'category_id' }]
                }
              },
              update: {
                setter: 'm-issues',
                getter: 'm-issues',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'issue_name', code: 'id', display: ['issue_code', 'issue_name', 'description']
                  },
                  get_param: [{ id: 'category_id' }]
                }
              },
              filter: {
                setter: 'm-issues',
                getter: 'm-issues',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'issue_name', code: 'id', display: ['issue_code', 'issue_name', 'description']
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
                option: {
                  list_pointer: {
                    label: 'sub_issue_name', code: 'id', display: ['sub_issue_code', 'sub_issue_name', 'description']
                  },
                  get_param: [{ id: 'issue_id' }]
                }
              },
              update: {
                setter: 'm-sub-issues',
                getter: 'm-sub-issues',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'sub_issue_name', code: 'id', display: ['sub_issue_code', 'sub_issue_name', 'description']
                  },
                  get_param: [{ id: 'issue_id' }]
                }
              },
              filter: {
                setter: 'm-sub-issues',
                getter: 'm-sub-issues',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'sub_issue_name', code: 'id', display: ['sub_issue_code', 'sub_issue_name', 'description']
                  },
                  get_param: [{ id: 'issue_id' }]
                }
              }
            }
          },
          { id: 'name', label: 'Nama Mitigasi', methods: { list: true, detail: true, create: { validation: ['required'] }, update: { validation: ['required'] }, filter: false } },
          { id: 'description', label: 'Keterangan', methods: { create: { type: 'textarea' }, update: { type: 'textarea' } } },
          { id: 'reference', label: 'Referensi', methods: { list: true, detail: true, create: true, update: true, filter: false } },
          // {
          //   id: 'level',
          //   label: 'Level',
          //   methods: {
          //     list: true,
          //     detail: true,
          //     create: {
          //       type: 'radio',
          //       value: 3,
          //       option: {
          //         list_pointer: {
          //           label: 'label',
          //           code: 'code',
          //           list: [
          //             { label: 'Level 1', code: 1 },
          //             { label: 'Level 2', code: 2 },
          //             { label: 'Level 3', code: 3 }
          //           ]
          //         }
          //       }
          //     },
          //     update: {
          //       type: 'radio',
          //       option: {
          //         list_pointer: {
          //           label: 'label',
          //           code: 'code',
          //           list: [
          //             { label: 'Level 1', code: 1 },
          //             { label: 'Level 2', code: 2 },
          //             { label: 'Level 3', code: 3 }
          //           ]
          //         }
          //       }
          //     },
          //     filter: {
          //       type: 'radio',
          //       option: {
          //         list_pointer: {
          //           label: 'label',
          //           code: 'code',
          //           list: [
          //             { label: 'Level 1', code: 1 },
          //             { label: 'Level 2', code: 2 },
          //             { label: 'Level 3', code: 3 }
          //           ]
          //         }
          //       }
          //     }
          //   }
          // },
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
          { id: 'is_recommendation', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'id', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'updated_by', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'created_by', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'created_at', label: 'Dibuat', methods: { list: { transform: 'longDateTime' }, detail: { transform: 'longDateTime' }, create: false, update: false, filter: false } },
          { id: 'updated_at', label: 'Diubah', methods: { list: { transform: 'longDateTime' }, detail: { transform: 'longDateTime' }, create: false, update: false, filter: false } }
        ]
      }
    }
  }
}
</script>
<style lang=""></style>
