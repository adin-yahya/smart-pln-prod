<template lang="">
  <div class="node-wrapper position-relative" :class="[node.child && node.child.length ? 'pl-9' : 'pl-10', last ? 'border-left-half-node' : 'border-left-dash-node', node.child && node.child.length ? 'has-children' : '']">
    <div @click="!checklist? active = !active : ''" :class="[node.child && node.child.length ? 'has-child pointer' : '', active ? 'has-child-active' : '']" class="position-relative horizontal-dash d-flex align-items-start" style="margin-left: -15px">
      <i v-if="node.child && node.child.length" @click="checklist? active = !active : ''" :class="{ 'rotate-90': active }" style="transition: all 0.25s ease;" class="ri-arrow-right-s-fill position-relative text-primary ri-2x pr-1"></i>
      <span v-else class="d-block pl-4"></span>
      <div v-if="checklist" class="checkbox-list mb-0 mt-2">
        <label class="checkbox checkbox-lg align-items-start">
          <input v-model="selected" type="checkbox" :name="node.code + '-name'" />
          <span></span>
          <div class="d-flex flex-column">
            <span class="title font-weight-bold">{{ node.code }} - {{ node.name }}</span>
            <span style="flex: 1 0 auto" class="font-size-sm text-muted pr-1">Kode : {{ node.code }}</span>
          </div>
        </label>
      </div>
      <div v-else class="d-flex flex-column">
        <span class="title font-weight-bold"> <template v-if="node.code">{{ node.code }} - </template>{{ node.name }}</span>
        <span v-if="node.code" style="flex: 1 0 auto" class="font-size-sm text-muted pr-1">Kode : {{ node.code }}</span>
      </div>
    </div>
    <template v-if="node.child && node.child.length">
      <template v-for="(n, i) in node.child">
        <tree-node v-show="active" @selected="$emit('selected', $event)" :getLevel="getLevel" :level="level+1" :checked="selected" :checklist="n.child ? checklist : false" :last="i + 1 === node.child.length" :node="n" :key="i + '-nodes'" />
      </template>
    </template>
  </div>
</template>
<script>
export default {
  name: 'tree-node',
  props: {
    node: { required: true },
    last: { required: false },
    checklist: { required: false },
    checked: { required: false },
    level: { required: false, default () { return 0 } },
    getLevel: { required: false, default () { return 0 } }
  },
  data () {
    return {
      active: false,
      selected: false
    }
  },
  watch: {
    checked: {
      immediate: true,
      handler (e) {
        this.selected = e
      }
    },
    selected: {
      immediate: false,
      handler (e) {
        this.checkLevel(e)
      }
    }
  },
  methods: {
    checkLevel (e) {
      if (this.level === this.getLevel) this.$emit('selected', {selected: e, data: this.node})
    }
  }
}
</script>
<style>
  .horizontal-dash::before {
    content: '';
    position: absolute;
    top: 0.75rem;
    left: -15px;
    width: 25px;
    height: 1px;
    border-bottom: 1px dashed var(--primary);
  }
  .horizontal-dash.has-child::before {
    top: 1.4rem;
    left: -10px;
    width: 17px;
  }
  .has-child:hover .title {
    color: var(--primary);
  }
  .node-wrapper::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    border-left: 1px dashed var(--primary);
  }
  .node-wrapper.border-left-half-node::before {
    bottom: calc(100% - 11px);
  }
  .node-wrapper.border-left-half-node.has-children::before {
    bottom: calc(100% - 19px);
  }
  .rotate-90 {
    transform: rotate(90deg);
  }
  .has-child-active::after {
    content: '';
    position: absolute;
    left: 15px;
    top: 25px;
    bottom: 0;
    border-left: 1px dashed var(--primary);
  }
</style>
