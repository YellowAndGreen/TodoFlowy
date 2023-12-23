<template>
  <el-input v-model="filterText" placeholder="Filter keyword" />
  <el-tree
    ref="treeRef"
    :filter-node-method="filterNode"
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

const filterText = ref('')
const treeRef = ref()

watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
}

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

const appendSibling = (data_node: Tree) => {
  // 定义 findParent 函数
  const findParent = (node: Tree, target: Tree): Tree | null => {
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        if (node.children[i] === target) {
          return node;
        } else {
          const parent = findParent(node.children[i], target);
          if (parent) {
            return parent;
          }
        }
      }
    }
    return null;
  }
  // 使用 findParent 函数找到 data_node 的父节点
  let parent_node = null;
  for (let i = 0; i < data.value.length; i++) {
    parent_node = findParent(data.value[i], data_node);
    if (parent_node) {
      break;
    }
  }
  // 创建新节点
  const newSibling = { id: id++, label: '', children: [] }
  if (parent_node) {
    // 如果找到了父节点，就在当前节点后添加一个平行节点
    if (!parent_node.children) {
      parent_node.children = []
    }
    const index = parent_node.children.indexOf(data_node)
    parent_node.children.splice(index + 1, 0, newSibling)
  } else {
    // 如果没有找到父节点，就在子数组的当前节点后面添加一个新节点
    const index = data.value.indexOf(data_node);
    data.value.splice(index + 1, 0, newSibling);
  }
  data.value = [...data.value]
}

const remove = (node: Node, data_node: Tree) => {
  const parent = node.parent
  const children: Tree[] = parent.data.children || parent.data
  const index = children.findIndex((d) => d.id === data_node.id)
  children.splice(index, 1)
  data.value = [...data.value]
}

const findPrevious = (node: Node, data_node: Tree) => {
  const parent = node.parent;
  const children: Tree[] = parent.data.children || parent.data;
  // 找到当前节点在子节点列表中的位置
  const currentIndex = children.findIndex((d) => d.id === data_node.id);
  // 检查是否存在上一个节点
  if (currentIndex > 0) {
    // 返回上一个节点的 data
    return children[currentIndex - 1];
  } else {
    // 如果不存在上一个节点，返回 null
    return null;
  }
};


interface Tree {
  id: number
  label: string
  children?: Tree[]
}
let id = 1000
const website = useWebsiteStore();

const data = ref<Tree[]>(website.data)

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
      ref:'inputs',
      // autosize:true,
      onInput: (event: InputEvent) => {
        event.stopPropagation();
        data.label = (event.target as HTMLInputElement).value;
      },
      onclick: (event: Event) => {
        event.stopPropagation();
      },
      onkeydown: (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          appendSibling(data);
        }
        if (event.key === 'Delete') {
          remove(node, data);
        }
        if(data.label==''&&event.key === 'Backspace'){
          // 检查data.label是否为空且按下了backspace，若是则删除
          console.log(findPrevious(node,data));
          // TODO:光标移动到上一个节点
          // getNode(findPrevious(node, data)).focus();
          remove(node, data);
        }
      },
    }),
  );
};

// 持久化
let intervalId: ReturnType<typeof setInterval>;

onMounted(() => {
  const savedData = localStorage.getItem('treeData');
  console.log(savedData);
  if (savedData) {
    data.value = JSON.parse(savedData);
  }
  // 每隔一分钟自动保存数据
  intervalId = setInterval(() => {
    console.log("定时保存数据：");
    console.log(JSON.stringify(data.value));
    localStorage.setItem('treeData', JSON.stringify(data.value));
  }, 5000); // 60000 毫秒等于一分钟
});

onBeforeUnmount(() => {
  // 组件卸载前清除定时器并保存数据
  clearInterval(intervalId);
  localStorage.setItem('treeData', JSON.stringify(data.value));
});

// 自动焦点
// 创建一个观察器实例
import { nextTick } from 'vue';
let observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach((node) => {
        // 检查节点是否为 Element 类型
        if (node instanceof HTMLElement && node.className.includes('el-tree-node')) {
          // 确保新元素已经渲染完成
          nextTick().then(() => {
            // 将光标移动到新元素上
            // console.log("work!")
            node.querySelector('input').focus();
          });
        }
      });
    }
  });
});
// 配置观察选项：
let config = { attributes: true, childList: true, subtree: true };
// 传入目标节点和观察选项
observer.observe(document.body, config);

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
  resize: none;
  background-color: transparent; /* 移除背景色 */
  border: none; /* 移除边框 */
  outline: none; /* 移除焦点时的轮廓 */
  box-shadow: none; /* 移除阴影 */
  padding: 0; /* 移除内边距 */
  margin: 0; /* 移除外边距 */
  flex: 1;
  display: flex;
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
  padding-right: 1%;
  /* display: flex;
  align-items: left; */
}
</style>
