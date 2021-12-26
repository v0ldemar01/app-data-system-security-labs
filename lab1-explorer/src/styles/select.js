export const selectStyles = (
  theme,
  validation
) => ({
  placeholder: (defaultStyles, { isDisabled }) => ({
    ...defaultStyles,
    fontSize: 16,
    fontWeight: 400,
    ...(isDisabled
      ? {
        color: `${(theme.palette.grey)[40]}`
      }
      : {}),
    ...(validation
      ? {
        color: theme.palette.error.main
      }
      : {})
  }),
  control: (controlStyles, { isFocused, isDisabled, isMulti }) => ({
    ...controlStyles,
    minHeight: 47,
    fontSize: 16.5,
    fontWeight: 400,
    borderRadius: 8,
    paddingLeft: 5,
    ...(isDisabled
      ? {
        border: `0.25px solid ${(theme.palette.grey)[20]}`,
        backgroundColor: 'white'
      }
      : {}),
    ...(isMulti ? {
      padding: '4px 0 4px 4px'
    } : {}),
    ...(validation
      ? {
        border: `0.25px solid ${
          isFocused ? theme.palette.info.main : theme.palette.error.main
        }`,
        boxShadow: `0 0 0 ${isFocused ? '1px' : '0px'} ${
          theme.palette.info.main
        }`
      }
      : {})
  }),
  singleValue: (singleValueStyles, { isDisabled }) => ({
    ...singleValueStyles,
    ...(isDisabled
      ? {
        color: `${(theme.palette.grey)[40]}`
      }
      : {})
  }),
  option: (optionStyles, { isFocused, isSelected }) => ({
    ...optionStyles,
    padding: '8px 13px',
    margin: '-2px 12.5px',
    fontSize: 17,
    lineHeight: '24px',
    fontWeight: 400,
    color: isFocused ? theme.palette.primary.main : theme.palette.grey[600],
    backgroundColor: isFocused ? theme.palette.info.light : 'inherit',
    borderRadius: 9,
    width: 'calc(100% - 25px)',
    zIndex: isSelected ? 10 : -1,
    cursor: isFocused ? 'pointer' : 'default'
  }),
  menu: menuStyles => ({
    ...menuStyles,
    zIndex: 1300
  }),
  menuList: menuListStyles => ({
    ...menuListStyles,
    padding: '13px 0'
  }),
  clearIndicator: clearStyles => ({
    ...clearStyles,
    color: theme.palette.error.main,
    cursor: 'pointer'
  })
});
