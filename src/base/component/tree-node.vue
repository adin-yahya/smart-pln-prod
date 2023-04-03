<template lang="">
  <div class="node-wrapper position-relative" :class="[(node.child && node.child.length)? 'pl-8' : 'pl-10', last? 'border-left-half-node': 'border-left-dash-node', (node.child && node.child.length)? 'has-children' : '']">
    <div class="">
      <div @click="active = !active" :class="[(node.child && node.child.length)? 'has-child pointer' : '' ]" class="position-relative horizontal-dash d-flex align-items-start" style="margin-left: -13px">
        <i v-if="node.child && node.child.length" :class="{'rotate-90': active}" style="transition: all 0.25s ease;" class="ri-arrow-right-s-fill text-primary ri-2x pr-1"></i>
        <span v-else class="d-block pl-4"></span>
        <div class="d-flex flex-column">
          <span class="title font-weight-bold">{{ node.name }}</span>
          <span style="flex: 1 0 auto" class="font-size-sm text-muted pr-1">Kode : {{ node.code }}</span>
        </div>
      </div>
      <template v-if="node.child && node.child.length && active">
        <template v-for="(n, i) in node.child">
          <tree-node :last="i+1 === node.child.length" :node="n" :key="i + '-nodes'" />
        </template>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tree-node',
  props: ['node', 'last'],
  data () {
    return {
      active: false
    }
  }
}
</script>
<style>
.horizontal-dash::before{
  content: "";
  position: absolute;
  top: .75rem;
  left: -15px;
  width: 25px;
  height: 1px;
  border-bottom: 1px dashed var(--primary);
}
.horizontal-dash.has-child::before{
  top: 1.4rem;
  left: -10px;
  width: 17px;
}
.has-child:hover .title{
  color: var(--primary);
}
.node-wrapper::before{
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  border-left: 1px dashed var(--primary)
}
.node-wrapper.border-left-half-node::before{
  bottom: calc(100% - 11px);
}
.node-wrapper.border-left-half-node.has-children::before{
  bottom: calc(100% - 19px);
}
.rotate-90{
  transform: rotate(90deg);
}
</style>
