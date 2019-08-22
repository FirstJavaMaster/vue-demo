import Vue from 'vue'

const publicData = {
  corporation: {
    type: {
      characteristicIndustry: {
        name: '特色产业类',
        value: 'CHARACTERISTIC_INDUSTRY'
      },
      technologicalInnovation: {
        name: '科技创新类',
        value: 'TECHNOLOGICAL_INNOVATION'
      },
      culturalTourism: {
        name: '综合文旅类',
        value: 'CULTURAL_TOURISM'
      }
    }
  },
  question: {
    type: {
      completion: {
        name: '填空题',
        value: 'COMPLETION'
      },
      singleChoice: {
        name: '单选题',
        value: 'SINGLE_CHOICE'
      },
      multipleChoice: {
        name: '多选题',
        value: 'MULTIPLE_CHOICE'
      },
      file: {
        name: '文件题',
        value: 'FILE'
      }
    }
  },
  survey: {
    progressStatus: {
      initial: {
        name: '未开始',
        value: 'INITIAL'
      },
      running: {
        name: '进行中',
        value: 'RUNNING'
      },
      end: {
        name: '已结束',
        value: 'END'
      }
    }
  }
}

Vue.prototype.publicData = publicData


function getNameByValue (define, value) {
  const rightItem = Object.values(define).find(item => {
    return item.value === value
  })

  return rightItem === undefined ? undefined : rightItem.name
}

const filters = {
  formatSurveyProgressStatus: function (progressStatus) {
    return getNameByValue(publicData.survey.progressStatus, progressStatus)
  },
  formatCorporationType: function (type) {
    return getNameByValue(publicData.corporation.type, type)
  },
  formatQuestionType: function (type) {
    return getNameByValue(publicData.question.type, type)
  }
}

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

