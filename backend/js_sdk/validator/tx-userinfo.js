
// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema



const validator = {
  "sex": {
    "rules": [
      {
        "required": true,
        "errorMessage": "请输入{label}"
      },
      {
        "format": "string",
        "errorMessage": "请输入{label}"
      }
    ],
    "label": "性别"
  },
  "age": {
    "rules": [
      {
        "required": true,
        "errorMessage": "请输入{label}"
      },
      {
        "format": "string",
        "errorMessage": "请输入{label}"
      }
    ],
    "label": "年龄"
  },
  "education": {
    "rules": [
      {
        "required": true,
        "errorMessage": "请输入{label}"
      },
      {
        "format": "string",
        "errorMessage": "请输入{label}"
      }
    ],
    "label": "文化程度"
  },
  "occupation": {
    "rules": [
      {
        "required": true,
        "errorMessage": "请输入{label}"
      },
      {
        "format": "string",
        "errorMessage": "请输入{label}"
      }
    ],
    "label": "职业"
  },
  "income_min": {
    "rules": [
      {
        "required": true,
        "errorMessage": "{label}不能为空"
      },
      {
        "format": "string",
        "errorMessage": "{label}不能为空"
      }
    ],
    "label": "收入范围（最低）"
  },
  "income_max": {
    "rules": [
      {
        "required": true,
        "errorMessage": "{label}不能为空"
      },
      {
        "format": "string",
        "errorMessage": "{label}不能为空"
      }
    ],
    "label": "收入范围（最高）"
  },
  "private_car": {
    "rules": [
      {
        "required": true,
        "errorMessage": "请输入{label}"
      },
      {
        "format": "string",
        "errorMessage": "请输入{label}"
      }
    ],
    "label": "私人小汽车"
  },
  "construction_area": {
    "rules": [
      {
        "required": true,
        "errorMessage": "请输入{label}"
      },
      {
        "format": "string",
        "errorMessage": "请输入{label}"
      }
    ],
    "label": "建筑面积"
  },
  "bicycle": {
    "rules": [
      {
        "required": true,
        "errorMessage": "请输入{label}"
      },
      {
        "format": "string",
        "errorMessage": "请输入{label}"
      }
    ],
    "label": "是否拥有自行车"
  },
  "housing_nature": {
    "rules": [
      {
        "required": true,
        "errorMessage": "请输入{label}"
      },
      {
        "format": "string",
        "errorMessage": "请输入{label}"
      }
    ],
    "label": "住房性质"
  },
  "total_people": {
    "rules": [
      {
        "required": true,
        "errorMessage": "请输入{label}"
      },
      {
        "format": "string",
        "errorMessage": "请输入{label}"
      }
    ],
    "label": "总人数"
  }
}

const enumConverter = {}

export { validator, enumConverter }
