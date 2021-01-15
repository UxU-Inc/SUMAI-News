const CONTENT_FONT = "CONTENT_FONT"
const CONTENT_COLUMNS = "CONTENT_COLUMNS"

const initialState = {
  font: '',
  columns: 4,
};

export default function contentSetting(state = initialState, action) {
  switch (action.type) {
    case CONTENT_FONT:
      return {
        ...state,
        font: action.font,
      }
    case CONTENT_COLUMNS:
      return {
        ...state,
        columns: action.columns,
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

const setColumns = (columns) => {
  return {
    type: CONTENT_COLUMNS,
    columns: columns,
  }
}

export {
  setFont,
  setColumns,
}