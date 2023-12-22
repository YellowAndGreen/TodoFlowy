<template>
  <el-tree
    :allow-drop="allowDrop"
    :allow-drag="allowDrag"
    :data="data"
    draggable
    default-expand-all
    node-key="id"
    @node-drag-start="handleDragStart"
    @node-drag-enter="handleDragEnter"
    @node-drag-leave="handleDragLeave"
    @node-drag-over="handleDragOver"
    @node-drag-end="handleDragEnd"
    @node-drop="handleDrop"
    :render-content="renderContent"
  />
</template>

<script lang="ts" setup>
import type Node from 'element-plus/es/components/tree/src/model/node';
import type { DragEvents } from 'element-plus/es/components/tree/src/model/useDragNode';
import type {
  AllowDropType,
  NodeDropType,
} from 'element-plus/es/components/tree/src/tree.type';
import { ElIcon } from 'element-plus'
import { CollectionTag } from '@element-plus/icons-vue'

const handleDragStart = (node: Node, ev: DragEvents) => {
  console.log('drag start', node);
};
const handleDragEnter = (
  draggingNode: Node,
  dropNode: Node,
  ev: DragEvents
) => {
  console.log('tree drag enter:', dropNode.label);
};
const handleDragLeave = (
  draggingNode: Node,
  dropNode: Node,
  ev: DragEvents
) => {
  console.log('tree drag leave:', dropNode.label);
};
const handleDragOver = (draggingNode: Node, dropNode: Node, ev: DragEvents) => {
  console.log('tree drag over:', dropNode.label);
};
const handleDragEnd = (
  draggingNode: Node,
  dropNode: Node,
  dropType: NodeDropType,
  ev: DragEvents
) => {
  console.log('tree drag end:', dropNode && dropNode.label, dropType);
};
const handleDrop = (
  draggingNode: Node,
  dropNode: Node,
  dropType: NodeDropType,
  ev: DragEvents
) => {
  console.log('tree drop:', dropNode.label, dropType);
};
const allowDrop = (draggingNode: Node, dropNode: Node, type: AllowDropType) => {
  if (dropNode.data.label === 'Level two 3-1') {
    return type !== 'inner';
  } else {
    return true;
  }
};
const allowDrag = (draggingNode: Node) => {
  return !draggingNode.data.label.includes('Level three 3-1-1');
};

const append = (data_node: Tree) => {
  const newChild = { id: id++, label: '', children: [] }
  if (!data_node.children) {
    data_node.children = []
  }
  data_node.children.push(newChild)
  data.value = [...data.value]
}

const remove = (node: Node, data_node: Tree) => {
  const parent = node.parent
  const children: Tree[] = parent.data.children || parent.data
  const index = children.findIndex((d) => d.id === data_node.id)
  children.splice(index, 1)
  data.value = [...data.value]
}

interface Tree {
  id: number
  label: string
  children?: Tree[]
}
let id = 1000

const data = ref<Tree[]>([
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]);

const renderContent = (
  h,
  {
    node,
    data,
    store,
  }: {
    node: Node;
    data: Tree;
    store: Node['store'];
  }
) => {

  return h(
    'span',
    {
      class: 'custom-tree-node',
    },
    h(ElIcon, null, {
    default: () => h(CollectionTag)
    }),
    h('input', {
      value: data.label,
      onInput: (event) => {
        // console.log(event.target.value);
        // console.log(data);
        event.stopPropagation();
        data.label = event.target.value;
      },
      onclick: (event) => {
        // console.log(event.target.value);
        // console.log(data);
        event.stopPropagation();
      },
    }),
    h(
      'span',
      null,
      h(
        'a',
        {
          onClick: (event) => {
            event.stopPropagation();
            append(data);
      },
        },
        '添加 '
      ),
      h(
        'a',
        {
          style: 'margin-left: 8px;',
          onClick: (event) => {event.stopPropagation();remove(node, data);}
        },
        '删除'
      )
    )
  );
};
</script>

<style>

input {
  background-color: transparent; /* 移除背景色 */
  border: none; /* 移除边框 */
  outline: none; /* 移除焦点时的轮廓 */
  box-shadow: none; /* 移除阴影 */
  padding: 0; /* 移除内边距 */
  margin: 0; /* 移除外边距 */
  flex: 1;
  display: flex;
}


textarea {
  background-color: transparent; /* 移除背景色 */
  border: none; /* 移除边框 */
  outline: none; /* 移除焦点时的轮廓 */
  box-shadow: none; /* 移除阴影 */
  padding: 0; /* 移除内边距 */
  margin: 0; /* 移除外边距 */
}


.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  /* padding-right: 8px; */
}

.el-icon{
  padding-right: 2%;
  
}
</style>
