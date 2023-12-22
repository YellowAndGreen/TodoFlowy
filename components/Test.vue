<template>
  <el-button @click="showMessage('hello')">Click me</el-button>
</template>

<script setup>
const showMessage = (message) => {
  ElMessage(message);
};
</script>
