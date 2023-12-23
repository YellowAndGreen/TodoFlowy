interface Tree {
    id: number
    label: string
    children?: Tree[]
  }

export const useWebsiteStore = defineStore('websiteStore', {
    state: () => ({

    }),
    actions: {
      save(data) {
        console.log("将保存数据为：")
        localStorage.setItem('treeData', JSON.stringify(data.value));
      }
    }
  })
  