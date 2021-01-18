const CONTENT_FONT = "CONTENT_FONT"
const CONTENT_FONT_SIZE = "CONTENT_FONT_SIZE"
const CONTENT_COLUMNS = "CONTENT_COLUMNS"

const initialState = {
  font: '',
  fontSize: 14,
  columns: 4,
};

export default function contentSetting(state = initialState, action) {
  switch (action.type) {
    case CONTENT_FONT:
      return {
        ...state,
        font: action.font,
      }
      case CONTENT_FONT_SIZE:
        return {
          ...state,
          fontSize: action.fontSize,
        }
    case CONTENT_COLUMNS:
      return {
        ...state,
        columns: Number(action.columns), // 쿠키 임의 변경시 NaN 에러 발생 가능
      }
    default:
      return {
        ...state
      };
  }
};

const setFont = (font) => {
  return {
    type: CONTENT_FONT,
    font: font,
  }
}
const setFontSize = (size) => {
  return {
    type: CONTENT_FONT_SIZE,
    fontSize: size,
  }
}

const setColumns = (columns) => {
  return {
    type: CONTENT_COLUMNS,
    columns: columns,
  }
}

export {
  setFont,
  setFontSize,
  setColumns,
}