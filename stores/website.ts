interface Tree {
    id: number
    label: string
    children?: Tree[]
  }

export const useWebsiteStore = defineStore('websiteStore', {
    state: () => ({
        data: [
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
          ],
    }),
    actions: {
      save() {
        console.log("将保存数据为：")
        console.log(JSON.stringify(this.data));
        localStorage.setItem('treeData', JSON.stringify(this.data));
      }
    }
  })
  